import { Avatar, Box, Button, Link, Typography } from '@mui/material';
import { useGetRelationshipMeFollower } from '@/hooks/relationship/useGetRelationshipMeFollower';
import GradientCircularProgress from '../shared/Loader';
import { RelationshipStatus } from '@/types/enum';
import { relationshipApi } from '@/api/relationship';
import toast from 'react-hot-toast';
import { mutate } from 'swr';

const FollowersList = () => {
  const { data: relationshipMeFollower } = useGetRelationshipMeFollower({});

  const handleAccept = async (senderId: string) => {
    try {
      const res = await relationshipApi.acceptFollower(senderId);
      if (res) {
        toast.success('Accepted');
        mutate('get_me_following');
        mutate('get_me_follower');
        mutate('get_message_by_relationship_id');
        mutate('get_follower_quantity');
        mutate('get_following_quantity');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      {!relationshipMeFollower ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <GradientCircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              lg: 'repeat(1, 1fr)', // large
              xl: 'repeat(2, 1fr)',
            },
            gap: '15px',
          }}
        >
          {relationshipMeFollower.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: '20px 15px',
                gap: '15px',
                alignItems: 'center',
                border: '2px solid #e3e3e3',
                borderRadius: '10px',
              }}
            >
              <Avatar
                alt={item.sender.username}
                src={item.sender.profile_img || '/icons/user.png'}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  marginRight: 'auto',
                  width: '100%',
                  maxWidth: {
                    sm: '200px',
                    md: '400px',
                    xl: '150px',
                  },
                }}
              >
                <Link
                  href={`profile/${item.senderId}`}
                  underline="none"
                  color="black"
                >
                  <Typography
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      width: '100%',
                      fontSize: '15px',
                    }}
                  >
                    {item.sender.username}
                  </Typography>
                </Link>
                <Typography
                  sx={{
                    color: 'gray',
                    fontSize: '13px',
                  }}
                >
                  {item.sender.email}
                </Typography>
              </Box>
              {item.status !== RelationshipStatus.Accepted && (
                <Button
                  sx={{
                    backgroundColor: 'var(--buttonColor)',
                    color: 'white',
                    height: '30px',
                    fontSize: '12px',
                    textTransform: 'none',
                    ':hover': {
                      backgroundColor: 'var(--buttonHoverColor)',
                    },
                  }}
                  onClick={() => handleAccept(item.senderId)}
                >
                  Accept
                </Button>
              )}
              {item.status === RelationshipStatus.Accepted && (
                <Link
                  sx={{
                    textTransform: 'none',
                    height: '35px',
                    padding: '6px 10px',
                    color: 'black',
                    borderRadius: '5px',
                    textDecoration: 'none',
                    gap: '15px',
                    ':hover': {
                      backgroundColor: '#DBDBDB',
                    },
                  }}
                  href={`/messages/r/${item.id}/u/${item.senderId}`}
                >
                  <Typography sx={{ fontSize: '14px' }}>Message</Typography>
                </Link>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FollowersList;
