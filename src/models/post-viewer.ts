export interface PostViewerBase {
  postId: string;
  userId: string;
  liked: boolean;
}

export interface PostViewer extends PostViewerBase {
  id: string;
}

export interface PostViewerRequest extends PostViewerBase {}
