import { relationshipApi } from '@/api/relationship';
import useSWR, { SWRConfiguration } from 'swr';

interface useGetRelationshipByUserIdFollowerProps {
  options?: Partial<SWRConfiguration>;
  userId: string;
}

export const useGetRelationshipByUserIdFollower = ({
  options,
  userId,
}: useGetRelationshipByUserIdFollowerProps) => {
  const swrResponse = useSWR(
    `get_by_user_id_follower`,
    async () => await relationshipApi.getRelationshipByUserIdFollower(userId),
    { ...options }
  );

  return swrResponse;
};
