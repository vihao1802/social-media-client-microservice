'use client';

import { tokenProvider } from '@/actions/stream.action';
import GradientCircularProgress from '@/components/shared/Loader';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { Box } from '@mui/material';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk';
import { ReactNode, useEffect, useState } from 'react';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user: authenticatedUser } = useAuthenticatedUser();

  useEffect(() => {
    if (!apiKey) throw new Error('Stream API key is missing');
    if (!authenticatedUser) return;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: authenticatedUser.id,
        name: authenticatedUser.username,
        image: authenticatedUser.profile_img,
      },
      tokenProvider: () => tokenProvider(authenticatedUser.id),
    });

    setVideoClient(client);
  }, [apiKey]);

  if (!videoClient)
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <GradientCircularProgress />
      </Box>
    );

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
