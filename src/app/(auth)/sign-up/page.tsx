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
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";

const SignInSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords do not match")
    .required("Confirm password is required"),
});

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
        Sign Up
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
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignInSchema}
          onSubmit={async (values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="username"
                type="text"
                fullWidth
                id="outlined-basic"
                label="Username"
                variant="outlined"
                margin="dense"
                size="small"
                color="primary"
                error={touched.username && !!errors.username}
                helperText={<ErrorMessage name="username" />}
              />
              <Field
                as={TextField}
                name="email"
                type="email"
                fullWidth
                id="outlined-basic"
                label="Email"
                variant="outlined"
                margin="dense"
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
                id="outlined-basic"
                label="Password"
                variant="outlined"
                margin="dense"
                size="small"
                color="primary"
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
              <Field
                as={TextField}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                margin="dense"
                size="small"
                color="primary"
                error={touched.confirmPassword && !!errors.confirmPassword}
                helperText={<ErrorMessage name="confirmPassword" />}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleConfirmPasswordVisibility}
                        onMouseDown={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
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
                size="medium"
                sx={{
                  marginTop: "10px",
                  width: "100%",
                  color: "white",
                  backgroundColor: "var(--buttonColor)",
                  ":hover": {
                    backgroundColor: "var(--buttonHoverColor)",
                  },
                }}
              >
                Sign Up
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <Box>
        <Typography>
          Have an account?{" "}
          <Link
            sx={{
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

export default SignInPage;
