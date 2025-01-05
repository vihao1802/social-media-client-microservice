import { QueryKeys } from '@/constants/query-keys';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';
import { postViewerApi } from '@/api/post-viewer';

export interface UseGetPostViewerByPostIdProps {
  postId: number;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useGetPostViewerByPostId({
  postId,
  options,
  enabled = true,
}: UseGetPostViewerByPostIdProps) {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_POST_VIEWER, postId] : null,
    () => postViewerApi.getPostViewerByPostId(postId),
    {
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );

  return swrResponse;
}
