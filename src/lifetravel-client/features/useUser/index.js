import { selectUserInfo } from "@/kytesoft-client/store/app/selectors";
import { getMeThunk } from "@/kytesoft-client/store/app/thunks";
import { updateUserInfoThunk } from "@/kytesoft-client/store/user/thunks";
import { useFormik } from "formik";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export const useUser = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserInfo);

  const userForm = useFormik({
    initialValues: {
      avatar: "",
      background: "",
      birthday: "",
      firstName: "",
      gender: "other",
      lastName: "",
    },
    validationSchema: Yup.object().shape({
      avatar: Yup.string(),
      background: Yup.string(),
      birthday: Yup.string().required(),
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      gender: Yup.string().required().oneOf(["male", "female"]),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(updateUserInfoThunk(values));
        await dispatch(getMeThunk());
      } catch (error) {}
      setSubmitting(false);
    },
  });

  useEffect(() => {
    if (isEmpty(user)) return;
    userForm.setValues(user);
  }, [user, userForm]);

  return {
    user,
    userForm,
  };
};
