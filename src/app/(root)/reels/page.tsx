"use client";
import GradientCircularProgress from "@/components/shared/Loader";
import ReelCard from "@/components/widgets/ReelCard";
import { useGetMediaContentInfinity } from "@/hooks/media-content/useGetMediaContentInfinity";
import { ListResponse, Pagination } from "@/models/api";
import { MediaContent } from "@/models/media-content";
import { Post } from "@/models/post";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const page = () => {
  const filters: Partial<Pagination> = {
    page: 1,
    pageSize: 5,
    sort: "-id",
    includes: "Post.Creator",
    media_type: "eq:video",
  };

  const { data, isLoading, isValidating, size, setSize } =
    useGetMediaContentInfinity({
      params: filters,
    });

  const mediaContentList: Array<MediaContent> =
    data?.reduce(
      (
        result: Array<MediaContent>,
        currentPage: ListResponse<MediaContent>
      ) => {
        result.push(...currentPage.items);

        return result;
      },
      []
    ) || [];

  const showLoadMore = (data?.[0]?.totalItems ?? 0) > mediaContentList.length;
  const loadingMore = isValidating && mediaContentList.length > 0;

  const { ref } = useInView({
    onChange(inView) {
      if (inView) setSize((x) => x + 1);
    },
  });

  return (
    <Box
      sx={{
        width: "calc(100% - 250px)",
        height: "100vh",
        marginLeft: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          gap: 2,
        }}
      >
        {mediaContentList.map((mediaContent: MediaContent, index: number) => (
          <ReelCard mediaContent={mediaContent} key={index} />
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
    </Box>
  );
};

export default page;
