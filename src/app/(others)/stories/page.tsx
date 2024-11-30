"use client";

import { Box, IconButton, Typography } from "@mui/material";
import { Dancing_Script } from "next/font/google";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Component, use, useEffect, useRef, useState } from "react";
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
import { useGetFriendStories } from "@/hooks/post/useGetFriendStories";
import GradientCircularProgress from "@/components/shared/Loader";
import { User } from "@stream-io/video-react-sdk";
import { Post } from "@/models/post";

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

  const searchParams = useSearchParams();
  const activeIndex = Number(searchParams.get("active-index")) || 0;

  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0); // You can use this to simulate progress

  // Increment progress over time
  const storyDuration = 5000; // Story duration is 5 seconds in milliseconds (5000ms)
  const updateInterval = 100; // Update every 100ms (0.1 second)

  const { data: storyData, isLoading: isStoryDataLoading } =
    useGetFriendStories({
      enabled: true,
    });

  useEffect(() => {
    if (paused || progress >= 100) return; // Dừng nếu đang tạm dừng hoặc đã hoàn thành

    const increment = 100 / (storyDuration / updateInterval); // Tính toán mỗi lần tăng
    const id = setInterval(() => {
      setProgress((prev) => Math.min(prev + increment, 100)); // Tăng tiến trình và giới hạn tối đa là 100
    }, updateInterval);

    return () => clearInterval(id); // Dọn dẹp interval khi unmount hoặc pause
  }, [paused, progress]);

  // Xử lý chuyển slide khi tiến trình đầy
  useEffect(() => {
    if (progress < 100 || activeIndex === storyData?.length - 1) return; // Nếu chưa đầy, không chuyển slide

    swiperRef.current?.slideNext(); // Chuyển slide
    router.push(`/stories?active-index=${swiperRef.current?.activeIndex}`); // Cập nhật URL
    setProgress(0); // Reset tiến trình
  }, [progress, router]);

  if (isStoryDataLoading) return <GradientCircularProgress />;

  const handleSlideChange = () => {
    router.push(`/stories?active-index=${swiperRef.current?.activeIndex}`);
    setProgress(0); // Reset progress when slide changes
  };

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
          zIndex: 10,
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
        {activeIndex > 0 && (
          <IconButton
            onClick={() => {
              swiperRef.current?.slidePrev();
              router.push(
                `/stories?active-index=${swiperRef.current?.activeIndex}`
              );
            }}
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
        )}

        <Swiper
          initialSlide={activeIndex}
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
          lazyPreloadPrevNext={1}
          lazyPreloaderClass="lazy-preloader"
          onSlideChange={handleSlideChange}
        >
          {storyData.map((story: Post, index: number) => (
            <SwiperSlide
              key={index}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
              lazy
            >
              <StoryCard
                story={story}
                progress={progress}
                paused={paused}
                setPaused={setPaused}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {activeIndex < storyData.length - 1 && (
          <IconButton
            onClick={() => {
              swiperRef.current?.slideNext();
              router.push(
                `/stories?active-index=${swiperRef.current?.activeIndex}`
              );
            }}
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
        )}
      </Box>
    </Box>
  );
};

export default StoriesPage;
