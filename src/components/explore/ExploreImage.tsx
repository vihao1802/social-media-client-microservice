'use client';

import { PostContext } from '@/context/post-context';
import {
  Favorite,
  Forum,
  CollectionsRounded,
  SmartDisplayRounded,
} from '@mui/icons-material';
import { Box, Skeleton, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import PostComment from '../post/PostComment';
import { useGetMediaContentByPostId } from '@/hooks/media-content/useGetMediaContentByPostId';
import { useGetPostViewerByPostId } from '@/hooks/post-viewer/useGetPostViewerByPostId';
import toast from 'react-hot-toast';
import { PostViewer } from '@/models/post-viewer';
import { useGetCommentByPostId } from '@/hooks/comment/useGetCommentByPostId';

const ExploreImage = () => {
  const { post } = useContext(PostContext);
  if (!post) {
    toast.error('Post not found!');
    return null;
  }
  const [openComment, setOpenComment] = useState(false);

  const { data: postViewerData, isLoading: isPostViewerDataLoading } =
    useGetPostViewerByPostId({ postId: post.id });
  const { data: mediaContentData, isLoading: isMediaContentDataLoading } =
    useGetMediaContentByPostId({ postId: post.id });
  const { data: commentData, isLoading: isCommentDataLoading } =
    useGetCommentByPostId({ postId: post?.id ?? 0 });

  if (
    isMediaContentDataLoading ||
    !mediaContentData ||
    isPostViewerDataLoading ||
    !postViewerData ||
    isCommentDataLoading ||
    !commentData
  )
    return <Skeleton />;

  return (
    <>
      <Box
        className="card"
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          '&:hover .overlay': {
            opacity: 1,
          },
          '&:hover .icons': {
            opacity: 1,
          },
        }}
        onClick={() => setOpenComment(true)}
      >
        {/* Image */}
        <Box
          component={
            mediaContentData?.items[0].media_type?.includes('video')
              ? 'video'
              : 'img'
          }
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          src={mediaContentData?.items[0].media_Url}
        />

        {/* Icon that appears on the bottom right corner of the image */}
        {mediaContentData?.items[0].media_type?.includes('video') ? (
          <SmartDisplayRounded
            sx={{
              position: 'absolute',
              top: '15px',
              right: '10px',
              color: 'white',
            }}
          />
        ) : (
          <CollectionsRounded
            sx={{
              position: 'absolute',
              top: '15px',
              right: '10px',
              color: 'white',
            }}
          />
        )}
        {/* Dark overlay that appears on hover */}
        <Box
          className="overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
          }}
        />
        {/* Icons positioned on top of the image, initially hidden */}
        <Box
          className="icons"
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '10px',
            opacity: 0,
            transition: 'opacity 0.3s ease-in-out',
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
            position: 'absolute',
            top: '50px',
            left: '10px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            gap: '10px',
            opacity: 0,
            transition: 'opacity 0.15s ease-in-out',
          }}
        >
          <Forum />
          <Typography>{commentData.items.length}</Typography>
        </Box>
      </Box>
      <PostComment
        postMedia={mediaContentData?.items || []}
        isOpen={openComment}
        handleClose={() => {
          setOpenComment(false);
        }}
      />
    </>
  );
};

export default ExploreImage;
