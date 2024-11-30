import { Check } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface MessageImageBoxProps {
  position: string;
  title: string;
  text: string;
  imageUrl: string;
  sentAt: string;
}

const MessageImageBox = ({
  position,
  title,
  text,
  imageUrl,
  sentAt,
}: MessageImageBoxProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: position === "right" ? "flex-end" : "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          margin: "0 20px",
          maxWidth: "400px",
          gap: "2px",
        }}
      >
        <Box
          sx={{
            boxShadow: "1px 1px 1px 1px #0003",
            borderRadius: "5px",
          }}
        >
          <Typography
            sx={{
              fontSize: "13px",
              color: "var(--buttonColor)",
              text_transform: "none",
              padding: "0 9px",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "black",
              text_transform: "none",
              marginBottom: "5px",
              padding: "0 9px",
            }}
          >
            {text}
          </Typography>
          <Typography
            sx={{
              fontSize: "12px",
              color: "gray",
              text_transform: "none",
              marginBottom: "5px",
              padding: "0 9px",
              textAlign: "right",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "2px",
            }}
          >
            {sentAt} <Check sx={{ fontSize: "14px" }} />
          </Typography>
        </Box>
        <Box
          component={"img"}
          src={imageUrl}
          alt="image"
          sx={{
            width: "100%",
            height: "auto",
            borderRadius: "10px",
          }}
        />
      </Box>
    </Box>
  );
};

export default MessageImageBox;
