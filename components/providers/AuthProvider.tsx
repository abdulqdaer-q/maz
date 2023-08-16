'use client'
import React, { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { message } from "antd";
import { API, BEARER } from "../../utils/constant";
import { useEffect } from "react";
import { getToken } from "../../utils/helper";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";

type Props = {
    children?: React.ReactNode
  };
const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState(false);
  
  const authToken = getToken();

  const fetchLoggedInUser = async (token: string) => {
    setIsLoading(true);
    try {
      
      const {data} = await axios.get(`/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      }); 
      const {id} = data;
      const {data: realUser} = await axios.get<User>(`/users/${id}?populate=user_info,user_info.photo`)
      
      setUserData(realUser);
    } catch (error) {
      console.error(error);
      message.error("Error While Getting Logged In User Details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUser = (user: User) => {
    setUserData(user);
  };

  useEffect(() => {
    if (authToken) {
      fetchLoggedInUser(authToken);
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user: userData, setUser: handleUser, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;