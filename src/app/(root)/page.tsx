'use client';

import { Box, Skeleton } from '@mui/material';

import RightSideBar from '@/components/shared/RightSideBar';
import React, { useState } from 'react';
import StoryBar from '@/components/shared/StoryBar';
import PostComponent from '@/components/post/Post';
import { Post } from '@/models/post';
import { ListResponse, Pagination } from '@/models/api';
import { usePostListInfinity } from '@/hooks/post/useGetPostListInfinity';
import GradientCircularProgress from '@/components/shared/Loader';
import { useInView } from 'react-intersection-observer';
import { PostContext } from '@/context/post-context';

export default function Home() {
  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        setSize((x) => x + 1);
      }
    },
  });
  const filters: Partial<Pagination> = {
    page: 1,
    size: 5,
  };

  const { data, isLoading, isValidating, setSize } = usePostListInfinity({
    params: filters,
  });

  if (!data || isLoading) return <GradientCircularProgress />;

  // Flatten the data to get a single list of posts
  const postList: Array<Post> = data?.flatMap((page) => page?.items) || [];

  const showLoadMore = (data?.[0]?.total ?? 0) > postList.length;
  const loadingMore = isValidating && postList.length > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        margin: '0 auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '10px',
          gap: '20px',
          minWidth: '600px',
        }}
      >
        {/* <StoryBar /> */}

        {postList
          .filter((post: Post) => post?.isStory === false)
          .map((post: Post, index: number) => {
            return (
              <PostContext.Provider
                key={index}
                value={{
                  post: post || null,
                }}
              >
                <PostComponent key={index} />
              </PostContext.Provider>
            );
          })}

        {showLoadMore && (
          <Box
            ref={ref}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {loadingMore && <GradientCircularProgress />}
          </Box>
        )}
      </Box>

      <RightSideBar />
    </Box>
  );
}
