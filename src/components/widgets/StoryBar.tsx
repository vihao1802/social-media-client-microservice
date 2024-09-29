import {
  KeyboardArrowLeftRounded,
  KeyboardArrowRightRounded,
} from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";
import StoryCircle from "./StoryCircle";

const users = [
  {
    id: 1,
    name: "User 1",
    nickname: "Nickname 1",
    followers: 423,
    avatar: "https://material-ui.com/static/images/avatar/3.jpg",
  },
  {
    id: 2,
    name: "User 2",
    nickname: "Nickname 2",
    followers: 87,
    avatar: "https://material-ui.com/static/images/avatar/7.jpg",
  },
  {
    id: 3,
    name: "User 3",
    nickname: "Nickname 3",
    followers: 921,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
  {
    id: 4,
    name: "User 4",
    nickname: "Nickname 4",
    followers: 156,
    avatar: "https://material-ui.com/static/images/avatar/5.jpg",
  },
  {
    id: 5,
    name: "User 5",
    nickname: "Nickname 5",
    followers: 302,
    avatar: "https://material-ui.com/static/images/avatar/2.jpg",
  },
  {
    id: 6,
    name: "User 6",
    nickname: "Nickname 6",
    followers: 789,
    avatar: "https://material-ui.com/static/images/avatar/6.jpg",
  },
  {
    id: 7,
    name: "User 7",
    nickname: "Nickname 7",
    followers: 21,
    avatar: "https://material-ui.com/static/images/avatar/4.jpg",
  },
  {
    id: 8,
    name: "User 8",
    nickname: "Nickname 8",
    followers: 543,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
  {
    id: 9,
    name: "User 9",
    nickname: "Nickname 9",
    followers: 987,
    avatar: "https://material-ui.com/static/images/avatar/7.jpg",
  },
  {
    id: 10,
    name: "User 10",
    nickname: "Nickname 10",
    followers: 654,
    avatar: "https://material-ui.com/static/images/avatar/2.jpg",
  },
  {
    id: 11,
    name: "User 11",
    nickname: "Nickname 11",
    followers: 321,
    avatar: "https://material-ui.com/static/images/avatar/5.jpg",
  },
  {
    id: 12,
    name: "User 12",
    nickname: "Nickname 12",
    followers: 890,
    avatar: "https://material-ui.com/static/images/avatar/3.jpg",
  },
  {
    id: 13,
    name: "User 13",
    nickname: "Nickname 13",
    followers: 123,
    avatar: "https://material-ui.com/static/images/avatar/6.jpg",
  },
  {
    id: 14,
    name: "User 14",
    nickname: "Nickname 14",
    followers: 765,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
  {
    id: 15,
    name: "User 15",
    nickname: "Nickname 15",
    followers: 432,
    avatar: "https://material-ui.com/static/images/avatar/2.jpg",
  },
  {
    id: 16,
    name: "User 16",
    nickname: "Nickname 16",
    followers: 98,
    avatar: "https://material-ui.com/static/images/avatar/7.jpg",
  },
  {
    id: 17,
    name: "User 17",
    nickname: "Nickname 17",
    followers: 567,
    avatar: "https://material-ui.com/static/images/avatar/4.jpg",
  },
  {
    id: 18,
    name: "User 18",
    nickname: "Nickname 18",
    followers: 345,
    avatar: "https://material-ui.com/static/images/avatar/5.jpg",
  },
  {
    id: 19,
    name: "User 19",
    nickname: "Nickname 19",
    followers: 12,
    avatar: "https://material-ui.com/static/images/avatar/6.jpg",
  },
  {
    id: 20,
    name: "User 20",
    nickname: "Nickname 20",
    followers: 999,
    avatar: "https://material-ui.com/static/images/avatar/1.jpg",
  },
];

const StoryBar = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8; // Number of users per page

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const displayedUsers = users.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );
  return (
    <Paper
      sx={{
        width: "730px",
        height: "130px",
        borderRadius: "20px",
        display: "flex",
        flexDirection: "row",
        position: "relative",
      }}
    >
      {currentPage > 1 && (
        <IconButton
          sx={{
            height: "32px",
            width: "32px",
            position: "absolute",
            top: "50%",
            left: "15px",
            transform: "translateY(-50%)",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            cursor: "pointer",
            zIndex: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <KeyboardArrowLeftRounded onClick={handlePrevious} />
        </IconButton>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "15px",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          padding: "20px 0",
        }}
      >
        {displayedUsers.map((user) => (
          <StoryCircle
            key={user.id}
            userId={user.id}
            name={user.name}
            nickName={user.nickname}
            followers={user.followers}
            avatar={user.avatar}
          />
        ))}
      </Box>

      {currentPage < totalPages && (
        <IconButton
          sx={{
            height: "32px",
            width: "32px",
            position: "absolute",
            top: "50%" /* Đặt nút ở giữa theo chiều dọc */,
            right: "15px" /* Cách mép phải 10px */,
            transform:
              "translateY(-50%)" /* Điều chỉnh để căn giữa theo chiều dọc */,
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            cursor: "pointer",
            zIndex: 1,
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          <KeyboardArrowRightRounded onClick={handleNext} />
        </IconButton>
      )}
    </Paper>
  );
};

export default StoryBar;
