import { cancelOrderThunk } from "@/kytesoft-client/store/order/thunks";
import { useDispatch } from "react-redux";

export const useOrder = () => {
  const dispatch = useDispatch();

  const cancelOrder = async ({ id }) => {
    try {
      await dispatch(cancelOrderThunk({ id }));
    } catch (error) {}
  };

  return { cancelOrder };
};
