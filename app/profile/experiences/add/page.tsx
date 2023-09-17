"use client";
import ExperienceForm from "@/components/froms/ExperienceForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default () => {
  const { user, isLoading } = useAuthContext();
  const router = useRouter();

  const handleAfterSubmit = () => {
    router.replace("/profile");
  };
  if (isLoading) return <h1>Loading...</h1>;
  return (
    <ExperienceForm
      onAfterSubmit={handleAfterSubmit}
      user={user!}
      startOverText="Cancel"
      startOverHref="/profile"
      submitText="Save"
    />
  );
};
