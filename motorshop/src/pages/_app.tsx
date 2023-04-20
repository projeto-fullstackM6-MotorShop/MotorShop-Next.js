import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/styles/global";
import { FilterProvider } from "@/contexts/filterContext";
import { AdvertiserProvider } from "@/contexts/advertiserContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AdvertiserProvider>
        <FilterProvider>
          <Component {...pageProps} />
        </FilterProvider>
      </AdvertiserProvider>
    </ChakraProvider>
  );
}
