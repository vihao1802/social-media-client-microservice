import { commentApi } from '@/api/comment'
import { QueryKeys } from '@/constants/query-keys'
import { CommentRequest } from '@/models/comment'
import { AxiosError } from 'axios'
import { comment } from 'postcss'
import { Arguments, useSWRConfig } from 'swr'

export function usePostComment() {
	const { mutate } = useSWRConfig()

	async function PostComment(commentData: FormData) {
		try {
			const newComment = await commentApi.createComment(commentData)

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_COMMENT_LIST),
				undefined,
				{ revalidate: true }
			);

			return newComment
		} catch (error: AxiosError | any) {
			console.log('Failed to post court:', error);
		}
	}

	return PostComment
}