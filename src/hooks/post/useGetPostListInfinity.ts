import axiosInstance from '@/api/axios-instance'
import { Post } from '@/models/post'
import { PaginationResponse, ListResponse } from '@/models/api'
import qs from 'qs'
import useSWRInfinite, { SWRInfiniteConfiguration } from 'swr/infinite'

export interface UseWorkListInfinityProps {
	params: Partial<PaginationResponse>
	options?: SWRInfiniteConfiguration
	enabled?: boolean
}

export function usePostListInfinity({ params, options, enabled = true }: UseWorkListInfinityProps) {
	const swrResponse = useSWRInfinite(
		(index: number, previousPageData: any) => {
			if (!enabled) return null

			// index starts at 0
			const page = index + 1
			const query: Partial<PaginationResponse> = {
                ...params,
				page: page,
				pageSize: 5,
			}

			// return null in case page > totalPages
			if (previousPageData) {
				const pageSize = previousPageData?.data.pageSize || 5
				const totalPages = previousPageData?.data.totalPages || 0
				if (pageSize > totalPages) return null
			}
	
			return `/post?${qs.stringify(query)}`
		},
		(url: string) => axiosInstance.get(url),
		{
			revalidateFirstPage: false,
			...options,
		}
	)

	return swrResponse
}