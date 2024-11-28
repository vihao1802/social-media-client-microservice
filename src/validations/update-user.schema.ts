import * as yup from "yup";

export const UpdateUserSchema = yup.object().shape({
  bio: yup.string().max(150),
  date_of_birth: yup.date(),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10)
    .max(10),
});
