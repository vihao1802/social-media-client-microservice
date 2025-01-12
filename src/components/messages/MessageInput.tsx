import { Box, IconButton, TextField } from '@mui/material';
import 'react-chat-elements/dist/main.css';
import {
  AddPhotoAlternateOutlined,
  CancelRounded,
  SendRounded,
} from '@mui/icons-material';
import FlexBetween from '../shared/FlexBetween';
import { useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import { usePostMessage } from '@/hooks/message/usePostMessage';
import GradientCircularProgress from '../shared/Loader';
import { ChatContext } from '@/context/chat-context';

const MessageInput = ({ scrollToBottom }: { scrollToBottom: () => void }) => {
  const [messageTextField, setMessageTextField] = useState('');
  const [switchIcon, setSwitchIcon] = useState(false); // Manage icon state here
  const [hasImage, setHasImage] = useState(false);
  const [photoSrc, setPhotoSrc] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSending, setIsSending] = useState(false);
  const { chat_id } = useParams<{ chat_id: string }>();

  const { sendMessage } = useContext(ChatContext);

  const addPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the uploaded file
    if (file) {
      const blobUrl = URL.createObjectURL(file); // Create a Blob URL
      setImageFile(file);
      setPhotoSrc(blobUrl); // Set the Blob URL to state
      setHasImage(true);
    }
  };

  const removePhoto = () => {
    if (photoSrc) {
      URL.revokeObjectURL(photoSrc); // Clean up the Blob URL
    }
    setPhotoSrc('');
    setImageFile(null);
    setHasImage(false);
  };
  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMessageTextField(value);

    if (value.trim() === '') {
      setSwitchIcon(false); // Change to other icon
    } else {
      setSwitchIcon(true); // Change to send icon
    }
    console.log(value);
  };

  const handleSendMessage = async () => {
    if (messageTextField.trim() === '' && imageFile === null) return;
    try {
      setIsSending(true);
      await sendMessage({
        chatId: chat_id,
        msgContent: messageTextField.trim(),
        replyTo: null,
        msgMediaContent: imageFile ? imageFile : null,
        senderId: 'cm5ruu3ui0003vh3wvzmdo3jj',
        senderName: '',
      });

      handleTextFieldChange({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
      removePhoto();
      scrollToBottom();
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <FlexBetween
      sx={{
        borderRadius: '25px',
        margin: '10px 14px',
        border: '2px solid #c7c5c5',
        alignItems: 'end',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {hasImage && (
          <Box
            sx={{
              width: '100%',
              padding: '10px 15px',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '80px',
                height: '80px',
              }}
            >
              <IconButton
                sx={{
                  position: 'absolute',
                  right: '-10px',
                  top: '-10px',
                  padding: '4px',
                }}
                onClick={removePhoto}
              >
                <CancelRounded
                  sx={{
                    color: '#363738',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    padding: 0,
                    ':hover': {
                      color: '#525355',
                    },
                  }}
                />
              </IconButton>
              <img
                src={photoSrc}
                className="w-full h-full rounded-xl object-cover"
              />
            </Box>
          </Box>
        )}
        <TextField
          id="text-field-message"
          placeholder="Type a message..."
          sx={{
            width: '100%',
            padding: '0',
            color: 'black',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none',
              },
              '&:hover fieldset': {
                border: 'none',
              },
              '&.Mui-focused fieldset': {
                border: 'none',
              },
            },
          }}
          //   variant="outlined"
          size="small"
          multiline
          maxRows={8}
          value={messageTextField}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;
            if (value.length <= 1000) {
              // Check length
              setMessageTextField(value); // Update the state with the new value
              handleTextFieldChange(event);
            }
          }}
          onKeyDown={async (event: React.KeyboardEvent<HTMLInputElement>) => {
            const messageText = (event.target as HTMLInputElement).value.trim();
            if (isSending) return;
            if (event.key === 'Enter' && event.shiftKey) {
              // Allow new line
              return;
            } else if (event.key === 'Enter' && messageText !== '') {
              event.preventDefault(); // Prevent new line
              handleSendMessage(); // Call send message function
            } else if (event.key === 'Enter' && messageText === '') {
              event.preventDefault(); // Prevent new line
            }
          }}
        />
      </Box>

      {switchIcon || hasImage ? (
        isSending ? (
          <GradientCircularProgress width={25} />
        ) : (
          <IconButton
            id="send-message-button"
            sx={{
              ':hover': {
                color: 'black',
              },
            }}
            disabled={isSending}
            onClick={handleSendMessage}
          >
            <SendRounded id="send-message-button-icon" />
          </IconButton>
        )
      ) : (
        <Box
          sx={{
            display: 'flex',
            width: '40px',
            height: '40px',
          }}
        >
          <label htmlFor="image-upload" className="h-full w-full p-2">
            <AddPhotoAlternateOutlined
              sx={{
                color: 'gray',
                cursor: 'pointer',
                ':hover': {
                  color: 'black',
                },
              }}
            />
          </label>
          <input
            type="file"
            hidden
            id="image-upload"
            accept="image/*"
            onChange={addPhoto}
          />
        </Box>
      )}
    </FlexBetween>
  );
};

export default MessageInput;
