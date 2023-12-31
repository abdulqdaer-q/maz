"use client";
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
  if (isCompany) {
    router.push("/company/profile");
    return;
  }
  
  return <Profile setReload={setForceReload} user={user} showEdit />;
};
export default Page;
