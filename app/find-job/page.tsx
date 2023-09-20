"use client"

import ApplyJob from "@/components/ApplyJob";
import Filter from "@/components/Filter";
import JobCard from "@/components/JobCa";
import useJobs from "../hooks/useJobs";
import { useState } from "react";
import { CloudFilled } from "@ant-design/icons";
import { Job } from "@/types/Job";


const Page = () => {
  const [apply, setApply] = useState<boolean>(false);
  const [idJob, setIdJob] = useState<number>(1);



  const jobs = useJobs();
  const applyJob: Job = useJobs(idJob)
  console.log(applyJob, "dsd")
  console.log(jobs)
  const handleOpenApply = (id: number) => {
    setApply(true)
    console.log(id)
    setIdJob(id)
  }

  return (
    <div className="flex  m-28   justify-between">
      <div className="w-1/4">
        <Filter />
      </div>
      <div className={`${apply ? 'w-1/3' : 'w-2/3'}`}>
        {jobs?.map((job, id) => {
          return (
            <JobCard
              id={id}
              title={job.title}
              companyName={job.company?.companyName}
              location={job.country.name}
              maxsalary={job.maximumSalary}
              minsalary={job.minimumSalary}
              time={`${Math.floor((Math.random() * 10) + 1)}days`}
              description={job.jobDescription}
              onApply={() => { handleOpenApply(id + 1) }}
            />
          )
        })}
        {/*  <JobCard
          id="2"
          title="Chinese Marketing Planning - (CAN SPEAK CHINESE AND ENGLISH) WORK EXPERIENCE: BLOCKCHAIN"
          companyName="Grand Fortune Road Management Consultancies"
          location="Dubai"
          maxsalary="1500"
          minsalary="500"
          time="2 days"
          description="As a Marketing Specialist, you will be responsible for formulating and executing comprehensive marketing strategies and event planning, focusing on media cooperation in overseas and online markets. At the same time, you will also be responsible for the management of online media advertising, the editing of platform copywriting, and event packaging. Specific responsibilities include, but are not limited to, the following:"
        />
        <JobCard
          id="2"
          title="Chinese Marketing Planning - (CAN SPEAK CHINESE AND ENGLISH) WORK EXPERIENCE: BLOCKCHAIN"
          companyName="Grand Fortune Road Management Consultancies"
          location="Dubai"
          maxsalary="1500"
          minsalary="500"
          time="2 days"
          description="As a Marketing Specialist, you will be responsible for formulating and executing comprehensive marketing strategies and event planning, focusing on media cooperation in overseas and online markets. At the same time, you will also be responsible for the management of online media advertising, the editing of platform copywriting, and event packaging. Specific responsibilities include, but are not limited to, the following:"
        /> */}
      </div>

      <div className={`${!apply ? 'w-0' : 'w-1/4'}`}>
        <ApplyJob

          title={applyJob?.title}
          companyName={applyJob?.company?.companyName}
          location={applyJob?.country.name}
          maxsalary={applyJob?.maximumSalary}
          minsalary={applyJob?.maximumSalary}
          time={`${Math.floor((Math.random() * 10) + 1)}days`}
          description={applyJob?.jobDescription}
          industry={applyJob?.industries.title}
          employmentType={applyJob?.employmentType}
          numberOfVacancies={applyJob?.numberOfVacancies}
          yearsOfExperience={applyJob?.minimumYearsOfExperience}
          nationality={applyJob?.country.name}
          maxAge={applyJob?.maximumAge}
          minAge={applyJob?.minimumAge}
          onApply={handleOpenApply}
          isOpen={apply}
        />
      </div>
    </div>
  );
};

export default Page;
