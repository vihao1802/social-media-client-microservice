import { Box, Typography } from '@mui/material';

interface MessageItemBoxProps {
  position: string;
  msgContent: string;
  sentAt: string;
}

const MessageItemBox = ({
  position,
  msgContent,
  sentAt,
}: MessageItemBoxProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: position === 'right' ? 'flex-end' : 'flex-start',
        marginY: 0.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: position === 'right' ? 'flex-end' : 'flex-start',
          maxWidth: '400px',
          position: 'relative',
          '&:hover .timestamp': {
            opacity: 1,
            visibility: 'visible',
          },
        }}
      >
        {/* Message Bubble */}
        <Box
          sx={{
            borderRadius: '20px',
            padding: '8px 14px',
            backgroundColor:
              position === 'right' ? 'var(--buttonHoverColor)' : '#EFEFEF',
            position: 'relative',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              color: position === 'right' ? 'white' : 'black',
              fontWeight: 400,
            }}
          >
            {msgContent}
          </Typography>
        </Box>
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

export default MessageItemBox;
