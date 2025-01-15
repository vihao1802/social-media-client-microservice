import { Box, Skeleton } from '@mui/material';

const LeftSideBarChatItemSkeleton = () => {
  return Array.from(new Array(8)).map((item, index) => (
    <Box
      key={index}
      sx={{
        display: 'flex',
        paddingLeft: '10px',
        paddingRight: '20px',
        paddingTop: '10px',
        height: '70px',
      }}
    >
      <Skeleton
        variant="circular"
        width={40}
        height={40}
        sx={{
          margin: '0 10px',
        }}
        animation="wave"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 'calc(100% - 60px)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            paddingBottom: '10px',
          }}
        >
          <Skeleton
            variant="rounded"
            sx={{ fontSize: '1rem', width: '140px' }}
            animation="wave"
          />
          <Skeleton
            variant="rounded"
            sx={{
              fontSize: '1rem',
              width: '65px',
              marginLeft: 'auto',
            }}
            animation="wave"
          />
        </Box>
        <Skeleton
          variant="rounded"
          sx={{ fontSize: '17px', width: '100%' }}
          animation="wave"
        />
      </Box>
    </Box>
  ));
};

export default LeftSideBarChatItemSkeleton;
