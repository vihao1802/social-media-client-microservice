import { relationshipApi } from '@/api/relationship';
import useSWR, { SWRConfiguration } from 'swr';

interface useGetRecommendationProps {
  options?: Partial<SWRConfiguration>;
}

export const useGetRecommendation = ({
  options,
}: useGetRecommendationProps) => {
  const swrResponse = useSWR(
    'get_recommendation',
    async () => await relationshipApi.getRecommendation(),
    { ...options }
  );

  return swrResponse;
};
