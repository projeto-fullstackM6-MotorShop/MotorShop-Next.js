import { IChildren } from "@/interfaces/misc";
import {
  IRegisterUserData,
  IUpdateUserData,
  IUserData,
  IUserLogin,
} from "@/interfaces/usersTypes";
import { api } from "@/services/api";
import { Box, useToast } from "@chakra-ui/react";
import { headers } from "next/dist/client/components/headers";
import { useRouter } from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthProviderData {
  token: string;
  user: IUserData | null;
  login: (userData: IUserLogin) => void;
  registerUser: (userData: IRegisterUserData) => void;
  getUserProfile: () => void;
  patchUser: (data: IUpdateUserData) => void;
  deleteUser: () => void;
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

  useEffect(() => {
    getUserProfile();
  }, []);

  const login = async (userData: IUserLogin) => {
    try {
      const response = await api.post("/login", userData);

      setCookie(null, "@motorshop:token", response.data.token);

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

      setToken(response.data.token);
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "error",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box bg={"alert.1"} color={"alert.3"} p={3}>
            {error.response?.data ? error.response.data.message : error.message}
          </Box>
        ),
      });
    }
  };

  const registerUser = async (userData: IRegisterUserData) => {
    try {
      await api.post("/user", userData);

      toast({
        title: "sucess",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box bg={"sucess.1"} color={"sucess.3"} p={3}>
            Usuário criado com sucesso!
          </Box>
        ),
      });

      router.push("/login");
    } catch (error: any) {
      console.error(error);
      toast({
        title: "error",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box bg={"alert.1"} color={"alert.3"} p={3}>
            {error.response?.data ? error.response.data.message : error.message}
          </Box>
        ),
      });
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await api.get("/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const patchUser = async (data: IUpdateUserData) => {
    try {
      await api.patch("/user", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "sucess",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box bg={"sucess.1"} color={"sucess.3"} p={3}>
            Usuário atualizado com sucesso!
          </Box>
        ),
      });

      getUserProfile();
    } catch (error: any) {
      console.error(error);
      toast({
        title: "error",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box bg={"alert.1"} color={"alert.3"} p={3}>
            {error.response?.data ? error.response.data.message : error.message}
          </Box>
        ),
      });
    }
  };

  const deleteUser = async () => {
    try {
      await api.delete("/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast({
        title: "sucess",
        variant: "solid",
        position: "top-right",
        isClosable: true,
        render: () => (
          <Box bg={"sucess.1"} color={"sucess.3"} p={3}>
            Usuário deletado com sucesso!
          </Box>
        ),
      });

      destroyCookie(null, "@motorshop:token");
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        registerUser,
        getUserProfile,
        patchUser,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
