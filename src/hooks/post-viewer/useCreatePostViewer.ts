import { QueryKeys } from '@/constants/query-keys';
import { postViewerApi } from '@/api/post-viewer';
import { AxiosError } from 'axios';
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr';
import { PostViewerRequest } from '@/models/post-viewer';
import { ListResponse } from '@/models/api';
import { Post } from '@/models/post';

export interface UseCreatePostViewerProps {
  request: PostViewerRequest;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useCreatePostViewer() {  
  async function CreatePostViewer(request: PostViewerRequest) {
    try {
      const newPostViewer = await postViewerApi.createPostViewer(request);
      return newPostViewer;
    } catch (error: AxiosError | any) {
      console.log('Failed to post viewer:', error);
    }
  }

  return CreatePostViewer;
}
