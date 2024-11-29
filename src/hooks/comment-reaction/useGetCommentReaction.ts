import { QueryKeys } from '@/constants/query-keys';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';
import { commentReactionApi } from '@/api/comment-reaction';

export interface UseGetCommentReactionProps {
    commentId: number,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function useGetCommentReaction({commentId, options, enabled = true}: UseGetCommentReactionProps) {
    const swrResponse = useSWR(
        enabled ? [QueryKeys.GET_COMMENT_LIST, commentId] : null,
        () => commentReactionApi.getCommentReaction(commentId),
        {
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			fallbackData: null,
			...options,
		}
    )

    return swrResponse;
}