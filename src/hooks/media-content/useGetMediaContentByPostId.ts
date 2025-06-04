import { QueryKeys } from '@/constants/query-keys';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';
import { mediaContentApi } from '@/api/media-content';

export interface UseGetMediaContentByPostIdProps {
  postId: string;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useGetMediaContentByPostId({
  postId,
  options,
  enabled = true,
}: UseGetMediaContentByPostIdProps) {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_POST_LIST, postId] : null,
    () => mediaContentApi.getMediaContentByPostId(postId),
    {
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );

  return swrResponse;
}
