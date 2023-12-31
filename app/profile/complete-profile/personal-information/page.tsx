"use client";
import PersonalInformation from "@/components/froms/PersonalInformationForm";
import { useRouter } from "next/navigation";

const PersonalDetails = () => {
  const router = useRouter();
  return (
    <PersonalInformation
      withMainInformation={false}
      onAfterSubmit={() => {
        router.replace("/profile/complete-profile/have-experience");
      }}
    />
  );
};

export default PersonalDetails;
