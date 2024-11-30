import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import StoryCircle from "../widgets/StoryCircle";
import { useRouter } from "next/navigation";
import { useGetFriendStories } from "@/hooks/post/useGetFriendStories";
import { Post } from "@/models/post";
import GradientCircularProgress from "./Loader";
import { User } from "@/models/user";

const StoryBar = () => {
  const [number, setNumber] = useState(0);
  const { data: storyData, isLoading: isStoryDataLoading } =
    useGetFriendStories({
      enabled: true,
    });
  if (!storyData || isStoryDataLoading) return <GradientCircularProgress />;

  const grouped = storyData.reduce(
    (groupedMap: Map<string, { creator: User; posts: Post[] }>, post: Post) => {
      const creatorId = post.creator.id;

      if (!groupedMap.has(creatorId)) {
        groupedMap.set(creatorId, {
          creator: post.creator,
          posts: [],
        });
      }

      groupedMap.get(creatorId)!.posts.push(post);

      return groupedMap;
    },
    new Map<string, { creator: User; posts: Post[] }>()
  );

  let globalIndex = 0; // Khởi tạo chỉ số toàn cục
  const updatedData: Array<{ creator: User; posts: Post[] }> = Array.from(
    grouped.values()
  );

  // Chuyển từ Map sang mảng
  const groupedByCreator = updatedData.map(
    (creatorItem: { creator: User; posts: Post[] }) => ({
      ...creatorItem,
      posts: creatorItem.posts.map((post: Post) => ({
        ...post,
        activeIndex: globalIndex++, // Thêm activeIndex và tăng chỉ số
      })),
    })
  );

  // Define the width of a single card, including gaps
  const cardWidth = 85; // Assumed: 70px for avatar + 15px gap
  const visibleCards = 8; // Number of cards visible in the view (can be adjusted)

  // Calculate total width of the slider content
  const maxTranslate = -(cardWidth * (groupedByCreator.length - visibleCards));

  const handlePrevious = () => {
    setNumber((prev) => Math.min(prev + cardWidth, 0));
  };

  const handleNext = () => {
    setNumber((prev) => Math.max(prev - cardWidth, maxTranslate));
  };

  return (
    <Box
      sx={{
        width: "670px",
        height: "130px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "row",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {number < 0 && (
        <IconButton
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
            zIndex: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          onClick={handlePrevious}
        >
          <KeyboardArrowLeftRounded onClick={handlePrevious} />
        </IconButton>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          padding: "20px 0",
          transform: `translate3d(${number}px, 0px, 0px)`,
          transition: "transform 0.3s ease",
        }}
      >
        {(
          groupedByCreator as {
            creator: User;
            posts: (Post & { activeIndex: number })[];
          }[]
        ).map(({ creator, posts }, index: number) => (
          <StoryCircle
            key={index}
            userId={creator.id}
            nickName={creator.username}
            avatar={creator.profile_img}
            activeIndex={posts[0].activeIndex}
          />
        ))}
        t
      </Box>

      {number > maxTranslate && (
        <IconButton
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
            zIndex: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
          onClick={handleNext}
        >
          <KeyboardArrowRightRounded onClick={handleNext} />
        </IconButton>
      )}
    </Box>
  );
};

export default StoryBar;
