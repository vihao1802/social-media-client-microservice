import { Visibility } from '@/types/enum';
import { User } from './user';

export interface PostBase {
  content: string;
  isStory: boolean;
  visibility: Visibility;
}

export interface Post extends PostBase {
  id: string;
  create_at: string;
  creator: Partial<User>;
  postReactions: number;
  liked: boolean;
  likeCount: number;
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
