'use client';
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import LeftSideBarChatItemSkeleton from '../shared/LeftSideBarChatItemSkeleton';
import ModalAddGroup from './ModalAddGroup';
import { ChatContext } from '@/context/chat-context';
import { Chat, ChatPagination } from '@/models/chat';
import { PersonAddAlt } from '@mui/icons-material';
import { WebSocketContext } from '@/context/web-socket-context';
import { User } from '@/models/user';

dayjs.extend(relativeTime);

const LeftSideBarMessages = ({
  chats,
  authenticatedUser,
}: {
  chats: ChatPagination;
  authenticatedUser: User;
}) => {
  const router = useRouter();
  const [openModalAddGroup, setOpenModalAddGroup] = useState(false);

  const { selectedChat, setSelectedChat } = useContext(ChatContext);
  const { onlineUsers } = useContext(WebSocketContext);

  const { chat_id } = useParams<{
    chat_id: string;
  }>();

  const toggleModalAddGroup = () => setOpenModalAddGroup(!openModalAddGroup);

  const handleSelect = (chat: Chat) => {
    router.push(`/messages/t/${chat.id}`);
    setSelectedChat(chat);
  };

  useEffect(() => {
    if (chat_id && chats && !selectedChat) {
      const chat = chats.content.filter((item: Chat) => item.id === chat_id)[0];
      setSelectedChat(chat);
    }
  }, [chats]);

  return (
    <Box
      sx={{
        maxWidth: '350px',
        width: {
          xs: 'auto',
          md: '100%',
        },
        height: '100%',
        borderRight: '2px solid #c7c5c5',
      }}
    >
      <Box
        sx={{
          padding: '16px 20px',
          height: '70px',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <Tooltip title="Add chat" placement="right">
          <IconButton onClick={toggleModalAddGroup}>
            <PersonAddAlt fontSize="medium" className="text-black" />
          </IconButton>
        </Tooltip>
      </Box>
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
            chats.content.map((item: Chat, index: number) => (
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
                        padding: {
                          xs: '0',
                          md: '0 10px',
                        },
                        position: 'relative',
                      }}
                    >
                      <Avatar
                        alt={'avatar'}
                        src={item.groupAvatar || '/icons/user.png'}
                        sx={{
                          width: {
                            xs: '50px',
                            md: '40px',
                          },
                          height: {
                            xs: '50px',
                            md: '40px',
                          },
                        }}
                      />
                      {item.chatMemberIds.some(
                        (id) =>
                          onlineUsers.includes(id) &&
                          id !== authenticatedUser.id
                      ) && (
                        <span className="absolute bottom-0 right-2 size-3 bg-green-500  rounded-full" />
                      )}
                    </Box>
                    <Box
                      sx={{
                        width: 'calc(100% - 60px)',
                        display: {
                          xs: 'none',
                          md: 'flex',
                        },
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
                          (authenticatedUser &&
                          item.latestMessage.senderId === authenticatedUser.id
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
    </Box>
  );
};

export default LeftSideBarMessages;
