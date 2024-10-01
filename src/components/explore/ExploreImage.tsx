import { Favorite, Forum } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
const ExploreImage = () => {
  return (
    <Box
      className="card"
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        cursor: "pointer",
        "&:hover .overlay": {
          opacity: 1,
        },
        "&:hover .icons": {
          opacity: 1,
        },
      }}
    >
      {/* Image */}
      <Box
        component="img"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        src={
          "https://scontent.xx.fbcdn.net/v/t1.15752-9/460188017_1683354479131141_1343734346609888834_n.png?_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_ohc=Ie5vxqE_UN0Q7kNvgEJusgr&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent.xx&_nc_gid=AHFdCeiumbOFlfqT4bjDD1H&oh=03_Q7cD1QHt110ENEN3Y4vB8CuJ_A3w9MZTjC8yFCmxUg2SGFW7Yw&oe=671CCEC9"
        }
      />

      {/* Dark overlay that appears on hover */}
      <Box
        className="overlay"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      />

      {/* Icons positioned on top of the image, initially hidden */}
      <Box
        className="icons"
        sx={{
          position: "absolute",
          top: "10px",
          left: "10px",
          color: "white",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          opacity: 0,
          transition: "opacity 0.3s ease-in-out",
        }}
      >
        <Favorite />
        <Typography>120</Typography>
      </Box>

      <Box
        className="icons"
        sx={{
          position: "absolute",
          top: "50px",
          left: "10px",
          color: "white",
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          gap: "10px",
          opacity: 0,
          transition: "opacity 0.15s ease-in-out",
        }}
      >
        <Forum />
        <Typography>120</Typography>
      </Box>
    </Box>
  );
};

export default ExploreImage;
