import axiosInstance from '@/api/axios-instance'
import { ListResponse, Pagination } from '@/models/api'
import { MediaContent } from '@/models/media-content'
import qs from 'qs'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

export interface UseMediaListListInfinityProps {
	params: Partial<Pagination>
	options?: SWRInfiniteConfiguration
	enabled?: boolean
}

export function useGetMediaContentInfinity({ params, options, enabled = true }: UseMediaListListInfinityProps) {
	const swrResponse = useSWRInfinite<ListResponse<MediaContent>>(
		(index: number, previousPageData: ListResponse<MediaContent>) => {
			if (!enabled) return null
            						
			// index starts at 0
			const page = index + 1
			const query: Partial<Pagination> = {
				...params,
				page: page,
				pageSize: 5,
			}

			// return null in case page > totalPages
			if (previousPageData) {
				const totalPages = previousPageData?.totalPages|| 0
				if (page > totalPages) return null
			}
            
            
			return `/mediaContent?${qs.stringify(query, { encode: false })}`
		},
		async (url: string) => {
			const response = await axiosInstance.get(url)
			return response.data
		},
		{
			revalidateFirstPage: false,
			...options,
		}
	)

	return swrResponse
}