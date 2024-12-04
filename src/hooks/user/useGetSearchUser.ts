import { userApi } from '@/api/user';
import { QueryKeys } from '@/constants/query-keys';
import useSWR from 'swr';
import { SWRConfiguration } from 'swr';

export interface UseGetSearchUserProps {
    query: string,
    options?:SWRConfiguration,
    enabled?: boolean
}

export function useGetSearchUser({query, options, enabled = true}: UseGetSearchUserProps) {
    const swrResponse = useSWR(
        enabled ? ['get_search_user', query] : null,
        () => userApi.getSearchUser(query),
        {
			dedupingInterval: 30 * 1000, // 30s
			keepPreviousData: true,
			fallbackData: null,
			...options,
		}
    )
    
    return swrResponse;
}