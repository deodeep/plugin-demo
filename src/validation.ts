import * as Yup from "yup";

export const SigninSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(12, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const SignUpSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(12, "Too Long!")
    .required("Password is required"),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const verifySchema = Yup.object().shape({
  otp: Yup.number(),
});
