import { DRAWERS } from '@/store/drawers/constants';
import { selectDrawerAnchor, selectDrawerOpen, selectDrawerView } from '@/store/drawers/selector';
import { closeDrawer } from '@/store/drawers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ISidebarProps } from '@interfaces/sidebar';
import { Drawer } from '@mui/material';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { FC } from 'react';

const ManagedDrawer = () => {
  const isOpen = useAppSelector(selectDrawerOpen);
  const view = useAppSelector(selectDrawerView);
  const dispatch = useAppDispatch();
  const anchor = useAppSelector(selectDrawerAnchor);
  const handleCloseDrawer = () => dispatch(closeDrawer());

  const HeaderDrawer = dynamic(() => import('@components/compound/Drawer/HeaderDrawer')) as FC;
  const ProductSidebarDrawer = dynamic(
    () => import('@components/compound/Drawer/ProductSidebarDrawer'),
  ) as FC<ISidebarProps>;
  const BlogSidebarDrawer = dynamic(
    () => import('@components/compound/Drawer/BlogSidebarDrawer'),
  ) as FC<ISidebarProps>;
  return (
    <Drawer anchor={anchor} open={isOpen} onClose={handleCloseDrawer}>
      <div
        className={classNames(
          'kl-drawer',
          { 'kl-drawer-header': view === DRAWERS.HEADER },
          { 'kl-drawer-products': view === DRAWERS.PRODUCT },
          { 'kl-drawer-blogs': view === DRAWERS.BLOG },
          { 'kl-drawer-notify': view === DRAWERS.NOTIFICATION },
        )}
      >
        {view === DRAWERS.HEADER && <HeaderDrawer />}

        {view === DRAWERS.PRODUCT && (
          <ProductSidebarDrawer variant={view === DRAWERS.PRODUCT ? '-drawer' : '-static'} />
        )}
        {view === DRAWERS.BLOG && (
          <BlogSidebarDrawer variant={view === DRAWERS.BLOG ? '-drawer' : '-static'} />
        )}
      </div>
    </Drawer>
  );
};

export default ManagedDrawer;
