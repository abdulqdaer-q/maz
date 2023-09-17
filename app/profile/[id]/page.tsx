"use client";
import Profile from "@/components/profile/Profile";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";

const Page = () => {
  const [user, setUser] = useState<User>();

  const router = useRouter();
  const { id } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      const { data: realUser } = await axios.get<User>(
        `/users/${+id}?populate=userInfo,userInfo.photo,company,userInfo.residenceCountry,userInfo.nationality,userInfo.educations,userInfo.experiences,userInfo.cv,userInfo.experiences.companyIndustry,userInfo.experiences.jobLocation,userInfo.educations.country`
      );
      setUser(realUser);
    };
    fetchUser();
  }, []);
  console.log({ user });

  if (!user) {
    return <h1>Loading</h1>;
  }

  return <Profile setReload={() => {}} user={user} showEdit={false} />;
};
export default Page;
