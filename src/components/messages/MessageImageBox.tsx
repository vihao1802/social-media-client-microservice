import { Box } from '@mui/material';

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
      </Box>
    </Box>
  );
};

export default MessageImageBox;
