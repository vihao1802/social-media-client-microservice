"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { Dancing_Script } from "next/font/google";
import { useRouter } from "next/navigation";
import React, { Component, useRef, useState } from "react";
import Stories from "react-insta-stories";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";
import avatar from "@/assets/images/logo.png";
import postImg from "@/assets/images/post-img.jpg";
import postImg1 from "@/assets/images/post-img1.jpg";
import postImg2 from "@/assets/images/post-img2.jpg";
import postImg3 from "@/assets/images/post-img3.jpg";
import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import zIndex from "@mui/material/styles/zIndex";
import StoryCard from "@/components/widgets/StoryCard";

const dacingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

interface Story {
  id: string;
  username: string;
  avatar: string;
  url: string;
  time: string;
  subtitles: string;
  duration?: number;
}

const stories: Story[] = [
  {
    id: "1",
    username: "bhan.hann",
    avatar: avatar.src,
    url: postImg.src,
    time: "14h",
    subtitles: "See translation",
    duration: 5000,
  },
  {
    id: "2",
    username: "bhan.hann",
    avatar: avatar.src,
    url: postImg1.src,
    time: "14h",
    subtitles: "See translation",
    duration: 4000,
  },
  {
    id: "3",
    username: "bhan.hann",
    avatar: avatar.src,
    url: postImg2.src,
    time: "14h",
    subtitles: "See translation",
    duration: 3000,
  },
  {
    id: "4",
    username: "bhan.hann",
    avatar: avatar.src,
    url: postImg3.src,
    time: "14h",
    subtitles: "See translation",
    duration: 2000,
  },
];
const StoriesPage = () => {
  const router = useRouter();
  const swiperRef = useRef<SwiperType>();

  return (
    <Box
      sx={{
        backgroundColor: "#1a1a1a",
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Logo */}
      <Typography
        fontSize="27px"
        color="white"
        fontWeight="bold"
        fontFamily={dacingScript.style.fontFamily}
        sx={{
          position: "absolute",
          top: "10px",
          left: "20px",
          ":hover": {
            cursor: "pointer",
          },
        }}
        onClick={() => router.push("/")}
      >
        Ninstagram
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          onClick={() => swiperRef.current?.slidePrev()}
          sx={{
            height: "28px",
            width: "28px",
            position: "absolute",
            top: "50%",
            left: "15px",
            transform: "translateY(-50%)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            cursor: "pointer",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <KeyboardArrowLeftRounded />
        </IconButton>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{
            clickable: true,
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          modules={[Pagination, Navigation]}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          {stories.map((story, index) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <StoryCard
                username={story.username}
                avatar={story.avatar}
                url={story.url}
                time={story.time}
                subtitles={story.subtitles}
                duration={story.duration}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <IconButton
          onClick={() => swiperRef.current?.slideNext()}
          sx={{
            height: "28px",
            width: "28px",
            position: "absolute",
            top: "50%" /* Đặt nút ở giữa theo chiều dọc */,
            right: "15px" /* Cách mép phải 10px */,
            transform:
              "translateY(-50%)" /* Điều chỉnh để căn giữa theo chiều dọc */,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            cursor: "pointer",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <KeyboardArrowRightRounded />
        </IconButton>
      </Box>
    </Box>
  );
};

export default StoriesPage;
