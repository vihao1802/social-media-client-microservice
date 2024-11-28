import axiosInstance from "@/api/axios-instance";

const prefix = "/postViewer";

export const postViewerApi = {
    async getPostViewerByPostId(postId: number) {
        const res = await axiosInstance.get(`${prefix}/${postId}`);
        return res.data;
    }
}