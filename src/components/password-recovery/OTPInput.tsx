'use client';
import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Box,
  TextField,
  Typography,
  styled,
  Button,
  Link,
} from '@mui/material';
import { BiErrorCircle } from 'react-icons/bi';
import { RecoveryContext } from '@/context/recovery-context';
import toast from 'react-hot-toast';
import { useAuthenticatedUser } from '@/hooks/auth/useAuthenticatedUser';
const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
}));

const StyledTextField = styled(TextField)(({ theme, error }) => ({
  width: '4rem',
  height: '4rem',
  marginRight: '0.5rem', // <-- tạo khoảng cách giữa các ô
  [theme.breakpoints.down('sm')]: {
    width: '3rem',
    height: '3rem',
  },
  '& .MuiOutlinedInput-root': {
    height: '100%',
  },
  '& input': {
    textAlign: 'center',
    fontSize: '1.5rem', // <-- chữ to hơn
    padding: 0,
  },
}));

const ErrorMessage = styled(Typography)(({ theme }) => ({
  color: theme.palette.error.main,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(0.5),
  marginTop: theme.spacing(1),
}));

const OTPInput = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { setPage, email, setResetPasswordToken } = useContext(RecoveryContext);
  const { verifyOTP, getOTP } = useAuthenticatedUser();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      setError('');

      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'Enter') {
      verifyOTPHandle();
    }
  };

  const resendOTP = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const res = await getOTP({ email });
    if (res.status >= 200 && res.status < 300) {
      setIsLoading(false);
      toast.success(`Email sent to ${email}!`);
    } else {
      setIsLoading(false);
      toast.error(`Send OTP failed!`);
    }
  };

  const verifyOTPHandle = async () => {
    if (code.some((digit) => digit === '')) {
      setError('Please enter 6 digit.');
    } else {
      const res = await verifyOTP({ email: email, otp: code.join('') });

      if (res.status >= 200 && res.status < 300) {
        toast.success('Verify OTP successfully!');
        setResetPasswordToken(res.data.data);
        setPage('reset');
        setError('');
      } else {
        toast.error('OTP is not correct. Please try again.');
        setError('OTP is not correct. Please try again.');
      }
    }
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
          marginTop: '15px',
        },
      }}
    >
      <Typography
        sx={{
          fontSize: '22px',
        }}
      >
        Verify OTP
      </Typography>
      <Typography variant="body1" color="gray">
        Enter the 6-digit OTP sent to your email.
      </Typography>
      <InputContainer>
        {code.map((digit, index) => (
          <StyledTextField
            color="primary"
            key={index}
            inputRef={(el) => (inputRefs.current[index] = el)}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
              handleKeyDown(index, e)
            }
            error={!!error}
          />
        ))}
      </InputContainer>
      {error && (
        <ErrorMessage>
          <BiErrorCircle />
          {error}
        </ErrorMessage>
      )}
      <Box sx={{ textAlign: 'center', marginTop: 2 }}>
        <Button
          type="submit"
          size="large"
          onClick={verifyOTPHandle}
          sx={{
            width: '100%',
            color: 'white',
            transition: 'background-color 0.3s',
            backgroundColor: 'var(--buttonColor)',
            ':hover': {
              backgroundColor: 'var(--buttonHoverColor)',
            },
          }}
        >
          Verify
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px',
          alignItems: {
            xs: 'center',
            sm: 'normal',
          },
          flexDirection: {
            xs: 'column-reverse',
            sm: 'row',
          },
        }}
      >
        <Link
          sx={{
            color: 'darkgray',
            textDecoration: 'none',
            cursor: 'pointer',
            fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(
              ','
            ),
            fontWeight: '400',
            fontSize: '1rem',
            lineHeight: '1.5',
            letterSpacing: '0.00938em',
          }}
          onClick={() => setPage('send-email')}
        >
          Back
        </Link>
        <Typography
          sx={{
            color: 'gray',
          }}
        >
          Didn't receive code?{' '}
          <Box
            component={'span'}
            sx={{
              color: 'darkgray',
              cursor: 'pointer',
              ':hover': {
                color: 'var(--buttonColor)',
                textDecoration: 'underline',
              },
            }}
            onClick={() => resendOTP()}
          >
            Resend OTP
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default OTPInput;
