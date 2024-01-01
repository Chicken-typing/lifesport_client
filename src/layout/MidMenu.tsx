import { AppContext } from '@/context';
import { useLoginMutation } from '@/query/login/loginMutation';
import { selectCart } from '@/store/cart/selector';
import { ANCHORS, DRAWERS } from '@/store/drawers/constants';
import { openDrawer } from '@/store/drawers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { GroupInput } from '@components/compound';
import { Button, KaImage, Link } from '@components/primitive';
import { ClickAwayListener, Popper } from '@mui/material';
import HeartIcon from '@svg/heart.svg';
import UserIcon from '@svg/user.svg';
import { cookieStorage } from '@utils/cookieStorage';
import { decodeToken } from '@utils/decode';
import { routes } from '@utils/routes';

import { size } from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { logout } from '@/store/user/slice';
import { useOrderTempQuery } from '@/query/order/get-OrderTemp';
import NotifyDrawer from '@components/compound/Drawer/NotifyDrawer';
import CartDrawer from '@components/compound/Drawer/CartDrawer';
import { Tooltip } from '@components/compound';

export default function MidMenu({ openHeader }: { openHeader: () => void }) {
  const router = useRouter();
  const buttonEle = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>();
  const dispatch = useAppDispatch();
  const carts = useAppSelector(selectCart);
  const { t } = useTranslation('common');
  const token = cookieStorage.getAccessTokenInfo();
  const auth = useAppSelector((state) => state.auth);
  const { isLoading }: any = useContext(AppContext);
  const { data: order } = useOrderTempQuery({});
  const decoded = decodeToken(token || '');

  const [openNotify, setOpenNotify] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!searchValue) return;

    try {
      setLoading(true);

      await router.push({
        pathname: routes.PRODUCTS,
        query: {
          s: searchValue,
        },
      });
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!router.query?.s) return;

    setSearchValue(String(router.query?.s));
  }, [router]);

  useEffect(() => {
    const token = cookieStorage.getAccessTokenInfo();
    if (token) {
      const decoded = decodeToken(token);
      return decoded;
    }
  });

  const handleLogOut = () => {
    cookieStorage.removeTokens();
    dispatch(logout());
    router.push({
      pathname: '/',
    });
  };

  return (
    <>
      <Popper
        style={{ display: token ? 'block' : 'none' }}
        className="kl-popper"
        placement="bottom-end"
        anchorEl={buttonEle.current}
        open={open}
      >
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <div className="kl-popper-content">
            <button
              style={{
                display:
                  decoded?.role === 'admin' || decoded?.role === 'master_admin' ? 'block' : 'none',
              }}
              className="btn"
              onClick={() => router.push({ pathname: '/admin' })}
            >
              Go to Admin Page
            </button>
            <button onClick={() => router.push({ pathname: '/transaction' })} className="btn">
              View Transaction
            </button>
            <button onClick={handleLogOut} className="btn">
              Log Out
            </button>
          </div>
        </ClickAwayListener>
      </Popper>
      <NotifyDrawer open={openNotify} onClose={() => setOpenNotify(false)} />

      <CartDrawer open={openCart} onClose={() => setOpenCart(false)} />

      <div className="kl-mid-menu">
        <div className="kl-mid-menu-wrapper">
          <button onClick={openHeader} className="burger">
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
                <Button isLoading={loading} type="submit" className="btn">
                  {t('mid_menu.search.submit')}
                </Button>
              }
            />
          </form>

          <div className="actions">
            <button
              onClick={() => (token ? setOpen(true) : router.push('/login'))}
              ref={buttonEle}
              className="btn user"
            >
              <span className="icon">
                <UserIcon />
              </span>
              <span className="btn-name">{token ? decoded?.name : t('mid_menu.login.label')}</span>
            </button>

            {/* <button className="btn">
              <span className="icon">
                <HeartIcon />
              </span>
              <span className="quantity">(0)</span>
            </button> */}

            <button
              className="btn"
              style={{ marginLeft: '0px', marginRight: '5px' }}
              onClick={() => setOpenNotify(true)}
            >
              <span className="icon">
                <i className="fa-light fa-cart-xmark fa-xl"></i>
              </span>
              <span className="quantity">{token ? `(${size(order?.data)})` : `(${0})`}</span>
            </button>

            <button className="btn" onClick={() => setOpenCart(true)}>
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
