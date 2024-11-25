import { Favorite, Forum } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

interface ExploreImageProps {
  imageSrc: string;
}

const ExploreImage = ({ imageSrc }: ExploreImageProps) => {
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
        src={imageSrc}
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
