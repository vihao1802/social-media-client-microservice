import { chatApi } from '@/api/chat';
import useSWR from 'swr';

export const useGetChats = (userId: string) => {
  const swrResponse = useSWR(
    'get_chats_by_user_id',
    async () => await chatApi.getAllChatByUserId(userId)
  );

  return swrResponse;
};
