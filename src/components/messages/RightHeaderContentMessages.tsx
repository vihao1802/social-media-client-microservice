'use client';
import { Avatar, Box } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { ChatContext } from '@/context/chat-context';

const RightHeaderContentMessages = () => {
  const { selectedChat } = useContext(ChatContext);
  const [chatAvatar, setChatAvatar] = useState('');
  const [chatName, setChatName] = useState('');

  useEffect(() => {
    if (selectedChat && selectedChat.groupName) {
      setChatName(selectedChat.groupName);
    }
    if (selectedChat && selectedChat.groupAvatar) {
      setChatAvatar(selectedChat.groupAvatar);
    }
  }, [selectedChat]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        padding: '14px',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '2px solid #c7c5c5',
        height: '70px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt={'avatar'}
          sx={{ width: 30, height: 30 }}
          src={chatAvatar || '/icons/user.png'}
        />
        <p className="text-lg pl-3 text-black">{chatName || 'Loading...'}</p>
      </Box>
    </Box>
  );
};

export default RightHeaderContentMessages;
