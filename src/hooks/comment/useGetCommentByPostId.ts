import { QueryKeys } from '@/constants/query-keys';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';
import { commentApi } from '@/api/comment';

export interface UseGetCommentByPostIdProps {
    postId: number,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function useGetCommentByPostId({postId, options, enabled = true}: UseGetCommentByPostIdProps) {
    const swrResponse = useSWR(
        enabled ? [QueryKeys.GET_COMMENT_LIST, postId] : null,
        () => commentApi.getCommentByPostId(postId),
        {
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			fallbackData: null,
			...options,
		}
    )

    return swrResponse;
}