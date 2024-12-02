import axiosInstance from "@/api/axios-instance";
import { MediaContentPagination } from "@/models/media-content";

const prefix = "/mediaContent";

export const mediaContentApi = {
  async getMediaContentByPostId(postId: number) {
    const res = await axiosInstance.get<MediaContentPagination>(
      `${prefix}/post/${postId}`
    );
    return res.data;
  },
};
