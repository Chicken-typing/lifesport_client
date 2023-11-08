import { clearUserInfo } from "@/kytesoft-client/store/app/slice";
import { logoutThunk } from "@/kytesoft-client/store/app/thunks";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const useLogout = ({ onSuccess = () => null, onError = null } = {}) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      await dispatch(logoutThunk());
      dispatch(clearUserInfo());
      onSuccess();
    } catch (error) {
      onError(error);
    }

    setLoading(false);
  };

  return { logout, loading };
};
