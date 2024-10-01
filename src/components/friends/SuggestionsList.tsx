import { Box, Button, Link, Typography } from "@mui/material";

const SuggestionsList = () => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(1, 1fr)", // extra small
          // sm: "repeat(1, 1fr)", // small
          md: "repeat(2, 1fr)", // medium
          // lg: "repeat(2, 1fr)", // large
          xl: "repeat(3, 1fr)", // extra large
        },
        gap: "15px",
      }}
    >
      {Array.from(new Array(10)).map((item, index) => (
        <Box
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "22px 15px",
            gap: "12px",
            border: "2px solid #e3e3e3",
            borderRadius: "10px",
          }}
        >
          <img
            src={"https://material-ui.com/static/images/avatar/1.jpg"}
            alt="Avatar"
            className="w-24 h-24 rounded-full"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
            }}
          >
            <Link href="/" underline="hover" color="black">
              <Typography>Nguyen Van A </Typography>
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
              backgroundColor: "#4491F5",
              color: "white",
              height: "30px",
              width: "100%",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#1877F2",
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

export default SuggestionsList;
