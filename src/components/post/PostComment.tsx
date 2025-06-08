'use client';

import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Modal,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import {
  MoreHorizRounded,
  FavoriteBorderRounded,
  SendOutlined,
  BookmarkBorderRounded,
  FavoriteRounded,
  FavoriteBorderOutlined,
  CloseRounded,
  PublicRounded,
  GroupRounded,
  LockRounded,
} from '@mui/icons-material';
import React, { useContext, useEffect, useState, MouseEvent } from 'react';
import ImageSwiper from '../post/ImageSwiper';
import { MediaContent } from '@/models/media-content';
import { PostContext } from '@/context/post-context';
import relativeTime from 'dayjs/plugin/relativeTime';
import dayjs from 'dayjs';
import { useGetCommentByPostId } from '@/hooks/comment/useGetCommentByPostId';
import GradientCircularProgress from '../shared/Loader';
import { Comment, GroupComment } from '@/models/comment';
import GroupCommentComponent from './GroupComment';
import { useGetPostViewerByPostId } from '@/hooks/post-viewer/useGetPostViewerByPostId';
import { PostViewer, PostViewerRequest } from '@/models/post-viewer';
import { usePostComment } from '@/hooks/comment/usePostComment';
import toast from 'react-hot-toast';
import { CommentContext } from '@/context/comment-context';
import { useCreatePostViewer } from '@/hooks/post-viewer/useCreatePostViewer';
import { useDeletePostViewer } from '@/hooks/post-viewer/useDeletePostViewer';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { Post } from '@/models/post';
import PostForm from './PostForm';
import { useRouter } from 'next/navigation';
import { ListResponse } from '@/models/api';

// Kích hoạt plugin

const PostComment = ({
  isOpen,
  postMedia,
  handleClose,
}: {
  isOpen: boolean;
  postMedia: MediaContent[];
  handleClose: () => void;
}) => {
  const { user: currentUser } = useAuthenticatedUser();
  if (!currentUser) return null;

  const router = useRouter();

  const { post, mutatePosts } = useContext(PostContext);

  if (!post) {
    toast.error('Post not found!');
    return null;
  }

  const { data: commentRootData, isLoading: isCommentRootDataLoading } =
    useGetCommentByPostId({ postId: post?.id ?? '' });

  const [commentContent, setCommentContent] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const createComment = usePostComment();
  const handleClickComment = async () => {
    const commentFormData = new FormData();
    commentFormData.append('content', commentContent);
    commentFormData.append('post_id', String(post.id));
    commentFormData.append('user_id', String(currentUser.id));
    if (replyTo && commentContent.includes('@')) {
      commentFormData.append('reply_to', String(replyTo));
    }
    const res = await createComment(commentFormData);
    if (res) {
      toast.success('Commented successfully!');
      setCommentContent('');
      setReplyTo(null);
    }
  };

  const handleKeyDownComment = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handleClickComment(); // Gọi lại handler của button
    }
  };

  const createPostViewer = useCreatePostViewer();
  const deletePostViewer = useDeletePostViewer();

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

  if (isCommentRootDataLoading || !commentRootData)
    return (
      <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            width: '70%',
            height: '95%',
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '7px',
            padding: 2,
            gap: 2,
          }}
        >
          {/* Ảnh bên trái */}
          <Skeleton
            variant="rectangular"
            width="60%"
            height="100%"
            sx={{ borderRadius: 2 }}
          />

          {/* Các comment bên phải */}
          <Box sx={{ flex: 1, overflowY: 'auto' }}>
            {[1, 2, 3].map((_, i) => (
              <Box key={i} sx={{ display: 'flex', mb: 2, gap: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton width="30%" height={20} />
                  <Skeleton width="90%" height={20} />
                  <Skeleton width="50%" height={20} />
                </Box>
                <Skeleton variant="circular" width={20} height={20} />
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    );
    
  dayjs.extend(relativeTime);

  const isLiked = post?.liked;

  const handleClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!post ||!post.id || !currentUser.id) return;
    const postViewerData: PostViewerRequest = {
      postId: post.id,
      userId: currentUser.id,
    };  
    if (isLiked) {
      await deletePostViewer(postViewerData);
    } else {
      await createPostViewer(postViewerData);
    }

    const isLiking = !isLiked;
    await mutatePosts((pages: ListResponse<Post>[]) =>
      pages.map((page: ListResponse<Post>) => ({
        ...page,
        items: page.items.map((p: Post) =>
          p.id === post.id
            ? {
                ...p,
                liked: isLiking ? true : false,
                likeCount: (p.likeCount || 0) + (isLiking ? 1 : -1),
              }
            : p
        ),
      }))
    );
  };

  // Nhóm các comment theo main comment và sub comment
  // const groupedComments = new Map();
  // commentRootData?.items.forEach((comment: Comment) => {
  //   if (comment.parentComment === null) {
  //     // Nếu là main comment, thêm vào map
  //     groupedComments.set(comment.id, {
  //       mainComment: comment,
  //       subComments: [],
  //     });
  //   } else {
  //     // Nếu là sub comment, thêm vào danh sách subComments của main comment tương ứng
  //     const parentId = comment.parentComment.id;
  //     if (!groupedComments.has(parentId)) {
  //       groupedComments.set(parentId, { mainComment: null, subComments: [] });
  //     }
  //     groupedComments.get(parentId).subComments.push(comment);
  //   }
  // });

  // // Chuyển map thành array và lọc bỏ các nhóm không có main comment
  // const commentList = Array.from(groupedComments.values()).filter(
  //   (group) => group.mainComment !== null
  // );

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
      >
        <Box
          sx={{
            width: 'auto',
            height: '95%',
            bgcolor: 'white',
            display: 'flex',
            flexDirection: 'row',
            borderRadius: '7px',
          }}
        >
          <ImageSwiper postMedia={postMedia} />

          <Box
            sx={{
              width: '500px',
            }}
          >
            {/* Header */}
            <Box
              sx={{
                height: '60px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 10px 14px 14px',
                borderBottom: '1px solid #e0e0e0',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: '15px',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`/profile/${post?.creator.id}`)}
              >
                <Avatar
                  src={post?.creator.profileImg}
                  sx={{ height: '32px', width: '32px' }}
                />
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {post?.creator.username}
                </Typography>

                <Typography fontSize="10px">●</Typography>

                {post && post.visibility === 0 ? (
                  <PublicRounded sx={{ fontSize: '16px' }} />
                ) : post && post.visibility === 1 ? (
                  <GroupRounded sx={{ fontSize: '16px' }} />
                ) : (
                  <LockRounded sx={{ fontSize: '16px' }} />
                )}
              </Box>

              {currentUser.id === post?.creator.id && (
                <IconButton onClick={handleClickMenu}>
                  <MoreHorizRounded sx={{ color: 'black' }} />
                </IconButton>
              )}
            </Box>

            {/* Show comment */}
            <CommentContext.Provider
              value={{
                replyTo,
                commentContent,
                setReplyTo,
                setCommentContent,
              }}
            >
              <Box
                sx={{
                  height: 'calc(100% - 220px)',
                  overflowY: 'scroll',
                  padding: '10px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                '::-webkit-scrollbar': { width: 0 },
              }}
            >
              {commentRootData.items.length > 0 ? (
                commentRootData.items.map((commentRoot: Comment) => (
                  <GroupCommentComponent
                    key={commentRoot.id}
                    commentRoot={commentRoot}
                  />
                ))
              ) : (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: '18px',
                    color: 'darkgray',
                  }}
                >
                  No comment
                </Box>
              )}
            </Box>
            </CommentContext.Provider>
            {/* <CommentContext.Provider
              value={{
                replyTo,
                commentContent,
                setReplyTo,
                setCommentContent,
              }}
            >
              <Box
                sx={{
                  height: 'calc(100% - 220px)',
                  overflowY: 'scroll',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '15px',
                  '::-webkit-scrollbar': { width: 0 },
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
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                      fontSize: '18px',
                      color: 'darkgray',
                    }}
                  >
                    No comment
                  </Box>
                )}
              </Box>
            </CommentContext.Provider> */}

            {/* Comment Action */}
            <Box
              sx={{ height: '100px', display: 'flex', flexDirection: 'column' }}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTop: '1px solid #e0e0e0',
                  padding: '5px 10px',
                }}
              >
                <Box>
                  <IconButton onClick={handleClickLike}>
                    {isLiked ? (
                      <FavoriteRounded
                        sx={{
                          color: 'red',
                        }}
                      />
                    ) : (
                      <FavoriteBorderOutlined />
                    )}
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ padding: '0 20px' }}>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                  {post?.likeCount || 0} Likes
                </Typography>
                <Typography sx={{ fontSize: '12px', color: '#858585 ' }}>
                  {post && dayjs.utc(post.createdAt).local().fromNow()}
                </Typography>
              </Box>
            </Box>

            {/* Comment Box */}
            <Box
              sx={{
                height: '60px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '10px',
                borderTop: '1px solid #e0e0e0',
              }}
              onKeyDown={handleKeyDownComment}
            >
              <InputBase
                placeholder="Add comment..."
                sx={{ color: 'black', flexGrow: 1, ml: 1 }}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />
              <Button
                sx={{
                  height: '30px',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  padding: '5px 10px',
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

      {/* Post Form */}
      {openPostForm && (
        <PostForm
          post={post}
          postMedia={postMedia}
          open={openPostForm}
          handleClose={handleClosePostForm}
        />
      )}
    </>
  );
};

export default PostComment;
