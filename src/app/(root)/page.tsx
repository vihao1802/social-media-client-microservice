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
  };

  const {
    data: dataResponse,
    isLoading,
    isValidating,
    setSize,
  } = usePostListInfinity({
    params: filters,
  });

  const postResponse = dataResponse
    ?.map((item) => item.data)
    .map(
      (item: {
        items: Array<Post>;
        page: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
      }) => {
        return {
          data: item?.items,
          pagination: {
            page: item.page,
            pageSize: item.pageSize,
            totalElements: item.totalItems,
            totalPages: item.totalPages,
          },
        };
      }
    );

  const postList: Array<Post> =
    postResponse?.reduce(
      (result: Array<Post>, currentPage: ListResponse<Post>) => {
        result.push(...currentPage.data);

        return result;
      },
      []
    ) || [];

  const totalElements = postResponse?.[0]?.pagination.totalElements || 0;
  const showLoadMore = totalElements > postList.length;
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
          .sort(
            (a: Post, b: Post) =>
              new Date(b.create_at).getTime() - new Date(a.create_at).getTime()
          )
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
