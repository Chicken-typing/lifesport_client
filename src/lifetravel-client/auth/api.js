import cors from 'cors';
import { get, isEmpty } from 'lodash';
import nc from 'next-connect';
import { to } from '../helpers';
import { setToken } from '../request';
import { authServices } from '../services';
import { handleAuth } from './helpers';
import { withSessionApiRoute } from './sessions';

export const loginApiHandler = withSessionApiRoute(
  nc()
    .use(cors())
    .get(async (req, res) => {
      try {
        // const { username, password } = req.body;
        const username = 'CLIENTUser';
        const password = 'aaAA11!!';
        const [err, response] = await to(authServices.login({ username, password }));

        if (!isEmpty(err)) {
          return res.status(400).json({ detail: err?.message });
        }
        req.session.token = get(response, 'tokens.accessToken');
        req.session.refreshToken = get(response, 'tokens.refreshToken');

        await req.session.save();
        res.status(200).json({ status: 'success' });
      } catch (error) {
        return res.status(500).json({ detail: error?.message });
      }
    }),
);

export const userApiHandler = withSessionApiRoute(
  nc()
    .use(cors())
    .get(async (req, res) => {
      try {
        const isAuth = await handleAuth(req);
        if (!isAuth) return res.status(401).json({ detail: 'un authorization' });

        setToken(req.session.token?.token);
        const [err, userInfo] = await to(authServices.getMe());
        if (!isEmpty(err)) {
          const statusCode = get(err, 'response.status');
          if (statusCode === 401) {
            await req.session.destroy();
            return res.status(401).json({ detail: 'un authorization' });
          }

          return res.status(500).json({ detail: err?.message });
        }

        return res.status(200).json(userInfo);
      } catch (error) {
        return res.status(500).json({ detail: error?.message });
      }
    }),
);

export const logoutApiHandler = withSessionApiRoute(
  nc()
    .use(cors())
    .post(async (req, res) => {
      try {
        const isAuth = await handleAuth(req);
        if (!isAuth) return res.status(401).json({ detail: 'un authorization' });

        setToken(req.session.token?.token);
        await to(authServices.logout());
        await req.session.destroy();
        return res.status(401).json({ detail: 'success' });
      } catch (error) {
        return res.status(500).json({ detail: error?.message });
      }
    }),
);

export const tokenApiHandler = withSessionApiRoute(
  nc()
    .use(cors())
    .get(async (req, res) => {
      try {
        const isAuth = await handleAuth(req);
        if (!isAuth) return res.status(401).json({ detail: 'un authorization' });

        res.status(200).json({ token: get(req, 'session.token.token') });
      } catch (error) {
        return res.status(500).json({ detail: error?.message });
      }
    }),
);
