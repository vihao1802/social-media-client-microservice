'use client';
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { InfoOutlined, PhoneOutlined } from '@mui/icons-material';
import { useState } from 'react';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { tokenProvider } from '@/actions/stream.action';
import { useParams, useRouter } from 'next/navigation';
import { useGetGroupChatById } from '@/hooks/chat-group/useGetGroupChatById';
import RightDrawerContentGroupChat from './RightDrawerContentGroupChat';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const RightHeaderContentGroupChat = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { g_id: id } = useParams<{ g_id: string }>();

  if (!id) return null;

  const { data: groupChat } = useGetGroupChatById({ groupId: id });
  const client = useStreamVideoClient();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const initiateCall = async () => {
    if (!client) {
      console.log('Video client is not initialized');
      return;
    }

    try {
      const callId = crypto.randomUUID();
      const call = client.call('default', callId);
      await call.getOrCreate();

      router.push(`/call/${callId}`);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <RightDrawerContentGroupChat
          g_id={id}
          closeDrawer={toggleDrawer(false)}
        />
      </Drawer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {groupChat ? (
          <Avatar src={groupChat.avatar || '/icons/user.png'} />
        ) : (
          <Skeleton variant="circular" width={40} height={40} />
        )}

        <Typography
          sx={{
            fontSize: '17px',
            color: 'black',
            paddingLeft: '10px',
          }}
        >
          {groupChat ? groupChat.name : <Skeleton variant="text" width={100} />}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          fontSize: '28px',
        }}
      >
        <IconButton onClick={initiateCall}>
          <PhoneOutlined
            fontSize={'inherit'}
            sx={{
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'black',
            }}
          />
        </IconButton>

        <IconButton onClick={toggleDrawer(true)}>
          <InfoOutlined
            fontSize={'inherit'}
            sx={{
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'black',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RightHeaderContentGroupChat;
