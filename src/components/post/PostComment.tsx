"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import {
  MoreHorizRounded,
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  SendOutlined,
  BookmarkBorderRounded,
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import React, { useContext, useRef, useState } from "react";
import postImg from "@/assets/images/post-img.jpg";
import postImg1 from "@/assets/images/post-img1.jpg";
import postImg2 from "@/assets/images/post-img2.jpg";
import postImg3 from "@/assets/images/post-img3.jpg";
import Link from "next/link";
import ImageSwiper from "../post/ImageSwiper";
import { MediaContent } from "@/models/media-content";
import { Post } from "@/models/post";
import { PostContext } from "@/context/post-context";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useGetCommentByPostId } from "@/hooks/comment/useGetCommentByPostId";
import GradientCircularProgress from "../shared/Loader";
import { Comment } from "@/models/comment";

// Kích hoạt plugin

const postImages = [postImg, postImg1, postImg2, postImg3];

const PostComment = ({
  isOpen,
  postMedia,
  handleClose,
}: {
  isOpen: boolean;
  postMedia: MediaContent[];
  handleClose: () => void;
}) => {
  const { post } = useContext(PostContext);
  const { data: commentData, isLoading: isCommentDataLoading } =
    useGetCommentByPostId({ postId: post?.id ?? 0 });

  if (isCommentDataLoading) return <GradientCircularProgress />;
  dayjs.extend(relativeTime);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      sx={{
        position: "fixed",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "auto",
          height: "95%",
          bgcolor: "white",
          display: "flex",
          flexDirection: "row",
          borderRadius: "7px",
        }}
      >
        <ImageSwiper postMedia={postMedia} />

        <Box
          sx={{
            width: "500px",
          }}
        >
          {/* Header */}
          <Box
            sx={{
              height: "60px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 10px 14px 14px",
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <Avatar
                src={post?.creator.profile_img}
                sx={{ height: "32px", width: "32px" }}
              />
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {post?.creator.username}
              </Typography>
            </Box>
            <IconButton>
              <MoreHorizRounded sx={{ color: "black" }} />
            </IconButton>
          </Box>

          {/* Show comment */}
          <Box
            sx={{
              height: "calc(100% - 220px)",
              overflowY: "scroll",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              "::-webkit-scrollbar": { width: 0 },
            }}
          >
            {commentData.items.length > 0 ? (
              commentData.items.map((comment: Comment, index: number) => (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "start",
                  }}
                  key={index}
                >
                  <Box width="10%">
                    <Link href={`/profile/${comment.user.id}`}>
                      <Avatar
                        src={comment.user.profile_img}
                        sx={{ height: "32px", width: "32px" }}
                      />
                    </Link>
                  </Box>

                  <Box
                    sx={{
                      width: "90%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                        backgroundColor: "#f0f2f5",
                        padding: "10px",
                        borderRadius: "10px",
                      }}
                    >
                      <Link href={`/profile/${comment.user.id}`}>
                        <Typography
                          sx={{
                            fontSize: "14px",
                            fontWeight: "bold",
                            ":hover": { color: "#858585" },
                          }}
                        >
                          {comment.user.username}
                        </Typography>
                      </Link>
                      <Typography sx={{ fontSize: "14px" }}>
                        {comment.content}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                        marginTop: "5px",
                      }}
                    >
                      <Typography sx={{ fontSize: "12px", color: "#858585" }}>
                        {dayjs(comment.createdAt).fromNow()}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "12px",
                          color: "#858585",
                          ":hover": { color: "#000", cursor: "pointer" },
                        }}
                      >
                        Reply
                      </Typography>
                      <IconButton
                        sx={{
                          height: "20px",
                          width: "20px",
                        }}
                      >
                        <FavoriteBorderOutlined
                          sx={{ color: "#858585", fontSize: "13px" }}
                        />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "100%",
                  fontSize: "18px",
                  color: "darkgray",
                }}
              >
                No comment
              </Box>
            )}
          </Box>

          {/* Comment Action */}
          <Box
            sx={{ height: "100px", display: "flex", flexDirection: "column" }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid #e0e0e0",
                padding: "5px 10px",
              }}
            >
              <Box>
                <IconButton>
                  <FavoriteBorderRounded />
                </IconButton>
                <IconButton>
                  <SendOutlined />
                </IconButton>
              </Box>

              <IconButton>
                <BookmarkBorderRounded />
              </IconButton>
            </Box>
            <Box sx={{ padding: "0 20px" }}>
              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>
                {post?.postReactions} likes
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#858585 " }}>
                {dayjs(post?.create_at).fromNow()}
              </Typography>
            </Box>
          </Box>

          {/* Comment Box */}
          <Box
            sx={{
              height: "60px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              padding: "10px",
              borderTop: "1px solid #e0e0e0",
            }}
          >
            <InputBase
              placeholder="Add comment..."
              sx={{ color: "black", flexGrow: 1, ml: 1 }}
            />
            <Button
              sx={{
                height: "30px",
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "capitalize",
                padding: "5px 10px",
              }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default PostComment;
