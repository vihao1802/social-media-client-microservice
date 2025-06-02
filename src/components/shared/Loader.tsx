import { Fragment } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

interface GradientCircularProgressProps {
  width?: number;
  paddingRight?: number;
}

export default function GradientCircularProgress({
  width = 40,
  paddingRight = 0,
}: GradientCircularProgressProps) {
  return (
    <Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <Box
        paddingRight={paddingRight}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CircularProgress
          size={width}
          sx={{
            'svg circle': { stroke: 'url(#my_gradient)' },
          }}
        />
      </Box>
    </Fragment>
  );
}
