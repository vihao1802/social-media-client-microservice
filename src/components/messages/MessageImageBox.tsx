import { Box, Typography } from '@mui/material';

interface MessageImageBoxProps {
  position: string;
  imageUrl: string;
  sentAt: string;
}

const MessageImageBox = ({
  position,
  imageUrl,
  sentAt,
}: MessageImageBoxProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
        marginTop: '2px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          maxWidth: '300px',
          gap: '2px',
          position: 'relative',
          '&:hover .timestamp': {
            opacity: 1,
            visibility: 'visible',
          },
        }}
      >
        <Box
          component={'img'}
          src={imageUrl}
          alt="image"
          sx={{
            width: '100%',
            height: 'auto',
            borderRadius: '10px',
          }}
        />
        {/* Timestamp Tooltip on Hover */}
        <Typography
          className="timestamp"
          sx={{
            position: 'absolute',
            top: '-15px',
            right: position === 'right' ? '10px' : 'auto',
            left: position === 'right' ? 'auto' : '10px',
            fontSize: '11px',
            opacity: 0,
            visibility: 'hidden',
            transition: 'opacity 0.2s ease, visibility 0.2s ease',
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '2px 6px',
            borderRadius: '4px',
            color: 'white',
          }}
        >
          {sentAt}
        </Typography>
      </Box>
    </Box>
  );
};

export default MessageImageBox;
