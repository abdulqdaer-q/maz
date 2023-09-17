"use client";
import EducationForm from "@/components/froms/EducationForm";
import { useParams, useRouter } from "next/navigation";

export default () => {
  const router = useRouter();
  const params = useParams();
  return (
    <EducationForm
      startOverText="Cancel"
      startOverHref="/profile"
      submitText="Save"
      hideSkip
      id={+params.id}
      onAfterSubmit={() => {
        router.replace("/profile");
      }}
    />
  );
};
