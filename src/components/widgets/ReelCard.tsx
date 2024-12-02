"use client";

import React, { useEffect, useState, MouseEvent } from "react";
import {
  Card,
  CardMedia,
  Box,
  Typography,
  IconButton,
  Button,
  Avatar,
  Skeleton,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";

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
import { MediaContent } from "@/models/media-content";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { useGetPostViewerByPostId } from "@/hooks/post-viewer/useGetPostViewerByPostId";
import { PostViewer, PostViewerRequest } from "@/models/post-viewer";
import { useCreatePostViewer } from "@/hooks/post-viewer/useCreatePostViewer";
import { useDeletePostViewer } from "@/hooks/post-viewer/useDeletePostViewer";
import toast from "react-hot-toast";
import PostComment from "../post/PostComment";
import { useGetCommentByPostId } from "@/hooks/comment/useGetCommentByPostId";
import PostForm from "../post/PostForm";

interface VideoCardProps {
  mediaContent: MediaContent;
}

const VideoCard = ({ mediaContent }: VideoCardProps) => {
  if (!mediaContent) return null;

  const [muted, setMuted] = useState(true); // Handle mute/unmute
  const [openComment, setOpenComment] = useState(false);

  const handleClickOpenComment = () => {
    setOpenComment(true);
  };

  const handleCloseComment = () => {
    setOpenComment(false);
  };

  const { user: currentUser } = useAuthenticatedUser();
  if (!currentUser) return null;

  const { data: postViewerData, isLoading: isPostViewerDataLoading } =
    useGetPostViewerByPostId({ postId: mediaContent.post.id });

  const { data: commentData, isLoading: isCommentDataLoading } =
    useGetCommentByPostId({ postId: mediaContent.post.id });

  const [postViewerId, setPostViewerId] = useState(0);
  const createPostViewer = useCreatePostViewer();
  const deletePostViewer = useDeletePostViewer();

  useEffect(() => {
    if (postViewerData) {
      const postViewer = postViewerData.items.find(
        (item: PostViewer) => item.userId === currentUser.id
      );
      if (postViewer) {
        setPostViewerId(postViewer.id);
      }
    }
  }, [postViewerData]);

  // Menu Widgets
  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElMenu);
  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  // Post Form
  const [openPostForm, setOpenPostForm] = useState(false);

  const handleClickOpenPostForm = () => {
    setOpenPostForm(true);
  };

  const handleClosePostForm = () => {
    setOpenPostForm(false);
  };

  if (
    isPostViewerDataLoading ||
    !postViewerData ||
    isCommentDataLoading ||
    !commentData
  )
    return <Skeleton />;

  const isLiked = postViewerData?.items.some(
    (item: PostViewer) => item.userId === currentUser.id && item.liked === true
  );

  const handleClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLiked) {
      if (postViewerId !== 0) {
        await deletePostViewer(postViewerId);
      } else {
        toast.error("Post viewer not found!");
        return null;
      }
    } else {
      const postViewerData: PostViewerRequest = {
        postId: mediaContent.post.id,
        userId: currentUser.id,
        liked: true,
      };
      const postViewerResponse = await createPostViewer(postViewerData);
      setPostViewerId(postViewerResponse.id);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
        }}
      >
        {/* Media Card */}
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
            image={mediaContent.media_Url} // Replace with your video URL or file path
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
                src={
                  mediaContent.post.creator.profile_img || "/icons/person.png"
                } // Avatar Image
                alt={mediaContent.post.creator.username} // Avatar Alt Text
                sx={{ width: 32, height: 32 }}
              />
              <Typography variant="caption">
                {mediaContent.post.creator.username}
              </Typography>
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
              {mediaContent.post.content}
            </Typography>
          </Box>
        </Card>

        {/* Action Buttons */}
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
            <IconButton onClick={handleClickLike}>
              {isLiked ? (
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
              {
                postViewerData.items.filter(
                  (postViewer: PostViewer) => postViewer.liked === true
                ).length
              }
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
            <IconButton onClick={handleClickOpenComment}>
              <ChatBubbleOutlineRounded />
            </IconButton>
            <Typography variant="caption" fontSize="12px">
              {commentData.items.length}
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
            <IconButton onClick={handleClickMenu}>
              <MoreHorizRounded />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Menu widgets */}
      {openMenu && (
        <Menu
          anchorEl={anchorElMenu}
          id="account-menu"
          open={openMenu}
          onClose={handleCloseMenu}
          onClick={handleCloseMenu}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                width: 200,

                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {currentUser.id === mediaContent.post.creator.id ? (
            <Box>
              <MenuItem onClick={handleCloseMenu}>
                <Typography sx={{ color: "red", fontWeight: "bold" }}>
                  Delete
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleClickOpenPostForm();
                  handleCloseMenu();
                }}
              >
                Edit
              </MenuItem>
            </Box>
          ) : (
            <Box>
              <MenuItem onClick={handleCloseMenu}>
                <Typography sx={{ color: "red", fontWeight: "bold" }}>
                  Unfollow
                </Typography>
              </MenuItem>
            </Box>
          )}

          <Divider />
          <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
        </Menu>
      )}

      {/* Post Form */}
      {openPostForm && (
        <PostForm
          post={mediaContent.post}
          postMedia={[mediaContent]}
          open={openPostForm}
          handleClose={handleClosePostForm}
        />
      )}

      {/* Comment Modal */}
      {openComment && (
        <PostComment
          postMedia={[mediaContent]}
          isOpen={openComment}
          handleClose={handleCloseComment}
        />
      )}
    </>
  );
};

export default VideoCard;
