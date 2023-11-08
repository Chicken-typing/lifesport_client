import { loginThunk } from "@/kytesoft-client/store/app/thunks";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { initialValues, loginSchema } from "./constants";

export const useLogin = ({ onSuccess = () => null, onError = () => null } = {}) => {
  const dispatch = useDispatch();

  const loginForm = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(loginThunk(values));
        onSuccess();
      } catch (error) {
        onError(error);
      }

      setSubmitting(false);
    },
  });

  return { loginForm };
};
