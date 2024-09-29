import { Box, Drawer, IconButton, TextField } from "@mui/material";
import AvatarName from "@/components/shared/AvatarName";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import {
  AddPhotoAlternateOutlined,
  CancelRounded,
  SendRounded,
} from "@mui/icons-material";
import FlexBetween from "../shared/FlexBetween";
import { useEffect, useRef, useState } from "react";
import { Friends } from "@/types";

interface IMessage {
  id: number;
  senderName: string;
  position: "left" | "right"; // Limit the position to 'left' or 'right'
  sentDate: Date;
  content: string;
}

const messageData: IMessage[] = [
  {
    id: 1,
    senderName: "Alice",
    position: "left",
    sentDate: new Date("2023-09-01T10:00:00"),
    content: "Hey, how are you?",
  },
  {
    id: 2,
    senderName: "Bob",
    position: "right",
    sentDate: new Date("2023-09-01T10:01:00"),
    content: "I'm good! How about you?",
  },
  {
    id: 3,
    senderName: "Alice",
    position: "left",
    sentDate: new Date("2023-09-01T10:02:30"),
    content: "Doing well, thanks!",
  },
  {
    id: 4,
    senderName: "Bob",
    position: "right",
    sentDate: new Date("2023-09-01T10:03:00"),
    content: "What's up today?",
  },
  {
    id: 5,
    senderName: "Alice",
    position: "left",
    sentDate: new Date("2023-09-01T10:04:00"),
    content: "Just working on some stuff.",
  },
  {
    id: 6,
    senderName: "Bob",
    position: "right",
    sentDate: new Date("2023-09-01T10:05:00"),
    content: "Same here, busy day.",
  },
  {
    id: 7,
    senderName: "Alice",
    position: "left",
    sentDate: new Date("2023-09-01T10:06:00"),
    content:
      "Looking forward to the weekend! Looking forward to the weekend! Looking forward to the weekend! Looking forward to the weekend! Looking forward to the weekend!",
  },
  {
    id: 8,
    senderName: "Bob",
    position: "right",
    sentDate: new Date("2023-09-01T10:07:00"),
    content: "Me too! Any plans?",
  },
  {
    id: 9,
    senderName: "Alice",
    position: "left",
    sentDate: new Date("2023-09-01T10:08:00"),
    content: "Just relaxing, maybe some hiking.",
  },
  {
    id: 10,
    senderName: "Bob",
    position: "right",
    sentDate: new Date("2023-09-01T10:09:00"),
    content: "Sounds great! Enjoy!",
  },
  {
    id: 11,
    senderName: "Alice",
    position: "left",
    sentDate: new Date("2023-09-01T10:08:00"),
    content: "Just relaxing, maybe some hiking.",
  },
  {
    id: 12,
    senderName: "Bob",
    position: "right",
    sentDate: new Date("2023-09-01T10:09:00"),
    content: "Sounds great! Enjoy!",
  },
  {
    id: 13,
    senderName: "Alice",
    position: "left",
    sentDate: new Date("2023-09-01T10:08:00"),
    content: "Just relaxing, maybe some hiking.",
  },
  {
    id: 14,
    senderName: "Bob",
    position: "right",
    sentDate: new Date("2023-09-01T10:09:00"),
    content: "Sounds great! Enjoy!",
  },
];

interface RightListContentMessagesProps {
  chatFriendItem: Friends | null;
}

const RightListContentMessages = ({
  chatFriendItem,
}: RightListContentMessagesProps) => {
  const [messageTextField, setMessageTextField] = useState("");
  const [switchIcon, setSwitchIcon] = useState(false); // Manage icon state here
  const [hasImage, setHasImage] = useState(false);
  const [photoSrc, setPhotoSrc] = useState("");

  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = boxRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [chatFriendItem]);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setMessageTextField(value);

    if (value.trim() === "") {
      setSwitchIcon(false); // Change to other icon
    } else {
      setSwitchIcon(true); // Change to send icon
    }
    console.log(value);
  };

  const addPhoto = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the uploaded file
    if (file) {
      const blobUrl = URL.createObjectURL(file); // Create a Blob URL
      setPhotoSrc(blobUrl); // Set the Blob URL to state
      setHasImage(true);
    }
  };

  const removePhoto = () => {
    if (photoSrc) {
      URL.revokeObjectURL(photoSrc); // Clean up the Blob URL
    }
    setPhotoSrc("");
    setHasImage(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "unset",
        height: "calc(100% - 70px)",
      }}
    >
      <Box
        ref={boxRef}
        sx={{
          height: "100%",
          overflowY: "scroll",
          padding: "10px 14px",
          "::-webkit-scrollbar": { width: "10px" },
          "::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#858585",
          },
          "::-webkit-scrollbar-thumb:hover": {
            background: "#777",
          },
        }}
        // onScroll={handleOnScroll}
      >
        {messageData.map((item: IMessage, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              {item.position === "left" && (
                <Box>
                  <AvatarName name={item.senderName} />
                </Box>
              )}

              <MessageBox
                id={index}
                position={item.position}
                type={"text"}
                focus
                title={""}
                text={item.content}
                date={item.sentDate}
                titleColor="blue"
                forwarded={false}
                status="sent"
                replyButton={item.position === "left"}
                removeButton={false}
                notch
                retracted={false}
                styles={{ maxWidth: "400px" }}
              />
            </Box>
          );
        })}
      </Box>
      <FlexBetween
        sx={{
          borderRadius: "25px",
          margin: "10px 14px",
          border: "2px solid #c7c5c5",
          alignItems: "end",
        }}
      >
        {!hasImage ? (
          <TextField
            id="text-field-message"
            placeholder="Type a message..."
            sx={{
              width: "100%",
              padding: "0",
              color: "black",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
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
              const messageText = (
                event.target as HTMLInputElement
              ).value.trim();

              if (event.key === "Enter" && event.shiftKey) {
                // Allow new line
                return;
              } else if (event.key === "Enter" && messageText !== "") {
                event.preventDefault(); // Prevent new line
                // handleSendMessageTF(); // Call your send message function here
              } else if (event.key === "Enter" && messageText === "") {
                event.preventDefault(); // Prevent new line
              }
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              padding: "10px 15px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "80px",
                height: "80px",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  right: "-10px",
                  top: "-10px",
                  padding: "4px",
                }}
                onClick={removePhoto}
              >
                <CancelRounded
                  sx={{
                    color: "#363738",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    padding: 0,
                    ":hover": {
                      color: "#525355",
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

        {switchIcon || hasImage ? (
          <IconButton
            id="send-message-button"
            sx={{
              ":hover": {
                color: "black",
              },
            }}
            // onClick={handleSendMessageTF}
          >
            <SendRounded id="send-message-button-icon" />
          </IconButton>
        ) : (
          <Box
            sx={{
              display: "flex",
              width: "40px",
              height: "40px",
            }}
          >
            <label htmlFor="image-upload" className="h-full w-full p-2">
              <AddPhotoAlternateOutlined
                sx={{
                  color: "gray",
                  cursor: "pointer",
                  ":hover": {
                    color: "black",
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
    </Box>
  );
};

export default RightListContentMessages;
