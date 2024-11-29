import { QueryKeys } from '@/constants/query-keys';
import { postViewerApi } from '@/api/post-viewer'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr'
import { PostViewerRequest } from '@/models/post-viewer';

export interface UseCreatePostViewerProps {
    request: PostViewerRequest,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function useCreatePostViewer() {
	const { mutate } = useSWRConfig()

	async function CreatePostViewer(request: PostViewerRequest) {
		try {
			const newPostViewer = await postViewerApi.createPostViewer(request);

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_POST_VIEWER),
				undefined,
				{ revalidate: true }
			);

			return newPostViewer
		} catch (error: AxiosError | any) {
			console.log('Failed to post court:', error);
		}
	}

	return CreatePostViewer
}