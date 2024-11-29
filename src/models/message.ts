import { MessageMediaContent } from "./message-media-content";
import { User } from "./user";

export interface Message {
  content: string;
  sent_at: string;
  senderId: string;
  receiverId: string;
  replyToId: string | null;
  mediaContents: MessageMediaContent[];
  receiver: User;
  sender: User;
}

export interface CreateMessageRequest {
  relationshipId: string;
  content: string;
  replyToId: string;
  files: File | null;
}
