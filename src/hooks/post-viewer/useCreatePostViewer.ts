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
			const optimisticPostViewer = {
				id: 0, // Tạm thời tạo ID giả
				...request,
			  };

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_POST_VIEWER),
				(currentData: any) => ({
					...currentData,
					items: [...currentData.items, optimisticPostViewer],
				  }),
				{ revalidate: false, optimisticData: true }
			);
			const newPostViewer = await postViewerApi.createPostViewer(request);
			mutate(QueryKeys.GET_POST_VIEWER)
			return newPostViewer
		} catch (error: AxiosError | any) {
			console.log('Failed to post viewer:', error);
		}
	}

	return CreatePostViewer
}