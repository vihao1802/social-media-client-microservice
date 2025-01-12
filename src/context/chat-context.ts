import { createContext } from 'react';
import { Chat } from '@/models/chat';
import { CreateMessageRequest, Message } from '@/models/message';
export interface SelectedChat {
  chatName: string;
  chatAvatar: string;
}

export const ChatContext = createContext({
  users: [],
  isMessagesLoading: false,
  messages: [] as Message[],
  selectedChat: null as Chat | null,
  nextCursor: null as string | null,
  subscribeToTopic: () => {},
  unsubscribeFromTopic: () => {},
  setSelectedChat: (selectedChat: Chat) => {},
  getMessages: async (chatId: string) => {},
  sendMessage: async (payload: CreateMessageRequest) => {},
  getMessagesWithNextCursor: async (chatId: string) => {},
});
