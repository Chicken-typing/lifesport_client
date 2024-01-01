import { PageHeader } from '@components/compound';
import { cookieStorage } from '@utils/cookieStorage';
import { NextSeo } from 'next-seo';
import { OpenGraph } from 'next-seo/lib/types';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import Footer from './Footer';
import Header from './Header';
import MenuBottom from './MenuBottom';

import { getCarts } from '@/store/cartUser/slice';
import { useQueryClient } from '@tanstack/react-query';

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
  const token = cookieStorage?.getAccessTokenInfo();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  // }, [router.pathname]);

  // if (token) {
  //   queryClient.invalidateQueries(['OrderTemp']);
  // }

  useEffect(() => {
    const cart = localStorage.getItem('cartUser');
    if (cart) {
      dispatch(getCarts(JSON.parse(cart)));
    }
  }, [dispatch]);

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical="https://lifesport-client.vercel.app/"
        defaultTitle="LifeTravel"
        openGraph={og}
      />

      <Header />

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
