'use client';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useContext, useState } from 'react';
import { RecoveryContext } from '@/context/recovery-context';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
import { useRouter } from 'next/navigation';

const SendOTPEmailSchema = Yup.object().shape({
  email: Yup.string().email('Email is invalid').required('Email is required'),
});

const SendOTPEmail = () => {
  const { setPage, setEmail } = useContext(RecoveryContext);
  const [isLoading, setIsLoading] = useState(false);

  const { getOTP } = useAuthenticatedUser();
  const router = useRouter();
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
        Forgot Password?
      </Typography>
      <Typography
        sx={{
          color: 'gray',
          textAlign: 'center',
        }}
        fontSize={'16px'}
      >
        Please enter your email account to receive an recover password OTP.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}
      >
        <Formik
          initialValues={{ email: '' }}
          validationSchema={SendOTPEmailSchema}
          onSubmit={async (values) => {
            setIsLoading(true);
            const res = await getOTP(values);
            if (res.status >= 200 && res.status < 300) {
              setIsLoading(false);
              toast.success(`Email sent to ${values.email}!`);
              setEmail(values.email);
              setPage('otp');
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
                disabled={isLoading}
                // onClick={() => setPage("otp")}
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Box>

      <Box>
        <Typography>
          Remember your password?{' '}
          <Link
            sx={{
              color: 'var(--buttonColor)',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
            href={'/sign-in'}
          >
            Sign In Now!
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SendOTPEmail;
