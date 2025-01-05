import { relationshipApi } from '@/api/relationship';
import { FollowUserRequest } from '@/models/relationship';
import useSWR, { mutate } from 'swr';

export function usePostFollowUser() {
  const swrResponse = useSWR(['post_follow_user'], {
    dedupingInterval: 30 * 1000, // 30s
    keepPreviousData: true,
    fallbackData: null,
  });

  async function followUser(payload: FollowUserRequest) {
    const res = await relationshipApi.followUser(payload.user_id);
    // Re-fetch the data for "get_user_by_id" after the message is created
    await mutate('get_user_by_id');
    await mutate('get_me_following');
    await mutate('get_me_follower');
    await mutate('get_recommendation');
    return res;
  }

  return { ...swrResponse, followUser };
}
