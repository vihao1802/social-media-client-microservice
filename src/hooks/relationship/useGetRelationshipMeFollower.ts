import { relationshipApi } from "@/api/relationship";
import useSWR, { SWRConfiguration } from "swr";

interface useGetRelationshipMeFollowerProps {
  options?: Partial<SWRConfiguration>;
}

export const useGetRelationshipMeFollower = ({
  options,
}: useGetRelationshipMeFollowerProps) => {
  const swrResponse = useSWR(
    `get_me_follower`,
    async () => await relationshipApi.getRelationshipMeFollower(),
    { ...options }
  );

  return swrResponse;
};
