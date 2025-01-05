import { chatGroupApi } from '@/api/chat-group';
import useSWR, { SWRConfiguration } from 'swr';

interface UseGetGroupChatByIdProps {
  options?: Partial<SWRConfiguration>;
  groupId: string;
}

export const useGetGroupChatById = ({
  groupId,
  options,
}: UseGetGroupChatByIdProps) => {
  const swrResponse = useSWR(
    'get_group_chat_by_id',
    async () => await chatGroupApi.getGroupChatById(groupId),
    { ...options }
  );

  return swrResponse;
};
