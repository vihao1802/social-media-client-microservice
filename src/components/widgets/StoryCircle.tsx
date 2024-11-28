"use client";
import { Box, Avatar, Typography } from "@mui/material";
import React from "react";
import { useRouter } from "next/navigation";

interface StoryCircleProps {
  userId: string;
  nickName: string;
  avatar: string;
  activeIndex: number;
}

const StoryCircle = ({
  userId,
  nickName,
  avatar,
  activeIndex,
}: StoryCircleProps) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "0px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
      onClick={() => router.push("/stories?active-index=" + activeIndex)}
    >
      <Box
        sx={{
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          background: "linear-gradient(#4F46E5, #C622FF,#FF2222,#FFA439)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition: "0.5s",
          "&:hover": {
            transform: "scale(1.1)",
            cursor: "pointer",
          },
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            height: "65px",
            width: "65px",
            border: "3px solid white",
          }}
        />
      </Box>
      <Typography
        sx={{
          color: "#475569",
          fontWeight: "bold",
          fontSize: "11px",
        }}
      >
        {nickName}
      </Typography>
    </Box>
  );
};

export default StoryCircle;
