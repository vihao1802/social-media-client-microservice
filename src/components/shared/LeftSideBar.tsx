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
  Divider,
  Collapse,
  Fade,
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
import Image from "next/image";
import logo from "@/assets/logo.png";
import SearchPanel from "../widgets/SearchPanel";
import NotificationPanel from "../widgets/NotificationPanel";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { log } from "console";

const dacingScript = Dancing_Script({ subsets: ["latin"], weight: ["700"] });

const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickMenuMore = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuMore = () => {
    setAnchorEl(null);
  };
  const [openleftSideBar, setOpenLeftSideBar] = useState(
    pathname !== "/messages" ? true : false
  );

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index);
  };

  const [openSearch, setOpenSearch] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        zIndex: 1200,
        position: "fixed",
      }}
    >
      <Collapse
        orientation="horizontal"
        in={openleftSideBar}
        collapsedSize={80}
        sx={{ borderRight: "1px solid #e2e8f0" }}
      >
        <Box
          sx={
            !openleftSideBar
              ? {
                  width: "80px",
                  height: "100vh",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  borderRight: "1px solid #e2e8f0",
                }
              : {
                  width: "250px",
                  height: "100vh",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  borderRight: "1px solid #e2e8f0",
                }
          }
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "left",
              alignItems: "center",
              height: "10%",
              padding: "0 20px",
              gap: "10px",
            }}
          >
            {openleftSideBar ? (
              <Fade in={openleftSideBar}>
                <Typography
                  fontSize="27px"
                  color="black"
                  fontWeight="bold"
                  fontFamily={dacingScript.style.fontFamily}
                >
                  Ninstagram
                </Typography>
              </Fade>
            ) : (
              <Fade in={!openleftSideBar}>
                <Image src={logo} alt="instagram" width={40} height={40} />
              </Fade>
            )}
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
              {sideBarItems.map((item, index) => {
                const isActive =
                  (pathname.includes(item.route) && item.route.length > 1) ||
                  pathname === item.route;

                return (
                  <Link href={item.route} key={index}>
                    <ListItem key={index}>
                      <ListItemButton
                        sx={{
                          "&:hover": {
                            cursor: "pointer",
                          },
                          padding: "7px 12px",
                          borderRadius: "7px",
                          height: "46px",
                        }}
                        onClick={() => {
                          if (pathname.includes("messages")) {
                            if (item.id === 2) {
                              setOpenSearch(!openSearch);
                              setOpenLeftSideBar(false);
                              setOpenNotification(false);
                            } else if (item.id === 6) {
                              setOpenNotification(!openNotification);
                              setOpenLeftSideBar(false);
                              setOpenSearch(false);
                            } else if (item.id === 5) {
                              setOpenLeftSideBar(false);
                              setOpenSearch(false);
                              setOpenNotification(false);
                            } else {
                              setOpenLeftSideBar(true);
                              setOpenSearch(false);
                              setOpenNotification(false);
                            }
                          } else if (item.id === 2) {
                            setOpenSearch(!openSearch);
                            setOpenLeftSideBar(openSearch);
                            setOpenNotification(false);
                          } else if (item.id === 6) {
                            setOpenNotification(!openNotification);
                            setOpenLeftSideBar(openNotification);
                            setOpenSearch(false);
                          } else if (item.id === 5) {
                            setOpenLeftSideBar(false);
                            setOpenSearch(false);
                            setOpenNotification(false);
                          } else {
                            setOpenLeftSideBar(true);
                            setOpenSearch(false);
                            setOpenNotification(false);
                          }
                        }}
                      >
                        <ListItemIcon sx={{ color: "black", fontSize: "20px" }}>
                          {isActive ? item.iconActive : item.iconNonActive}
                        </ListItemIcon>
                        {openleftSideBar && (
                          <ListItemText
                            primary={
                              <Typography
                                fontWeight={isActive ? "bold" : "normal"}
                              >
                                {item.label}
                              </Typography>
                            }
                          />
                        )}
                      </ListItemButton>
                    </ListItem>
                  </Link>
                );
              })}
            </List>
            <List>
              <ListItem>
                <ListItemButton
                  sx={
                    openleftSideBar
                      ? {
                          "&:hover": {
                            cursor: "pointer",
                          },
                          padding: "10px 12px",
                          borderRadius: "7px",
                        }
                      : {
                          "&:hover": {
                            cursor: "pointer",
                          },
                          padding: "10px 12px",
                          borderRadius: "7px",
                          height: "52px",
                        }
                  }
                  selected={selectedIndex === 1}
                  onClick={(event) => {
                    setOpenLeftSideBar(true);
                    setOpenSearch(false);
                    setOpenNotification(false);
                    handleListItemClick(event, 1);
                  }}
                >
                  <ListItemIcon>
                    <OnlineAvatar
                      imgURL="https://material-ui.com/static/images/avatar/1.jpg"
                      height={25}
                      width={25}
                    />
                  </ListItemIcon>
                  {openleftSideBar && <ListItemText primary="Profile" />}
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  sx={
                    openleftSideBar
                      ? {
                          "&:hover": {
                            cursor: "pointer",
                          },
                          padding: "7px 12px",
                          borderRadius: "7px",
                        }
                      : {
                          "&:hover": {
                            cursor: "pointer",
                          },
                          padding: "7px 12px",
                          borderRadius: "7px",
                          height: "46px",
                        }
                  }
                  onClick={handleClickMenuMore}
                >
                  <ListItemIcon>
                    <MenuOutlined />
                  </ListItemIcon>
                  {openleftSideBar && <ListItemText primary="More" />}
                </ListItemButton>
              </ListItem>
            </List>
            <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenuMore}>
              <List disablePadding>
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
                  <ListItemButton onClick={handleCloseMenuMore}>
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
      </Collapse>

      <SearchPanel open={openSearch} />
      <NotificationPanel open={openNotification} />
    </Box>
  );
};

export default LeftSideBar;
