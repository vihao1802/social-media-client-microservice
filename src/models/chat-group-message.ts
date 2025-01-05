import { ChatGroup } from './chat-group';
import { User } from './user';

export interface ChatGroupMessage {
  id: number;
  content: string;
  media_content: string;
  groupChat: ChatGroup;
  sender: User;
  replyTo: null;
  sent_at: string;
  icons: any[];
}

export interface ChatGroupMessagePagination {
  items: ChatGroupMessage[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateChatGroupMessageRequest {
  Content: string;
  MediaContent: string;
  GroupId: string;
  ReplyToId: string;
  SenderId: string;
  MediaFile: File | null;
}
