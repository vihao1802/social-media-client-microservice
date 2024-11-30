"use client";
import {
  Box,
  Button,
  InputAdornment,
  Link,
  TextField,
  Typography,
  IconButton,
  MenuItem,
} from "@mui/material";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Visibility, VisibilityOffOutlined } from "@mui/icons-material";
import { SignUpSchema } from "@/validations/signup.schema";
import { useRouter } from "next/navigation";
import { useAuthenticatedUser } from "@/hooks/auth/useAuthenticatedUser";
import toast from "react-hot-toast";
import dayjs from "dayjs";
import GradientCircularProgress from "@/components/shared/Loader";

const SignUpPage = () => {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useAuthenticatedUser();

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
            userName: "",
            email: "",
            password: "",
            confirmPassword: "",
            date_of_birth: "",
            gender: 1,
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values) => {
            const { confirmPassword, ...newValues } = values;
            console.log({
              ...newValues,
              gender: 1 ? true : false,
              date_of_birth: dayjs(values.date_of_birth).toISOString(),
            });
            setIsSignUp(true);
            try {
              const res = await register({
                ...newValues,
                gender: 1 ? true : false,
                date_of_birth: dayjs(values.date_of_birth).toISOString(),
              });

              if (res && res.status === 200) {
                toast.success("Sign up successfully");
                router.push("/sign-in");
              }
            } catch (error) {
              toast.error("Sign up failed");
              console.log(error);
            } finally {
              setIsSignUp(false);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="userName"
                type="text"
                fullWidth
                id="userName"
                label="Username"
                variant="outlined"
                margin="dense"
                size="small"
                color="primary"
                error={touched.userName && !!errors.userName}
                helperText={<ErrorMessage name="userName" />}
              />
              <Field
                as={TextField}
                name="email"
                type="email"
                fullWidth
                id="email"
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
                id="password"
                label="Password"
                variant="outlined"
                margin="dense"
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
              <Field
                as={TextField}
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                variant="outlined"
                margin="dense"
                size="small"
                color="primary"
                autoComplete="on"
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
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Field
                  as={TextField}
                  name="date_of_birth"
                  type="date"
                  id="date_of_birth"
                  label="Date of Birth"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  color="primary"
                  fullWidth
                  InputLabelProps={{
                    shrink: true, // Forces the label to stay above the field
                  }}
                  inputProps={{
                    max: new Date().toISOString().split("T")[0],
                  }}
                  error={touched.date_of_birth && !!errors.date_of_birth}
                  helperText={<ErrorMessage name="date_of_birth" />}
                />

                <Field
                  as={TextField}
                  name="gender"
                  select
                  id="gender"
                  label="Gender"
                  variant="outlined"
                  margin="dense"
                  size="small"
                  color="primary"
                  fullWidth
                  error={touched.gender && !!errors.gender}
                  helperText={<ErrorMessage name="gender" />}
                >
                  {[
                    { value: 1, label: "Male" },
                    { value: 0, label: "Female" },
                  ].map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Box>

              <Button
                type="submit"
                size="medium"
                disabled={isSignUp}
                sx={{
                  marginTop: "10px",
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
                {isSignUp ? (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <GradientCircularProgress width={25} />
                  </Box>
                ) : (
                  "Sign Up"
                )}
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

export default SignUpPage;
