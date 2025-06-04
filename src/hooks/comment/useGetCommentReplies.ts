import { QueryKeys } from '@/constants/query-keys';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';
import { commentApi } from '@/api/comment';

export interface UseGetCommentRepliesProps {
  commentId: string;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useGetCommentReplies({
  commentId,
  options,
  enabled = true,
}: UseGetCommentRepliesProps) {
  const swrResponse = useSWR(
    enabled ? ['get_comment_replies', commentId] : null,
    async () => await commentApi.getCommentReplies(commentId),
    {
      // dedupingInterval: 30 * 1000, // 30s
      keepPreviousData: true,
      // fallbackData: null,
      ...options,
    }
  );

  return swrResponse;
}
