"use client";
import LeftSideBarMessages from "@/components/messages/LeftSideBarChatItems";
import { Friends } from "@/types";
import { Box } from "@mui/material";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  const [chatFriendItem, setChatFriendItem] = useState<Friends | null>(null);
  const { params } = useParams();

  console.log(params);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "calc(100% - 80px)",
        marginLeft: "auto",
      }}
    >
      <LeftSideBarMessages />
      {children}
    </Box>
  );
};

export default MessagesLayout;
