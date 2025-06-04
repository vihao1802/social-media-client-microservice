/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { use, useContext, useEffect, useState, MouseEvent } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardCover from '@mui/joy/CardCover';
import CardOverflow from '@mui/joy/CardOverflow';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import MoreHoriz from '@mui/icons-material/MoreHoriz';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlined from '@mui/icons-material/ModeCommentOutlined';
import {
  GroupRounded,
  PublicRounded,
  LockRounded,
  VolumeUp,
  VolumeOff,
} from '@mui/icons-material';
import PostComment from '@/components/post/PostComment';
import { useGetMediaContentByPostId } from '@/hooks/media-content/useGetMediaContentByPostId';
import ImageSwiper from './ImageSwiper';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { PostContext } from '@/context/post-context';
import { Button, Divider, Menu, MenuItem, Skeleton } from '@mui/material';
import { useGetPostViewerByPostId } from '@/hooks/post-viewer/useGetPostViewerByPostId';
import { PostViewer, PostViewerRequest } from '@/models/post-viewer';
import { FavoriteRounded } from '@mui/icons-material';
import { usePostComment } from '@/hooks/comment/usePostComment';
import toast from 'react-hot-toast';
import { useCreatePostViewer } from '@/hooks/post-viewer/useCreatePostViewer';
import { useDeletePostViewer } from '@/hooks/post-viewer/useDeletePostViewer';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import PostForm from './PostForm';

export default function PostComponent() {
  const { user: currentUser } = useAuthenticatedUser();
  if (!currentUser) return null;

  const { post } = useContext(PostContext);
  const [openComment, setOpenComment] = useState(false);

  if (!post) {
    toast.error('Post not found!');
    return null;
  }

  const { data: mediaContentData, isLoading: isMediaContentDataLoading } =
    useGetMediaContentByPostId({ postId: post.id });

  const [commentContent, setCommentContent] = useState('');
  const createComment = usePostComment();
  const handleClickComment = async () => {
    const commentData = new FormData();
    commentData.append('content', commentContent);
    commentData.append('postId', String(post.id));
    commentData.append('userId', String(currentUser.id));
    await createComment(commentData);
    toast.success('Commented successfully!');
    setCommentContent('');
  };

  const [postViewerId, setPostViewerId] = useState('');
  const createPostViewer = useCreatePostViewer();
  const deletePostViewer = useDeletePostViewer();

  const [anchorElMenu, setAnchorElMenu] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorElMenu);
  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const [openPostForm, setOpenPostForm] = useState(false);

  const handleClickOpenPostForm = () => {
    setOpenPostForm(true);
  };

  const handleClosePostForm = () => {
    setOpenPostForm(false);
  };

  // const [muted, setMuted] = useState(true);

  if (isMediaContentDataLoading || !mediaContentData)
    return <Skeleton height={500} />;

  dayjs.extend(relativeTime);

  const isLiked = post?.liked || false;

  const handleClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLiked) {
      if (postViewerId !== '') {
        // await deletePostViewer(postViewerId, post.id);
      } else {
        toast.error('Post viewer not found!');
        return null;
      }
    } else {
      const postViewerData: PostViewerRequest = {
        postId: post.id,
        userId: currentUser.id,
        liked: true,
      };
      const postViewerResponse = await createPostViewer(postViewerData);
      setPostViewerId(postViewerResponse.id);
    }
  };

  return (
    <>
      <Card variant="outlined" sx={{ minWidth: 300 }}>
        <CardContent
          orientation="horizontal"
          sx={{ alignItems: 'center', gap: 1 }}
        >
          <Link
            href={`/profile/${post.creator.id}`}
            sx={{ color: 'black' }}
            underline="none"
          >
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  m: '-2px',
                  borderRadius: '50%',
                  background:
                    'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
                },
              }}
            >
              <Avatar
                size="sm"
                src={post.creator.profileImg || '/icons/person.png'}
                sx={{
                  width: '30px',
                  height: '30px',
                  border: '2px solid',
                  borderColor: 'background.body',
                }}
              />
            </Box>
          </Link>
          <Link
            href={`/profile/${post.creator.id}`}
            sx={{ color: 'black' }}
            underline="none"
          >
            <Typography sx={{ fontWeight: 'lg' }}>
              {post.creator.username}
            </Typography>
          </Link>

          <Typography fontSize="10px">●</Typography>

          {post.visibility === 0 ? (
            <PublicRounded sx={{ fontSize: '16px' }} />
          ) : post.visibility === 1 ? (
            <GroupRounded sx={{ fontSize: '16px' }} />
          ) : (
            <LockRounded sx={{ fontSize: '16px' }} />
          )}

          {post.creator.id === currentUser.id && (
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              sx={{ ml: 'auto' }}
              onClick={handleClickMenu}
            >
              <MoreHoriz />
            </IconButton>
          )}
        </CardContent>
        <CardOverflow
          sx={
            mediaContentData?.length > 1
              ? {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }
              : undefined
          }
        >
          {mediaContentData.length > 1 ? (
            <ImageSwiper postMedia={mediaContentData || []} />
          ) : (
            <AspectRatio ratio="3/2">
              {mediaContentData[0].mediaType === 'IMAGE' ? (
                <Box
                  component="img"
                  src={
                    'http://localhost:9007/global-storage/' +
                    mediaContentData[0].mediaUrl
                  }
                  alt={mediaContentData[0].mediaType}
                  sx={{
                    width: '100%', // Đầy đủ chiều rộng
                    maxHeight: '500px', // Giữ tỷ lệ ảnh
                  }}
                />
              ) : (
                <Box
                  component="video"
                  controls
                  autoPlay
                  src={
                    'http://localhost:9007/global-storage/' +
                    mediaContentData[0].mediaUrl
                  }
                  height="100%"
                  width="100%"
                  sx={{
                    objectFit: 'cover',
                    // borderRadius: "5px",
                    backgroundColor: '#000',
                  }}
                />
                // <video autoPlay loop muted={muted}>
                //   <source
                //     src={"http://localhost:9007/global-storage/" + mediaContentData[0].mediaUrl}
                //     type="video/mp4"
                //   />
                // </video>
              )}
              {/* {mediaContentData[0].mediaType === 'video' && (
                <Typography
                  sx={{
                    position: 'absolute',
                    bottom: 15,
                    right: 15,
                    cursor: 'pointer',
                  }}
                  onClick={() => setMuted(!muted)}
                >
                  {muted ? (
                    <VolumeOff sx={{ color: 'white' }} />
                  ) : (
                    <VolumeUp sx={{ color: 'white' }} />
                  )}
                </Typography>
              )} */}
            </AspectRatio>
          )}
        </CardOverflow>
        <CardContent
          orientation="horizontal"
          sx={{
            alignItems: 'center',
            mx: -1,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ width: 0, display: 'flex', gap: 0.5 }}>
            <IconButton
              variant="plain"
              color="neutral"
              size="sm"
              onClick={handleClickLike}
            >
              {isLiked ? (
                <FavoriteRounded
                  sx={{
                    color: 'red',
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
          </Box>
        </CardContent>
        <CardContent>
          <Typography>{post?.likeCount || 0} Likes</Typography>
          <Typography sx={{ fontSize: 'sm' }}>
            <Typography>{post.creator.username}</Typography> {post.content}
          </Typography>
          <Typography
            sx={{ fontSize: '12px', color: 'text.tertiary', my: 0.5 }}
          >
            {dayjs(post.create_at).fromNow()}
          </Typography>
        </CardContent>
        <CardContent orientation="horizontal" sx={{ gap: 1 }}>
          <Input
            variant="plain"
            size="sm"
            placeholder="Add a comment…"
            sx={{ flex: 1, px: 0, '--Input-focusedThickness': '0px' }}
            value={commentContent}
            onChange={(e) => {
              setCommentContent(e.target.value);
            }}
          />
          <Button disabled={!commentContent} onClick={handleClickComment}>
            Post
          </Button>
        </CardContent>
      </Card>

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
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                width: 200,

                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleCloseMenu}>
            <Typography sx={{ color: 'red', fontWeight: 'bold' }}>
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

          <Divider />
          <MenuItem onClick={handleCloseMenu}>Cancel</MenuItem>
        </Menu>
      )}

      {/* Comment Modal */}
      {openComment && (
        <PostComment
          postMedia={mediaContentData || []}
          isOpen={openComment}
          handleClose={() => setOpenComment(false)}
        />
      )}

      {/* Post Form */}
      {openPostForm && (
        <PostForm
          post={post}
          postMedia={mediaContentData || []}
          open={openPostForm}
          handleClose={handleClosePostForm}
        />
      )}
    </>
  );
}
