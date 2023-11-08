import { selectRegisterToken } from "@/kytesoft-client/store/app/selectors";
import { setRegisterToken } from "@/kytesoft-client/store/app/slice";
import {
  registerResendOtpThunk,
  registerThunk,
  registerVerifyThunk,
} from "@/kytesoft-client/store/app/thunks";
import { useFormik } from "formik";
import { useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initialValues, registerSchema, verifySchema } from "./constants";

export const useRegister = ({
  initValue = initialValues,
  validationSchema = registerSchema,
  onRegisterSuccess = () => null,
  onRegisterError = () => null,
  onResendOtpSuccess = () => null,
  onResendOtpError = () => null,
  onVerifySuccess = () => null,
  onVerifyError = () => null,
} = {}) => {
  const dispatch = useDispatch();

  const [loadingResendOtp, setLoadingResendOtp] = useState(false);

  const token = useSelector(selectRegisterToken);

  const registerForm = useFormik({
    initialValues: initValue,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(registerThunk(values));
        onRegisterSuccess();
      } catch (error) {
        onRegisterError(error);
      }

      setSubmitting(false);
    },
  });

  const resendOtp = async () => {
    setLoadingResendOtp(true);

    try {
      await dispatch(registerResendOtpThunk({ token }));
      onResendOtpSuccess();
    } catch (error) {
      onResendOtpError(error);
    }

    setLoadingResendOtp(false);
  };

  const verifyForm = useFormik({
    initialValues: {
      code: "",
    },
    registerSchema: verifySchema,
    onSubmit: async ({ code }, { setSubmitting }) => {
      try {
        await dispatch(registerVerifyThunk({ token, code }));
        onVerifySuccess();
      } catch (error) {
        onVerifyError(error);
      }

      setSubmitting(false);
    },
  });

  useLayoutEffect(() => {
    dispatch(setRegisterToken(null));
  }, [dispatch]);

  return { registerForm, resendOtp, loadingResendOtp, verifyForm };
};
