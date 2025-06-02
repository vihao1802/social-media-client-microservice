'use client';
import LeftSideBarMessages from '@/components/messages/LeftSideBarChatItems';
import { ChatContext } from '@/context/chat-context';
import { Box } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Chat } from '@/models/chat';
import { CreateMessageRequest, Message } from '@/models/message';
import { messageApi } from '@/api/message';
import { IMessage } from '@stomp/stompjs';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { WebSocketContext } from '@/context/web-socket-context';
import { useGetChats } from '@/hooks/chat/useGetChats';

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  const { user: authenticatedUser } = useAuthenticatedUser();
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null); // Cursor(sentAt) for pagination
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const { connectToChatTopic } = useContext(WebSocketContext);

  if (!authenticatedUser) return null;

  const { data: chats, mutateChats } = useGetChats(authenticatedUser.id);

  const onMessageReceived = (message: IMessage) => {
    const newMessage: Message = JSON.parse(message.body);
    console.log('[onMessageReceived] Message received:', newMessage);
    if (authenticatedUser && authenticatedUser.id !== newMessage.senderId) {
      setMessages((prev) => [...prev, newMessage]);
      mutateChats((current: any) => {
        if (!current) return current;
        const updatedChat = current.content.find(
          (chat: Chat) => chat.id === newMessage.chatId
        );
        if (!updatedChat) return current;

        const updatedChatWithNewMessage = {
          ...updatedChat,
          latestMessage: {
            ...newMessage,
            msgContent: newMessage.msgContent,
            sentAt: newMessage.sentAt,
          },
        };

        return {
          ...current,
          content: [
            updatedChatWithNewMessage,
            ...current.content.filter(
              (chat: Chat) => chat.id !== newMessage.chatId
            ),
          ],
        };
      }, false);
    }
  };

  // get latest messages
  const getMessages = async (chatId: string, size = 20): Promise<void> => {
    try {
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

      if (messages.length > 0 && nextCursor) {
        // fetch with nextCursor
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
      if (res) setMessages((prev) => [...prev, res]);

      // Cập nhật cache SWR thủ công ngay lập tức
      mutateChats((current: any) => {
        if (!current) return current;
        const updatedChat = current.content.find(
          (chat: Chat) => chat.id === payload.chatId
        );
        if (!updatedChat) return current;

        const updatedChatWithNewMessage = {
          ...updatedChat,
          latestMessage: {
            ...res,
            msgContent: res.msgContent,
            sentAt: res.sentAt,
          },
        };

        return {
          ...current,
          content: [
            updatedChatWithNewMessage,
            ...current.content.filter(
              (chat: Chat) => chat.id !== payload.chatId
            ),
          ],
        };
      }, false); // false: không gọi lại API
    } catch (error) {
      console.log('[error]: sendMessage error', error);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      connectToChatTopic(selectedChat.id, onMessageReceived);
      localStorage.setItem('selectedChat', JSON.stringify(selectedChat));
    }
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
          messages,
          selectedChat,
          nextCursor,
          isMessagesLoading,
          getMessages,
          getMessagesWithNextCursor,
          sendMessage,
          setSelectedChat,
        }}
      >
        {chats && (
          <LeftSideBarMessages
            chats={chats}
            authenticatedUser={authenticatedUser}
          />
        )}
        {children}
      </ChatContext.Provider>
    </Box>
  );
};

export default MessagesLayout;
