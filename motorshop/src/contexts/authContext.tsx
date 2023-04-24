import { IChildren } from "@/interfaces/misc";
import { IProviderProps, IUserLogin } from "@/interfaces/usersTypes";
import { api } from "@/services/api";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { ReactNode, createContext, useContext } from "react";

interface AuthProviderData {
  login: (userData: IUserLogin) => void;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: IChildren) => {
  const toast = useToast();

  const login = (userData: IUserLogin) => {
    api
      .post("/login", userData)
      .then((resp) => {
        setCookie(null, "kenzie.token", resp.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Login realizado com sucesso !
            </Box>
          ),
        });
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Verifique se o e-mail e senha estão corretos
            </Box>
          ),
        });
      });
  };
  return (
    <AuthContext.Provider value={{ login }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
