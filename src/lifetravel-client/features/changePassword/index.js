import { changePasswordThunk } from "@/kytesoft-client/store/user/thunks";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export const changePasswordSchema = Yup.object().shape({
  password: Yup.string().required(),
  newPassword: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")])
    .required(),
});

export const useChangePassword = ({ onSuccess = () => null, onError = () => null } = {}) => {
  const dispatch = useDispatch();

  const changePasswordForm = useFormik({
    initialValues: {
      confirmPassword: "",
      newPassword: "",
      password: "",
    },
    validationSchema: changePasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(changePasswordThunk(values));
        onSuccess();
      } catch (error) {
        onError(error);
      }

      setSubmitting(false);
    },
  });

  return { changePasswordForm };
};
