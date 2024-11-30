import axiosInstance from "@/api/axios-instance";
import { PostViewerRequest } from "@/models/post-viewer";

const prefix = "/postViewer";

export const postViewerApi = {
    async getPostViewerByPostId(postId: number) {
        const res = await axiosInstance.get(`${prefix}/${postId}`);
        return res.data;
    },

    async createPostViewer(request: PostViewerRequest) {
        const res = await axiosInstance.post(prefix, request);
        return res.data;
    },

    async deletePostViewer(postViewerId: number) {
        const res = await axiosInstance.delete(`${prefix}/${postViewerId}`);
        return res.data;
    }
}