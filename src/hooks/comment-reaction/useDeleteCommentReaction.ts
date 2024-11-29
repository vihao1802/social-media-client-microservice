import { QueryKeys } from '@/constants/query-keys';
import { commentReactionApi } from '@/api/comment-reaction'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr'

export interface UseDeleteCommentReactionProps {
    commentReactionId: number,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function useDeleteCommentReaction() {
	const { mutate } = useSWRConfig()

	async function DeleteCommentReaction(CommentReactionId: number) {
		try {
			const deleteCommentReaction = await commentReactionApi.deleteCommentReaction(CommentReactionId);

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_COMMENT_LIST),
				undefined,
				{ revalidate: true }
			);

			return deleteCommentReaction
		} catch (error: AxiosError | any) {
			console.log('Failed to post court:', error);
		}
	}

	return DeleteCommentReaction
}