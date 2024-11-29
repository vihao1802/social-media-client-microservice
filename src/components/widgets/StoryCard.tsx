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
import { CldImage } from "next-cloudinary";
import { Post } from "@/models/post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetMediaContentByPostId } from "@/hooks/media-content/useGetMediaContentByPostId";
import GradientCircularProgress from "../shared/Loader";

interface StoryCardProps {
  story: Post;
  progress: number;
  paused: boolean;
  setPaused: (paused: boolean) => void;
}

const StoryCard = ({ story, paused, progress, setPaused }: StoryCardProps) => {
  const [muted, setMuted] = useState(false);

  const { data: mediaContentData, isLoading: isMediaContentDataLoading } =
    useGetMediaContentByPostId({ postId: story.id });

  if (isMediaContentDataLoading) return <GradientCircularProgress />;
  dayjs.extend(relativeTime);
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
            src={story.creator.profile_img}
            alt="User Avatar"
            sx={{ width: 32, height: 32, mr: 1 }}
          />
          <Box>
            <Typography variant="subtitle2">
              {story.creator.username}
            </Typography>
            <Typography variant="caption">
              {dayjs(story.create_at).fromNow()}
            </Typography>
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
        <CldImage
          alt={mediaContentData?.items[0].media_type}
          width={370}
          height={630}
          objectFit="cover"
          quality={100}
          src={mediaContentData?.items[0].media_Url}
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
          placeholder={`Reply to ${story.creator.username}...`}
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
