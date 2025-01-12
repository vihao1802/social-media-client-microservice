'use client';
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import LeftSideBarChatItemSkeleton from '../shared/LeftSideBarChatItemSkeleton';
import ModalAddGroup from './ModalAddGroup';
import { useGetChats } from '@/hooks/chat/useGetChats';
import { ChatContext } from '@/context/chat-context';
import { Chat } from '@/models/chat';

dayjs.extend(relativeTime);

const leftBarWidth = '350px';

const LeftSideBarMessages = () => {
  const currUserId = 'cm5ruu3ui0003vh3wvzmdo3jj';
  const router = useRouter();
  const [openModalAddGroup, setOpenModalAddGroup] = useState(false);
  const toggleModalAddGroup = () => setOpenModalAddGroup(!openModalAddGroup);
  const { chat_id } = useParams<{
    chat_id: string;
  }>();
  const { selectedChat, setSelectedChat } = useContext(ChatContext);

  const { data: chats } = useGetChats(currUserId);

  const handleSelect = (chat: Chat) => {
    router.push(`/messages/t/${chat.id}`);
    setSelectedChat(chat);
  };

  const { user: authenticatedUser } = useAuthenticatedUser();

  useEffect(() => {
    if (chat_id && chats && !selectedChat) {
      const chat = chats.content.filter((item) => item.id === chat_id)[0];
      setSelectedChat(chat);
    }
  }, [chats]);

  return (
    <Box
      sx={{
        width: leftBarWidth,
        height: '100%',
        borderRight: '2px solid #c7c5c5',
      }}
    >
      <Box
        sx={{
          padding: '16px 20px',
          height: '70px',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      ></Box>
      <Box
        sx={{
          height: 'calc(100vh - 70px)',
        }}
      >
        <List
          sx={{
            height: '100%',
            overflowY: 'auto',
            padding: '0',
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
        >
          {!chats ? (
            <LeftSideBarChatItemSkeleton />
          ) : (
            chats.content.map((item, index: number) => (
              <Box key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      color: 'black',
                      height: '70px',
                      padding: '0',
                      alignItems: 'start',
                      paddingLeft: '10px',
                      paddingRight: '20px',
                      paddingTop: '10px',
                      backgroundColor:
                        chat_id && item.id.toString() === chat_id
                          ? '#DFE0E0'
                          : 'white',
                    }}
                    onClick={() => handleSelect(item)}
                  >
                    <Box
                      sx={{
                        borderRadius: '50%',
                        padding: '0 10px',
                      }}
                    >
                      <Avatar
                        alt={'avatar'}
                        src={item.groupAvatar || '/icons/user.png'}
                      />
                    </Box>
                    <Box
                      sx={{
                        width: 'calc(100% - 60px)',
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          gap: '5px',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '16px',
                            color: 'black',
                            flex: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            paddingBottom: '5px',
                            fontWeight: '400',
                          }}
                        >
                          {item.groupName}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            color: '#9595AF',
                          }}
                        >
                          {item.latestMessage &&
                            item.latestMessage.sentAt &&
                            item.latestMessage.sentAt !==
                              '0001-01-01T00:00:00' &&
                            dayjs(item.latestMessage.sentAt)
                              .fromNow()
                              .replace(' ago', '')}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          fontSize: '15px',
                          color: '#555555',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          fontWeight: '400',
                        }}
                      >
                        {item.latestMessage &&
                          (item.latestMessage.senderId === currUserId
                            ? 'You: '
                            : item.isGroup &&
                              `${item.latestMessage.senderName}: `)}
                        {item.latestMessage
                          ? item.latestMessage.msgContent
                          : 'You can chat now'}
                      </Typography>
                    </Box>
                  </ListItemButton>
                </ListItem>
              </Box>
            ))
          )}
        </List>
      </Box>
      {authenticatedUser && (
        <ModalAddGroup
          adminId={authenticatedUser.id}
          openModal={openModalAddGroup}
          toggleModal={toggleModalAddGroup}
        />
      )}
      {/* {
        <Box
          sx={{
            padding: '10px 20px',
          }}
        >
          <Button
            sx={{
              backgroundColor: 'var(--buttonColor)',
              color: 'white',
              width: '100%',
            }}
            onClick={toggleModalAddGroup}
          >
            <GroupAdd />
          </Button>
        </Box>
      } */}
    </Box>
  );
};

export default LeftSideBarMessages;
