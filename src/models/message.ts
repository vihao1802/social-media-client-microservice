import { User } from "./user";

export interface Message {
  content: string;
  sent_at: string;
  senderId: string;
  receiverId: string;
  replyToId: string | null;
  mediaContents: [];
  receiver: User;
  sender: User;
}

export interface CreateMessageRequest {
  relationshipId: string;
  content: string;
  replyToId: string;
}
