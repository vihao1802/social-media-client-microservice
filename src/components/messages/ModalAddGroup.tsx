import { chatGroupMemberApi } from '@/api/chat-group-member';
import { useGetAllUser } from '@/hooks/user/useGetAllUser';
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
import { MediaContent } from '@/models/media-content';
import { chatGroupApi } from '@/api/chat-group';

interface ModalAddGroupProps {
  adminId: string;
  openModal: boolean;
  toggleModal: () => void;
}

const ModalAddGroup = ({
  adminId,
  openModal,
  toggleModal,
}: ModalAddGroupProps) => {
  const [groupChatName, setGroupChatName] = useState('');
  const [mediaContentList, setMediaContentList] = useState<
    (FileWithPreview | MediaContent)[]
  >([]);
  const [loadingAddition, setLoadingAddition] = useState(false);

  const handleAddMember = async () => {
    if (!groupChatName || mediaContentList.length === 0) {
      toast.error('Please fill in all fields');
      return;
    }
    try {
      setLoadingAddition(true);
      const formData = new FormData();
      formData.append('name', groupChatName);
      mediaContentList.forEach((media) => {
        if (media instanceof File) {
          formData.append('mediaFile', media);
          return;
        }
      });
      formData.append('AdminId', adminId);
      formData.append('avatar', '');
      const res = await chatGroupApi.createGroupChat(formData);

      if (res && res.data) {
        const formMemberData = new FormData();
        formMemberData.append('GroupId', res.data.id.toString());
        formMemberData.append('UserId', adminId);
        const resMember = await chatGroupMemberApi.addMember(formMemberData);
        if (resMember) {
          toast.success('Add group chat successful');
          mutate('get_group_chat_by_me');
          toggleModal();
          setGroupChatName('');
          setMediaContentList([]);
        }
      } else {
        toast.error('Add group chat failed');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAddition(false);
    }
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
        >
          Add Group Chat
        </Typography>
        <ImagesUpload
          value={mediaContentList}
          onChange={(value) => {
            setMediaContentList(value);
          }}
        />
        <TextField
          label="Group Chat Name"
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          value={groupChatName}
          onChange={(e) => setGroupChatName(e.target.value)}
        />
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMember}
            sx={{ textTransform: 'none' }}
            disabled={loadingAddition}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalAddGroup;
