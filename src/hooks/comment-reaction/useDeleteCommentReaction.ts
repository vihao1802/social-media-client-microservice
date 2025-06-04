import { QueryKeys } from '@/constants/query-keys';
import { commentReactionApi } from '@/api/comment-reaction';
import { AxiosError } from 'axios';
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr';

export interface UseDeleteCommentReactionProps {
  commentReactionId: string;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useDeleteCommentReaction() {
  const { mutate } = useSWRConfig();

  async function DeleteCommentReaction(
    CommentReactionId: string,
    commentId: string
  ) {
    try {
      await commentReactionApi.deleteCommentReaction(CommentReactionId);

      // mutate work list if add successfully
      await mutate([QueryKeys.GET_COMMENT_REACTION, commentId]);
    } catch (error: AxiosError | any) {
      console.log('Failed to post court:', error);
    }
  }

  return DeleteCommentReaction;
}
