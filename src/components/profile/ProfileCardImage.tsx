"use client";
import { Box, Typography } from "@mui/material";
import { useGetMediaContentByPostId } from "@/hooks/media-content/useGetMediaContentByPostId";
import {
  CollectionsRounded,
  Favorite,
  Forum,
  SmartDisplayRounded,
} from "@mui/icons-material";
import { useGetPostViewerByPostId } from "@/hooks/post-viewer/useGetPostViewerByPostId";
import { useGetCommentByPostId } from "@/hooks/comment/useGetCommentByPostId";
import { PostViewer } from "@/models/post-viewer";
import PostComment from "../post/PostComment";
import { useState } from "react";
import { Post } from "@/models/post";

const ProfileCardImage = ({ post }: { post: Post }) => {
  const [openComment, setOpenComment] = useState(false);

  const { data: mediaContentData } = useGetMediaContentByPostId({
    postId: post.id,
  });
  const { data: postViewerData } = useGetPostViewerByPostId({
    postId: post.id,
  });
  const { data: commentData } = useGetCommentByPostId({ postId: post.id });
  return (
    <>
      {mediaContentData && postViewerData && commentData ? (
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            height: "auto",
            aspectRatio: "1",
            position: "relative",
            cursor: "pointer",
            "&:hover .overlay": {
              opacity: 1,
            },
            "&:hover .icons": {
              opacity: 1,
            },
          }}
          onClick={() => setOpenComment(true)}
        >
          <Box
            component="img"
            src={mediaContentData.items[0].media_Url}
            alt={mediaContentData.items[0].media_type}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Dark overlay that appears on hover */}
          <Box
            className="overlay"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.4)",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          />

          {/* Icon that appears on the bottom right corner of the image */}
          {mediaContentData?.items[0].media_type?.includes("video") ? (
            <SmartDisplayRounded
              sx={{
                position: "absolute",
                top: "15px",
                right: "10px",
                color: "white",
              }}
            />
          ) : (
            <CollectionsRounded
              sx={{
                position: "absolute",
                top: "15px",
                right: "10px",
                color: "white",
              }}
            />
          )}

          {/* Icons positioned on top of the image, initially hidden */}
          <Box
            className="icons"
            sx={{
              position: "absolute",
              top: "10px",
              left: "10px",
              color: "white",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: "10px",
              opacity: 0,
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <Favorite />
            <Typography>
              {
                postViewerData.items.filter(
                  (postViewer: PostViewer) => postViewer.liked === true
                ).length
              }
            </Typography>
          </Box>
          <Box
            className="icons"
            sx={{
              position: "absolute",
              top: "50px",
              left: "10px",
              color: "white",
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              gap: "10px",
              opacity: 0,
              transition: "opacity 0.15s ease-in-out",
            }}
          >
            <Forum />
            <Typography>{commentData.items.length}</Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            maxWidth: "300px",
            height: "auto",
            aspectRatio: "1",
            backgroundColor: "#e7e7e7",
          }}
        />
      )}
      {mediaContentData && (
        <PostComment
          postMedia={mediaContentData.items || []}
          post={post}
          isOpen={openComment}
          handleClose={() => {
            console.log("close");

            setOpenComment(false);
          }}
        />
      )}
    </>
  );
};

export default ProfileCardImage;
