"use client";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemButton,
  Skeleton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { User } from "@/models/user";
import { useGetPersonalMessenger } from "@/hooks/relationship/useGetPersonalMessenger";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const leftBarWidth = "350px";

const LeftSideBarMessages = () => {
  const [selectedChatFriendItem, setSelectedChatFriendItem] =
    useState<User | null>(null);
  const router = useRouter();
  const handleSelect = (user: User, relationshipId: string) => {
    console.log(user);

    setSelectedChatFriendItem(user);
    router.push(`/messages/${relationshipId}?u_id=${user.id}`);
  };
  const searchParams = useSearchParams();
  const u_id = searchParams.get("u_id");

  const { data: personalMessengers, isLoading } = useGetPersonalMessenger({});

  return (
    <Box
      sx={{
        width: leftBarWidth,
        height: "100%",
        borderRight: "2px solid #c7c5c5",
      }}
    >
      <Box
        sx={{
          padding: "16px 20px",
          height: "70px",
        }}
      >
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "Left",
          }}
        >
          Chats
        </Typography>
      </Box>

      <Box
        sx={{
          height: "calc(100vh - 70px)",
        }}
      >
        <List
          sx={{
            height: "100%",
            overflowY: "auto",
            padding: "0",
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
          {/* Chat Items Skeleton */}
          {isLoading || !personalMessengers
            ? Array.from(new Array(8)).map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    paddingLeft: "10px",
                    paddingRight: "20px",
                    paddingTop: "10px",
                    height: "70px",
                  }}
                >
                  <Skeleton
                    variant="circular"
                    width={40}
                    height={40}
                    sx={{
                      margin: "0 10px",
                    }}
                    animation="wave"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "calc(100% - 60px)",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        paddingBottom: "10px",
                      }}
                    >
                      <Skeleton
                        variant="rounded"
                        sx={{ fontSize: "1rem", width: "140px" }}
                        animation="wave"
                      />
                      <Skeleton
                        variant="rounded"
                        sx={{
                          fontSize: "1rem",
                          width: "65px",
                          marginLeft: "auto",
                        }}
                        animation="wave"
                      />
                    </Box>
                    <Skeleton
                      variant="rounded"
                      sx={{ fontSize: "17px", width: "100%" }}
                      animation="wave"
                    />
                  </Box>
                </Box>
              ))
            : personalMessengers.map((item, index: number) => (
                <Box key={index}>
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        color: "black",
                        height: "70px",
                        padding: "0",
                        alignItems: "start",
                        paddingLeft: "10px",
                        paddingRight: "20px",
                        paddingTop: "10px",
                        backgroundColor:
                          u_id && item.messenger.id === u_id
                            ? "#DFE0E0"
                            : "white",
                      }}
                      onClick={() =>
                        handleSelect(item.messenger, item.relationshipId)
                      }
                    >
                      <Box
                        sx={{
                          borderRadius: "50%",
                          padding: "0 10px",
                        }}
                      >
                        <Avatar
                          alt={item.messenger.username}
                          src={item.messenger.profile_img || "/icons/user.png"}
                        />
                      </Box>
                      <Box
                        sx={{
                          width: "calc(100% - 60px)",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            gap: "5px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "16px",
                              color: "black",
                              flex: 1,
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              paddingBottom: "5px",
                              fontWeight: "400",
                            }}
                          >
                            {item.messenger.username}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#9595AF",
                            }}
                          >
                            {item.message_created_at &&
                              dayjs(item.message_created_at).fromNow()}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: "15px",
                            color: "#555555",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight: "400",
                          }}
                        >
                          {item.senderId &&
                            item.senderId !== item.messenger.id &&
                            "You: "}
                          {item.latest_message
                            ? item.latest_message
                            : "You can chat now"}
                        </Typography>
                      </Box>
                    </ListItemButton>
                  </ListItem>
                </Box>
              ))}
        </List>
      </Box>
    </Box>
  );
};

export default LeftSideBarMessages;
