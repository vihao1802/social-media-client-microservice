"use client";

import { Box } from "@mui/material";

import RightSideBar from "@/components/shared/RightSideBar";
import React, { useState } from "react";
import StoryBar from "@/components/widgets/StoryBar";
import Post from "@/components/widgets/Post";

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
          padding: "20px",
          gap: "20px",
        }}
      >
        <StoryBar />

        {posts.map((post) => (
          <Post />
        ))}
      </Box>
      <RightSideBar />
    </Box>
  );
}
