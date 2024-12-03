import {
  Box,
  Button,
  Divider,
  Link,
  Modal,
  Typography,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { useGetRelationshipMeFollowing } from "@/hooks/relationship/useGetRelationshipMeFollowing";
import { User } from "@/models/user";
import { RelationshipStatus } from "@/types/enum";
import GradientCircularProgress from "../shared/Loader";
import { relationshipApi } from "@/api/relationship";
import toast from "react-hot-toast";
import { mutate } from "swr";

const FollowingsList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = (user: User) => {
    setOpen(true);
    setFollowingItem(user);
  };
  const handleClose = () => setOpen(false);
  const [followingItem, setFollowingItem] = useState<User | null>(null);
  const { data: relationshipMeFollowing } = useGetRelationshipMeFollowing({});

  const handleUnFollow = async (user_id: string) => {
    if (!user_id) return;
    try {
      const res = await relationshipApi.unfollowUser(user_id);
      if (res) {
        toast.success("Unfollowed");
        mutate("get_me_following");
        mutate("get_me_follower");
        mutate("get_message_by_relationship_id");
        mutate("get_follower_quantity");
        mutate("get_following_quantity");
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        margin: "0 auto",
        gap: "25px",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            borderRadius: "10px",
          }}
        >
          <Box
            sx={{
              padding: "25px",
            }}
          >
            <img
              src={followingItem?.profile_img || "/icons/user.png"}
              alt="Avatar"
              className="w-24 h-24 rounded-full mx-auto"
            />
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mt: 2, textAlign: "center" }}
            >
              {followingItem && followingItem.username}
            </Typography>
            <Typography sx={{ mt: 2, textAlign: "center", fontWeight: 300 }}>
              Are you sure want to unfollow this fellow?
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              padding: "10px 15px",
              textAlign: "center",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#f7f5f5",
              },
            }}
            onClick={() => handleUnFollow(followingItem?.id || "")}
          >
            <Typography
              sx={{ fontSize: "16px", fontWeight: "700", color: "#EE525E" }}
            >
              Unfollow
            </Typography>
          </Box>
          <Divider />
          <Box
            sx={{
              padding: "10px 15px",
              textAlign: "center",
              cursor: "pointer",
              borderRadius: "0 0 10px 10px",
              ":hover": {
                backgroundColor: "#f7f5f5",
              },
            }}
            onClick={handleClose}
          >
            <Typography sx={{ fontSize: "16px", color: "gray" }}>
              Cancel
            </Typography>
          </Box>
        </Box>
      </Modal>
      {!relationshipMeFollowing ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <GradientCircularProgress />
        </Box>
      ) : (
        relationshipMeFollowing.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <Avatar
              alt={item.receiver.username}
              src={item.receiver.profile_img || "/icons/user.png"}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: "2.4",
                width: "100%",
                marginRight: "auto",
                maxWidth: {
                  sm: "200px",
                  md: "350px",
                },
              }}
            >
              <Link
                href={`profile/${item.receiverId}`}
                underline="none"
                color="black"
              >
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    width: "100%",
                    fontSize: "15px",
                  }}
                >
                  {item.receiver.username}
                </Typography>
              </Link>
              <Typography
                sx={{
                  color: "gray",
                  fontSize: "13px",
                }}
              >
                {item.receiver.email}
              </Typography>
            </Box>

            {item.status === RelationshipStatus.Accepted ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flex: "1",
                  maxWidth: "180px",
                }}
              >
                <Button
                  sx={{
                    textTransform: "none",
                    height: "35px",
                    padding: "6px 16px",
                    color: "#EE525E",
                    borderRadius: "5px",
                    ":hover": {
                      backgroundColor: "white",
                      color: "red",
                    },
                  }}
                  onClick={() => handleOpen(item.receiver)}
                >
                  <Typography sx={{ fontSize: "14px" }}>Unfollow</Typography>
                </Button>
                <Link
                  sx={{
                    textTransform: "none",
                    height: "35px",
                    padding: "6px 16px",
                    color: "black",
                    borderRadius: "5px",
                    textDecoration: "none",
                    gap: "15px",
                    ":hover": {
                      backgroundColor: "#DBDBDB",
                    },
                  }}
                  href={`/messages/r/${item.id}/u/${item.receiverId}`}
                >
                  <Typography sx={{ fontSize: "14px" }}>Message</Typography>
                </Link>
              </Box>
            ) : (
              <Button
                disabled
                sx={{
                  textTransform: "none",
                  height: "35px",
                  padding: "6px 16px",
                  borderRadius: "5px",
                  ":hover": {
                    backgroundColor: "var(--buttonColor)",
                  },
                  ":disabled": {
                    backgroundColor: "#e7e7e7",
                    color: "gray",
                  },
                }}
              >
                <Typography sx={{ fontSize: "14px" }}>Pending</Typography>
              </Button>
            )}
          </Box>
        ))
      )}
    </Box>
  );
};

export default FollowingsList;
