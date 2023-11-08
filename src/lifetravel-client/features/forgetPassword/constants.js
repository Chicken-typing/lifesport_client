import * as Yup from "yup";

export const forgetPasswordSchema = Yup.object().shape({
  username: Yup.string().required(),
});

export const verifySchema = Yup.object().shape({
  code: Yup.string().required(),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")])
    .required(),
});
