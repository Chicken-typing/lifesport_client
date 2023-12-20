import cookies from 'js-cookie';

const ACCESS_TOKEN = 'access-token';

const getAccessTokenInfo = () => cookies.get(ACCESS_TOKEN || '');

const setTokens = ({ accessToken, expires }: any) => {
  cookies.set(ACCESS_TOKEN, accessToken, { expires });
};

const removeTokens = () => {
  cookies.remove(ACCESS_TOKEN);
};

export const cookieStorage = {
  getAccessTokenInfo,
  setTokens,
  removeTokens,
};
