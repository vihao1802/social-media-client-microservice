"use client";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import AvatarName from "@/components/shared/AvatarName";
import "react-chat-elements/dist/main.css";
import { InfoOutlined, PhoneOutlined } from "@mui/icons-material";
import Image from "next/image";
import { useState } from "react";

const RightHeaderContentMessages = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation">
      <Box
        sx={{
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <img
          src={"https://material-ui.com/static/images/avatar/1.jpg"}
          alt="Avatar"
          className="w-24 h-24 rounded-full"
        />
        <p>Nguyen Van A</p>
        <Button
          sx={{
            backgroundColor: "#e7e7e7",
            color: "black",
            fontWeight: 600,
            width: "150px",
            borderRadius: "10px",
          }}
        >
          View profile
        </Button>

        <Box
          sx={{
            borderTop: "2px solid #e7e7e7",
            width: "100%",
            marginTop: "10px",
            padding: "10px 0",
          }}
        >
          <p className="text-xl font-semibold text-center mb-4">Photos</p>
          <Box
            sx={{
              height: "calc(100vh - 290px)",
              overflowY: "auto",
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
          >
            <div className="grid grid-cols-3 gap-2 ">
              <div>
                <img
                  src="https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c?w=242&h=121&fit=crop&auto=format"
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
              <div>
                <img src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format" />
              </div>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        padding: "14px",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "2px solid #E5E7EB",
        height: "70px",
      }}
    >
      <Drawer open={open} anchor="right" onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AvatarName name="Nguyen Van A" />
        <Typography
          sx={{
            fontSize: "17px",
            color: "black",
            paddingLeft: "10px",
          }}
        >
          {"Nguyen Van A"}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "28px",
        }}
      >
        <IconButton>
          <PhoneOutlined
            fontSize={"inherit"}
            sx={{
              borderRadius: "50%",
              cursor: "pointer",
              color: "black",
            }}
          />
        </IconButton>

        <IconButton>
          <InfoOutlined
            fontSize={"inherit"}
            sx={{
              borderRadius: "50%",
              cursor: "pointer",
              color: "black",
            }}
            onClick={toggleDrawer(true)}
          />
        </IconButton>
      </Box>
    </Box>
  );
};

export default RightHeaderContentMessages;
