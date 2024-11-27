import axiosInstance from "@/api/axios-instance";

const prefix = "/mediaContent";

export const mediaContentApi = {
    async getMediaContentByPostId(postId: number) {
        const res = await axiosInstance.get(`${prefix}/post/${postId}`);
        return res.data;
    }
}