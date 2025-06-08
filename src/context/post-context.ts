import { ListResponse } from '@/models/api';
import { Post } from '@/models/post';
import { createContext } from 'react';
import { MutatorCallback } from 'swr';

export const PostContext = createContext<{
  post: Post | null,
  mutatePosts: (data?: ListResponse<Post>[] | MutatorCallback<any>, shouldRevalidate?: boolean) => Promise<any>
}>({
  post: null,
  mutatePosts: async () => Promise.resolve(),
});