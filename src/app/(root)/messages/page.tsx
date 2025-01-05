'use client';
import LeftSideBarMessages from '@/components/messages/LeftSideBarChatItems';
import { Friends } from '@/types';
import { AccountCircle, AccountCircleOutlined } from '@mui/icons-material';
import { Avatar, Box, Typography } from '@mui/material';

const Messages = () => {
  return (
    <Box
      sx={{
        width: `calc(100% - 430px)`,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Avatar
          sx={{
            width: '80px',
            height: '80px',
            margin: '0 auto 10px',
          }}
          src=""
        />
        <Typography>Select a friend or group chat to send messages</Typography>
      </Box>
    </Box>
  );
};

export default Messages;
