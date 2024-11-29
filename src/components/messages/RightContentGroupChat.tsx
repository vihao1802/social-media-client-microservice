"use client";
import { Box } from "@mui/material";
import RightHeaderContentGroupChat from "./RightHeaderContentGroupChat";
import RightListContentGroupChat from "./RightListContentGroupChat";

const RightContentGroupChat = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
      }}
    >
      <RightHeaderContentGroupChat />
      <RightListContentGroupChat />
    </Box>
  );
};

export default RightContentGroupChat;
