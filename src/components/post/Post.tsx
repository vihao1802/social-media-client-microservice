/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Avatar from "@mui/joy/Avatar";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Link from "@mui/joy/Link";
import IconButton from "@mui/joy/IconButton";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import SendOutlined from "@mui/icons-material/SendOutlined";
import Face from "@mui/icons-material/Face";
import BookmarkBorderRoundedIcon from "@mui/icons-material/BookmarkBorderRounded";
import PostComment from "@/components/post/PostComment";
import postImage from "@/assets/images/post-img2.jpg";
import { Post } from "@/models/post";
import { useGetMediaContentByPostId } from "@/hooks/media-content/useGetMediaContentByPostId";
import ImageSwiper from "./ImageSwiper";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import GradientCircularProgress from "../shared/Loader";
import { PostContext } from "@/context/post-context";
import { AvatarGroup } from "@mui/material";
import { useGetPostViewerByPostId } from "@/hooks/post-viewer/useGetPostViewerByPostId";
import { getUserId_Cookie } from "@/utils/handleCookies";
import { PostViewer } from "@/models/post-viewer";
import { FavoriteRounded } from "@mui/icons-material";

export default function PostComponent() {
  const userId = getUserId_Cookie();

  const { post } = useContext(PostContext);
  const [openComment, setOpenComment] = useState(false);

  if (!post) return null;

  const { data: postViewerData, isLoading: isPostViewerDataLoading } =
    useGetPostViewerByPostId({ postId: post.id });

  const { data: mediaContentData, isLoading: isMediaContentDataLoading } =
    useGetMediaContentByPostId({ postId: post.id });

  if (
    isMediaContentDataLoading ||
    !mediaContentData ||
    isPostViewerDataLoading ||
    !postViewerData
  )
    return <GradientCircularProgress />;

  dayjs.extend(relativeTime);

  const isLiked = postViewerData.items.some(
    (item: PostViewer) => item.userId === userId
  );
  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 300 }}>
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: "center", gap: 1 }}
        >
          <Link
            href={`/profile/${post.creator.id}`}
            sx={{ color: "black" }}
            underline="none"
          >
            <Box
              sx={{
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  m: "-2px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)",
                },
              }}
            >
              <Avatar
                size="sm"
                src={post.creator.profile_img}
                sx={{
                  width: "30px",
                  height: "30px",
                  border: "2px solid",
                  borderColor: "background.body",
                }}
              />
            </Box>
          </Link>
          <Link
            href={`/profile/${post.creator.id}`}
            sx={{ color: "black" }}
            underline="none"
          >
            <Typography sx={{ fontWeight: "lg" }}>
              {post.creator.username}
            </Typography>
          </Link>

          <IconButton
            variant="plain"
            color="neutral"
            size="sm"
            sx={{ ml: "auto" }}
          >
            <MoreHoriz />
          </IconButton>
        </CardContent>
        <CardOverflow
          sx={
            mediaContentData?.items.length < 2
              ? {}
              : {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }
          }
        >
          {mediaContentData?.items.length < 2 ? (
            <AspectRatio ratio="16/9">
              <Box
                component="img"
                src={mediaContentData?.items[0].media_Url}
                alt={mediaContentData?.items[0].media_type}
                sx={{
                  width: "100%", // Đầy đủ chiều rộng
                  maxHeight: "500px", // Giữ tỷ lệ ảnh
                }}
              />
            </AspectRatio>
          ) : (
            <ImageSwiper postMedia={mediaContentData?.items || []} />
          )}
        </CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{
            alignItems: "center",
            mx: -1,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ width: 0, display: "flex", gap: 0.5 }}>
            <IconButton variant="plain" color="neutral" size="sm">
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
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={() => {
                setOpenComment(true);
              }}
            >
              <ModeCommentOutlined />
            </IconButton>
            <IconButton variant="plain" color="neutral" size="sm">
              <SendOutlined />
            </IconButton>
          </Box>

          <Box sx={{ width: 0, display: "flex", flexDirection: "row-reverse" }}>
            <IconButton variant="plain" color="neutral" size="sm">
              <BookmarkBorderRoundedIcon />
            </IconButton>
          </Box>
        </CardContent>
        <CardContent>
          <Link
            component="button"
            underline="none"
            textColor="text.primary"
            sx={{ fontSize: "sm", fontWeight: "lg" }}
          >
            {post.postReactions} Likes
          </Link>
          <Typography sx={{ fontSize: "sm" }}>
            <Link
              component="button"
              color="neutral"
              textColor="text.primary"
              sx={{ fontWeight: "lg" }}
            >
              {post.creator.username}
            </Link>{" "}
            {post.content}
          </Typography>
          {/* <Link
            component="button"
            underline="none"
            startDecorator="…"
            sx={{ fontSize: "sm", color: "text.tertiary" }}
          >
            more
          </Link> */}
          <Link
            component="button"
            underline="none"
            sx={{ fontSize: "12px", color: "text.tertiary", my: 0.5 }}
          >
            {dayjs(post.create_at).fromNow()}
          </Link>
        </CardContent>
        <CardContent orientation="horizontal" sx={{ gap: 1 }}>
          <Input
            variant="plain"
            size="sm"
            placeholder="Add a comment…"
            sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
          />
          <Link disabled underline="none" role="button">
            Post
          </Link>
        </CardContent>
      </Card>
      <PostComment
        postMedia={mediaContentData?.items || []}
        isOpen={openComment}
        handleClose={() => setOpenComment(false)}
      />
    </>
  );
}
