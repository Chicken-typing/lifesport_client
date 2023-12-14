import { ColorModeContext, useMode } from '@/adminLayout/theme';
import { login } from '@/store/user/slice';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { cookieStorage } from '@utils/cookieStorage';
import request from '@utils/request';
import { createContext, useEffect, useState } from 'react';
import { IUser } from '../interfaces/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { API_ENDPOINTS } from '../utils/api-endpoints';
import { decodeToken } from '../utils/decode';
import { useRouter } from 'next/router';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }: any) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const token = cookieStorage?.getAccessTokenInfo();
  const router = useRouter();

  const [theme, colorMode] = useMode();
  const decoded = decodeToken(token || '');
  useEffect(() => {
    if (token) {
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const data: { user_infos: IUser } = await request.get(API_ENDPOINTS.USERINFO, {});
          dispatch(login(data.user_infos));
          setIsLoading(false);
          const decoded = decodeToken(token || '');
          return decoded;
        } catch (error) {
          setIsLoading(false);
        }
      };

      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const contextValues = { isLoading, token, decoded };

  return (
    <AppContext.Provider value={contextValues}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AppContext.Provider>
  );
};
