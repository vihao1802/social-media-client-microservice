'use client';

import { Box, CircularProgress } from '@mui/material';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import React, { useEffect, useState } from 'react';
import { useGetCallById } from '@/hooks/stream/useGetCallById';
import CallVideo from '@/components/call/CallVideo';
import CallVideoSetup from '@/components/call/CallVideoSetup';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const Call = ({ params: { id } }: { params: { id: string } }) => {
  const { call, isCallLoading } = useGetCallById(id);
  const [isSetUpComplete, setIsSetUpComplete] = useState(false);
  useEffect(() => {}, [isCallLoading, call]);

  if (isCallLoading) {
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}
      >
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  return (
    <Box
      sx={{
        zIndex: 1201,
        height: '100vh',
        width: '100%',
        backgroundColor: '#24272D',
      }}
    >
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetUpComplete ? (
            <CallVideoSetup setIsSetUpComplete={setIsSetUpComplete} />
          ) : (
            <CallVideo />
          )}
        </StreamTheme>
      </StreamCall>
    </Box>
  );
};

export default Call;
