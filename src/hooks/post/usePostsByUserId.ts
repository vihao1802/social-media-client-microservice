import { postApi } from '@/api/post';
import useSWR, { SWRConfiguration } from 'swr';

interface usePostsByUserIdProps {
  userId: string;
  options?: Partial<SWRConfiguration>;
}

export const usePostsByUserId = ({
  options,
  userId,
}: usePostsByUserIdProps) => {
  const swrResponse = useSWR(
    `get_posts_by_user_id`,
    async () => await postApi.getPostsByUserId(userId),
    { ...options }
  );

  return swrResponse;
};
