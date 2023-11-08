import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { selectUserInfo } from "../store/app/selectors";

export const useAuth = () => {
  const userInfo = useSelector(selectUserInfo);

  return { isAuthenticated: !isEmpty(userInfo), userInfo };
};
