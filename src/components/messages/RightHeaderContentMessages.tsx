"use client";
import { Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import AvatarName from "@/components/shared/AvatarName";
import { InfoOutlined, PhoneOutlined } from "@mui/icons-material";
import { useState } from "react";
import RightDrawerContentMessages from "./RightDrawerContentMessages";
import { Friends } from "@/types";

interface RightHeaderContentMessagesProps {
  chatFriendItem: Friends | null;
}

const RightHeaderContentMessages = ({
  chatFriendItem,
}: RightHeaderContentMessagesProps) => {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: "14px",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #c7c5c5",
        height: "70px",
      }}
    >
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        <RightDrawerContentMessages closeDrawer={toggleDrawer(false)} />
      </Drawer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {chatFriendItem && <AvatarName name={chatFriendItem.name} />}
        {chatFriendItem && (
          <Typography
            sx={{
              fontSize: "17px",
              color: "black",
              paddingLeft: "10px",
            }}
          >
            {chatFriendItem.name}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "28px",
        }}
      >
        <IconButton>
          <PhoneOutlined
            fontSize={"inherit"}
            sx={{
              borderRadius: "50%",
              cursor: "pointer",
              color: "black",
            }}
          />
        </IconButton>

        <IconButton onClick={toggleDrawer(true)}>
          <InfoOutlined
            fontSize={"inherit"}
            sx={{
              borderRadius: "50%",
              cursor: "pointer",
              color: "black",
            }}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RightHeaderContentMessages;
