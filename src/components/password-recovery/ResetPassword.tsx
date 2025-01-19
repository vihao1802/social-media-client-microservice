'use client';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { RecoveryContext } from '@/context/recovery-context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOffOutlined } from '@mui/icons-material';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords do not match')
    .required('Confirm Password is required'),
});

const ResetPassword = () => {
  const { setPage } = useContext(RecoveryContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resetPassword } = useAuthenticatedUser();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  if (!token || !email) {
    toast.error('Invalid token or email');
    router.push('/password-recovery');
    return;
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        borderRadius: 4,
        padding: 3,
        maxWidth: '420px',
        width: '100%',
        textAlign: 'center',
        '& > * + *': {
          marginTop: '20px',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '22px',
        }}
      >
        Reset new password
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Formik
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={async (values) => {
            // handle form submission
            const res = await resetPassword({
              email,
              resetToken: token,
              newPassword: values.password,
            });

            if (res.status >= 200 && res.status < 300) {
              toast.success('Reset password successfully');
              router.push('/sign-in');
            } else if (res.status === 400) {
              toast.error('Invalid password');
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="outlined"
                margin="dense"
                size="medium"
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
                          <VisibilityOffOutlined sx={{ color: 'black' }} />
                        ) : (
                          <Visibility sx={{ color: 'black' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Field
                as={TextField}
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                variant="outlined"
                margin="dense"
                size="medium"
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
                          <VisibilityOffOutlined sx={{ color: 'black' }} />
                        ) : (
                          <Visibility sx={{ color: 'black' }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                size="large"
                sx={{
                  marginTop: '10px',
                  width: '100%',
                  color: 'white',
                  backgroundColor: 'var(--buttonColor)',
                  ':hover': {
                    backgroundColor: 'var(--buttonHoverColor)',
                  },
                  position: 'relative',
                }}
              >
                Complete
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ResetPassword;
