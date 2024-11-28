import axiosInstance from "@/api/axios-instance";

const prefix = "/comment";

export const commentApi = {
    async getCommentByPostId(postId: number) {
        const res = await axiosInstance.get(`${prefix}/post/${postId}`);
        return res.data;
    }
}