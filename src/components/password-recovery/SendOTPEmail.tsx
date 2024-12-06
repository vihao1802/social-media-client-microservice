"use client";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext, useState } from "react";
import { RecoveryContext } from "@/context/recovery-context";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { useRouter } from "next/navigation";

const SendOTPEmailSchema = Yup.object().shape({
  email: Yup.string().email("Email is invalid").required("Email is required"),
});

const SendOTPEmail = () => {
  const { setPage, setEmail, setOTP } = useContext(RecoveryContext);
  const [isSentMail, setIsSentMail] = useState(false);

  const { sendEmail } = useAuthenticatedUser();
  const router = useRouter();
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
        {isSentMail ? (
          <CheckCircleIcon
            fontSize="large"
            sx={{
              color: "green",
              marginRight: "10px",
            }}
          />
        ) : (
          "Forgot Password?"
        )}
      </Typography>
      <Typography
        sx={{
          color: "gray",
          textAlign: "left",
        }}
        fontSize={"16px"}
      >
        {!isSentMail
          ? "Please enter your email account. You will receive an OTP with 4 digit to reset new password."
          : "Please check your email to recover your password."}
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
            console.log("values", values);

            const res = await sendEmail(values);
            if (res.status >= 200 && res.status < 300) {
              toast.success("Email sent!");
              setIsSentMail(true);
            }
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

              {!isSentMail ? (
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
                    sx={{
                      fontSize: "24px",
                      position: "absolute",
                      right: "20px",
                    }}
                  />
                </Button>
              ) : (
                <Button
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
                  href={"/sign-in"}
                >
                  Back to sign in page
                </Button>
              )}
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
