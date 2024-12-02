import axiosInstance from "@/api/axios-instance";
import { MediaContentRequest } from "@/models/media-content";

const prefix = "/mediaContent";

export const mediaContentApi = {
    async getMediaContentByPostId(postId: number) {
        const res = await axiosInstance.get(`${prefix}/post/${postId}`);
        return res.data;
    },

    async postMediaContent(mediaContentData: FormData) {
        const res = await axiosInstance.post(prefix, mediaContentData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    }
}