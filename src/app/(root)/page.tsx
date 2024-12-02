"use client";

import { Box } from "@mui/material";

import RightSideBar from "@/components/shared/RightSideBar";
import React, { useState } from "react";
import StoryBar from "@/components/shared/StoryBar";
import PostComponent from "@/components/post/Post";
import { Post } from "@/models/post";
import { ListResponse, Pagination } from "@/models/api";
import { usePostListInfinity } from "@/hooks/post/useGetPostListInfinity";
import GradientCircularProgress from "@/components/shared/Loader";
import { useInView } from "react-intersection-observer";
import { PostContext } from "@/context/post-context";

export default function Home() {
  const filters: Partial<Pagination> = {
    page: 1,
    pageSize: 5,
    sort: "-id",
  };

  const { data, isLoading, isValidating, setSize } = usePostListInfinity({
    params: filters,
  });

  const postList: Array<Post> =
    data?.reduce((result: Array<Post>, currentPage: ListResponse<Post>) => {
      result.push(...currentPage.items);

      return result;
    }, []) || [];

  const showLoadMore = (data?.[0]?.totalItems ?? 0) > postList.length;
  const loadingMore = isValidating && postList.length > 0;

  const { ref } = useInView({
    onChange(inView) {
      if (inView) setSize((x) => x + 1);
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        margin: "0 auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: "20px",
        }}
      >
        <StoryBar />

        {postList
          .filter((post) => post.is_story === false)
          .map((post: Post, index: number) => (
            <PostContext.Provider
              key={index}
              value={{
                post: post || null,
              }}
            >
              <PostComponent key={index} />
            </PostContext.Provider>
          ))}

        {showLoadMore && (
          <Box
            ref={ref}
            sx={{
              display: "flex",
              justifyContent: "center",
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
