import { mediaContentApi } from '@/api/media-content';
import { AxiosError } from 'axios';

export function usePostMediaContent() {
  async function PostMediaContent(mediaContentData: FormData) {
    try {
      const newMediaContent =
        await mediaContentApi.postMediaContent(mediaContentData);
      return newMediaContent;
    } catch (error: AxiosError | any) {
      console.log('Failed to post media content:', error);
    }
  }

  return PostMediaContent;
}
