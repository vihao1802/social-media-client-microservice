import { userApi } from '@/api/user';
import { UpdateUserRequest } from '@/models/user';
import useSWR from 'swr';

export function useUpdateUser() {
  const swrResponse = useSWR(['update_user'], {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: null,
  });

  async function updateUser(payload: UpdateUserRequest) {
    const res = await userApi.updateUser(payload);
    swrResponse.mutate({ revalidate: true });
    return res;
  }

  return { ...swrResponse, updateUser };
}
