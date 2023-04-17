import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/styles/global";
import { FilterProvider } from "@/contexts/filterContext";
import { AnnouncementProvider } from "@/contexts/announcementContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AnnouncementProvider>
        <FilterProvider>
          <Component {...pageProps} />
        </FilterProvider>
      </AnnouncementProvider>
    </ChakraProvider>
  );
}
