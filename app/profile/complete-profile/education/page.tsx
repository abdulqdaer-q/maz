"use client";
import EducationForm from "@/components/froms/EducationForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default () => {
  const router = useRouter();
  const { user, isLoading } = useAuthContext();
  if (isLoading) return <></>;

  return (
    <EducationForm
      id={user?.userInfo?.educations?.[0]?.id}
      onAfterSubmit={() => {
        router.replace("/profile");
      }}
    />
  );
};
