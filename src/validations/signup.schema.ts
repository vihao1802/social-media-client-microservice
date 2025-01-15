import * as Yup from 'yup';

export const SignUpSchema = Yup.object().shape({
  userName: Yup.string().required('Username is required'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Password must have at least 1 uppercase letter')
    .matches(/[0-9]/, 'Password must have at least 1 number')
    .matches(
      /[^A-Za-z0-9.#]/,
      "Password must have at least 1 special character (excluding '.' and '#')"
    )
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords do not match')
    .required('Confirm password is required'),
  date_of_birth: Yup.string().required('Date of birth is required'),
  gender: Yup.boolean().required('Gender is required'),
});
