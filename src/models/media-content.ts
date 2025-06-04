import { Post } from './post';

export interface MediaContentBase {
  media_type: string;
}

export interface MediaContent extends MediaContentBase {
  id: string;
  post: Post;
  mediaUrl: string;
}
export interface MediaContentRequest extends MediaContentBase {
  postId: string;
  mediaFile: File;
}

export interface MediaContentPagination {
  items: MediaContent[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
