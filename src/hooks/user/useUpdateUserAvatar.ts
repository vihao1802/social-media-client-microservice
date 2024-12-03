import { userApi } from "@/api/user";
import useSWR, { mutate } from "swr";

export function useUpdateUserAvatar() {
  const swrResponse = useSWR(["update_user_avatar"], {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: null,
  });

  async function updateUserAvatar(payload: FormData) {
    const res = await userApi.updateUserAvatar(payload);
    await mutate("authenticated_user");
    return res;
  }

  return { ...swrResponse, updateUserAvatar };
}
