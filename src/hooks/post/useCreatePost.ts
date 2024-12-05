import { postApi } from "@/api/post";
import { PostRequest } from "@/models/post";
import { AxiosError } from "axios";
import { mutate } from "swr";

export function useCreatePost() {
  async function CreatePost(postRequest: PostRequest) {
    try {
      const newPost = await postApi.createPost(postRequest);
      mutate("get_posts_by_user_id");
      return newPost;
    } catch (error: AxiosError | any) {
      console.log("Failed to create Post:", error);
    }
  }

  return CreatePost;
}
