import { QueryKeys } from '@/constants/query-keys';
import { commentReactionApi } from '@/api/comment-reaction';
import { AxiosError } from 'axios';
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr';
import { CommentReactionRequest } from '@/models/comment-reaction';

export interface UsePostCommentReactionProps {
  request: CommentReactionRequest;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function usePostCommentReaction() {
  const { mutate } = useSWRConfig();

  async function PostCommentReaction(request: CommentReactionRequest) {
    try {
      const newCommentReaction =
        await commentReactionApi.createCommentReaction(request);
      await mutate([QueryKeys.GET_COMMENT_REACTION, request.commentId]);
      return newCommentReaction;
    } catch (error: AxiosError | any) {
      console.log('Failed to post comment reaction:', error);
    }
  }

  return PostCommentReaction;
}
