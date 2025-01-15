import { QueryKeys } from '@/constants/query-keys';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';
import { postApi } from '@/api/post';

export interface UseGetFriendStoriesProps {
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useGetFriendStories({
  options,
  enabled = true,
}: UseGetFriendStoriesProps) {
  const swrResponse = useSWR(
    enabled ? [QueryKeys.GET_POST_LIST] : null,
    () => postApi.getFriendStories(),
    {
      dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      fallbackData: null,
      ...options,
    }
  );

  return swrResponse;
}
