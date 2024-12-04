import { QueryKeys } from '@/constants/query-keys';
import { postViewerApi } from '@/api/post-viewer'
import { AxiosError } from 'axios'
import { Arguments, useSWRConfig, SWRConfiguration } from 'swr'

export interface UseDeletePostViewerProps {
    postViewerId: number,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function useDeletePostViewer() {
	const { mutate } = useSWRConfig()

	async function DeletePostViewer(postViewerId: number, postId: number) {
		try {
			await postViewerApi.deletePostViewer(postViewerId);
			await mutate([QueryKeys.GET_POST_VIEWER, postId]);
		} catch (error: AxiosError | any) {
			console.log('Failed to post court:', error);
		}
	}

	return DeletePostViewer
}