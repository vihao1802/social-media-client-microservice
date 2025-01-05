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

interface RightModalAddMembersProps {
  groupChatId: string;
  openModal: boolean;
  toggleModal: () => void;
}

const RightModalAddMembers = ({
  groupChatId,
  openModal,
  toggleModal,
}: RightModalAddMembersProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: userList } = useGetAllUser({});

  const handleAddMember = async () => {
    if (!selectedUser) {
      toast.error('Please select a user');
      return;
    }
    const formData = new FormData();
    formData.append('GroupId', groupChatId);
    formData.append('UserId', selectedUser.id);
    await chatGroupMemberApi.addMember(formData);
    mutate('get_members_by_group_id');
    toggleModal();
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
          width: 400,
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
          Add Members
        </Typography>

        <Autocomplete
          loading={userList ? false : true}
          disablePortal
          options={userList || []}
          getOptionLabel={(option) => option.email}
          sx={{ width: '100%' }}
          renderInput={(params) => <TextField {...params} label="Email" />}
          onChange={(event, newValue) => setSelectedUser(newValue)}
        />
        {/* <Autocomplete
          loading={userList ? false : true}
          disablePortal
          options={userList !== undefined ? userList : []}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="email" />}
        />
 */}
        <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddMember}
            sx={{ textTransform: 'none' }}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default RightModalAddMembers;
