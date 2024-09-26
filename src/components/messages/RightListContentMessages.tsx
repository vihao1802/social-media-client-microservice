import { Box, Drawer, IconButton, TextField } from "@mui/material";
import AvatarName from "@/components/shared/AvatarName";
import { MessageBox } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import { AddPhotoAlternateOutlined, SendRounded } from "@mui/icons-material";
import FlexBetween from "../shared/FlexBetween";
import { InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import Image from "next/image";

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
];

const inputProps = {
  step: 300,
};

const RightListContentMessages = () => {
  const [switchIcon, setSwitchIcon] = useState(false); // true: send icon, false: other
  // handle message text field
  let messageTextField = "";
  useEffect(() => {
    if (document.getElementById("text-field-message")) {
      messageTextField = (
        document.getElementById("text-field-message") as HTMLInputElement
      ).value;
    }
  }, []);

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    messageTextField = event.target.value;

    if (messageTextField === "") setSwitchIcon(false); // other
    else setSwitchIcon(true); // send icon
    console.log(messageTextField);

    /* const sendMessageButton = document.getElementById(
      "send-message-button-icon"
    );

    if (sendMessageButton) {
      // Check if the element exists
      if (messageTextField.trim() !== "") {
        sendMessageButton.style.color = "#009265";
      } else {
        sendMessageButton.style.color = "gray";
      }
    } */
  };

  return (
    <Box>
      <Box
        // ref={boxRef}
        sx={{
          height: "calc(100vh - 140px)",
          overflowY: "scroll",
          // backgroundColor: "#e7e7e7",
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
          border: "2px solid #e7e7e7",
        }}
      >
        <TextField
          id="text-field-message"
          placeholder="Type a message..."
          sx={{
            width: "100%",
            padding: "0",
            color: "black",
            maxHeight: "150px",
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
          minRows={1}
          maxRows={8}
          multiline
          onChange={handleTextFieldChange}
          onKeyDown={async (event: React.KeyboardEvent<HTMLInputElement>) => {
            const messageText = (event.target as HTMLInputElement).value.trim();

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
        {switchIcon ? (
          <IconButton
            id="send-message-button"

            // onClick={handleSendMessageTF}
          >
            <SendRounded id="send-message-button-icon" sx={{ color: "gray" }} />
          </IconButton>
        ) : (
          <IconButton
            id="add-photo-button"
            // onClick={handSendPhoto}
          >
            <AddPhotoAlternateOutlined />
          </IconButton>
        )}
      </FlexBetween>
    </Box>
  );
};

export default RightListContentMessages;
