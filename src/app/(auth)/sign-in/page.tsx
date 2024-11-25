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
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            console.log(values);
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
                margin="normal"
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
                Sign In
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
