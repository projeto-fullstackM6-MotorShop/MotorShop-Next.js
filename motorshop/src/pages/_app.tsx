import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import theme from "@/styles/global";
import { FilterProvider } from "@/contexts/filterContext";
import { AnnouncementProvider } from "@/contexts/announcementContext";
import { ModalProvider } from "@/contexts/modalContext";
import { AuthProvider } from "@/contexts/authContext";
import { CommentProvider } from "@/contexts/commentContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AnnouncementProvider>
          <CommentProvider>
            <ModalProvider>
              <FilterProvider>
                <Component {...pageProps} />
              </FilterProvider>
            </ModalProvider>
          </CommentProvider>
        </AnnouncementProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
