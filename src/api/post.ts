import axiosInstance from "@/api/axios-instance";
import { PostPagination } from "@/models/post";
import { PostRequest } from "@/models/post";

const prefix = "/post";

export const postApi = {
  async getFriendStories() {
    const res = await axiosInstance.get(`${prefix}/stories`);
    return res.data;
    },

    async createPost(postRequest: PostRequest) {
        const res = await axiosInstance.post(`${prefix}`, postRequest);
        return res.data;
    },

    async updatePost(postId: number, postRequest: Partial<PostRequest>) {
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
