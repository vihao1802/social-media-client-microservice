import {
  Box,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Button,
  Skeleton,
} from '@mui/material';
import { CachedRounded } from '@mui/icons-material';
import React from 'react';
import { useGetRecommendation } from '@/hooks/relationship/useGetRecommendation';
import { usePostFollowUser } from '@/hooks/relationship/usePostFollowUser';
import toast from 'react-hot-toast';

const RightSideBar = () => {
  const { data: recommendations } = useGetRecommendation({});
  const { followUser } = usePostFollowUser();

  const handleFollow = async (user_id: string) => {
    try {
      const res = await followUser({ user_id });
      if (res) {
        toast.success('Followed successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        paddingTop: '20px',
        position: 'fixed',
        right: '100px',
        display: {
          md: 'none',
          lg: 'block',
        },
      }}
    >
      <Paper
        sx={{
          width: '300px',
          borderRadius: '20px',
          padding: '10px 5px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 20px',
          }}
        >
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 'bold',
              marginBottom: '10px',
            }}
          >
            Friend Suggestions
          </Typography>
          {/* <IconButton>
            <CachedRounded />
          </IconButton> */}
        </Box>
        {/* {!recommendations
          ? Array.from({ length: 5 }).map((_, index) => (
              <Box
                key={index}
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
                <Box>
                  <Skeleton variant="text" width={150} />
                  <Skeleton variant="text" width={100} />
                </Box>
              </Box>
            ))
          : recommendations.items.slice(0, 5).map((user) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
                key={user.id}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 16px',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Avatar
                      src={user.profileImg || '/icons/user.png'}
                      sx={{ height: '44px', width: '44px' }}
                    />
                    <Box>
                      <Typography
                        sx={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                        }}
                      >
                        {user.username}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '12px',
                        }}
                      >
                        {user.mutualFriends} mutual friends
                      </Typography>
                    </Box>
                  </Box>

                  <Button
                    sx={{
                      height: '30px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      textTransform: 'capitalize',
                      padding: '5px 10px',
                    }}
                    onClick={() => handleFollow(user.id)}
                  >
                    Follow
                  </Button>
                </Box>
              </Box>
            ))} */}
      </Paper>
    </Box>
  );
};

export default RightSideBar;
