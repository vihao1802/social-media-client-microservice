import { ChatMember } from './chat-member';
import { Message } from './message';
import { User } from './user';

export interface Chat {
  id: string;
  groupName: string;
  groupAvatar: string;
  isGroup: boolean;
  createdAt: string;
  chatMemberIds: string[];
  latestMessage: Message | null;
}

export interface ChatAndMember {
  id: string;
  groupName: string;
  groupAvatar: string;
  isGroup: boolean;
  createdAt: string;
  chatMembers: ChatMember[];
}

export interface ChatPagination {
  content: Chat[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
