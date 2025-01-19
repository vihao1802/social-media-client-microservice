import { chatGroupMemberApi } from '@/api/chat-group-member';
import { User } from '@/models/user';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  Autocomplete,
} from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import ImagesUpload, { FileWithPreview } from '../shared/ImagesUpload';
import { userApi } from '@/api/user';
import { chatApi } from '@/api/chat';
import { AddMembersCreation } from '@/models/chat-member';

interface ModalAddGroupProps {
  adminId: string;
  openModal: boolean;
  toggleModal: () => void;
}

const convertUrlToFile = async (url: string) => {
  return fetch(url)
    .then((res) => res.blob())
    .then((blob) => new File([blob], 'avatar.png', { type: blob.type }));
};

const ModalAddGroup = ({
  adminId,
  openModal,
  toggleModal,
}: ModalAddGroupProps) => {
  const [groupChatName, setGroupChatName] = useState('');
  const [loadingAddition, setLoadingAddition] = useState(false);
  const [chatAvatar, setChatAvatar] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const handleAddMember = async () => {
    if (selectedUsers.length === 0) {
      toast.error('Please select at least one user');
      return;
    }
    try {
      setLoadingAddition(true);

      const formData = new FormData();

      if (selectedUsers.length == 1) {
        // If it's a one-to-one chat
        const file = selectedUsers[0].profileImg
          ? await convertUrlToFile(selectedUsers[0].profileImg)
          : await convertUrlToFile('http://localhost:3000/icons/user.png');

        formData.append('groupName', selectedUsers[0].username);
        formData.append('isGroup', 'false');
        formData.append('groupAvatar', file);
      } else {
        if (!chatAvatar) {
          toast.error('Please choose a group avatar');
          return;
        }
        if (!groupChatName) {
          toast.error('Please enter a group name');
          return;
        }
        // If it's a group chat
        formData.append('groupName', groupChatName);
        formData.append('isGroup', 'true');
        formData.append('groupAvatar', chatAvatar);
      }

      const res = await chatApi.createGroupChat(formData);

      if (res) {
        const members = selectedUsers.map((user) => ({
          userId: user.id,
          isAdmin: false,
        }));

        members.push({ userId: adminId, isAdmin: selectedUsers.length > 1 });

        // Wrap members in an object matching the AddMembersCreation interface
        const payload: AddMembersCreation = { members };

        const resMember = await chatApi.addMembers(payload, res.id);

        if (resMember) {
          toast.success('Add chat success');
          toggleModal();
          setGroupChatName('');
          mutate('get_chats_by_user_id');
        }
      } else {
        toast.error('Add group chat failed');
      }
    } catch (error) {
      console.log('[handleAddMember]', error);
    } finally {
      setLoadingAddition(false);
    }
  };

  const handleFilteredUsers = async (value: string) => {
    if (value.length > 0) {
      const filtered = await userApi.getSearchUser(value);
      console.log('[filtered]');

      setFilteredUsers(
        filtered.data.filter(
          (user) =>
            user.id !== adminId &&
            selectedUsers.filter((filtered) => filtered.id === user.id)
              .length === 0
        )
      );
    } else {
      setFilteredUsers([]);
    }
  };

  const handleSelectedUsers = (arrayValue: User[]) => {
    setSelectedUsers(arrayValue);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      setChatAvatar(file);
      setPreviewUrl(URL.createObjectURL(file)); // Generate a preview URL for the image
    }
  };

  const handleDeleteImage = () => {
    setChatAvatar(null);
    setPreviewUrl(null);
  };

  return (
    <Modal
      open={openModal}
      onClose={() => {
        toggleModal();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 550,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          gutterBottom
          fontWeight={600}
          className="text-center"
        >
          New message
        </Typography>
        <Autocomplete
          multiple
          id="tags-standard"
          options={filteredUsers}
          getOptionLabel={(option) => option.username + ' - ' + option.email}
          onChange={(e, value) => {
            // called when user selects a user from the dropdown
            handleSelectedUsers(value);
          }}
          onInputChange={(e, value) => {
            // called when user types in the input field
            handleFilteredUsers(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="To anyone"
              placeholder="Search..."
            />
          )}
        />
        {selectedUsers.length > 1 && (
          <>
            <Box
              sx={{
                position: 'relative',
                border: '2px dashed #ccc',
                borderRadius: '8px',
                mt: 2,
                padding: '16px',
                textAlign: 'center',
                minHeight: '80px',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#3f51b5',
                },
              }}
            >
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id="file-input"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file-input"
                style={{
                  cursor: 'pointer',
                  position: 'absolute',
                  inset: 0,
                  paddingTop: '8px',
                }}
              >
                <Typography variant="body1" color="textSecondary">
                  {chatAvatar
                    ? `Selected File: ${chatAvatar.name.length > 25 ? chatAvatar.name.slice(0, 25) + '...' : chatAvatar.name}`
                    : 'Click to upload a group avatar'}
                </Typography>
              </label>

              {previewUrl && (
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ mb: 1 }}
                  >
                    Preview:
                  </Typography>
                  <img
                    src={previewUrl}
                    alt="Selected Avatar"
                    style={{
                      width: '100px',
                      height: '100px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              )}
              {chatAvatar && previewUrl && (
                <Button
                  variant="contained"
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={handleDeleteImage}
                >
                  Delete
                </Button>
              )}
            </Box>
            <TextField
              label="Group Chat Name"
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </>
        )}
        <Stack mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMember}
            sx={{ py: 1, textTransform: 'none' }}
            disabled={loadingAddition || selectedUsers.length === 0}
          >
            Chat
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalAddGroup;
