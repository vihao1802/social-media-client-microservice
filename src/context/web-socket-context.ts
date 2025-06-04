import { IMessage } from '@stomp/stompjs';
import { createContext } from 'react';

interface WebSocketContextType {
  onlineUsers: string[];
  connectToChatTopic: (
    chatId: string,
    onMessageReceived: (message: IMessage) => void
  ) => void;
}

export const WebSocketContext = createContext<WebSocketContextType>({
  onlineUsers: [],
  connectToChatTopic: () => {},
});
