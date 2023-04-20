import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/styles/global";
import { FilterProvider } from "@/contexts/filterContext";
import { AuthProvider } from "@/contexts/authContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <FilterProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </FilterProvider>
    </ChakraProvider>
  );
}
