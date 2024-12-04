import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  LinearProgress,
  Typography,
  InputBase,
  Skeleton,
} from "@mui/material";
import {
  MoreVert,
  VolumeOff,
  Pause,
  PlayArrow,
  FavoriteBorder,
  Send,
  VolumeUp,
  Forum,
  FavoriteRounded,
} from "@mui/icons-material";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import { Post } from "@/models/post";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useGetMediaContentByPostId } from "@/hooks/media-content/useGetMediaContentByPostId";
import GradientCircularProgress from "../shared/Loader";
import { useSearchParams } from "next/navigation";
import { useGetPostViewerByPostId } from "@/hooks/post-viewer/useGetPostViewerByPostId";
import { useGetCommentByPostId } from "@/hooks/comment/useGetCommentByPostId";
import { PostViewer, PostViewerRequest } from "@/models/post-viewer";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { User } from "@/models/user";
import { useCreatePostViewer } from "@/hooks/post-viewer/useCreatePostViewer";
import { useDeletePostViewer } from "@/hooks/post-viewer/useDeletePostViewer";
import toast from "react-hot-toast";
import PostForm from "../post/PostForm";
import PostComment from "../post/PostComment";

interface StoryCardProps {
  currentUser: User;
  story: Post;
  progress: number;
  paused: boolean;
  setPaused: (paused: boolean) => void;
}

const StoryCard = ({
  currentUser,
  story,
  paused,
  progress,
  setPaused,
}: StoryCardProps) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [openComment, setOpenComment] = useState(false);

  const { data: mediaContentData, isLoading: isMediaContentDataLoading } =
    useGetMediaContentByPostId({ postId: story.id });

  console.log({ mediaContentData });

  const { data: postViewerData, isLoading: isPostViewerDataLoading } =
    useGetPostViewerByPostId({ postId: story.id });

  const { data: commentData, isLoading: isCommentDataLoading } =
    useGetCommentByPostId({ postId: story.id });

  useEffect(() => {
    // Nếu progress đạt 100%, dừng video
    if (progress >= 100 && videoRef.current) {
      // Dừng video khi progress đạt 100%
      videoRef.current.pause();
    }
  }, [progress]);

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

  if (
    isMediaContentDataLoading ||
    !mediaContentData ||
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
        await deletePostViewer(postViewerId, story.id);
      } else {
        toast.error("Post viewer not found!");
        return null;
      }
    } else {
      const postViewerData: PostViewerRequest = {
        postId: story.id,
        userId: currentUser.id,
        liked: true,
      };
      const postViewerResponse = await createPostViewer(postViewerData);
      setPostViewerId(postViewerResponse.id);
    }
  };

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
            {muted ? <VolumeOff /> : <VolumeUp />}
            {/* You can toggle sound here */}
          </IconButton>
          <IconButton
            onClick={() => {
              setPaused(!paused);
              if (videoRef.current) {
                if (paused) {
                  videoRef.current.play();
                } else {
                  videoRef.current.pause();
                }
              }
            }}
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
        {mediaContentData?.items[0].media_type === "video" ? (
          <video
            autoPlay
            loop
            playsInline
            muted={muted}
            ref={videoRef}
            src={mediaContentData?.items[0].media_Url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            component="img"
            alt={mediaContentData?.items[0].media_type}
            src={mediaContentData?.items[0].media_Url}
            sx={{
              width: 370,
              height: 630,
              objectFit: "cover",
            }}
          />
        )}
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
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => {
              setOpenComment(true);
              setPaused(true);
            }}
          >
            <Forum />
          </IconButton>
          <Typography color="white" p="10px 0">
            {commentData.items.length}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <IconButton sx={{ color: "white" }} onClick={handleClickLike}>
            {isLiked ? (
              <FavoriteRounded
                sx={{
                  color: "red",
                }}
              />
            ) : (
              <FavoriteBorder />
            )}
          </IconButton>
          <Typography color="white" p="10px 0">
            {
              postViewerData.items.filter(
                (postViewer: PostViewer) => postViewer.liked === true
              ).length
            }
          </Typography>
        </Box>
      </Box>

      {/* Comment Modal */}
      {openComment && (
        <PostComment
          post={story}
          postMedia={mediaContentData?.items || []}
          isOpen={openComment}
          handleClose={() => setOpenComment(false)}
        />
      )}
    </Box>
  );
};

export default StoryCard;
