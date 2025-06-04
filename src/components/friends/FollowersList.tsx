import { Avatar, Box, Button, Link, Typography } from '@mui/material';
import { useGetRelationshipMeFollower } from '@/hooks/relationship/useGetRelationshipMeFollower';
import GradientCircularProgress from '../shared/Loader';
import { RelationshipStatus } from '@/types/enum';
import { relationshipApi } from '@/api/relationship';
import toast from 'react-hot-toast';
import { mutate } from 'swr';
import { Follower } from '@/models/relationship-follower';

const FollowersList = () => {
  const { data: relationshipMeFollower } = useGetRelationshipMeFollower({});

  const handleAccept = async (senderId: string) => {
    try {
      const res = await relationshipApi.acceptFollower(senderId);
      if (res) {
        toast.success('Accepted request');
        mutate('get_me_following');
        mutate('get_me_follower');
        mutate('get_recommendation');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleDelete = async (senderId: string) => {
    try {
      const res = await relationshipApi.deleteFollower(senderId);
      if (res) {
        toast.success('Follower deleted');
        mutate('get_me_following');
        mutate('get_me_follower');
        mutate('get_recommendation');
      }
    } catch (error) {
      console.error(error);
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
          {relationshipMeFollower.data.data.map(
            (item: Follower, index: any) => (
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
                  alt={item?.Sender?.username}
                  src={item?.Sender?.profileImg || '/icons/user.png'}
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
                    href={`profile/${item?.SenderId}`}
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
                      {item?.Sender?.username}
                    </Typography>
                  </Link>
                  <Typography
                    sx={{
                      color: 'gray',
                      fontSize: '13px',
                    }}
                  >
                    {item?.Sender?.email}
                  </Typography>
                </Box>
                {item?.Status !== RelationshipStatus.Accepted && (
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
                    onClick={() => handleAccept(item.SenderId)}
                  >
                    Accept
                  </Button>
                )}
                {item?.Status === RelationshipStatus.Accepted && (
                  <>
                    <Button
                      sx={{
                        color: 'var(--dangerColor)',
                        border: '1px solid var(--dangerColor)',
                        height: '35px',
                        fontSize: '12px',
                        textTransform: 'none',
                        ':hover': {
                          backgroundColor: 'var(--dangerColor)',
                          color: 'white',
                        },
                      }}
                      onClick={() => handleDelete(item.SenderId)}
                    >
                      Delete
                    </Button>
                    <Link
                      sx={{
                        textTransform: 'none',
                        height: '35px',
                        padding: '6px 10px',
                        color: 'black',
                        border: '1px solid #333',
                        borderRadius: '5px',
                        textDecoration: 'none',
                        gap: '15px',
                        ':hover': {
                          backgroundColor: '#DBDBDB',
                        },
                      }}
                      href={`/messages/r/${item.Id}/u/${item.SenderId}`}
                    >
                      <Typography sx={{ fontSize: '14px' }}>Message</Typography>
                    </Link>
                  </>
                )}
              </Box>
            )
          )}
        </Box>
      )}
    </Box>
  );
};

export default FollowersList;
