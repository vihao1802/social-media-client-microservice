// @ts-nocheck
"use client";
import { Avatar, Box, Button, Tooltip, Typography } from "@mui/material";
import LeftSideBarMessages from "@/components/messages/LeftSideBarChatItems";
import RightContentMessages from "@/components/messages/RightContentMessages";
import FlexBetween from "@/components/shared/FlexBetween";
import AvatarName from "@/components/shared/AvatarName";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import {
  ErrorOutline,
  InfoOutlined,
  LocalPhone,
  PhoneEnabled,
  PhoneEnabledOutlined,
  PhoneOutlined,
} from "@mui/icons-material";

const leftBarWidth = "350px";

const Messages = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
      }}
    >
      <LeftSideBarMessages />
      <RightContentMessages />
    </Box>
  );
};

export default Messages;
