"use client";
import {
  Avatar,
  Box,
  Button,
  Drawer,
  IconButton,
  Typography,
} from "@mui/material";
import AvatarName from "@/components/shared/AvatarName";
import { InfoOutlined, PhoneOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { tokenProvider } from "@/actions/stream.action";
import RightDrawerContentMessages from "@/components/messages/RightDrawerContentMessages";
import { Friends } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetUserById } from "@/hooks/user/useGetUserById";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const RightHeaderContentMessages = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("u_id");

  if (!id) return null;

  const { data: user } = useGetUserById({ id });
  const client = useStreamVideoClient();

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  if (!user) return null;

  const initiateCall = async () => {
    if (!client) {
      console.log("Video client is not initialized");
      return;
    }

    try {
      const callId = crypto.randomUUID();
      const call = client.call("default", callId);
      await call.getOrCreate();

      router.push(`/call/${callId}`);
    } catch (error) {
      console.log(error);
    }
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
        <Avatar src={user.profile_img || "/icons/user.png"} />

        <Typography
          sx={{
            fontSize: "17px",
            color: "black",
            paddingLeft: "10px",
          }}
        >
          {user.username}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "28px",
        }}
      >
        <IconButton onClick={initiateCall}>
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
