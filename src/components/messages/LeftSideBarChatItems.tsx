'use client';
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { User } from '@/models/user';
import { useGetPersonalMessenger } from '@/hooks/relationship/useGetPersonalMessenger';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ArrowRightSharp, GroupAdd } from '@mui/icons-material';
import { useGetGroupChatByMe } from '@/hooks/chat-group/useGetGroupChatByUserId';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { ChatGroup } from '@/models/chat-group';
import LeftSideBarChatItemSkeleton from '../shared/LeftSideBarChatItemSkeleton';
import ModalAddGroup from './ModalAddGroup';

dayjs.extend(relativeTime);

const leftBarWidth = '350px';

const LeftSideBarMessagesType = [
  {
    id: '1',
    type: 'personal',
    title: 'Chats',
    the_other_title: 'Chat groups',
  },
  {
    id: '2',
    type: 'group',
    title: 'Chat groups',
    the_other_title: 'Chats',
  },
];

const LeftSideBarMessages = () => {
  const router = useRouter();
  const [openModalAddGroup, setOpenModalAddGroup] = useState(false);
  const toggleModalAddGroup = () => setOpenModalAddGroup(!openModalAddGroup);
  const { g_id, u_id } = useParams<{
    g_id: string;
    u_id: string;
  }>();

  const [currentSideBarMessagesType, setCurrentSideBarMessagesType] = useState(
    g_id ? LeftSideBarMessagesType[1] : LeftSideBarMessagesType[0]
  );

  const handleSelect = (user: User, relationshipId: string) => {
    router.push(`/messages/r/${relationshipId}/u/${user.id}`);
  };

  const handleSelectGroup = (group: ChatGroup) => {
    router.push(`/messages/g/${group.id}`);
  };

  const { user: authenticatedUser } = useAuthenticatedUser();
  const { data: personalMessengers } = useGetPersonalMessenger({});

  const { data: chatGroupPagination } = useGetGroupChatByMe({
    enabled: currentSideBarMessagesType.id === '2',
  });

  function renderPersonalMessengers() {
    if (currentSideBarMessagesType.id === '1') {
      if (!personalMessengers) {
        return <LeftSideBarChatItemSkeleton />;
      } else {
        return personalMessengers.map((item, index: number) => (
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
                    u_id && item.messenger.id === u_id ? '#DFE0E0' : 'white',
                }}
                onClick={() =>
                  handleSelect(item.messenger, item.relationshipId)
                }
              >
                <Box
                  sx={{
                    borderRadius: '50%',
                    padding: '0 10px',
                  }}
                >
                  <Avatar
                    alt={item.messenger.username}
                    src={item.messenger.profile_img || '/icons/user.png'}
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
                      {item.messenger.username}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '12px',
                        color: '#9595AF',
                      }}
                    >
                      {item.message_created_at &&
                        dayjs(item.message_created_at)
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
                    {item.senderId &&
                      item.senderId !== item.messenger.id &&
                      'You: '}
                    {item.senderId
                      ? item.latest_message
                        ? item.latest_message
                        : 'Sent an image'
                      : 'You can chat now'}
                  </Typography>
                </Box>
              </ListItemButton>
            </ListItem>
          </Box>
        ));
      }
    } else {
      return null;
    }
  }

  function renderChatGroups() {
    if (currentSideBarMessagesType.id === '2') {
      if (
        !chatGroupPagination ||
        !authenticatedUser ||
        chatGroupPagination === undefined
      ) {
        return <LeftSideBarChatItemSkeleton />;
      } else {
        return chatGroupPagination.items
          .sort(
            (a, b) =>
              new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime()
          )
          .map((item, index: number) => (
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
                      g_id && item.id.toString() === g_id ? '#DFE0E0' : 'white',
                  }}
                  onClick={() => handleSelectGroup(item)}
                >
                  <Box
                    sx={{
                      borderRadius: '50%',
                      padding: '0 10px',
                    }}
                  >
                    <Avatar
                      alt={item.avatar}
                      src={item.avatar || '/icons/user.png'}
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
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                          color: '#9595AF',
                        }}
                      >
                        {item.sent_at &&
                          item.sent_at !== '0001-01-01T00:00:00' &&
                          dayjs(item.sent_at).fromNow().replace(' ago', '')}
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
                      {item.latest_message_sender &&
                        item.latest_message_sender.id ===
                          authenticatedUser.id &&
                        'You: '}
                      {item.latest_message_content
                        ? item.latest_message_content
                        : 'You can chat now'}
                    </Typography>
                  </Box>
                </ListItemButton>
              </ListItem>
            </Box>
          ));
      }
    } else {
      return null;
    }
  }

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
      >
        <Typography
          sx={{
            fontSize: '24px',
            fontWeight: 'bold',
            textAlign: 'Left',
          }}
        >
          {currentSideBarMessagesType.title}
        </Typography>
        <Button
          sx={{
            textTransform: 'none',
            color: 'var(--buttonColor)',
          }}
          onClick={() => {
            setCurrentSideBarMessagesType(
              currentSideBarMessagesType.id === '1'
                ? LeftSideBarMessagesType[1]
                : LeftSideBarMessagesType[0]
            );
          }}
        >
          {currentSideBarMessagesType.the_other_title} <ArrowRightSharp />
        </Button>
      </Box>
      <Box
        sx={{
          height:
            currentSideBarMessagesType.id === '2'
              ? 'calc(100vh - 126px)'
              : 'calc(100vh - 70px)',
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
          {renderPersonalMessengers()}
          {renderChatGroups()}
        </List>
      </Box>
      {authenticatedUser && currentSideBarMessagesType.id === '2' && (
        <ModalAddGroup
          adminId={authenticatedUser.id}
          openModal={openModalAddGroup}
          toggleModal={toggleModalAddGroup}
        />
      )}
      {currentSideBarMessagesType.id === '2' && (
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
      )}
    </Box>
  );
};

export default LeftSideBarMessages;
