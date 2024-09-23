"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuList,
  Divider,
} from "@mui/material";
import { Dancing_Script } from "next/font/google";
import {
  MenuOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";
import { sideBarItems } from "../../constants/index";
import OnlineAvatar from "@/components/widgets/OnlineAvatar";
import React, { useState } from "react";

const dacingScript = Dancing_Script({ subsets: ["latin"], weight: ["700"] });

const LeftSideBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "18%",
        height: "100vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        borderRight: "100px solid #e2e8f0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignItems: "center",
          height: "10%",
          padding: "0 30px",
        }}
      >
        <Typography
          fontSize="30px"
          color="#009265"
          fontWeight="bold"
          className={dacingScript.className}
        >
          Instagram
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "90%",
        }}
      >
        <List>
          {sideBarItems.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    borderRadius: "7px",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "black", fontSize: "20px" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ variant: "overline" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <List>
          <ListItem>
            <ListItemButton
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "7px",
                },
              }}
            >
              <ListItemIcon>
                <OnlineAvatar imgURL="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemIcon>
              <ListItemText primary="Hu chuynh" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              sx={{
                "&:hover": {
                  cursor: "pointer",
                  borderRadius: "7px",
                },
              }}
              onClick={handleClick}
            >
              <ListItemIcon>
                <MenuOutlined />
              </ListItemIcon>
              <ListItemText primary="More" />
            </ListItemButton>
          </ListItem>
        </List>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <List>
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <SettingsOutlined />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItemButton>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemButton onClick={handleClose}>
                <ListItemIcon>
                  <ExitToAppOutlined />
                </ListItemIcon>
                <ListItemText primary="Log out" />
              </ListItemButton>
            </ListItem>
          </List>
        </Menu>
      </Box>
    </Box>
  );
};

export default LeftSideBar;
