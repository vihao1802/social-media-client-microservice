import { relationshipApi } from "@/api/relationship";
import useSWR, { SWRConfiguration } from "swr";

interface useGetFollowerQuantityProps {
  options?: Partial<SWRConfiguration>;
  userId: string;
}

export const useGetFollowerQuantity = ({
  options,
  userId,
}: useGetFollowerQuantityProps) => {
  const swrResponse = useSWR(
    `get_follower_quantity`,
    async () => await relationshipApi.getFollowerQuantity(userId),
    { ...options }
  );

  return swrResponse;
};
