'use client';
import { Box } from '@mui/material';
import RightHeaderContentMessages from './RightHeaderContentMessages';
import RightListContentMessages from './RightListContentMessages';
import { ChatContext } from '@/context/chat-context';
import { useContext } from 'react';

const RightContentMessages = () => {
  const { selectedChat } = useContext(ChatContext);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
      }}
    >
      <RightHeaderContentMessages />
      <RightListContentMessages />
    </Box>
  );
};

export default RightContentMessages;
