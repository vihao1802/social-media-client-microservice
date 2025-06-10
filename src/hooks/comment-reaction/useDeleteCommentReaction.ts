import { QueryKeys } from '@/constants/query-keys';
import { commentReactionApi } from '@/api/comment-reaction';
import { AxiosError } from 'axios';
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr';
import { CommentReactionRequest } from '@/models/comment-reaction';
import { ListResponse } from '@/models/api';
import { Comment } from '@/models/comment';

export interface UseDeleteCommentReactionProps {
  commentReactionId: string;
  options?: SWRConfiguration;
  enabled?: boolean;
}

export function useDeleteCommentReaction() {
  const { mutate } = useSWRConfig();

  async function DeleteCommentReaction(request: CommentReactionRequest) {
    try {
      const res = await commentReactionApi.deleteCommentReaction(request);

      // mutate work list if add successfully
      await mutate(
        (key: Arguments) =>
          Array.isArray(key) &&
          (key.includes('get_comment_by_post_id') ||
            key.includes('get_comment_replies')),
        ((cacheData: ListResponse<Comment> | undefined) => {
          if (!cacheData || !res) return cacheData;
          return {
            ...cacheData,
            items: cacheData.items.map((comment: Comment) => {
                      if (comment.id === res.commentId) {
                        return {
                          ...comment,
                          liked: false,
                          likeCount: comment.likeCount - 1,
                        };
                      }
                      return comment;
                    }),
                  };
                }),
        { revalidate: false }
      );
    } catch (error: AxiosError | any) {
      console.log('Failed to delete comment reaction:', error);
    }
  }

  return DeleteCommentReaction;
}
