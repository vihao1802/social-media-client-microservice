"use client";
import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import { SignInSchema } from "@/validations/signin.schema";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import { useRouter } from "next/navigation";
import { LoginRequest } from "@/models/auth-login";
import toast from "react-hot-toast";
import GradientCircularProgress from "@/components/shared/Loader";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const { login } = useAuthenticatedUser({
    revalidateOnMount: false,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (payload: LoginRequest) => {
    setIsLogin(true);
    try {
      const res = await login(payload);
      if (res && res.status === 200) {
        toast.success("Sign in successfully");

        /* if (res.scope === "ADMIN") {
          router.push("/dashboard");
          return;
        } */

        router.push("/");
      } else {
        toast.error("Sign in failed");
      }
    } catch (error) {
      toast.error("Sign in failed");
      console.log(error);
    } finally {
      setIsLogin(false);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
        borderRadius: 4,
        padding: 3,
        margin: "auto",
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
        Sign In
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
        }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignInSchema}
          onSubmit={async (values) => {
            handleSignIn(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="email"
                type="email"
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                margin="normal"
                size="small"
                color="primary"
                error={touched.email && !!errors.email}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                name="password"
                type={showPassword ? "text" : "password"}
                fullWidth
                id="password"
                label="Password"
                variant="outlined"
                margin="normal"
                size="small"
                color="primary"
                autoComplete="on"
                error={touched.password && !!errors.password}
                helperText={<ErrorMessage name="password" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={togglePasswordVisibility}
                        onMouseDown={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <VisibilityOffOutlined sx={{ color: "black" }} />
                        ) : (
                          <Visibility sx={{ color: "black" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                size="large"
                disabled={isLogin}
                sx={{
                  marginTop: "25px",
                  width: "100%",
                  color: "white",
                  backgroundColor: "var(--buttonColor)",
                  ":hover": {
                    backgroundColor: "var(--buttonHoverColor)",
                  },
                  ":disabled": {
                    backgroundColor: "#e7e7e7",
                  },
                }}
              >
                {isLogin ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <GradientCircularProgress width={25} />
                  </Box>
                ) : (
                  "Sign In"
                )}
              </Button>
            </Form>
          )}
        </Formik>

        <Typography
          sx={{
            textAlign: "right",
          }}
        >
          <Link
            sx={{
              color: "gray",
              cursor: "pointer",
              textDecoration: "none",
            }}
            href={"/password-recovery"}
          >
            Forgot password
          </Link>
        </Typography>
      </Box>

      <Box>
        <Typography>
          No account?{" "}
          <Link
            sx={{
              cursor: "pointer",
              textDecoration: "none",
            }}
            href={"/sign-up"}
          >
            Sign Up Now!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignInPage;
