import { AppContextProvider } from '@/context';
import { store } from '@/store/configureStore';
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useRef } from 'react';
import { Provider } from 'react-redux';

const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const LifeTravelProvider = ({ children, hydrateState }: any) => {
  const queryClientRef = useRef<QueryClient | null>(null);

  if (!queryClientRef.current) queryClientRef.current = new QueryClient({ defaultOptions });

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={hydrateState}>
        <Provider store={store}>
          <AppContextProvider>{children}</AppContextProvider>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
};
