import { Post } from "./post";

export interface MediaContentBase {
    media_type: string;
    media_Url: string;
}

export interface MediaContent extends MediaContentBase {
    id: string;
    postId: string;
    post: Post;
}