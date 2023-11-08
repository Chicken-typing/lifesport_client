import { createContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAppSettingsThunk, getMeThunk, getTokenThunk } from "../store/app/thunks";
import { initCartThunk } from "../store/cart/thunks";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const contextValues = {};
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAppSettingsThunk());
    dispatch(getTokenThunk());
    dispatch(getMeThunk());
    dispatch(initCartThunk());
  }, [dispatch]);

  return <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>;
};
