"use client";
import PostedJob from "@/components/PostedJob";
import CompanyProfile from "@/components/profile/CompanyProfile";
import Profile from "@/components/profile/Profile";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "react-circular-progressbar/dist/styles.css";

const Page = () => {
  const { user, isCompany, setForceReload, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    setForceReload((p) => !p);
  }, []);
  if (isLoading || !user) {
    return <h1>Loading</h1>;
  }
  if (!isCompany) {
    router.push("/profile");
    return;
  }


  return (
    <>
      <CompanyProfile setReload={setForceReload} user={user}  />;
      <PostedJob />
    </>
  )

};
export default Page;
