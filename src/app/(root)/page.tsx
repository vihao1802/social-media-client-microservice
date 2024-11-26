"use client";

import { Box } from "@mui/material";

import RightSideBar from "@/components/shared/RightSideBar";
import React, { useState } from "react";
import StoryBar from "@/components/shared/StoryBar";
import PostComponent from "@/components/widgets/Post";
import { Post } from "@/models/post";
import { ListResponse, Pagination } from "@/models/api";
import { usePostListInfinity } from "@/hooks/post/useGetPostListInfinity";
import GradientCircularProgress from "@/components/shared/Loader";
import { useInView } from "react-intersection-observer";

const posts: any[] = [
  {
    id: 1,
    user: {
      id: 1,
      name: "User 1",
      nickname: "Nickname 1",
      followers: 423,
      avatar: "https://material-ui.com/static/images/avatar/3.jpg",
    },
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    likes: 123,
    comments: 12,
    shares: 3,
    description:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
  {
    id: 2,
    user: {
      id: 1,
      name: "User 1",
      nickname: "Nickname 1",
      followers: 423,
      avatar: "https://material-ui.com/static/images/avatar/3.jpg",
    },
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    likes: 123,
    comments: 12,
    shares: 3,
    description:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
  {
    id: 3,
    user: {
      id: 1,
      name: "User 1",
      nickname: "Nickname 1",
      followers: 423,
      avatar: "https://material-ui.com/static/images/avatar/3.jpg",
    },
    image: "https://material-ui.com/static/images/cards/paella.jpg",
    likes: 123,
    comments: 12,
    shares: 3,
    description:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
  },
];

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
          .sort(
            (a: Post, b: Post) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
          .map((post: Post, index: number) => (
            <PostComponent key={index} post={post} />
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
