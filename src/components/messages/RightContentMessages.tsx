"use client";
import { Box } from "@mui/material";
import RightHeaderContentMessages from "./RightHeaderContentMessages";
import RightListContentMessages from "./RightListContentMessages";
const leftBarWidth = "350px";

const RightContentMessages = () => {
  return (
    <Box
      sx={{
        width: `calc(100% - ${leftBarWidth})`,
        height: "100%",
      }}
    >
      <RightHeaderContentMessages />
      <RightListContentMessages />
    </Box>
  );
};

export default RightContentMessages;
