import { relationshipApi } from '@/api/relationship';
import useSWR, { SWRConfiguration } from 'swr';

interface useGetRelationshipMeFollowingProps {
  options?: Partial<SWRConfiguration>;
}

export const useGetRelationshipMeFollowing = ({
  options,
}: useGetRelationshipMeFollowingProps) => {
  const swrResponse = useSWR(
    `get_me_following`,
    async () => await relationshipApi.getRelationshipMeFollowing(),
    { ...options }
  );

  return swrResponse;
};
