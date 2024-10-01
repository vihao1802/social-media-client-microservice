import ExploreImage from "@/components/explore/ExploreImage";
import { Favorite, Forum } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

const Explore = () => {
  return (
    <Box
      sx={{
        width: "calc(100% - 250px)",
        marginLeft: "auto",
      }}
    >
      <Box
        sx={{
          maxWidth: "900px",
          width: "100%",
          margin: "0 auto",
          padding: "30px 0",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sm: "repeat(2,  1fr)",
              md: "repeat(3,  1fr)",
            },
            gridAutoRows: "300px",
            "& .card:nth-of-type(7n+1)": {
              // Target every 7th card starting from the first
              gridColumn: "auto / span 1",
              gridRow: "auto / span 2",
            },
            gap: "5px",
          }}
        >
          {Array.from(Array(10)).map((_, index) => (
            <ExploreImage key={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Explore;
