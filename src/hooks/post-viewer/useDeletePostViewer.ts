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

	async function DeletePostViewer(postViewerId: number) {
		try {
			const deletePostViewer = await postViewerApi.deletePostViewer(postViewerId);

			// mutate work list if add successfully
			mutate(
				(key: Arguments) =>
				Array.isArray(key) && key.includes(QueryKeys.GET_POST_VIEWER),
				undefined,
				{ revalidate: true }
			);

			return deletePostViewer
		} catch (error: AxiosError | any) {
			console.log('Failed to post court:', error);
		}
	}

	return DeletePostViewer
}