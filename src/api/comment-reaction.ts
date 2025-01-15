import axiosInstance from '@/api/axios-instance';
import { CommentReactionRequest } from '@/models/comment-reaction';

const prefix = '/commentReaction';

export const commentReactionApi = {
  async getCommentReaction(commentId: number) {
    const res = await axiosInstance.get(`${prefix}/${commentId}`);
    return res.data;
  },

  async createCommentReaction(request: CommentReactionRequest) {
    const res = await axiosInstance.post(`${prefix}`, request);
    return res.data;
  },

  async deleteCommentReaction(commentReactionId: number) {
    const res = await axiosInstance.delete(`${prefix}/${commentReactionId}`);
    return res.data;
  },
};
