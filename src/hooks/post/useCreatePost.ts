import { postApi } from '@/api/post';
import { PostRequest } from '@/models/post';
import { AxiosError } from 'axios';
import { mutate } from 'swr';

export function useCreatePost() {
  async function CreatePost(postRequest: FormData) {
    try {
      const newPost = await postApi.createPost(postRequest);
      return newPost;
    } catch (error: AxiosError | any) {
      console.log('Failed to create Post:', error);
    }
  }

  return CreatePost;
}
