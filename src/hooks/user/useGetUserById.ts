import { userApi } from "@/api/user";
import useSWR, { SWRConfiguration } from "swr";

interface useGetUserByIdProps {
  id: string;
  options?: Partial<SWRConfiguration>;
}

export const useGetUserById = ({ id, options }: useGetUserByIdProps) => {
  const swrResponse = useSWR(
    `get_user_by_id`,
    async () => await userApi.getUserById(id),
    { ...options }
  );

  return swrResponse;
};
