import { Comment, GroupComment } from '@/models/comment';
import { FavoriteBorderOutlined, FavoriteRounded } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import dayjs from 'dayjs';
import React, { useContext, useEffect, useState } from 'react';
import { useGetCommentReaction } from '@/hooks/comment-reaction/useGetCommentReaction';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';

import {
  CommentReaction,
  CommentReactionRequest,
} from '@/models/comment-reaction';
import { usePostCommentReaction } from '@/hooks/comment-reaction/usePostCommentReaction';
import { useDeleteCommentReaction } from '@/hooks/comment-reaction/useDeleteCommentReaction';
import toast from 'react-hot-toast';
import { useGetCommentReplies } from '@/hooks/comment/useGetCommentReplies';
import { CommentContext } from '@/context/comment-context';

const CommentComponent = ({ comment }: { comment: Comment }) => {
  const { user: currentUser } = useAuthenticatedUser();
  if (!currentUser) return null;

  const { setReplyTo, setCommentContent } = useContext(CommentContext);

  // const { data: commentReactionData, isLoading: isCommentReactionDataLoading } =
  //   useGetCommentReaction({ commentId: comment.id });

  // const [commentReactionId, setCommentReactionId] = useState('');
  // const createCommentReaction = usePostCommentReaction();
  // const deleteCommentReaction = useDeleteCommentReaction();

  // useEffect(() => {
  //   if (commentReactionData) {
  //     const commentReaction = commentReactionData.items.find(
  //       (item: CommentReaction) => item.userId === currentUser.id
  //     );
  //     if (commentReaction) {
  //       setCommentReactionId(commentReaction.id);
  //     }
  //   }
  // }, [commentReactionData]);

  // if (isCommentReactionDataLoading || !commentReactionData) return null;

  const isLiked = comment?.liked || false;

  const createCommentReaction = usePostCommentReaction();
  const deleteCommentReaction = useDeleteCommentReaction();
  
  const handleClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const commentReactionData: CommentReactionRequest = {
        commentId: comment.id,
        userId: currentUser.id,
      };
      if (isLiked) {
        await deleteCommentReaction(commentReactionData);
      } else {
        await createCommentReaction(commentReactionData);
      }
  
      // const isLiking = !isLiked;
      // await mutatePosts((pages: ListResponse<Post>[]) =>
      //   pages.map((page: ListResponse<Post>) => ({
      //     ...page,
      //     items: page.items.map((p: Post) =>
      //       p.id === post.id
      //         ? {
      //             ...p,
      //             liked: isLiking ? true : false,
      //             likeCount: (p.likeCount || 0) + (isLiking ? 1 : -1),
      //           }
      //         : p
      //     ),
      //   }))
      // );
  };

  // const handleClickLike = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   e.preventDefault();
  //   if (isLiked) {
  //     if (commentReactionId !== '') {
  //       await deleteCommentReaction(commentReactionId, comment.id);
  //     } else {
  //       toast.error('Comment Reaction not found!');
  //       return null;
  //     }
  //   } else {
  //     const commentReactionData: CommentReactionRequest = {
  //       userId: currentUser.id,
  //       commentId: comment.id,
  //     };
  //     const commentReactionResponse =
  //       await createCommentReaction(commentReactionData);
  //     setCommentReactionId(commentReactionResponse.id);
  //   }
  // };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'start',
      }}
    >
      <Box width="10%">
        <Link href={`/profile/${comment.user.id}`}>
          <Avatar
            src={comment.user.profileImg}
            sx={{ height: '32px', width: '32px' }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: '90%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
            backgroundColor: '#f0f2f5',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Link href={`/profile/${comment.user.id}`}>
              <Typography
                sx={{
                  fontSize: '14px',
                  fontWeight: 'bold',
                  ':hover': { color: '#858585' },
                }}
              >
                {comment.user.username}
              </Typography>
            </Link>
            <IconButton
              sx={{
                height: '20px',
                width: '20px',
              }}
              onClick={handleClickLike}
            >
              {isLiked ? (
                <FavoriteRounded
                  sx={{
                    color: 'red',
                    fontSize: '13px',
                  }}
                />
              ) : (
                <FavoriteBorderOutlined
                  sx={{ color: '#858585', fontSize: '13px' }}
                />
              )}
            </IconButton>
          </Box>

          <Typography sx={{ fontSize: '14px' }}>{comment.content}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '10px',
            alignItems: 'center',
            marginTop: '5px',
          }}
        >
          <Typography sx={{ fontSize: '12px', color: '#858585' }}>
            {dayjs.utc(comment.createdAt).local().fromNow()}
          </Typography>
          <Typography sx={{ fontSize: '12px', color: '#858585' }}>
            {comment.likeCount || 0} likes
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              color: '#858585',
              ':hover': { color: '#000', cursor: 'pointer' },
            }}
            onClick={() => {
              if (comment.replyTo) {
                setReplyTo(comment.replyTo);
              } else setReplyTo(comment.id);
              setCommentContent('@' + comment.user.username + ' ');
            }}
          >
            Reply
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const GroupCommentComponent = ({ commentRoot }: { commentRoot: Comment }) => {
  if (!commentRoot) return null;

  const [showReplies, setShowReplies] = useState(false);

  const toggleShowReplies = () => {
    setShowReplies((prev) => !prev);
  };

  const { data: commentReplies, isLoading: isCommentRepliesLoading } =
    useGetCommentReplies({
      commentId: commentRoot.id,
      enabled: showReplies,
    });

  return (
    <Box key={commentRoot.id}>
      {/* Main Comment */}
      <CommentComponent key={commentRoot.id} comment={commentRoot} />

      {/* Toggle Button */}
      {commentRoot.childCount > 0 && (
        <Button
          onClick={toggleShowReplies}
          variant="text"
          size="small"
          sx={{ mt: 1, ml: 4 }}
        >
          {showReplies ? 'Hide Replies' : 'Show Replies'} (
          {commentRoot.childCount})
        </Button>
      )}

      {/* Subcomments */}
      <Collapse in={showReplies} timeout="auto" unmountOnExit>
        <Box
          sx={{
            pl: 4, // Indentation for subcomments
            borderLeft: '2px solid #e0e0e0', // Optional: A border for visual hierarchy
            mt: 1, // Space above the subcomments list
            display: 'flex',
            flexDirection: 'column',
            gap: 1, // Space between subcomments
          }}
        >
          {showReplies &&
            (isCommentRepliesLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px 16px',
                  gap: '10px',
                  borderRadius: '10px',
                }}
              >
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ borderRadius: '50%' }}
                />

                <Skeleton variant="text" width={400} height={80} />
              </Box>
            ) : (
              commentReplies?.items.map((reply: Comment) => (
                <CommentComponent key={reply.id} comment={reply} />
              ))
            ))}
          {showReplies && commentReplies?.items.length === 0 && (
            <Typography sx={{ color: '#858585' }}>No replies yet.</Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default GroupCommentComponent;
