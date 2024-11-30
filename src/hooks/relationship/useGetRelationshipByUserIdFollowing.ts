import { relationshipApi } from "@/api/relationship";
import useSWR, { SWRConfiguration } from "swr";

interface useGetRelationshipByUserIdFollowingProps {
  options?: Partial<SWRConfiguration>;
  userId: string;
}

export const useGetRelationshipByUserIdFollowing = ({
  options,
  userId,
}: useGetRelationshipByUserIdFollowingProps) => {
  const swrResponse = useSWR(
    `get_by_user_id_following`,
    async () => await relationshipApi.getRelationshipByUserIdFollowing(userId),
    { ...options }
  );

  return swrResponse;
};
