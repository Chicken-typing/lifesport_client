/* eslint-disable react-hooks/rules-of-hooks */
import { LifeTravelProvider } from '@/provider';
import { CacheProvider } from '@emotion/react';
import '@scss/main.scss';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createEmotionCache } from '@utils/createEmotionCache';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
const clientSideEmotionCache = createEmotionCache();

function App({ Component, emotionCache = clientSideEmotionCache, ...pageProps }: any) {
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <LifeTravelProvider hydrateState={pageProps.dehydratedState}>
        <ToastContainer />
        <Component {...pageProps} key={router.asPath} />
        <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === 'development'} />
      </LifeTravelProvider>
    </CacheProvider>
  );
}

export default App;
