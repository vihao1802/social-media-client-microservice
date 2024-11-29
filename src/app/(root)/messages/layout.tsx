"use client";
import LeftSideBarMessages from "@/components/messages/LeftSideBarChatItems";
import { Box } from "@mui/material";
import React from "react";

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
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
