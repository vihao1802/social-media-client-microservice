import React, { useRef, useState, useEffect } from 'react';
import SockJS from 'sockjs-client';
import { Client, IMessage } from '@stomp/stompjs';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { WebSocketContext } from '@/context/web-socket-context';

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const stompClientRef = useRef<Client | null>(null);
  const { user: authenticatedUser } = useAuthenticatedUser();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  useEffect(() => {
    if (!authenticatedUser) return;
    const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const socket = new SockJS(`${BASE_URL}/ws`);

    stompClientRef.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: {
        userId: authenticatedUser.id,
      },
      onConnect: () => {
        // Subscribe to online users
        stompClientRef.current?.subscribe(
          '/topic/online-users',
          (message: IMessage) => {
            const onlineUserIds = JSON.parse(message.body);
            setOnlineUsers(onlineUserIds);
          }
        );

        stompClientRef.current?.publish({
          destination: '/app/update-online-users',
          body: JSON.stringify({ userId: authenticatedUser.id }),
        });
      },
      onStompError: (frame) => {
        console.error('[WebSocket] Error:', frame.headers['message']);
      },
      debug: (str) => {
        console.log('[WebSocket Debug]', str);
      },
      reconnectDelay: 5000,
    });

    stompClientRef.current.activate();

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  }, [authenticatedUser]);

  function connectToChatTopic(
    chatId: string,
    onMessageReceived: (message: IMessage) => void
  ) {
    if (!stompClientRef.current) return;
    stompClientRef.current.subscribe(
      `/topic/chat/${chatId}`,
      onMessageReceived
    );
  }

  return (
    <WebSocketContext.Provider
      value={{
        onlineUsers,
        connectToChatTopic,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};
