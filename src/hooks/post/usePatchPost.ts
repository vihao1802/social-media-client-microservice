import { postApi } from '@/api/post'
import { QueryKeys } from '@/constants/query-keys';
import { PostRequest } from '@/models/post'
import { AxiosError } from 'axios'
import { Arguments, mutate } from 'swr';

export function usePatchPost() {
	async function PatchPost(postId: number, postRequest: Partial<PostRequest>) {
		try {
			const newPost = await postApi.updatePost(postId, postRequest)
            
            mutate(
                (key: Arguments) =>
                  Array.isArray(key) && key.includes(QueryKeys.GET_POST_LIST),
                undefined,
                { revalidate: true }
              );
              
			return newPost
		} catch (error: AxiosError | any) {
			console.log('Failed to update Post:', error);
		}
	}

	return PatchPost
}