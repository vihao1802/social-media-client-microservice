import { Visibility } from '@/types/enum';
import { User } from './user';

export interface PostBase {
  content: string;
  is_story: boolean;
  visibility: Visibility;
}

export interface Post extends PostBase {
  id: number;
  create_at: string;
  creator: User;
  postReactions: number;
}

export interface PostPagination {
  items: Post[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface PostRequest extends PostBase {
  creatorId: string;
}
