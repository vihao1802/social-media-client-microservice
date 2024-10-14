"use client";
import { Box, Link, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Confetti from "react-confetti";

const Recovered = () => {
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        borderRadius: 4,
        padding: 3,
        maxWidth: "420px",
        width: "100%",
        textAlign: "center",
      }}
    >
      <Confetti width={innerWidth} height={innerHeight} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "30px",
        }}
      >
        <CheckCircleIcon
          fontSize="large"
          sx={{
            color: "green",
            marginRight: "10px",
          }}
        />
        <Typography
          sx={{
            fontSize: "22px",
          }}
        >
          Reset password successfully
        </Typography>
      </Box>

      <Typography>
        <Link
          sx={{
            color: "black",
            cursor: "pointer",
            textDecoration: "none",
            ":hover": {
              color: "var(--buttonColor)",
            },
            fontSize: "20px",
          }}
          href={"/sign-in"}
        >
          Back to Login
        </Link>
      </Typography>
    </Box>
  );
};

export default Recovered;
