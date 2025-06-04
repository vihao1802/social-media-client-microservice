import { Avatar, Box } from '@mui/material';
import 'react-chat-elements/dist/main.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Message } from '@/models/message';
import MessageImageBox from './MessageImageBox';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MessageItemBox from './MessageItemBox';
import DateTimeFormatting from '@/utils/date-time-formatting';
import GradientCircularProgress from '../shared/Loader';
import MessageInput from './MessageInput';
import { ChatContext } from '@/context/chat-context';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';

dayjs.extend(relativeTime);

const RightListContentMessages = () => {
  const { user: authenticatedUser } = useAuthenticatedUser();
  const boxRef = useRef<HTMLDivElement>(null);
  const [userScrolled, setUserScrolled] = useState(false);
  const [oldHeight, setOldHeight] = useState(0);
  let previousSenderId = '';

  if (!authenticatedUser) return null;

  const {
    getMessages,
    getMessagesWithNextCursor,
    messages,
    isMessagesLoading,
    nextCursor,
  } = useContext(ChatContext);

  const { chat_id } = useParams<{ chat_id: string }>();

  const scrollToBottom = () => {
    setTimeout(() => {
      const scrollContainer = boxRef.current;
      if (scrollContainer)
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }, 0);
  };

  // Fetch messages
  const fetchMessages = async () => {
    try {
      await getMessages(chat_id);
      scrollToBottom();
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  // fetch for the first time render
  useEffect(() => {
    fetchMessages();
  }, [chat_id]);

  useEffect(() => {
    const scrollContainer = boxRef.current;
    if (scrollContainer && !userScrolled) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const handleOnScroll = () => {
    const scrollContainer = boxRef.current;
    // if (!scrollContainer) return;
    // console.log('[scrollContainer.scrollHeight]', scrollContainer.scrollHeight);
    // console.log('[scrollContainer.scrollTop]', scrollContainer.scrollTop);
    // console.log('[scrollContainer.clientHeight]', scrollContainer.clientHeight);

    const handleScroll = async () => {
      if (
        scrollContainer &&
        scrollContainer.scrollTop === 0 &&
        nextCursor &&
        messages.length > 0
      ) {
        try {
          console.log('[nextCursor]', nextCursor);

          await getMessagesWithNextCursor(chat_id);
        } catch (error) {
          console.error('Failed to fetch messages:', error);
        } finally {
          const oldHeight = scrollContainer.scrollHeight;
          console.log('oldHeight', oldHeight);
          setOldHeight(oldHeight);
        }
      }
    };

    if (scrollContainer) {
      const isScroll =
        scrollContainer.scrollTop <
        scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
      setUserScrolled(isScroll);
      handleScroll();
    }
  };

  useEffect(() => {
    const scrollContainer = boxRef.current;
    if (scrollContainer && oldHeight > 0) {
      console.log('scroll to', scrollContainer.scrollHeight - oldHeight - 200);
      scrollContainer.scrollTop =
        scrollContainer.scrollHeight - oldHeight - 200;
    }
  }, [oldHeight]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'unset',
        height: 'calc(100% - 70px)',
      }}
    >
      <Box
        ref={boxRef}
        sx={{
          height: '100%',
          overflowY: 'scroll',
          padding: '10px 14px',
          '::-webkit-scrollbar': { width: '10px' },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
          },
          '::-webkit-scrollbar-thumb': {
            background: '#858585',
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#777',
          },
        }}
        onScroll={handleOnScroll}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {isMessagesLoading && <GradientCircularProgress width={25} />}
        </Box>

        {messages.map((item: Message, index: number) => {
          const position =
            authenticatedUser.id === item.senderId ? 'right' : 'left';
          const isSameSender = previousSenderId === item.senderId; // check for showing sender name
          const isShowAvatar =
            index === messages.length - 1
              ? item.senderId !== authenticatedUser.id
              : !(item.senderId === messages[index + 1].senderId) &&
                previousSenderId.length > 0;

          previousSenderId = item.senderId;

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                marginTop: '2px',
                gap: '6px',
                justifyContent:
                  position === 'right' ? 'flex-end' : 'flex-start',
                alignItems: 'end',
              }}
            >
              {authenticatedUser.id !== item.senderId && isShowAvatar ? (
                <Box>
                  <Avatar
                    sx={{ width: 28, height: 28 }}
                    src={item.senderAvatar || '/icons/user.png'}
                  />
                </Box>
              ) : (
                <Box sx={{ width: 28 }} />
              )}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {authenticatedUser.id !== item.senderId && !isSameSender && (
                  <Box
                    sx={{
                      fontSize: '13px',
                      color: '#777',
                      textTransform: 'none',
                      padding: '0 10px',
                      marginTop: index !== 0 ? '10px' : '0',
                    }}
                  >
                    {item.senderName}
                  </Box>
                )}
                {item.msgContent !== '' && (
                  <MessageItemBox
                    position={position}
                    msgContent={item.msgContent}
                    sentAt={DateTimeFormatting(item.sentAt)}
                  />
                )}
                {item.msgMediaContent.length > 0 && (
                  <MessageImageBox
                    position={position}
                    imageUrl={item.msgMediaContent}
                    sentAt={DateTimeFormatting(item.sentAt)}
                  />
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
      <MessageInput
        authenticatedUser={authenticatedUser}
        scrollToBottom={scrollToBottom}
      />
    </Box>
  );
};

export default RightListContentMessages;
