"use client";
import ReelCard from "@/components/widgets/ReelCard";
import { Box } from "@mui/material";
import React, { useState } from "react";

const page = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = (event: { deltaY: number }) => {
    if (event.deltaY > 0 && currentIndex < 10 - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (event.deltaY < 0 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };
  return (
    <Box
      sx={{
        width: "calc(100% - 250px)",
        height: "100vh",
        marginLeft: "auto",
      }}
      onWheel={handleScroll}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "32px",
          gap: 2,
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <ReelCard key={index} />
        ))}
      </Box>
    </Box>
  );
};

export default page;
