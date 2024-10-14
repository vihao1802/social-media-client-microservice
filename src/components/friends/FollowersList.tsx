import { Box, Button, Link, Typography } from "@mui/material";
import AvatarName from "../shared/AvatarName";

const FollowersList = () => {
  return (
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
      {Array.from(new Array(15)).map((item, index) => (
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
          <AvatarName name="Nguyen Van A" />
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
            <Link href="/" underline="none" color="black">
              <Typography
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  width: "100%",
                  fontSize: "15px",
                }}
              >
                Nguyen Van A Nguyen Van ANguyen Van A Nguyen Van A
              </Typography>
            </Link>
            <Typography
              sx={{
                color: "gray",
                fontSize: "13px",
              }}
            >
              123 followers
            </Typography>
          </Box>
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
            Follow
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default FollowersList;
