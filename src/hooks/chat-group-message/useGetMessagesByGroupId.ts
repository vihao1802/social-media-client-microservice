import { chatGroupMessageApi } from '@/api/chat-group-message';
import useSWR, { SWRConfiguration } from 'swr';

interface useGetRelationshipMeFollowerProps {
  options?: Partial<SWRConfiguration>;
  groupId: string;
}

export const useGetMessagesByGroupId = ({
  options,
  groupId,
}: useGetRelationshipMeFollowerProps) => {
  const swrResponse = useSWR(
    `get_messages_by_group_id`,
    async () => await chatGroupMessageApi.getMessagesByGroupId(groupId),
    { ...options }
  );

  return swrResponse;
};
