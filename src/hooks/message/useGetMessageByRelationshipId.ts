import { messageApi } from '@/api/message';
import useSWR, { SWRConfiguration } from 'swr';

interface useGetRelationshipMeFollowerProps {
  relationshipId: string;
  options?: Partial<SWRConfiguration>;
}

export const useGetMessageByRelationshipId = ({
  options,
  relationshipId,
}: useGetRelationshipMeFollowerProps) => {
  const swrResponse = useSWR(
    `get_message_by_relationship_id`,
    async () => await messageApi.getMessageByRelationshipId(relationshipId),
    { ...options }
  );

  return swrResponse;
};
