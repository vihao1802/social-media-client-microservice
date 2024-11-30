"use client";
import { Box } from "@mui/material";
import RightHeaderContentMessages from "./RightHeaderContentMessages";
import RightListContentMessages from "./RightListContentMessages";

const RightContentMessages = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <RightHeaderContentMessages />
      <RightListContentMessages />
    </Box>
  );
};

export default RightContentMessages;
