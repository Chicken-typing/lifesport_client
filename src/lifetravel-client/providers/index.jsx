import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRef } from "react";
import { Provider } from "react-redux";
import { AppContextProvider } from "../contexts";
import store from "../store/configureStore";

const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const KytesoftProvider = ({ children, hydrateState }) => {
  const queryClientRef = useRef();

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
