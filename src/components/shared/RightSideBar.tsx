import {
  Box,
  Paper,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
} from "@mui/material";
import { CachedRounded } from "@mui/icons-material";
import React, { Fragment } from "react";

const users: any[] = [
  {
    id: 1,
    name: "John Doe",
    nickname: "Ali Connors",
    followers: 100,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
  {
    id: 2,
    name: "Jane Doe",
    nickname: "Ali Connors",
    followers: 100,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
  {
    id: 3,
    name: "John Smith",
    nickname: "Ali Connors",
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
  {
    id: 4,
    name: "Jane Smith",
    nickname: "Ali Connors",
    followers: 100,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
  {
    id: 5,
    name: "Jane Smith",
    nickname: "Ali Connors",
    followers: 100,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
];

const RightSideBar = () => {
  return (
    <Box
      sx={{
        paddingTop: "20px",
        position: "fixed",
        right: "70px",
      }}
    >
      <Paper
        sx={{
          width: "300px",
          borderRadius: "20px",
          padding: "10px 5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            Friend Suggestions
          </Typography>
          <IconButton>
            <CachedRounded />
          </IconButton>
        </Box>
        {users.map((user) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            key={user.id}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 16px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{ height: "44px", width: "44px" }}
                />
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {user.followers} followers
                  </Typography>
                </Box>
              </Box>

              <Button
                sx={{
                  height: "30px",
                  fontSize: "13px",
                  fontWeight: "bold",
                  textTransform: "capitalize",
                  padding: "5px 10px",
                }}
              >
                Follow
              </Button>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default RightSideBar;
