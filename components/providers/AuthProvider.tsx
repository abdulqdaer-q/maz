"use client";
import React, { useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { message } from "antd";
import { API, BEARER } from "../../utils/constant";
import { useEffect } from "react";
import { getToken } from "../../utils/helper";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";

import { getPhotoLink } from "@/lib/getPhotoLink";
import { socket } from "@/app/layout";

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
  const [isConnected, setIsConnected] = useState(socket.connected);
  
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.connect()
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      
      
    };
  }, []);
  useEffect( () => {
    const user = userData;
    if (isConnected && user) {
      socket.emit('join', {
        id: user!.id,
        email: user.email,
        name: user.userInfo?.firstName + " " + user.userInfo?.lastName,
        image: getPhotoLink(user.userInfo!.photo.url)
      })
    }
  }, [isConnected, userData]);
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
