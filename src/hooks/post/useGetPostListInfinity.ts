import axiosInstance from '@/api/axios-instance'
import { Post } from '@/models/post'
import { Pagination, ListResponse } from '@/models/api'
import qs from 'qs'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

export interface UsePostListInfinityProps {
	params: Partial<Pagination>
	options?: SWRInfiniteConfiguration
	enabled?: boolean
}

export function usePostListInfinity({ params, options, enabled = true }: UsePostListInfinityProps) {
	const swrResponse = useSWRInfinite<ListResponse<Post>>(
		(index: number, previousPageData: any) => {
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
				const totalPages = previousPageData?.totalPages || 0
				if (page > totalPages) return null
			}
			
			return `/post?${qs.stringify(query)}`
		},
		async(url: string) => {
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