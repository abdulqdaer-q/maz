"use client";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BEARER } from "../../utils/constant";
import { getToken } from "../../utils/helper";


type Props = {
  children?: React.ReactNode;
};
const AuthProvider = ({ children }: Props) => {
  const [userData, setUserData] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCompany, setIsCompany] = useState(false);
  const [forceReload, setForceReload] = useState(false);


  const fetchLoggedInUser = async (token: string) => {
    try {
      const { data } = await axios.get(`/users/me`, {
        headers: { Authorization: `${BEARER} ${token}` },
      });
      const { id } = data;
      const { data: realUser } = await axios.get<User>(
        `/users/${id}?populate=userInfo,userInfo.photo,company,userInfo.residenceCountry,userInfo.nationality,userInfo.educations,userInfo.experiences,userInfo.cv,userInfo.experiences.companyIndustry,userInfo.experiences.jobLocation,userInfo.educations.country,userInfo.specialities,userInfo.skills,userInfo.languages`
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
    const authToken = getToken();
    if (authToken) {
      console.log({ 'i-ll-do-it-later': true });

      fetchLoggedInUser(authToken);
    }
    else {
      setUserData(undefined)
      setIsLoading(false);
    }
  }, [forceReload]);

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
