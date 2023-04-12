import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/styles/global";
import { FilterProvider } from "@/contexts/filterContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <FilterProvider>
        <Component {...pageProps} />
      </FilterProvider>
    </ChakraProvider>
  );
}
