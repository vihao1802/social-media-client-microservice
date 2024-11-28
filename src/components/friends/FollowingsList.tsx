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
import { useRouter } from "next/navigation";
import { useGetRelationshipMeFollowing } from "@/hooks/relationship/useGetRelationshipMeFollowing";
import { User } from "@/models/user";
import { RelationshipStatus } from "@/types/enum";

interface Friends {
  id: number;
  name: string;
  text: string;
  avatar: string;
  title: string;
  subtitle: string;
  date: Date;
}

const listFriends: Friends[] = [
  {
    id: 1,
    name: "Alice Johnson Hey, long time no see! Hey, long time no see! Hey, long time no see!",
    text: "Hey, long time no see!",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    title: "Project Manager",
    subtitle: "Let's catch up soon.",
    date: new Date("2020-09-20T14:30:00"),
  },
  {
    id: 2,
    name: "Bob Williams",
    text: "Don't forget the meeting tomorrow.",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    title: "Software Engineer",
    subtitle: "Meeting at 10:00 AM.",
    date: new Date("2023-09-21T09:45:00"),
  },
  {
    id: 3,
    name: "Catherine Lee",
    text: "Can you review my code?",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    title: "Frontend Developer",
    subtitle: "Need feedback on the UI.",
    date: new Date("2023-09-19T11:20:00"),
  },
  {
    id: 4,
    name: "Daniel Kim",
    text: "Happy Birthday!",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    title: "Data Analyst",
    subtitle: "Wishing you a great day!",
    date: new Date("2023-09-18T08:00:00"),
  },
  {
    id: 5,
    name: "Ella Parker",
    text: "Let's go for lunch.",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    title: "Product Designer",
    subtitle: "How about sushi?",
    date: new Date("2023-09-17T12:15:00"),
  },
  {
    id: 6,
    name: "Frank Harris",
    text: "I'll send the report by EOD.",
    avatar: "https://randomuser.me/api/portraits/men/6.jpg",
    title: "Marketing Specialist",
    subtitle: "Almost done with the report.",
    date: new Date("2023-09-16T15:45:00"),
  },
  {
    id: 7,
    name: "Grace Adams",
    text: "Can we reschedule the call?",
    avatar: "https://randomuser.me/api/portraits/women/7.jpg",
    title: "Sales Manager",
    subtitle: "Let me know your availability.",
    date: new Date("2023-09-15T10:30:00"),
  },
  {
    id: 8,
    name: "Harry Brown",
    text: "The project deadline is next week.",
    avatar: "https://randomuser.me/api/portraits/men/8.jpg",
    title: "Backend Developer",
    subtitle: "We need to finalize the API.",
    date: new Date("2023-09-14T13:00:00"),
  },
  {
    id: 9,
    name: "Isabella Davis",
    text: "I'll be on vacation next week.",
    avatar: "https://randomuser.me/api/portraits/women/9.jpg",
    title: "HR Manager",
    subtitle: "Please contact John for any HR-related queries.",
    date: new Date("2023-09-13T16:00:00"),
  },
  {
    id: 10,
    name: "Jack Miller",
    text: "Can you join the team meeting?",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    title: "DevOps Engineer",
    subtitle: "We need to discuss infrastructure updates.",
    date: new Date("2023-09-12T11:30:00"),
  },
];

const FollowingsList = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = (user: User) => {
    setOpen(true);
    setFollowingItem(user);
  };
  const handleClose = () => setOpen(false);
  const [followingItem, setFollowingItem] = useState<User | null>(null);
  const { data: relationshipMeFollowing } = useGetRelationshipMeFollowing({});

  if (!relationshipMeFollowing) return null;

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
              src={followingItem?.profile_img || "/icons/user-3296"}
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
      {relationshipMeFollowing.map((item, index) => (
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
            src={item.receiver.profile_img || "/icons/user-3296"}
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
                href={`/messages/${item.id}`}
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
                color: "white",
                backgroundColor: "gray",
                borderRadius: "5px",
                ":hover": {
                  backgroundColor: "var(--buttonColor)",
                },
              }}
            >
              <Typography sx={{ fontSize: "14px" }}>Pending</Typography>
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default FollowingsList;
