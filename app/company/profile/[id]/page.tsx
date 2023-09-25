"use client";
import useJobs from "@/app/hooks/useJobs";
import ApplyJob from "@/components/ApplyJob";
import JobCard from "@/components/JobCa";
import CompanyProfile from "@/components/profile/CompanyProfile";
import Profile from "@/components/profile/Profile";
import { useAuthContext } from "@/contexts/AuthContext";
import { Job } from "@/types/Job";
import { axios } from "@/utils/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>();
  const [jobs, setJobs] = useState<any>([]);
  const {id} = useParams();
  const [idJob, setIdJob] = useState(-1)
  useEffect(() => {
    const ng = async () => {
        const {data} = await axios.get(`/users/${id}?populate=company,company.country`);
        setUser(data);
        const {data: asxd} = await axios.get('/jobs?populate=company,country&filters[company][id][$eq]='+data.company.id)
        setJobs(asxd)
        console.log({asxd});
        
        setIsLoading(false)
    }
    ng();
  }, [])
  const [apply, setApply] = useState(false);
  const applyJob: Job = useJobs(idJob)
  const handleOpenApply = (id: number) => {
    setApply(true)
    setIdJob(id)
  }
  
  const router = useRouter();
  if (isLoading || !user) {
    return <h1>Loading</h1>;
  }
  if (!user.company) {
  router.push("/");
    return;
  }
  
  return<>
  <CompanyProfile  setReload={()=>{}} user={user}  />
  <div className={`${apply ? 'w-1/3' : 'w-2/3'}`}>

  {jobs?.map((job) => {
      return (
          <JobCard
          id={job.id}
          key={job.id}
          title={job.title}
          companyName={job.company?.companyName}
          location={job.country.name}
          maxsalary={job.maximumSalary}
          minsalary={job.minimumSalary}
          time={`${Math.floor((Math.random() * 10) + 1)}days`}
          description={job.jobDescription}
          onApply={() => {  handleOpenApply(job.id) }}
          />
          )
        })}
    </div>
    {apply && <div className={`${!apply ? 'w-0' : 'w-1/4'}`}>
        <ApplyJob
          id={applyJob?.id}
          title={applyJob?.title}
          companyName={applyJob?.company?.companyName}
          location={applyJob?.country?.name}
          maxsalary={applyJob?.maximumSalary}
          minsalary={applyJob?.minimumSalary}
          time={`${Math.floor((Math.random() * 10) + 1)}days`}
          description={applyJob?.jobDescription}
          industry={applyJob?.industries?.title}
          employmentType={applyJob?.employmentType}
          numberOfVacancies={applyJob?.numberOfVacancies}
          yearsOfExperience={applyJob?.minimumYearsOfExperience}
          nationality={applyJob?.country?.name}
          maxAge={applyJob?.maximumAge}
          minAge={applyJob?.minimumAge}
          onApply={() => handleApply(applyJob.id)}
          isOpen={apply}
          setIsOpen={setApply}
        />
      </div>}
  </>
};
export default Page;
