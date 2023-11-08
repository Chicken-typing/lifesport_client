import { isAfter, parseISO } from "date-fns";
import { isEmpty } from "lodash";

export const getMaxAge = (expired) => Math.floor((new Date(expired) - Date.now()) / 1000);

export const isTokenExpired = (time) => isAfter(new Date(), parseISO(time));

export const handleAuth = async (req) => {
  if (
    (isEmpty(req.session?.token) && isEmpty(req.session.refreshToken)) ||
    (!isEmpty(req.session?.token) && isEmpty(req.session.refreshToken)) ||
    (isTokenExpired(req.session.token?.expiredAt) &&
      isTokenExpired(req.session.refreshToken?.expiredAt)) ||
    (!isTokenExpired(req.session.token?.expiredAt) &&
      isTokenExpired(req.session.refreshToken?.expiredAt))
  ) {
    await req.session.destroy();
    return false;
  }

  if (
    (isEmpty(req.session?.token) && !isEmpty(req.session.refreshToken)) ||
    (isTokenExpired(req.session.token?.expiredAt) &&
      !isTokenExpired(req.session.refreshToken?.expiredAt))
  ) {
    const [err, response] = await to(
      authServices.refreshToken({
        token: req.session.refreshToken?.token,
      })
    );
    if (!isEmpty(err)) {
      await req.session.destroy();
      return false;
    }

    req.session.token = get(response, "tokens.accessToken");
    req.session.refreshToken = get(response, "tokens.refreshToken");

    await req.session.save();
  }

  return true;
};
