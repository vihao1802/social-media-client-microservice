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

export interface MediaContentPagination {
  items: MediaContent[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
