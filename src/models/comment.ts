import { Post } from "./post";
import { User } from "./user";

export interface CommentBase {
    content: string;
    content_gif: string;
    createdAt: string;
}

export interface Comment extends CommentBase {
    id: string;
    user: User;
    post: Post;
    parentComment: Comment;
}