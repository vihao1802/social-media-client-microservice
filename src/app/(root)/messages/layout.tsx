'use client';
import LeftSideBarMessages from '@/components/messages/LeftSideBarChatItems';
import { ChatContext } from '@/context/chat-context';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Chat } from '@/models/chat';
import { CreateMessageRequest, Message } from '@/models/message';
import { messageApi } from '@/api/message';
import { mutate } from 'swr';
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  // const currUserId = 'cm5ruu3ui0003vh3wvzmdo3jj';
  const { user: authenticatedUser } = useAuthenticatedUser();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null); // Cursor(sentAt) for pagination
  const [users, setUsers] = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const connectWebsocket = () => {
    const socket = new SockJS('http://localhost:8101/ws');
    const stompClientInner = Stomp.over(() => socket);

    // Set up headers, debug options, and reconnect behavior
    stompClientInner.reconnectDelay = 5000; // Auto-reconnect after 5 seconds
    stompClientInner.debug = (str) => {
      console.log('[STOMP Debug]', str);
    };
    stompClientInner.onStompError = onStompError;

    // Activate the client
    stompClientInner.activate();

    setStompClient(stompClientInner);

    stompClientInner.onConnect = () => {
      console.log('[onConnect] Connected to WebSocket');
      if (selectedChat) {
        stompClientInner.subscribe(
          `/topic/chat/${selectedChat.id}`,
          onMessageReceived
        );
      }
    };

    if (selectedChat && stompClientInner.connected) {
      console.log('[onConnected] Connected to WebSocket');
    }
  };

  const onStompError = (error: any) => {
    console.error('[onStompError] Broker error:', error);
  };

  const subscribeToTopic = () => {
    if (stompClient && selectedChat) {
      console.log('[onConnected] Connected to WebSocket');
      stompClient.subscribe(
        `/topic/chat/${selectedChat.id}`,
        onMessageReceived
      );
    } else {
      console.log('[subscribeToTopic] Not connected to WebSocket');
    }
  };

  const unsubscribeFromTopic = () => {
    // Implement the logic to unsubscribe from messages
    if (stompClient && selectedChat) {
      console.log('[unsubscribeFromTopic] Unsubscribed from WebSocket');
      stompClient.unsubscribe(`/topic/chat/${selectedChat.id}`);
    }
  };

  const onMessageReceived = (message: IMessage) => {
    const newMessage: Message = JSON.parse(message.body);
    console.log('[onMessageReceived] Message received:', newMessage);
    if (authenticatedUser && authenticatedUser.id !== newMessage.senderId)
      setMessages((prev) => [...prev, JSON.parse(message.body)]);
  };

  // get latest messages
  const getMessages = async (chatId: string, size = 20): Promise<void> => {
    try {
      console.log('[getMessages]: Fetch messages');
      setIsMessagesLoading(true);
      const res = await messageApi.getMessagesByChatId(chatId, size);
      setMessages(res.messages);
      setNextCursor(res.nextCursor);
    } catch (error) {
      console.log('[error]: getMessages error', error);
    } finally {
      setIsMessagesLoading(false);
    }
  };

  // get older messages with next cursor
  const getMessagesWithNextCursor = async (chatId: string, size = 20) => {
    try {
      setIsMessagesLoading(true);
      if (messages.length > 0 && messages.length % size === 0 && nextCursor) {
        // fetch with nextCursor
        console.log('[message]: fetch with nextCursor');
        const res = await messageApi.getMessagesByChatId(
          chatId,
          size,
          nextCursor
        );
        console.log({ res });

        setMessages((prev) => [...res.messages, ...prev]);
        setNextCursor(res.nextCursor);
      }
    } catch (error) {
      console.log('[error]: getMessagesWithNextCursor error', error);
    } finally {
      setIsMessagesLoading(false);
    }
  };

  const sendMessage = async (payload: CreateMessageRequest): Promise<void> => {
    try {
      const res = await messageApi.createMessage(payload);
      setMessages((prev) => [...prev, res]);
      mutate('get_chats_by_user_id');

      /* if (stompClient && stompClient.connected) {
        console.log('[sendMessage] Sending message to WebSocket');
        stompClient.publish({
          destination: `/app/send-message`,
          body: JSON.stringify(res),
        });
      } */
    } catch (error) {
      console.log('[error]: sendMessage error', error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      connectWebsocket();
      localStorage.setItem('selectedChat', JSON.stringify(selectedChat));
    }
    // subscribeToTopic();

    return () => {
      if (stompClient) {
        // unsubscribeFromTopic();
        stompClient.deactivate();
      }
    };
  }, [selectedChat]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: 'calc(100% - 80px)',
        marginLeft: 'auto',
      }}
    >
      <ChatContext.Provider
        value={{
          users,
          messages,
          selectedChat,
          nextCursor,
          isMessagesLoading,
          getMessages,
          getMessagesWithNextCursor,
          sendMessage,
          setSelectedChat,
          subscribeToTopic,
          unsubscribeFromTopic,
        }}
      >
        <LeftSideBarMessages />
        {children}
      </ChatContext.Provider>
    </Box>
  );
};

export default MessagesLayout;
