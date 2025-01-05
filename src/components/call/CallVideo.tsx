'use client';
import { useState } from 'react';
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import GradientCircularProgress from '../shared/Loader';

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right';

const CallVideo = () => {
  const router = useRouter();
  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  // const [openMenu,setOpenMenu] = useState(false)

  // for more detail about types of CallingState see: https://getstream.io/video/docs/react/ui-cookbook/ringing-call/#incoming-call-panel
  const call = useCall();
  if (!call) {
    throw new Error('usecall must be used within a StreamCall component');
  }
  const callingState = useCallCallingState();

  if (callingState === CallingState.LEFT) {
    router.back();
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <GradientCircularProgress />

        <Box
          sx={{
            color: 'white',
            textAlign: 'center',
          }}
        >
          Ending...
        </Box>
      </Box>
    );
  }

  if (callingState === CallingState.JOINING)
    return (
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <GradientCircularProgress />
        <Box
          sx={{
            color: 'white',
            textAlign: 'center',
          }}
        >
          Joining...
        </Box>
      </Box>
    );

  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />;
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={`h-[calc(100vh-86px)] hidden ml-2 ${
            showParticipants && 'show-block'
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>

      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls
          onLeave={() => {
            call.endCall();
            call.camera.disable();
            call.microphone.disable();
          }}
        />

        <CallStatsButton />

        <button onClick={() => setShowParticipants((prev) => !prev)}>
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <AccountCircle
              sx={{
                fontSize: '20px',
                color: 'white',
              }}
            />
          </div>
        </button>
      </div>
    </section>
  );
};

export default CallVideo;
