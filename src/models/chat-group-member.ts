import { ChatGroup } from './chat-group';
import { User } from './user';

export interface ChatGroupMember {
  id: number;
  group: ChatGroup;
  user: User;
  join_at: string;
}

export interface ChatGroupMemberPagination {
  items: ChatGroupMember[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
