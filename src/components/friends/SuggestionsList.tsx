import { useGetRecommendation } from '@/hooks/relationship/useGetRecommendation';
import { Avatar, Box, Button, Link, Typography } from '@mui/material';
import GradientCircularProgress from '../shared/Loader';
import toast from 'react-hot-toast';
import { usePostFollowUser } from '@/hooks/relationship/usePostFollowUser';
import { mutate } from 'swr';

const SuggestionsList = () => {
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
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)', // extra small
          md: 'repeat(2, 1fr)', // medium
          xl: 'repeat(3, 1fr)', // extra large
        },
        gap: '15px',
      }}
    >
      {!recommendations ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gridArea: '1 / 1 / 2 / 4',
          }}
        >
          <GradientCircularProgress />
        </Box>
      ) : (
        recommendations.items.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '22px 15px',
              gap: '12px',
              border: '2px solid #e3e3e3',
              borderRadius: '10px',
            }}
          >
            <Avatar
              src={item.profile_img || '/icons/user.png'}
              alt={item.userName}
              sx={{ width: '100px', height: '100px' }}
            />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
              }}
            >
              <Link href={`profile/${item.id}`} underline="none" color="black">
                <Typography>{item.userName}</Typography>
              </Link>
              <Typography
                sx={{
                  color: 'gray',
                }}
              >
                {item.mutualFriends} mutual friends
              </Typography>
            </Box>
            <Button
              sx={{
                backgroundColor: '#4491F5',
                color: 'white',
                height: '30px',
                width: '100%',
                textTransform: 'none',
                ':hover': {
                  backgroundColor: '#1877F2',
                },
              }}
              onClick={() => handleFollow(item.id)}
            >
              Follow
            </Button>
          </Box>
        ))
      )}
    </Box>
  );
};

export default SuggestionsList;
