"use client";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext } from "react";
import { RecoveryContext } from "@/app/(auth)/password-recovery/page";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

const SendOTPEmailSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});

const SendOTPEmail = () => {
  const { setPage, setEmail, setOTP } = useContext(RecoveryContext);

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
        "& > * + *": {
          marginTop: "20px",
        },
      }}
    >
      <Typography
        sx={{
          fontSize: "22px",
        }}
      >
        Forgot password
      </Typography>
      <Typography
        sx={{
          color: "gray",
          textAlign: "left",
        }}
        fontSize={"16px"}
      >
        Please enter your email account. You will receive an OTP with 4 digit to
        reset new password.
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Formik
          initialValues={{ email: "" }}
          validationSchema={SendOTPEmailSchema}
          onSubmit={async (values) => {
            // handle send OTP code to email
            const OTP = Math.floor(Math.random() * 9000 + 1000);
            console.log(OTP);
            setOTP(OTP);

            console.log(values.email);
            setEmail(values.email);

            toast.success("OTP code sent!");
            setPage("otp");
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                type="email"
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="normal"
                size="medium"
                color="primary"
                error={touched.email && !!errors.email}
                helperText={<ErrorMessage name="email" />}
              />

              <Button
                type="submit"
                size="large"
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  color: "white",
                  backgroundColor: "var(--buttonColor)",
                  ":hover": {
                    backgroundColor: "var(--buttonHoverColor)",
                  },
                  position: "relative",
                }}
                // onClick={() => setPage("otp")}
              >
                Continue{" "}
                <ArrowForwardIcon
                  sx={{ fontSize: "24px", position: "absolute", right: "20px" }}
                />
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <Box>
        <Typography>
          Remember your password?{" "}
          <Link
            sx={{
              color: "var(--buttonColor)",
              cursor: "pointer",
              textDecoration: "none",
            }}
            href={"/sign-in"}
          >
            Sign In Now!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SendOTPEmail;
