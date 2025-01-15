import { relationshipApi } from '@/api/relationship';
import useSWR, { SWRConfiguration } from 'swr';

interface UseGetPersonalMessengerProps {
  options?: Partial<SWRConfiguration>;
}

export const useGetPersonalMessenger = ({
  options,
}: UseGetPersonalMessengerProps) => {
  const swrResponse = useSWR(
    'get_personal_messenger',
    async () => await relationshipApi.getPersonalMessenger(),
    { ...options }
  );

  return swrResponse;
};
