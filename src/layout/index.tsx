import { login } from '@/store/user/slice';
import { PageHeader } from '@components/compound';
import { cookieStorage } from '@utils/cookieStorage';
import request from '@utils/request';
import jwt from 'jsonwebtoken';
import { NextSeo } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { IUser } from '../interfaces/user';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { API_ENDPOINTS } from '../utils/api-endpoints';
import Footer from './Footer';
import Header from './Header';
import ManagedDrawer from './ManagedDrawer';
import ManagedModal from './ManagedModal';
import MenuBottom from './MenuBottom';

import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchOrderTemp } from '@/query/order/get-OrderTemp';

interface IKsLayoutProps {
  children: ReactNode;
  title: string;
  description?: string;
  hasPageHeader?: boolean;
  hasPageHeaderTitle?: boolean;
  pageHeaderTitle?: string;
  pageHeaderBackground?: string;
  breadcrumbs?: ReactNode[];
  breadcrumbsColor?: string;
  hasOverlay?: boolean;
  colorTitle?: string;
  og?: OpenGraph;
}

const KsLayout: FC<IKsLayoutProps> = ({
  children,
  title,
  description,
  hasPageHeader = false,
  pageHeaderTitle,
  pageHeaderBackground,
  breadcrumbs,
  hasOverlay = false,
  breadcrumbsColor,
  colorTitle,
  og,
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [router.pathname]);

  const fetchOrderTemp = async () => {
    const data: any = await request.request({
      method: 'GET',
      url: '/order/temp-orders',
    });
    return data;
  };

  const { data: order, isFetching: isLoading } = useQuery(['OrderTemp', {}], fetchOrderTemp, {
    retry: 1,
  });

  queryClient.invalidateQueries(['OrderTemp']);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://lifesport-client.vercel.app/"
        defaultTitle="LifeTravel"
        openGraph={og}
      />

      <ManagedModal />

      <Header />
      <ManagedDrawer />

      {hasPageHeader && (
        <PageHeader
          background={pageHeaderBackground}
          title={pageHeaderTitle}
          breadcrumbs={breadcrumbs}
          overlay={hasOverlay}
          color={breadcrumbsColor}
          colorTitle={colorTitle}
        />
      )}

      <main className="kl-content">{children}</main>

      <MenuBottom />
      <Footer />
    </>
  );
};

export default KsLayout;
