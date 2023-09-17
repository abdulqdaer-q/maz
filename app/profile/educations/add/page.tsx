"use client";
import EducationForm from "@/components/froms/EducationForm";
import { useRouter } from "next/navigation";

export default () => {
  const router = useRouter();
  return (
    <EducationForm
      startOverText="Cancel"
      startOverHref="/profile"
      submitText="Save"
      hideSkip
      onAfterSubmit={() => {
        router.replace("/profile");
      }}
    />
  );
};
