import { commentApi } from '@/api/comment';
import { QueryKeys } from '@/constants/query-keys';
import { AxiosError } from 'axios';
import { Arguments, mutate } from 'swr';

export function usePostComment() {
  async function PostComment(commentData: FormData) {
    try {
      const newComment = await commentApi.createComment(commentData);

      // mutate work list if add successfully
      // mutate(
			// 	(key: Arguments) =>
			// 	Array.isArray(key) && key.includes(QueryKeys.GET_COMMENT_LIST),
			// 	undefined,
			// 	{ revalidate: true }
			// );
      await mutate(['get_comment_by_post_id', commentData.get('postId')]);

      return newComment;
    } catch (error: AxiosError | any) {
      console.log('Failed to post court:', error);
    }
  }

  return PostComment;
}
