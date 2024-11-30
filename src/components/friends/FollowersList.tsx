import { Avatar, Box, Button, Link, Typography } from "@mui/material";
import { useGetRelationshipMeFollower } from "@/hooks/relationship/useGetRelationshipMeFollower";
import GradientCircularProgress from "../shared/Loader";
import { RelationshipStatus } from "@/types/enum";

const FollowersList = () => {
  const { data: relationshipMeFollower } = useGetRelationshipMeFollower({});

  return (
    <Box>
      {!relationshipMeFollower ? (
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              // sm: "repeat(1, 1fr)", // small
              // md: "repeat(1, 1fr)", // medium
              lg: "repeat(1, 1fr)", // large
              xl: "repeat(2, 1fr)",
            },
            gap: "15px",
          }}
        >
          {relationshipMeFollower.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: "20px 15px",
                gap: "15px",
                alignItems: "center",
                border: "2px solid #e3e3e3",
                borderRadius: "10px",
              }}
            >
              <Avatar
                alt={item.sender.username}
                src={item.sender.profile_img || "/icons/user.png"}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  marginRight: "auto",
                  width: "100%",
                  maxWidth: {
                    sm: "200px",
                    md: "400px",
                    // lg: "250px",
                    xl: "150px",
                  },
                }}
              >
                <Link
                  href={`profile/${item.senderId}`}
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
                    {item.sender.username}
                  </Typography>
                </Link>
                <Typography
                  sx={{
                    color: "gray",
                    fontSize: "13px",
                  }}
                >
                  {item.sender.email}
                </Typography>
              </Box>
              {item.status !== RelationshipStatus.Accepted && (
                <Button
                  sx={{
                    backgroundColor: "var(--buttonColor)",
                    color: "white",
                    height: "30px",
                    fontSize: "12px",
                    textTransform: "none",
                    ":hover": {
                      backgroundColor: "var(--buttonHoverColor)",
                    },
                  }}
                >
                  Accept
                </Button>
              )}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default FollowersList;
