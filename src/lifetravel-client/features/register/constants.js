import * as Yup from "yup";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().required(),
  username: Yup.string().required(),
  password: Yup.string().required(),
});

export const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
};

export const verifySchema = Yup.object().shape({
  code: Yup.string().required(),
});
