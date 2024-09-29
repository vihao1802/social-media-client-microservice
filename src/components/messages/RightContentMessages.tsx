"use client";
import { Box } from "@mui/material";
import RightHeaderContentMessages from "./RightHeaderContentMessages";
import RightListContentMessages from "./RightListContentMessages";
import { Friends } from "@/types";
const leftBarWidth = "350px";

interface RightContentMessagesProps {
  chatFriendItem: Friends | null;
}

const RightContentMessages = ({
  chatFriendItem,
}: RightContentMessagesProps) => {
  return (
    <Box
      sx={{
        width: `calc(100% - ${leftBarWidth})`,
        height: "100vh",
      }}
    >
      <RightHeaderContentMessages chatFriendItem={chatFriendItem} />
      <RightListContentMessages chatFriendItem={chatFriendItem} />
    </Box>
  );
};

export default RightContentMessages;
