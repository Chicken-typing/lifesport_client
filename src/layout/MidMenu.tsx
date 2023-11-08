import { useState, useRef, FormEvent, useContext } from 'react';
import { GroupInput } from '@components/compound';
import { Button, Link, KaImage } from '@components/primitive';
import UserIcon from '@svg/user.svg';
import HeartIcon from '@svg/heart.svg';
import { Popper, ClickAwayListener } from '@mui/material';
import { routes } from '@utils/routes';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { DRAWERS, ANCHORS } from '@/store/drawers/constants';
import { openDrawer } from '@/store/drawers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCart } from '@/store/cart/selector';
import { size, isEmpty } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { cookieStorage } from '@utils/cookieStorage';
import { useLoginMutation } from '@/query/login/loginMutation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import { decodeToken } from '@utils/decode';
import { AppContext } from '@/context';

export default function MidMenu() {
  const router = useRouter();
  const buttonEle = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>();
  const dispatch = useAppDispatch();
  const carts = useAppSelector(selectCart);
  const { t } = useTranslation('common');
  const { mutateAsync: loginMutation } = useLoginMutation();
  const token = cookieStorage.getAccessTokenInfo();
  const auth = useAppSelector((state) => state.auth);
  const { isLoading }: any = useContext(AppContext);

  const decoded = decodeToken(token || '');
  const { setFieldValue, resetForm, setFieldTouched, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().required('Vui lòng nhập email!'),
        password: Yup.string().required('Vui lòng nhập mật khẩu!'),
      }),
      onSubmit: (v) => {
        loginMutation(v).then((response: any) => {
          if (response) {
            cookieStorage.setTokens({
              accessToken: response._token,
              refreshToken: response._token,
            });
          }
          if (decoded?.role === 'master_admin' || 'admin') {
            router.push({
              pathname: '/admin',
            });
          } else {
            router.push({
              pathname: '/',
            });
          }
        });

        resetForm();
      },
    });

  const handleChange = ({ name, value }: { name: string; value: string | number }) => {
    setFieldValue(name, value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchValue) return;

    router.push({
      pathname: routes.PRODUCTS,
      query: {
        name: searchValue,
      },
    });
  };

  useEffect(() => {
    if (!router.query?.name) return;

    setSearchValue(String(router.query?.name));
  }, [router]);

  useEffect(() => {
    const token = cookieStorage.getAccessTokenInfo();
    if (token) {
      const decoded = decodeToken(token);
      return decoded;
    }
  }, []);

  return (
    <>
      <Popper className="kl-popper" placement="bottom-end" anchorEl={buttonEle.current} open={open}>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className="kl-popper-auth">
            <div className="content">
              <form className="form" onSubmit={handleSubmit}>
                <div className="header">
                  <p className="title">{t('popper.title')}</p>
                  <Link title="" href={routes.AUTH} className="action">
                    {t('popper.action')}
                  </Link>
                </div>
                <div className="group">
                  <GroupInput
                    className="container -mb-10"
                    type="email"
                    placeholder={t('popper.username.placeholder')}
                    label={t('popper.username.title')}
                    fadePlaceholderShown
                    autoComplete="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <GroupInput
                    className="container -mb-10"
                    type="password"
                    placeholder={t('popper.password.placeholder')}
                    label={t('popper.password.title')}
                    fadePlaceholderShown
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <Button fullWidth type="submit">
                    {t('popper.login')}
                  </Button>
                  <div className="forgot">
                    <Link className="link" href="/" title="forgot-password">
                      {t('popper.link')}
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
      <div className="kl-mid-menu">
        <div className="kl-mid-menu-wrapper">
          <button
            onClick={() => dispatch(openDrawer({ view: DRAWERS.HEADER, anchor: ANCHORS.left }))}
            className="burger"
          >
            <span className="icon"></span>
            <span className="icon"></span>
            <span className="icon"></span>
          </button>

          <div className="brand">
            <Link href={routes.HOME} title="" className="link">
              <KaImage className="logo" src="/images/logo.png" alt="logo" objectFit="contain" />
            </Link>
          </div>

          <form onSubmit={handleSearch} className="search">
            <GroupInput
              onChange={({ value }) => setSearchValue(String(value))}
              type="text"
              placeholder={t('mid_menu.search.label')}
              className="container"
              fadePlaceholderShown
              value={searchValue}
              endAdornment={
                <Button type="submit" className="btn">
                  {t('mid_menu.search.submit')}
                </Button>
              }
            />
          </form>

          <div className="actions">
            <button onClick={() => setOpen(true)} ref={buttonEle} className="btn">
              <span className="icon">
                <UserIcon />
              </span>
              <span className="btn-name">
                {!isLoading && auth?.isAuthenticated && decoded?.name}
                {!isLoading && !auth?.isAuthenticated && t('mid_menu.login.label')}
              </span>
            </button>

            <button className="btn">
              <span className="icon">
                <HeartIcon />
              </span>
              <span className="quantity">(0)</span>
            </button>

            <button
              className="btn"
              onClick={() => dispatch(openDrawer({ view: DRAWERS.CART, anchor: ANCHORS.right }))}
            >
              <span className="icon">
                <i className="fa-light fa-bag-shopping fa-xl " />
              </span>
              <span className="quantity">{`(${size(carts)})`}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
