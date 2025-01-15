import useSWR from 'swr';
import { chatApi } from '@/api/chat';

export const useGetChatById = (chatId: string) => {
  const swrResponse = useSWR(
    'get_chat_by_id',
    async () => await chatApi.getChatById(chatId)
  );
  return swrResponse;
};
