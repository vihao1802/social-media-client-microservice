import { relationshipApi } from '@/api/relationship';
import useSWR, { SWRConfiguration } from 'swr';

interface useGetFollowingQuantityProps {
  options?: Partial<SWRConfiguration>;
  userId: string;
}

export const useGetFollowingQuantity = ({
  options,
  userId,
}: useGetFollowingQuantityProps) => {
  const swrResponse = useSWR(
    `get_following_quantity`,
    async () => await relationshipApi.getFollowingQuantity(userId),
    { ...options }
  );

  return swrResponse;
};
