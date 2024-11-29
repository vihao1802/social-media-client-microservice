import { Post } from "./post";

export interface MediaContentBase {
    media_type: string;
    media_Url: string;
    postId: string;
}

export interface MediaContent extends MediaContentBase {
    id: string;
    post: Post;
}

