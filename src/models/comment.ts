import { Post } from "./post";
import { User } from "./user";

export interface CommentBase {
    content: string;
}

export interface Comment extends CommentBase {
    id: number;
    user: User;
    post: Post;
    content_gif: string;
    createdAt: string;
    parentComment: Comment;
}

export interface CommentRequest extends CommentBase {
    postId: number;
    userId: number;
}

export interface GroupComment {
    mainComment: Comment;
    subComments: Comment[];
}