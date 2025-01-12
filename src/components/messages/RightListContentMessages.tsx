import { Avatar, Box } from '@mui/material';
import 'react-chat-elements/dist/main.css';
import { useContext, useEffect, useRef } from 'react';
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

dayjs.extend(relativeTime);

const RightListContentMessages = () => {
  const currUserId = 'cm5ruu3ui0003vh3wvzmdo3jj';
  const boxRef = useRef<HTMLDivElement>(null);

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
    console.log('[message]: chat id ', chat_id);
    fetchMessages();
  }, [chat_id]);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        boxRef.current &&
        boxRef.current.scrollTop === 0 &&
        nextCursor &&
        messages.length > 0
      ) {
        const oldHeight = boxRef.current.scrollHeight;
        console.log('oldHeight', oldHeight);

        await getMessagesWithNextCursor(chat_id);

        const newHeight = boxRef.current.scrollHeight;
        console.log('oldHeight', newHeight);

        boxRef.current.scrollTop = newHeight - oldHeight;
        console.log('scroll to', newHeight - oldHeight);
      }
    };

    const boxElement = boxRef.current;

    if (boxElement) {
      boxElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (boxElement) {
        boxElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [chat_id, nextCursor, messages.length]);

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
        // onScroll={handleOnScroll}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {isMessagesLoading && <GradientCircularProgress width={25} />}
        </Box>

        {messages.map((item: Message, index: number) => {
          const position = currUserId === item.senderId ? 'right' : 'left';
          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                marginTop: '20px',
                gap: '8px',
                justifyContent:
                  position === 'right' ? 'flex-end' : 'flex-start',
                alignItems: 'end',
              }}
            >
              {currUserId !== item.senderId && (
                <Box>
                  <Avatar
                    sx={{ width: 28, height: 28 }}
                    src={item.senderAvatar || '/icons/user.png'}
                  />
                </Box>
              )}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {currUserId !== item.senderId && (
                  <Box
                    sx={{
                      fontSize: '13px',
                      color: '#777',
                      textTransform: 'none',
                      padding: '0 10px',
                    }}
                  >
                    {item.senderName}
                  </Box>
                )}
                <MessageItemBox
                  position={position}
                  msgContent={item.msgContent}
                  sentAt={DateTimeFormatting(item.sentAt)}
                />
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
      <MessageInput scrollToBottom={scrollToBottom} />
    </Box>
  );
};

export default RightListContentMessages;
