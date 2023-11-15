/* eslint-disable react-hooks/rules-of-hooks */
import { LifeTravelProvider } from '@/provider';
import { CacheProvider } from '@emotion/react';
import '@scss/main.scss';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createEmotionCache } from '@utils/createEmotionCache';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
const clientSideEmotionCache = createEmotionCache();
import { useEffect, useState } from 'react';
import LoadingScreen from '@components/compound/LoadingScreen';

// export const Loading = () => {
//   const router = useRouter();
//   const [loading, setLoading] = useState<boolean>(false);
//   const handleStart = (url: string) => url !== router.asPath && setLoading(true);
//   const handleComplete = (url: string) =>
//     url === router.asPath && setTimeout(() => setLoading(false));
//   useEffect(() => {
//     router.events.on('routeChangeStart', handleStart);
//     router.events.on('routeChangeComplete', handleComplete);
//     router.events.on('routeChangeError', handleComplete);

//     return () => {
//       router.events.off('routeChangeStart', handleStart);
//       router.events.off('routeChangeComplete', handleComplete);
//       router.events.off('routeChangeError', handleComplete);
//     };
//   });
//   useEffect(() => {
//     if (loading) {
//       document.body.classList.add('no-scroll');
//     } else {
//       document.body.classList.remove('no-scroll');
//     }
//   }, [loading]);
//   return loading ? <LoadingScreen /> : null;
// };

function App({ Component, emotionCache = clientSideEmotionCache, ...pageProps }: any) {
  const router = useRouter();

  return (
    <CacheProvider value={emotionCache}>
      <LifeTravelProvider hydrateState={pageProps.dehydratedState}>
        <ToastContainer />
        {/* <Loading></Loading> */}
        <Component {...pageProps} key={router.asPath} />
        <ReactQueryDevtools initialIsOpen={process.env.NODE_ENV === 'development'} />
      </LifeTravelProvider>
    </CacheProvider>
  );
}

export default App;
