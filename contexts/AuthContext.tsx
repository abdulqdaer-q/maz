"use client";

import { User } from "@/types/User";
import { createContext, useContext } from "react";
type AuthContextType = {
  user?: User;
  isCompany: boolean;
  isLoading: boolean;
  setUser: (user: User) => void;
};
export const AuthContext = createContext<AuthContextType>({
  user: undefined,
  isLoading: false,
  isCompany: false,
  setUser: () => {},
});

export const useAuthContext = () => useContext(AuthContext);
