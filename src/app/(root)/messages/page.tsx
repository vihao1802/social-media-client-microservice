"use client";
import { Box } from "@mui/material";
import LeftSideBarMessages from "@/components/messages/LeftSideBarChatItems";
import RightContentMessages from "@/components/messages/RightContentMessages";
import "react-chat-elements/dist/main.css";
import { useState } from "react";
import { Friends } from "@/types";

const Messages = () => {
  const [chatFriendItem, setChatFriendItem] = useState<Friends | null>(null);

  const handleSelectedChatFriendItem = (data: Friends) => {
    setChatFriendItem(data);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "calc(100% - 80px)",
        marginLeft: "auto",
      }}
    >
      <LeftSideBarMessages
        onChatFriendItemSelect={handleSelectedChatFriendItem}
      />
      <RightContentMessages chatFriendItem={chatFriendItem} />
    </Box>
  );
};

export default Messages;
