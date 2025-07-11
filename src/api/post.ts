import axiosInstance from '@/api/axios-instance';
import { PostPagination } from '@/models/post';
import { PostRequest } from '@/models/post';

const prefix = '/posts';

export const postApi = {
  async getFriendStories() {
    const res = await axiosInstance.get(`${prefix}/stories`);
    return res.data;
  },

  async createPost(postRequest: FormData) {
    const res = await axiosInstance.post(prefix, postRequest, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },

  async updatePost(postId: string, postRequest: Partial<PostRequest>) {
    const res = await axiosInstance.patch(`${prefix}/${postId}`, postRequest);
    return res.data;
  },
  async getPostsByUserId(userId: string) {
    const res = await axiosInstance.get<PostPagination>(
      `${prefix}/user/${userId}`
    );
    return res.data;
  },
};
