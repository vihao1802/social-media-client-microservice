'use client';
import { Box, Typography } from '@mui/material';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import { Post } from '@/models/post';
import ProfileCardImage from './ProfileCardImage';
import { useState } from 'react';

interface ProfileBottomContentProps {
  posts: Array<Post>;
  stories: Array<Post>;
}

const ProfileBottomContent = ({
  posts,
  stories,
}: ProfileBottomContentProps) => {
  const [isPostTab, setIsPostTab] = useState(true);
  return (
    <Box
      sx={{
        marginTop: '50px',
        borderTop: '2px solid #e7e7e7',
      }}
    >
      {/* Tab panel */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            padding: '10px 16px',
            borderTop: isPostTab ? '2px solid black' : '2px solid #e7e7e7',
            color: isPostTab ? 'black' : 'GrayText',
            cursor: 'pointer',
          }}
          onClick={() => setIsPostTab(true)}
        >
          <CameraAltOutlinedIcon />
          <Typography>Posts</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            gap: '10px',
            padding: '10px 16px',
            borderTop: !isPostTab ? '2px solid black' : '2px solid #e7e7e7',
            color: !isPostTab ? 'black' : 'GrayText',
            cursor: 'pointer',
          }}
          onClick={() => setIsPostTab(false)}
        >
          <PlayCircleOutlinedIcon />
          <Typography>Stories</Typography>
        </Box>
      </Box>
      {/* Posts and reels */}
      {isPostTab ? (
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gridAutoRows: '1fr',
            gap: '5px',
            marginTop: '20px',
          }}
        >
          {posts.map((post: Post, index: number) => (
            <ProfileCardImage key={index} post={post} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gridAutoRows: '1fr',
            gap: '5px',
            marginTop: '20px',
          }}
        >
          {stories.map((post: Post, index: number) => (
            <ProfileCardImage key={index} post={post} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProfileBottomContent;
