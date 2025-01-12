export interface Message {
  id: number;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  replyTo: string;
  msgContent: string;
  msgMediaContent: string;
  sentAt: string;
}

export interface MessagePagination {
  messages: Message[];
  nextCursor: string;
}

export interface CreateMessageRequest {
  chatId: string;
  msgContent: string;
  msgMediaContent: File | null;
  senderId: string;
  senderName: string;
  replyTo: number | null;
}
