import { QueryKeys } from '@/constants/query-keys';
import { commentReactionApi } from '@/api/comment-reaction'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr'
import { CommentReactionRequest } from '@/models/comment-reaction';

export interface UsePostCommentReactionProps {
    request: CommentReactionRequest,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function usePostCommentReaction() {
	const { mutate } = useSWRConfig()

	async function PostCommentReaction(request: CommentReactionRequest) {
		try {
			const newCommentReaction = await commentReactionApi.createCommentReaction(request);

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_COMMENT_LIST),
				undefined,
				{ revalidate: true }
			);

			return newCommentReaction
		} catch (error: AxiosError | any) {
			console.log('Failed to post comment reaction:', error);
		}
	}

	return PostCommentReaction
}