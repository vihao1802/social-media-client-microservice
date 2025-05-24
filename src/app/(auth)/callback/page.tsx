'use client';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { Box, Skeleton, Typography } from '@mui/material';
import cookies from 'js-cookie';
import { redirect, useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react';

const CallBackHandle = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const access_token = searchParams.get('access_token');
  const refresh_token = searchParams.get('refresh_token');

  if (!access_token || !refresh_token) {
    router.push('/sign-in');
  } else {
    cookies.set('access_token', access_token);
    cookies.set('refresh_token', refresh_token);
    // window.location.href = '/';
    router.push('/');
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        bgcolor: 'neutral.100',
        gap: 2,
      }}
    >
      <Skeleton
        variant="circular"
        sx={{ width: 60, height: 60, bgcolor: 'neutral.300' }}
      />
      <Typography variant="body2" color="neutral.500">
        Redirecting... Please wait.
      </Typography>
    </Box>
  );
};

export default CallBackHandle;
