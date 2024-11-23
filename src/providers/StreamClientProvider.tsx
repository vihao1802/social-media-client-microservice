"use client";

import { tokenProvider } from "@/actions/stream.action";
import GradientCircularProgress from "@/components/shared/Loader";
import { Box, CircularProgress } from "@mui/material";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();

  useEffect(() => {
    if (!apiKey) throw new Error("Stream API key is missing");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: "Natasi_Daala",
        name: "Natasi Daala",
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [apiKey]);

  if (!videoClient)
    return (
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      >
        <GradientCircularProgress />
      </Box>
    );

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
