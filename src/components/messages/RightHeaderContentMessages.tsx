'use client';
import { Avatar, Box, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';
import { ChatContext } from '@/context/chat-context';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { WebSocketContext } from '@/context/web-socket-context';

const RightHeaderContentMessages = () => {
  const { selectedChat } = useContext(ChatContext);
  const { onlineUsers } = useContext(WebSocketContext);
  const { user: authenticatedUser } = useAuthenticatedUser();

  const isOnline = useMemo(() => {
    if (!selectedChat?.chatMemberIds || !onlineUsers || !authenticatedUser)
      return false;
    return selectedChat.chatMemberIds.some(
      (id) => onlineUsers.includes(id) && authenticatedUser?.id !== id
    );
  }, [selectedChat, onlineUsers, authenticatedUser]);

  const chatName = selectedChat?.groupName || 'Loading...';
  const chatAvatar = selectedChat?.groupAvatar || '/icons/user.png';

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
      {/* Left section: avatar + name + status */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* Avatar with status dot */}
        <Box sx={{ position: 'relative' }}>
          <Avatar
            alt="avatar"
            src={chatAvatar}
            sx={{ width: 34, height: 34 }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 10,
              height: 10,
              borderRadius: '50%',
              bgcolor: isOnline ? 'success.main' : 'grey.500',
              border: '2px solid white',
            }}
          />
        </Box>

        {/* Chat name and status text */}
        <Box>
          <Typography sx={{ fontWeight: 500 }}>{chatName}</Typography>
          <Typography
            variant="caption"
            sx={{ color: isOnline ? 'success.main' : 'grey.600' }}
          >
            {isOnline ? 'Online' : 'Offline'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default RightHeaderContentMessages;
