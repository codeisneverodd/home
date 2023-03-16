import { ChakraProvider } from "@chakra-ui/react";
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import { useState } from "react";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <RecoilRoot>
            <Component {...pageProps} />
          </RecoilRoot>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export interface CustomAppProps extends AppProps {
  pageProps: {
    dehydratedState?: ReturnType<typeof dehydrate>;
  };
}
