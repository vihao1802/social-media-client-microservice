'use client';
import { Box } from '@mui/material';
import { useParams } from 'next/navigation';
import GradientCircularProgress from '@/components/shared/Loader';
import ProfileBottomContent from '@/components/profile/ProfileBottomContent';
import { usePostsByUserId } from '@/hooks/post/usePostsByUserId';
import ProfileTopContent from '@/components/profile/ProfileTopContent';

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: postResponse,
    isLoading,
    isValidating,
  } = usePostsByUserId({
    userId: id,
  });

  if (!postResponse || isValidating) return <GradientCircularProgress />;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: 'calc(100% - 250px)',
        marginLeft: 'auto',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '980px',
          margin: '0 auto',
          padding: '50px 20px 20px',
        }}
      >
        <ProfileTopContent posts={postResponse.items} />
        <ProfileBottomContent
          posts={postResponse.items
            .filter((item) => !item.isStory)
            .sort(
              (a, b) =>
                new Date(b.create_at).getTime() -
                new Date(a.create_at).getTime()
            )}
          stories={postResponse.items
            .filter((item) => item.isStory)
            .sort(
              (a, b) =>
                new Date(b.create_at).getTime() -
                new Date(a.create_at).getTime()
            )}
        />
      </Box>
    </Box>
  );
};

export default Profile;
