'use client';
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
        marginX: 'auto',
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
        />
        <Typography>Select a chat to send messages</Typography>
      </Box>
    </Box>
  );
};

export default Messages;
