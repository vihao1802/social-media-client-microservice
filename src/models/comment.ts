import { Post } from './post';
import { User } from './user';

export interface CommentBase {
  content?: string;
}

export interface Comment extends CommentBase {
  id: string;
  user: Partial<User>;
  mediaUrl?: string;
  createdAt: string;
  liked: boolean;
  likeCount: number;
  childCount: number;
  replyTo: string;
}

export interface CommentRequest extends CommentBase {
  postId: string;
  userId: string;
}

export interface GroupComment {
  mainComment: Comment;
  subComments: Comment[];
}
