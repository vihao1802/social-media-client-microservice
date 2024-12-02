"use client";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  InputBase,
  Modal,
  Typography,
} from "@mui/material";
import {
  MoreHorizRounded,
  FavoriteBorderRounded,
  SendOutlined,
  BookmarkBorderRounded,
  FavoriteRounded,
  FavoriteBorderOutlined,
  CloseRounded,
} from "@mui/icons-material";
import React, { useContext, useEffect, useRef, useState } from "react";
import ImageSwiper from "../post/ImageSwiper";
import { MediaContent } from "@/models/media-content";
import { PostContext } from "@/context/post-context";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import { useGetCommentByPostId } from "@/hooks/comment/useGetCommentByPostId";
import GradientCircularProgress from "../shared/Loader";
import { Comment, GroupComment } from "@/models/comment";
import GroupCommentComponent from "./GroupComment";
import { useGetPostViewerByPostId } from "@/hooks/post-viewer/useGetPostViewerByPostId";
import { PostViewer, PostViewerRequest } from "@/models/post-viewer";
import { usePostComment } from "@/hooks/comment/usePostComment";
import toast from "react-hot-toast";
import { CommentContext } from "@/context/comment-context";
import { useCreatePostViewer } from "@/hooks/post-viewer/useCreatePostViewer";
import { useDeletePostViewer } from "@/hooks/post-viewer/useDeletePostViewer";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { Post } from "@/models/post";

// Kích hoạt plugin

const PostComment = ({
  isOpen,
  postMedia,
  handleClose,
  post: propPost = null,
}: {
  isOpen: boolean;
  postMedia: MediaContent[];
  handleClose: () => void;
  post?: Post | null;
}) => {
  const { user: currentUser } = useAuthenticatedUser();
  if (!currentUser) return null;

  const { post: contextPost } = useContext(PostContext);
  const post = propPost || contextPost;

  const { data: commentData, isLoading: isCommentDataLoading } =
    useGetCommentByPostId({ postId: post?.id ?? 0 });

  const { data: postViewerData, isLoading: isPostViewerDataLoading } =
    useGetPostViewerByPostId({ postId: post?.id ?? 0 });

  const [commentContent, setCommentContent] = useState("");
  const [parentCommentId, setParentCommentId] = useState<number | null>(null);
  const createComment = usePostComment();
  const handleClickComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (post === null) {
      toast.error("Post not found!");
      return;
    }
    const commentData = new FormData();
    commentData.append("content", commentContent);
    commentData.append("postId", String(post.id));
    commentData.append("userId", String(currentUser.id));
    if (parentCommentId && commentContent.includes("@")) {
      commentData.append("parentCommentId", String(parentCommentId));
    }
    await createComment(commentData);
    toast.success("Commented successfully!");
    setCommentContent("");
    setParentCommentId(null);
  };

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
    isCommentDataLoading ||
    !commentData ||
    isPostViewerDataLoading ||
    !postViewerData
  )
    return <GradientCircularProgress />;
  dayjs.extend(relativeTime);

  const isLiked = postViewerData.items.some(
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
      if (post === null) {
        toast.error("Post or user not found!");
        return null;
      }
      const postViewerData: PostViewerRequest = {
        postId: post.id,
        userId: currentUser.id,
        liked: true,
      };
      const postViewerResponse = await createPostViewer(postViewerData);
      setPostViewerId(postViewerResponse.id);
    }
  };

  // Nhóm các comment theo main comment và sub comment
  const groupedComments = new Map();
  commentData?.items.forEach((comment: Comment) => {
    if (comment.parentComment === null) {
      // Nếu là main comment, thêm vào map
      groupedComments.set(comment.id, {
        mainComment: comment,
        subComments: [],
      });
    } else {
      // Nếu là sub comment, thêm vào danh sách subComments của main comment tương ứng
      const parentId = comment.parentComment.id;
      if (!groupedComments.has(parentId)) {
        groupedComments.set(parentId, { mainComment: null, subComments: [] });
      }
      groupedComments.get(parentId).subComments.push(comment);
    }
  });

  // Chuyển map thành array và lọc bỏ các nhóm không có main comment
  const commentList = Array.from(groupedComments.values()).filter(
    (group) => group.mainComment !== null
  );

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
          <CommentContext.Provider
            value={{
              parentCommentId,
              commentContent,
              setParentCommentId,
              setCommentContent,
            }}
          >
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
              {commentList.length > 0 ? (
                commentList
                  .sort(
                    (a: GroupComment, b: GroupComment) =>
                      new Date(b.mainComment.createdAt).getTime() -
                      new Date(a.mainComment.createdAt).getTime()
                  )
                  .map((groupComment: GroupComment, index: number) => (
                    <GroupCommentComponent
                      key={index}
                      groupComment={groupComment}
                    />
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
          </CommentContext.Provider>

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
                <IconButton onClick={handleClickLike}>
                  {isLiked ? (
                    <FavoriteRounded
                      sx={{
                        color: "red",
                      }}
                    />
                  ) : (
                    <FavoriteBorderOutlined />
                  )}
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
                {
                  postViewerData.items.filter(
                    (postViewer: PostViewer) => postViewer.liked === true
                  ).length
                }{" "}
                Likes
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
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
            />
            <Button
              sx={{
                height: "30px",
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "capitalize",
                padding: "5px 10px",
              }}
              disabled={!commentContent}
              onClick={handleClickComment}
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
