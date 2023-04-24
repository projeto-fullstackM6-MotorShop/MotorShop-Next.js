import { IChildren } from "@/interfaces/misc";
import { IUserData, IUserLogin } from "@/interfaces/usersTypes";
import { api } from "@/services/api";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, useContext, useState } from "react";

interface AuthProviderData {
  token: string;
  user: IUserData | null;
  login: (userData: IUserLogin) => void;
}

export const AuthContext = createContext<AuthProviderData>(
  {} as AuthProviderData
);

export const AuthProvider = ({ children }: IChildren) => {
  const cookies = parseCookies();

  const [token, setToken] = useState<string>(cookies["@motorshop:token"] || "");
  const [user, setUser] = useState<IUserData | null>(null);

  const toast = useToast();
  const router = useRouter();

  const login = (userData: IUserLogin) => {
    api
      .post("/login", userData)
      .then((res) => {
        setCookie(null, "@motorshop:token", res.data.token);

        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box bg={"sucess.1"} color={"sucess.3"} p={3}>
              Login realizado com sucesso!
            </Box>
          ),
        });

        setToken(res.data.token);
        router.push("/");
      })
      .catch((err) => {
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box bg={"alert.1"} color={"alert.3"} p={3}>
              Verifique se o e-mail e senha estão corretos
            </Box>
          ),
        });
      });
  };

  return (
    <AuthContext.Provider value={{ token, user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
