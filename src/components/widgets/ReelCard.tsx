"use client";

import React, { useState } from "react";
import {
  Card,
  CardMedia,
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
  Fade,
} from "@mui/material";
// import demoUrl from "@/assets/videos/demo.mp4";
import avatar from "@/assets/images/logo.png";
import {
  VolumeOffRounded,
  VolumeUpRounded,
  FavoriteRounded,
  FavoriteBorderRounded,
  ChatBubbleOutlineRounded,
  ShareOutlined,
  BookmarkBorderOutlined,
  BookmarkRounded,
  MoreHorizRounded,
} from "@mui/icons-material";

const VideoCard = () => {
  const [muted, setMuted] = useState(true); // Handle mute/unmute
  const [liked, setLiked] = useState(false); // Handle like/unlike
  const [saved, setSaved] = useState(false); // Handle bookmark/unbookmark

  return (
    <Fade in timeout={500}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        <Card
          sx={{
            width: 350,
            height: 625,
            position: "relative",
            borderRadius: "5px",
            overflow: "hidden",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.7)",
          }}
        >
          {/* Video Section */}
          <CardMedia
            component="video"
            image={""} // Replace with your video URL or file path
            autoPlay
            loop
            muted={muted}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />

          {/* Mute/Unmute Button */}
          <IconButton
            onClick={() => setMuted(!muted)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
            }}
          >
            {muted ? <VolumeOffRounded /> : <VolumeUpRounded />}
          </IconButton>

          {/* Bottom Video Description */}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: 16,
              right: 16,
              justifyContent: "space-between",
              color: "white",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexDirection: "row",
                marginBottom: 1,
              }}
            >
              <Avatar
                src={avatar.src} // Avatar Image
                alt="wabikongtv"
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="caption">@wabikongtv</Typography>
              <Typography>•</Typography>
              <Button
                variant="outlined"
                sx={{
                  height: "32px",
                  width: "52px",
                  border: "1px solid rgba(255, 255, 255, 0.5)",
                  color: "white",
                  fontSize: "12px",
                  borderRadius: "10px",
                }}
              >
                Follow
              </Button>
            </Box>
            <Typography variant="caption" sx={{ fontSize: "12px" }}>
              Cantonese Challenge 广东话大挑战
            </Typography>
          </Box>
        </Card>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={() => setLiked(!liked)}>
              {liked ? (
                <FavoriteRounded
                  sx={{
                    color: "red",
                  }}
                />
              ) : (
                <FavoriteBorderRounded />
              )}
            </IconButton>
            <Typography variant="caption" fontSize="12px">
              1,999
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <ChatBubbleOutlineRounded />
            </IconButton>
            <Typography variant="caption" fontSize="12px">
              1,999
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <ShareOutlined />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton onClick={() => setSaved(!saved)}>
              {saved ? <BookmarkRounded /> : <BookmarkBorderOutlined />}
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <MoreHorizRounded />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default VideoCard;
