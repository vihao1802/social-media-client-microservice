import axiosInstance from '@/api/axios-instance';
import { CommentReactionRequest } from '@/models/comment-reaction';

const prefix = '/comment_reaction';

export const commentReactionApi = {
  async getCommentReaction(commentId: string) {
    const res = await axiosInstance.get(`${prefix}/${commentId}`);
    return res.data;
  },

  async createCommentReaction(request: CommentReactionRequest) {
    const res = await axiosInstance.post(`${prefix}`, request);
    return res.status === 201 ? res.data : null;
  },

  async deleteCommentReaction(request: CommentReactionRequest) {
    const res = await axiosInstance.delete(`${prefix}/comment/${request.commentId}/user/${request.userId}`);    
    return res.status === 200 ? res.data : null;
  },
};
