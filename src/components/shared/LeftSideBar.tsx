'use client';

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
} from '@mui/material';
import { Dancing_Script } from 'next/font/google';
import dynamic from 'next/dynamic';
import {
  MenuOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
} from '@mui/icons-material';
import { sideBarItems } from '../../constants/index';
import OnlineAvatar from '@/components/widgets/OnlineAvatar';
import React, { useState } from 'react';
import Image from 'next/image';
import logo from '@/assets/images/logo.png';
import SearchPanel from '../widgets/SearchPanel';
import NotificationPanel from '../widgets/NotificationPanel';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import PostForm from '../post/PostForm';
const FadeComponent = dynamic(() => import('@mui/material/Fade'), {
  ssr: false,
});
const dacingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
});

const LeftSideBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { logout, user } = useAuthenticatedUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClickMenuMore = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenuMore = () => {
    setAnchorEl(null);
  };
  const [openleftSideBar, setOpenLeftSideBar] = useState(
    !pathname.includes('/messages')
  );

  const [openSearch, setOpenSearch] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.push('/sign-in');
    // window.location.href = "/sign-in";
  };

  const [openPostForm, setOpenPostForm] = React.useState(false);

  const handleClickOpenPostForm = () => {
    setOpenPostForm(true);
  };

  const handleClosePostForm = () => {
    setOpenPostForm(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        zIndex: 1200,
        position: 'fixed',
      }}
    >
      <Collapse
        orientation="horizontal"
        in={openleftSideBar}
        collapsedSize={80}
        sx={{ borderRight: '1px solid #e2e8f0' }}
      >
        <Box
          sx={
            !openleftSideBar
              ? {
                  width: '80px',
                  height: '100vh',
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRight: '1px solid #e2e8f0',
                }
              : {
                  width: '250px',
                  height: '100vh',
                  backgroundColor: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRight: '1px solid #e2e8f0',
                }
          }
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              alignItems: 'center',
              height: '10%',
              padding: '0 20px',
              gap: '10px',
            }}
          >
            {openleftSideBar ? (
              <FadeComponent in={openleftSideBar}>
                <Typography
                  fontSize="27px"
                  color="black"
                  fontWeight="bold"
                  fontFamily={dacingScript.style.fontFamily}
                >
                  Ninstagram
                </Typography>
              </FadeComponent>
            ) : (
              <FadeComponent in={!openleftSideBar}>
                <Image src={logo} alt="instagram" width={40} height={40} />
              </FadeComponent>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '90%',
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
                          '&:hover': {
                            cursor: 'pointer',
                          },
                          padding: '7px 12px',
                          borderRadius: '7px',
                          height: '48px',
                          border:
                            (item.id === 2 && openSearch) ||
                            (item.id === 6 && openNotification)
                              ? '1px solid #DBDBDB'
                              : '',
                        }}
                        onClick={() => {
                          if (pathname.includes('messages')) {
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

                          if (item.id === 8) {
                            handleClickOpenPostForm();
                          }
                        }}
                      >
                        <ListItemIcon sx={{ color: 'black', fontSize: '20px' }}>
                          {isActive ||
                          (item.id === 2 && openSearch) ||
                          (item.id === 6 && openNotification)
                            ? item.iconActive
                            : item.iconNonActive}
                        </ListItemIcon>
                        {openleftSideBar && (
                          <ListItemText
                            primary={
                              <Typography
                                fontWeight={isActive ? 'bold' : 'normal'}
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
              {user && (
                <Link href={`/profile/${user.id}`}>
                  <ListItem>
                    <ListItemButton
                      sx={
                        openleftSideBar
                          ? {
                              '&:hover': {
                                cursor: 'pointer',
                              },
                              padding: '10px 12px',
                              borderRadius: '7px',
                            }
                          : {
                              '&:hover': {
                                cursor: 'pointer',
                              },
                              padding: '10px 12px',
                              borderRadius: '7px',
                              height: '52px',
                            }
                      }
                      // selected={selectedIndex === 1}
                      onClick={() => {
                        setOpenLeftSideBar(true);
                        setOpenSearch(false);
                        setOpenNotification(false);
                      }}
                    >
                      <ListItemIcon>
                        <OnlineAvatar
                          imgURL={user.profile_img || '/icons/user.png'}
                          height={25}
                          width={25}
                          isSelected={pathname.includes(`/profile/${user.id}`)}
                        />
                      </ListItemIcon>
                      {openleftSideBar && (
                        <ListItemText
                          primary={
                            <Typography
                              sx={{
                                fontWeight: pathname.includes(
                                  `/profile/${user.id}`
                                )
                                  ? 'bold'
                                  : 'normal',
                              }}
                            >
                              {user.username}
                            </Typography>
                          }
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                </Link>
              )}
              {/* Log out button */}
              <ListItem>
                <ListItemButton
                  sx={
                    openleftSideBar
                      ? {
                          '&:hover': {
                            cursor: 'pointer',
                          },
                          padding: '7px 12px',
                          borderRadius: '7px',
                        }
                      : {
                          '&:hover': {
                            cursor: 'pointer',
                          },
                          padding: '7px 12px',
                          borderRadius: '7px',
                          height: '46px',
                        }
                  }
                  onClick={handleLogout}
                >
                  <ListItemIcon>
                    <ExitToAppOutlined />
                  </ListItemIcon>
                  {openleftSideBar && <ListItemText primary="Log out" />}
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Box>
      </Collapse>

      <SearchPanel open={openSearch} />
      <NotificationPanel open={openNotification} />
      <PostForm open={openPostForm} handleClose={handleClosePostForm} />
    </Box>
  );
};

export default LeftSideBar;
