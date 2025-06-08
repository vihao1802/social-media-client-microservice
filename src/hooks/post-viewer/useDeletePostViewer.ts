import { QueryKeys } from '@/constants/query-keys';
import { postViewerApi } from '@/api/post-viewer';
import { AxiosError } from 'axios';
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr';
import { PostViewerRequest } from '@/models/post-viewer';

export interface UseDeletePostViewerProps {
  postViewerId: string;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useDeletePostViewer() {
  async function DeletePostViewer(request: PostViewerRequest ) {
    try {
      await postViewerApi.deletePostViewer(request);
    } catch (error: AxiosError | any) {
      console.log('Failed to post viewer:', error);
    }
  }

  return DeletePostViewer;
}
