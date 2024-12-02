import { postApi } from '@/api/post'
import { PostRequest } from '@/models/post'
import { AxiosError } from 'axios'

export function useCreatePost() {
	async function CreatePost(postRequest: PostRequest) {
		try {
			const newPost = await postApi.createPost(postRequest)
			return newPost
		} catch (error: AxiosError | any) {
			console.log('Failed to create Post:', error);
		}
	}

	return CreatePost
}