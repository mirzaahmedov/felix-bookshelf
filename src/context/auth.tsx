import { createContext, useCallback, useState } from "react";

export type AuthPayloadType = {
  id: number;
  key: string;
  secret: string;
  name: string;
} | null;
export type AuthContextType = {
  user: AuthPayloadType;
  setUser: (values: AuthPayloadType) => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};
export const AuthProvider = (props: AuthProviderProps) => {
  const [data, setData] = useState(() => {
    try {
      const data = JSON.parse(localStorage.getItem("felix-auth") ?? "null");
      return data as AuthPayloadType;
    } catch {
      return null;
    }
  });

  const setAuth = useCallback((values: AuthPayloadType) => {
    localStorage.setItem("felix-auth", JSON.stringify(values));
    setData(values);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data,
        setUser: setAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
