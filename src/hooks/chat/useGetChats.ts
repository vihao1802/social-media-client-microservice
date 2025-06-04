import { chatApi } from '@/api/chat';
import useSWR from 'swr';

export const useGetChats = (userId: string) => {
  const swrKey = 'get_chats_by_user_id';
  const swrResponse = useSWR(
    swrKey,
    async () => await chatApi.getAllChatByUserId(userId)
  );

  return {
    ...swrResponse,
    mutateChats: swrResponse.mutate,
    swrKey,
  };
};
