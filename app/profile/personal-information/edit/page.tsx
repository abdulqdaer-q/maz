"use client";
import PersonalInformation from "@/components/froms/PersonalInformationForm";
import { useAuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const PersonalDetails = () => {
  const router = useRouter();
  const { setForceReload } = useAuthContext();
  return (
    <PersonalInformation
      withMainInformation
      onAfterSubmit={() => {
        router.replace("/profile");
        setForceReload((r) => !r);
      }}
      hideSkip
      startOver
      startOverText="Cancel"
      startOverHref="/profile"
      submitText="Save"
    />
  );
};

export default PersonalDetails;
