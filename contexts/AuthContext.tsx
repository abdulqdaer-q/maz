"use client";

import { User } from "@/types/User";
import { createContext, useContext } from "react";
type AuthContextType = {
  user?: User;
  isCompany: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>;
};
export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  isCompany: false,
  setUser: () => {},
  setForceReload: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
