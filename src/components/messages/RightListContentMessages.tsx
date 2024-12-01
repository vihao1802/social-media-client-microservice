import { Avatar, Box, IconButton, TextField } from "@mui/material";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import {
  AddPhotoAlternateOutlined,
  CancelRounded,
  SendRounded,
} from "@mui/icons-material";
import FlexBetween from "../shared/FlexBetween";
import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { usePostMessage } from "@/hooks/message/usePostMessage";
import { Message } from "@/models/message";
import { messageApi } from "@/api/message";
import MessageImageBox from "./MessageImageBox";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const RightListContentMessages = () => {
  const { user } = useAuthenticatedUser();
  const [messageTextField, setMessageTextField] = useState("");
  const [switchIcon, setSwitchIcon] = useState(false); // Manage icon state here
  const [hasImage, setHasImage] = useState(false);
  const [photoSrc, setPhotoSrc] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [messageList, setMessageList] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const webSocket = useRef<WebSocket | null>(null);

  // Get the user ID from the URL
  const { r_id: id, u_id: receivedUserId } = useParams<{
    r_id: string;
    u_id: string;
  }>();

  if (!id || !receivedUserId || !user) return null;

  const { createMessage } = usePostMessage();

  // Fetch initial messages
  const fetchMessages = async () => {
    try {
      const res = await messageApi.getMessageByRelationshipId(id);
      setMessageList(res.data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  // web socket
  useEffect(() => {
    fetchMessages();
    // Connect to WebSocket
    const url = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/ws/messenge`; // WebSocket URL
    const ws = new WebSocket(url);
    console.log("connecting to " + url);

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event) => {
      fetchMessages();
      const scrollContainer = boxRef.current;
      if (scrollContainer)
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      setIsSending(false);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    if (webSocket) webSocket.current = ws;

    // Clean up WebSocket connection
    return () => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    const scrollContainer = boxRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messageList, boxRef]);

  if (!messageList) return null;

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
      setImageFile(file);
      setPhotoSrc(blobUrl); // Set the Blob URL to state
      setHasImage(true);
    }
  };

  const removePhoto = () => {
    if (photoSrc) {
      URL.revokeObjectURL(photoSrc); // Clean up the Blob URL
    }
    setPhotoSrc("");
    setImageFile(null);
    setHasImage(false);
  };

  const sendMessage = async () => {
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      if (messageTextField.trim() === "" && imageFile === null) return;
      setIsSending(true);
      await createMessage({
        relationshipId: id,
        content: messageTextField.trim(),
        replyToId: "",
        files: imageFile ? imageFile : null,
      });
      webSocket.current.send(JSON.stringify("send message"));
      handleTextFieldChange({
        target: { value: "" },
      } as React.ChangeEvent<HTMLInputElement>);
      removePhoto();
    }
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
        {messageList.map((item: Message, index: number) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "20px",
              }}
            >
              {item.senderId !== user.id && (
                <Box>
                  <Avatar src={item.sender.profile_img || "/icons/user.png"} />
                </Box>
              )}

              {item.mediaContents.length > 0 ? (
                <MessageImageBox
                  position={item.senderId === user.id ? "right" : "left"}
                  title={
                    item.senderId === user.id ? "You" : item.sender.username
                  }
                  text={item.content}
                  imageUrl={item.mediaContents[0].media_url}
                  sentAt={dayjs(item.sent_at).fromNow()}
                />
              ) : (
                <MessageBox
                  id={index}
                  position={item.senderId === user.id ? "right" : "left"}
                  type={"text"}
                  focus
                  title={
                    item.senderId === user.id ? "You" : item.sender.username
                  }
                  text={item.content}
                  date={new Date(item.sent_at)}
                  titleColor="var(--buttonColor)"
                  forwarded={false}
                  status="sent"
                  replyButton={item.senderId !== user.id}
                  removeButton={false}
                  notch
                  retracted={false}
                  styles={{ maxWidth: "400px" }}
                />
              )}
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
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {hasImage && (
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
              if (isSending) return;
              if (event.key === "Enter" && event.shiftKey) {
                // Allow new line
                return;
              } else if (event.key === "Enter" && messageText !== "") {
                event.preventDefault(); // Prevent new line
                sendMessage(); // Call send message function
              } else if (event.key === "Enter" && messageText === "") {
                event.preventDefault(); // Prevent new line
              }
            }}
          />
        </Box>

        {switchIcon || hasImage ? (
          <IconButton
            id="send-message-button"
            sx={{
              ":hover": {
                color: "black",
              },
            }}
            disabled={isSending}
            onClick={sendMessage}
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
