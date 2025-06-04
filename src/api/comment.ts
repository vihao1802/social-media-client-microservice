import axiosInstance from '@/api/axios-instance';

const prefix = '/comments';

export const commentApi = {
  async getCommentByPostId(postId: string) {
    const res = await axiosInstance.get(`${prefix}/post/${postId}`, {
      params: {
        page: 1,
        size: 100,
      },
    });
    return res.data;
  },

  async getCommentReplies(commentId: string) {    
    const res = await axiosInstance.get(`${prefix}/${commentId}/replies`, {
      params: {
        page: 1,
        size: 100,
      },
    });
    console.log('replies res:', res.data);
    
    return res.data;
  },

  async createComment(commentData: FormData) {
    const res = await axiosInstance.post(`${prefix}`, commentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  },
};
