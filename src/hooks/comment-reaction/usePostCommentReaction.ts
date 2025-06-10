import { QueryKeys } from '@/constants/query-keys';
import { commentReactionApi } from '@/api/comment-reaction';
import { AxiosError } from 'axios';
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr';
import { CommentReactionRequest } from '@/models/comment-reaction';
import { ListResponse } from '@/models/api';
import { Comment } from '@/models/comment';

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
      await mutate(
        (key: Arguments) =>
          Array.isArray(key) &&
          (key.includes('get_comment_by_post_id') ||
            key.includes('get_comment_replies')),
        ((cacheData: ListResponse<Comment> | undefined) => {
          if (!cacheData || !newCommentReaction) return cacheData;
          return {
            ...cacheData,
            items: cacheData.items.map((comment: Comment) => {
              if (comment.id === newCommentReaction.commentId) {
                return {
                  ...comment,
                  liked: !comment.liked,
                  likeCount: comment.likeCount + (comment.liked ? -1 : 1),
                };
              }
              return comment;
            }),
          };
        }),
        { revalidate: false }
      );
      return newCommentReaction;
    } catch (error: AxiosError | any) {
      console.log('Failed to post comment reaction:', error);
    }
  }

  return PostCommentReaction;
}
