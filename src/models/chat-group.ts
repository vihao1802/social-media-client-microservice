import { User } from './user';

export interface ChatGroup {
  id: number;
  name: string;
  avatar: string;
  sent_at: string;
  adminId: string;
  latest_message_content: string;
  latest_message_sender: User | null;
}

export interface ChatGroupPagination {
  items: ChatGroup[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
