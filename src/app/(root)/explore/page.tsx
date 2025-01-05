'use client';

import ExploreImage from '@/components/explore/ExploreImage';
import GradientCircularProgress from '@/components/shared/Loader';
import { PostContext } from '@/context/post-context';
import { usePostListInfinity } from '@/hooks/post/useGetPostListInfinity';
import { ListResponse, Pagination } from '@/models/api';
import { Post } from '@/models/post';
import { Favorite, Forum } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useInView } from 'react-intersection-observer';
interface ImageItem {
  id: number;
  src: string;
}

const Explore = () => {
  const { ref } = useInView({
    onChange(inView) {
      if (inView) setSize((x) => x + 1);
    },
  });

  const filters: Partial<Pagination> = {
    page: 1,
    pageSize: 10,
    sort: '-id',
  };

  const { data, isLoading, isValidating, setSize } = usePostListInfinity({
    params: filters,
  });
  if (!data || isLoading) return null;

  const postList: Array<Post> =
    data?.reduce((result: Array<Post>, currentPage: ListResponse<Post>) => {
      result.push(...currentPage.items);

      return result;
    }, []) || [];

  const showLoadMore = (data?.[0]?.totalItems ?? 0) > postList.length;
  const loadingMore = isValidating && postList.length > 0;

  return (
    <Box
      sx={{
        width: 'calc(100% - 250px)',
        marginLeft: 'auto',
      }}
    >
      <Box
        sx={{
          maxWidth: '900px',
          width: '100%',
          margin: '0 auto',
          padding: '30px 0',
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              sm: 'repeat(2,  1fr)',
              md: 'repeat(3,  1fr)',
            },
            gridAutoRows: '300px',
            '& .card:nth-of-type(10n+8) , & .card:nth-of-type(10n+1)': {
              gridColumn: 'span 1',
              gridRow: 'span 2',
            },
            gap: '5px',
          }}
        >
          {postList
            .filter((post) => post.is_story === false)
            .map((post: Post, index: number) => (
              <PostContext.Provider
                key={index}
                value={{
                  post: post || null,
                }}
              >
                <ExploreImage key={index} />
              </PostContext.Provider>
            ))}
          {showLoadMore && (
            <Box
              ref={ref}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {loadingMore && <GradientCircularProgress />}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Explore;
