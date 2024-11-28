import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  LinearProgress,
  Typography,
  InputBase,
} from "@mui/material";
import {
  MoreVert,
  VolumeOff,
  Pause,
  PlayArrow,
  FavoriteBorder,
  Send,
} from "@mui/icons-material";
import Image from "next/image";

interface StoryCardProps {
  username: string;
  avatar: string;
  url: string;
  time: string;
  subtitles: string;
  duration?: number;
}

const StoryCard = ({
  username,
  avatar,
  url,
  time,
  subtitles,
  duration,
}: StoryCardProps) => {
  const [paused, setPaused] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0); // You can use this to simulate progress

  // Increment progress over time
  const storyDuration = duration || 0; // Story duration is 5 seconds in milliseconds (5000ms)
  const updateInterval = 100; // Update every 100ms (0.1 second)

  useEffect(() => {
    if (!paused && progress < 100) {
      const increment = 100 / (storyDuration / updateInterval); // Calculate progress increment per 100ms
      const id = setInterval(() => {
        setProgress((prev) => Math.min(prev + increment, 100)); // Ensure progress doesn't exceed 100
      }, updateInterval);

      return () => clearInterval(id); // Clean up interval on unmount or when paused
    }
  }, [paused, progress]);

  return (
    <Box
      sx={{
        position: "relative",
        width: 370,
        height: 630,
        bgcolor: "black",
      }}
    >
      {/* Top Bar with Avatar, Name, and Icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src={avatar}
            alt="User Avatar"
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Box>
            <Typography variant="subtitle2">{username}</Typography>
            <Typography variant="caption">{time + "•" + subtitles}</Typography>
          </Box>
        </Box>
        <Box>
          <IconButton onClick={() => setMuted(!muted)} sx={{ color: "white" }}>
            {muted ? <VolumeOff /> : <VolumeOff />}
            {/* You can toggle sound here */}
          </IconButton>
          <IconButton
            onClick={() => setPaused(!paused)}
            sx={{ color: "white" }}
          >
            {paused ? <PlayArrow /> : <Pause />} {/* Toggle pause/play */}
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <MoreVert /> {/* More options button */}
          </IconButton>
        </Box>
      </Box>

      {/* Story Progress Bar */}
      <Box sx={{ position: "absolute", top: 0, left: 0, right: 0 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ height: 2, bgcolor: "grey.800" }}
        />
      </Box>

      {/* Main Story Content (Image or Video) */}
      <Box
        sx={{
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <Image
          src={url}
          alt="Story Image"
          width={370}
          height={630}
          objectFit="cover"
          quality={100}
        />
      </Box>

      {/* Reply Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
          position: "absolute",
          bottom: 0,
          width: "100%",
          bgcolor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <InputBase
          placeholder="Reply to bhan.hann..."
          sx={{ color: "white", flexGrow: 1, ml: 1 }}
        />
        <IconButton sx={{ color: "white" }}>
          <FavoriteBorder /> {/* Like button */}
        </IconButton>
        <IconButton sx={{ color: "white" }}>
          <Send /> {/* Send reply button */}
        </IconButton>
      </Box>
    </Box>
  );
};

export default StoryCard;
