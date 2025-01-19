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
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          maxWidth: '400px',
          gap: '2px',
        }}
      >
        <Box
          sx={{
            borderRadius: '20px',
            padding: '6px 12px',
            backgroundColor:
              position === 'right' ? 'var(--buttonHoverColor)' : '#EFEFEF',
          }}
        >
          <Typography
            sx={{
              fontSize: '14px',
              color: position === 'right' ? 'white' : 'black',
              textTransform: 'none',
              fontWeight: '400',
            }}
          >
            {msgContent}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MessageItemBox;
