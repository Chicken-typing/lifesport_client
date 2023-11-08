import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Head from 'next/head';
import { FC, ReactNode, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import DrawerAdmin from './DrawerAdmin';
import { cookieStorage } from '@utils/cookieStorage';
import jwt from 'jsonwebtoken';

interface IKsLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout: FC<IKsLayoutProps> = ({ children, title }) => {
  const router = useRouter();
  const token = cookieStorage.getAccessTokenInfo();

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [router.pathname]);

  const [onOpenDrawer, setOnOpenDrawer] = useState<boolean>(false);
  const handleOpenDrawer = () => setOnOpenDrawer(true);
  const handleCloseDrawer = () => setOnOpenDrawer(false);
  return (
    <div className="kl-admin-container">
      <Head>
        <title>{title}</title>
      </Head>
      <Sidebar />
      <DrawerAdmin open={onOpenDrawer} onCloseDrawer={handleCloseDrawer} />
      <main className="kl-admin">
        <Header onOpenDrawer={handleOpenDrawer} />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
