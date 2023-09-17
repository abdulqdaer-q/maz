"use client";
import React, { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { message } from "antd";
import { API, BEARER } from "../../utils/constant";
import { useEffect } from "react";
import { getToken } from "../../utils/helper";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";

type Props = {
  children?: React.ReactNode;
};
const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [forceReload, setForceReload] = useState(false);
  const authToken = getToken();

  const fetchLoggedInUser = async (token: string) => {
    try {
      const { data } = await axios.get(`/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const { id } = data;
      const { data: realUser } = await axios.get<User>(
        `/users/${id}?populate=userInfo,userInfo.photo,company,userInfo.residenceCountry,userInfo.nationality,userInfo.educations,userInfo.experiences,userInfo.cv,userInfo.experiences.companyIndustry,userInfo.experiences.jobLocation,userInfo.educations.country`
      );
      setIsCompany(!!realUser.company);

      setUserData(realUser);
    } catch (error) {
      console.error(error);
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
      return;
    }
    setIsLoading(false);
  }, [authToken, forceReload]);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        setUser: handleUser,
        isLoading,
        isCompany,
        setForceReload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
