"use client";
import LeftSideBarMessages from "@/components/messages/LeftSideBarChatItems";
import { Friends } from "@/types";
import { AccountCircle, AccountCircleOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const Messages = () => {
  return (
    <Box
      sx={{
        width: `calc(100% - 430px)`,
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <AccountCircle
          sx={{
            fontSize: "100px",
            fontWeight: "500",
          }}
        />
        <Typography>Select a friend or group chat to send messages</Typography>
      </Box>
    </Box>
  );
};

export default Messages;
