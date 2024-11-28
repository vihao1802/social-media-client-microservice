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
import AvatarName from "../shared/AvatarName";
import { useEffect, useState } from "react";
import { Friends } from "@/types";
import { useRouter } from "next/navigation";
import { useGetRelationshipMeFollowing } from "@/hooks/relationship/useGetRelationshipMeFollowing";
import { useGetRelationshipMeFollower } from "@/hooks/relationship/useGetRelationshipMeFollower";
import { User } from "@/models/user";
import { list } from "postcss";
import { RelationshipStatus } from "@/types/enum";

const leftBarWidth = "350px";

function timeAgo(itemDate: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - itemDate.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} second${diffInSeconds === 1 ? "" : "s"} ago`;
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes === 1 ? "" : "s"} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours === 1 ? "" : "s"} ago`;
  } else if (diffInDays < 30) {
    return `${diffInDays} day${diffInDays === 1 ? "" : "s"} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths === 1 ? "" : "s"} ago`;
  } else {
    return `${diffInYears} year${diffInYears === 1 ? "" : "s"} ago`;
  }
}

const LeftSideBarMessages = () => {
  const [selectedChatFriendItem, setSelectedChatFriendItem] =
    useState<User | null>(null);
  const router = useRouter();
  const [loadingData, setLoadingData] = useState(true);
  const [followLists, setFollowLists] = useState<User[]>([]);
  const handleSelect = (user: User) => {
    console.log(user);

    setSelectedChatFriendItem(user);
    // onChatFriendItemSelect(data);
    router.push(`/messages/${user.relationshipId}?u_id=${user.id}`);
  };

  const { data: relationshipMeFollowing } = useGetRelationshipMeFollowing({});
  const { data: relationshipMeFollower } = useGetRelationshipMeFollower({});

  useEffect(() => {
    setLoadingData(true);
    console.log({ followLists });

    if (relationshipMeFollowing && relationshipMeFollower) {
      let list: User[] = [];
      relationshipMeFollowing.forEach((item) => {
        const user = item.receiver;
        if (item.status === RelationshipStatus.Accepted)
          list.push({ ...user, relationshipId: item.id });
      });
      relationshipMeFollower.forEach((item) => {
        const user = item.sender;
        if (item.status === RelationshipStatus.Accepted)
          list.push({ ...user, relationshipId: item.id });
      });
      setFollowLists(list);
    }
    setLoadingData(false);
  }, [relationshipMeFollowing, relationshipMeFollower]);

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
          {loadingData
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
            : followLists.map((item: User, index: number) => (
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
                          selectedChatFriendItem &&
                          item.id === selectedChatFriendItem.id
                            ? "#DFE0E0"
                            : "white",
                      }}
                      onClick={() => handleSelect(item)}
                    >
                      <Box
                        sx={{
                          borderRadius: "50%",
                          padding: "0 10px",
                        }}
                      >
                        <Avatar
                          alt={item.username}
                          src={item.profile_img || "/icons/user-3296"}
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
                              fontWeight:
                                selectedChatFriendItem &&
                                item.id === selectedChatFriendItem.id
                                  ? "600"
                                  : "400",
                            }}
                          >
                            {item.username}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "12px",
                              color: "#9595AF",
                            }}
                          >
                            {timeAgo(new Date(item.create_at))}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            fontSize: "15px",
                            color: "#555555",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            fontWeight:
                              selectedChatFriendItem &&
                              item.id === selectedChatFriendItem.id
                                ? "500"
                                : "400",
                          }}
                        >
                          {"Hello world"}
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
