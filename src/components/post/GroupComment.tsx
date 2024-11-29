import { Comment, GroupComment } from "@/models/comment";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Typography,
} from "@mui/material";
import Link from "next/link";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { useGetCommentReaction } from "@/hooks/comment-reaction/useGetCommentReaction";
import { getUserId_Cookie } from "@/utils/handleCookies";
import {
  CommentReaction,
  CommentReactionRequest,
} from "@/models/comment-reaction";
import { CommentContext } from "@/context/comment-context";
import { usePostCommentReaction } from "@/hooks/comment-reaction/usePostCommentReaction";
import { useDeleteCommentReaction } from "@/hooks/comment-reaction/useDeleteCommentReaction";
import toast from "react-hot-toast";

const CommentComponent = ({ comment }: { comment: Comment }) => {
  const userId = getUserId_Cookie();

  const { setParentCommentId, setCommentContent } = useContext(CommentContext);

  const { data: commentReactionData, isLoading: isCommentReactionDataLoading } =
    useGetCommentReaction({ commentId: comment.id });

  const [commentReactionId, setCommentReactionId] = useState(0);
  const createCommentReaction = usePostCommentReaction();
  const deleteCommentReaction = useDeleteCommentReaction();

  useEffect(() => {
    if (commentReactionData) {
      const commentReaction = commentReactionData.items.find(
        (item: CommentReaction) => item.userId === userId
      );
      if (commentReaction) {
        setCommentReactionId(commentReaction.id);
      }
    }
  }, [commentReactionData]);

  if (isCommentReactionDataLoading || !commentReactionData) return null;

  const isLiked = commentReactionData.items.some(
    (item: CommentReaction) => item.userId === userId
  );

  const handleClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLiked) {
      if (commentReactionId !== 0) {
        await deleteCommentReaction(commentReactionId);
      } else {
        toast.error("Comment Reaction not found!");
        return null;
      }
    } else {
      if (userId === null) {
        toast.error("User not found!");
        return null;
      }
      const commentReactionData: CommentReactionRequest = {
        userId: userId,
        commentId: comment.id,
      };
      const commentReactionResponse = await createCommentReaction(
        commentReactionData
      );
      setCommentReactionId(commentReactionResponse.id);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "start",
      }}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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
            <IconButton
              sx={{
                height: "20px",
                width: "20px",
              }}
              onClick={handleClickLike}
            >
              {isLiked ? (
                <FavoriteRounded
                  sx={{
                    color: "red",
                    fontSize: "13px",
                  }}
                />
              ) : (
                <FavoriteBorderOutlined
                  sx={{ color: "#858585", fontSize: "13px" }}
                />
              )}
            </IconButton>
          </Box>

          <Typography sx={{ fontSize: "14px" }}>{comment.content}</Typography>
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
          <Typography sx={{ fontSize: "12px", color: "#858585" }}>
            {commentReactionData.totalItems} likes
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "#858585",
              ":hover": { color: "#000", cursor: "pointer" },
            }}
            onClick={() => {
              setParentCommentId(comment.parentComment.id);
              setCommentContent("@" + comment.user.username + " ");
            }}
          >
            Reply
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const GroupCommentComponent = ({
  groupComment,
}: {
  groupComment: GroupComment;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSubComments = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Box>
      {/* Main Comment */}
      <CommentComponent comment={groupComment.mainComment} />

      {/* Toggle Button */}
      {groupComment.subComments && groupComment.subComments.length > 0 && (
        <Button
          onClick={toggleSubComments}
          variant="text"
          size="small"
          sx={{ mt: 1, ml: 4 }}
        >
          {isExpanded ? "Hide Replies" : "Show Replies"} (
          {groupComment.subComments.length})
        </Button>
      )}

      {/* Subcomments */}
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <Box
          sx={{
            pl: 4, // Indentation for subcomments
            borderLeft: "2px solid #e0e0e0", // Optional: A border for visual hierarchy
            mt: 1, // Space above the subcomments list
            display: "flex",
            flexDirection: "column",
            gap: 1, // Space between subcomments
          }}
        >
          {groupComment.subComments?.map(
            (subComment: Comment, index: number) => (
              <CommentComponent key={index} comment={subComment} />
            )
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default GroupCommentComponent;
