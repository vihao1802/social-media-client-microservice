export interface PostViewerBase {
    postId: number;
    userId: string;
    liked: boolean;
}

export interface PostViewer extends PostViewerBase {
    id: number
}

export interface PostViewerRequest extends PostViewerBase {}