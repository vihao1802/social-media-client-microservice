'use client';

import { Button } from '@mui/material';
import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';

import { useRouter } from 'next/navigation';

const EndCallButton = ({ text }: { text: string }) => {
  const call = useCall();
  const router = useRouter();

  if (!call)
    throw new Error(
      'useStreamCall must be used within a StreamCall component.'
    );

  // https://getstream.io/video/docs/react/guides/call-and-participant-state/#participant-state-3
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const isMeetingOwner =
    localParticipant &&
    call.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  // if (!isMeetingOwner) return null;

  const endCall = async () => {
    call?.camera.disable();
    call?.microphone.disable();
    await call.endCall();
    router.back();
  };

  return (
    <Button
      onClick={endCall}
      sx={{
        backgroundColor: 'red',
        color: 'white',
        ':hover': {
          backgroundColor: '#FF5555',
        },
      }}
    >
      {text}
    </Button>
  );
};

export default EndCallButton;
