import axiosInstance from '@/api/axios-instance';
import { PostViewerRequest } from '@/models/post-viewer';

const prefix = '/post_viewer';

export const postViewerApi = {
  async getPostViewerByPostId(postId: string) {
    const res = await axiosInstance.get(`${prefix}/post/${postId}`, {
      // params: {
      //   page: 1,
      //   size: 100,
      // },
    });
    return res.data;
  },

  async createPostViewer(request: PostViewerRequest) {
    const res = await axiosInstance.post(prefix, request);
    return res.data;
  },

  async deletePostViewer(request: PostViewerRequest) {
    const res = await axiosInstance.delete(`${prefix}/post/${request.postId}/user/${request.userId}`);
    return res.data;
  },
};
