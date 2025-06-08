export interface PostViewerBase {
  postId: string;
  userId: string;
  
}

export interface PostViewer extends PostViewerBase {
  id: string;
  createdAt?: string;
}

export interface PostViewerRequest extends PostViewerBase {}
