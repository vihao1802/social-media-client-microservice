'use client';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Modal,
  Skeleton,
  Typography,
} from '@mui/material';
import {
  Call,
  CallEnd,
  InfoOutlined,
  PhoneOutlined,
} from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import {
  useStreamVideoClient,
  useCalls,
  CallingState,
  StreamVideoClient,
} from '@stream-io/video-react-sdk';
import { tokenProvider } from '@/actions/stream.action';
import RightDrawerContentMessages from '@/components/messages/RightDrawerContentMessages';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useGetUserById } from '@/hooks/user/useGetUserById';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import toast from 'react-hot-toast';

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const RightHeaderContentMessages = () => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const [clientReceiver, setClientReceiver] = useState<StreamVideoClient>();
  const [open, setOpen] = useState(false);
  const [openCall, setOpenCall] = useState(false);
  const [incomingCallId, setIncomingCallId] = useState<string | null>(null);
  const { u_id: id } = useParams<{ u_id: string }>();
  const { user: authenticatedUser } = useAuthenticatedUser();
  const webSocket = useRef<WebSocket | null>(null);

  if (!id) return null;
  const { data: user } = useGetUserById({ id });

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  useEffect(() => {
    if (!authenticatedUser || !apiKey) return;
    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/messenge`
    );
    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (
        data.type === 'incoming_call' &&
        data.userId === authenticatedUser.id
      ) {
        handleIncomingCall(data.callId);
        if (!user) {
          console.log('User is not initialized');
          return;
        }
        /* const newClient = new StreamVideoClient({
          apiKey,
          user: {
            id: id,
            name: user.username,
            image: user.profile_img,
          },
          tokenProvider: () => tokenProvider(id),
        });
        setClientReceiver(newClient); */
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    webSocket.current = ws;

    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, [authenticatedUser]);

  const initiateCall = async () => {
    if (!client) {
      console.log('Video client is not initialized');
      return;
    }

    if (!apiKey) {
      console.error('API key is not defined');
      return;
    }

    try {
      const callId = crypto.randomUUID();
      const call = client.call('default', callId);
      await call.create({
        data: {
          members: [{ user_id: id }],
        },
      });

      if (
        webSocket.current &&
        webSocket.current.readyState === WebSocket.OPEN
      ) {
        webSocket.current.send(
          JSON.stringify({
            type: 'incoming_call',
            userId: id,
            callId: callId,
          })
        );
      }

      router.push(`/call/${callId}`);
    } catch (error) {
      console.log('Failed initiate' + error);
    }
  };

  const handleIncomingCall = async (callId: string) => {
    setIncomingCallId(callId);
    setOpenCall(true);
  };

  const joinCall = async () => {
    /* if (!client) {
      console.log("Video client is not initialized");
      return;
    } */
    if (!incomingCallId) {
      console.log('Incoming call id is not defined');
      return;
    }

    try {
      // const call = client.call("default", incomingCallId);
      // await call.join();
      router.push(`/call/${incomingCallId}`);
      // setOpenCall(false);
    } catch (error) {
      console.log(error);
    }
  };

  const rejectCall = async () => {
    /* if (!clientReceiver) {
      console.log("Video client is not initialized");
      return;
    }
    if (!incomingCallId) {
      console.log("Incoming call id is not defined");
      return;
    } */

    /* const call = client.call("default", incomingCallId);
    const callingState = call.state.callingState;

    if (
      callingState !== CallingState.RINGING &&
      callingState !== CallingState.JOINED
    ) {
      toast.error("Call is no longer active or already ended");
      return;
    } */

    console.log('rejecting call');

    // const { calls } = await clientReceiver.queryCalls({
    //   filter_conditions: { id: incomingCallId },
    // });

    try {
      // await calls[0].reject();
      setIncomingCallId(null);
      setOpenCall(false);
    } catch (error) {
      console.error('Error rejecting call:', error);
    }
  };

  const handleCLose = () => {
    rejectCall();
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
      <Modal
        open={openCall}
        onClose={handleCLose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            backgroundColor: 'white',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            padding: '20px',
            border: 'none',
            outline: 'none',
            borderRadius: '10px',
          }}
        >
          <Avatar
            src={user?.profile_img}
            sx={{ width: '100px', height: '100px' }}
          />
          <Typography
            sx={{
              fontSize: '17px',
              color: 'black',
            }}
          >
            Calling from <strong className="text-lg">{user?.username}</strong>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
            }}
          >
            <Button
              onClick={rejectCall}
              sx={{ backgroundColor: 'red', color: 'white' }}
              startIcon={
                <CallEnd
                  fontSize={'inherit'}
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                  }}
                />
              }
            >
              Decline
            </Button>
            <Button
              onClick={joinCall}
              sx={{ backgroundColor: 'green', color: 'white' }}
              startIcon={
                <Call
                  fontSize={'inherit'}
                  sx={{
                    cursor: 'pointer',
                    color: 'white',
                  }}
                />
              }
            >
              Accept
            </Button>
          </Box>
        </Box>
      </Modal>

      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <RightDrawerContentMessages
          u_id={id}
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
        {user ? (
          <Avatar src={user.profile_img || '/icons/user.png'} />
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
          {user ? user.username : <Skeleton variant="text" width={100} />}
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

export default RightHeaderContentMessages;
