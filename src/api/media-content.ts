import axiosInstance from '@/api/axios-instance';
import { MediaContentPagination } from '@/models/media-content';
import { MediaContentRequest } from '@/models/media-content';

const prefix = '/post_media';

export const mediaContentApi = {
  async getMediaContentByPostId(postId: string) {
    const res = await axiosInstance.get(
      `${prefix}/${postId}`
    );
    return res.data;
  },

  async postMediaContent(mediaContentData: FormData) {
    const res = await axiosInstance.post(prefix, mediaContentData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  },
};
