import { userApi } from '@/api/user';
import useSWR, { SWRConfiguration } from 'swr';

interface useGetAllUserProps {
  options?: Partial<SWRConfiguration>;
}

export const useGetAllUser = ({ options }: useGetAllUserProps) => {
  const swrResponse = useSWR(
    `get_all_user`,
    async () => await userApi.getAllUsers(),
    { ...options }
  );

  return swrResponse;
};
