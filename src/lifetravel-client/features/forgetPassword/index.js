import {
  selectForgetPasswordCode,
  selectForgetPasswordToken,
} from "@/kytesoft-client/store/app/selectors";
import { setForgetPasswordCode, setForgetPasswordToken } from "@/kytesoft-client/store/app/slice";
import {
  forgetPasswordResendOtpThunk,
  forgetPasswordThunk,
  forgetPasswordVerifyThunk,
  resetPasswordThunk,
} from "@/kytesoft-client/store/app/thunks";
import { useFormik } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordSchema, resetPasswordSchema, verifySchema } from "./constants";

export const useForgetPassword = ({
  onForgetPasswordSuccess = () => null,
  onForgetPasswordError = () => null,
  onResendOtpSuccess = () => null,
  onResendOtpError = () => null,
  onVerifySuccess = () => null,
  onVerifyError = () => null,
  onResetPasswordSuccess = () => null,
  onResetPasswordError = () => null,
} = {}) => {
  const dispatch = useDispatch();

  const token = useSelector(selectForgetPasswordToken);
  const code = useSelector(selectForgetPasswordCode);

  const [loadingResendOtp, setLoadingResendOtp] = useState(false);

  useLayoutEffect(() => {
    dispatch(setForgetPasswordCode(null));
    dispatch(setForgetPasswordToken(null));
  }, [dispatch]);

  const forgetPasswordForm = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: forgetPasswordSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(forgetPasswordThunk(values));
        onForgetPasswordSuccess();
      } catch (error) {
        onForgetPasswordError(error);
      }

      setSubmitting(false);
    },
  });

  const resendOtp = async () => {
    setLoadingResendOtp(true);

    try {
      await dispatch(forgetPasswordResendOtpThunk({ token }));
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
    validationSchema: verifySchema,
    onSubmit: async ({ code }, { setSubmitting }) => {
      try {
        await dispatch(forgetPasswordVerifyThunk({ token, code }));
        onVerifySuccess();
      } catch (error) {
        onVerifyError(error);
      }
      setSubmitting(false);
    },
  });

  const resetPasswordForm = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: async ({ password, confirmPassword }, { setSubmitting }) => {
      try {
        await dispatch(resetPasswordThunk({ token, code, password, confirmPassword }));
        onResetPasswordSuccess();
      } catch (error) {
        onResetPasswordError(error);
      }
      setSubmitting(false);
    },
  });

  return {
    forgetPasswordForm,
    loadingResendOtp,
    resendOtp,
    verifyForm,
    resetPasswordForm,
  };
};
