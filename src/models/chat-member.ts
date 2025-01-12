import { Chat } from './chat';
import { User } from './user';

export interface ChatMember {
  id: string;
  chatId: string;
  userId: string;
  isAdmin: boolean;
  joinedAt: string;
  user: User;
}

export interface ChatMemberPagination {
  items: ChatMember[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
