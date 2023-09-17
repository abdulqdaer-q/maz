"use client";
import Profile from "@/components/profile/Profile";
import { useAuthContext } from "@/contexts/AuthContext";
import { User } from "@/types/User";
import { Views } from "@/types/View";
import { axios } from "@/utils/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";

const Page = () => {
  const [user, setUser] = useState<User>();
  const { user: me, isLoading } = useAuthContext();
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
  useEffect(() => {
    if (
      me?.userInfo?.id &&
      user?.userInfo?.id &&
      me.userInfo.id !== user.userInfo.id
    ) {
      const postView = async () => {
        const { data: views } = await axios.get<Views>(
          `/views?filters[userInfo][id][$eq]=${
            me!.userInfo!.id
          }&filters[visitedUser][id][$eq]=${
            user!.userInfo!.id
          }&populate[userInfo][fields][0]=id&populate[visitedUser][fields][0]=id`
        );
        const data = {
          userInfo: me!.userInfo!.id,
          visitedUser: user!.userInfo!.id,
        };
        if (views.length > 0) {
          await axios.put("/views/" + views[0].id, {
            data,
          });
        } else {
          await axios.post("/views", {
            data,
          });
        }
      };
      postView();
    }
  }, [me, user]);

  if (!user) {
    return <h1>Loading</h1>;
  }

  return <Profile setReload={() => {}} user={user} showEdit={false} />;
};
export default Page;
