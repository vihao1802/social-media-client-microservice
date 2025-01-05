import { chatGroupApi } from '@/api/chat-group';
import useSWR, { SWRConfiguration } from 'swr';

interface useGetRelationshipMeFollowerProps {
  options?: Partial<SWRConfiguration>;
  enabled?: boolean;
}

export const useGetGroupChatByMe = ({
  options,
  enabled = true,
}: useGetRelationshipMeFollowerProps) => {
  const swrResponse = useSWR(
    enabled ? `get_group_chat_by_me` : null,
    async () => await chatGroupApi.getGroupChatByMe(),
    { ...options }
  );

  return swrResponse;
};
