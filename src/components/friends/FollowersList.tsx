import { Box, Button, Link, Typography } from "@mui/material";
import AvatarName from "../shared/AvatarName";

const FollowersList = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          sm: "repeat(1, 1fr)", // small
          md: "repeat(2, 1fr)", // medium
          lg: "repeat(3, 1fr)", // large
        },
        gap: "10px",
      }}
    >
      {Array.from(new Array(15)).map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "12px 15px",
            gap: "15px",
            alignItems: "center",
            border: "2px solid #e3e3e3",
            borderRadius: "10px",
          }}
        >
          <AvatarName name="Nguyen Van A" />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: "300px",
            }}
          >
            <Link href="/" underline="hover" color="black">
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                }}
              >
                Nguyen Van A Nguyen Van ANguyen Van A Nguyen Van A
              </Typography>
            </Link>
            <Typography
              sx={{
                color: "gray",
              }}
            >
              123 followers
            </Typography>
          </Box>
          <Button
            sx={{
              backgroundColor: "#DBDBDB",
              color: "black",
              height: "30px",
              borderRadius: "20px",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#CECECE",
              },
            }}
          >
            Follow
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default FollowersList;
