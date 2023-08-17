"use client"
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import findjop from "../../assets/findJob2.png";
import Filter from "@/components/Filter";
import JobCard from "@/components/JobCard";
import React, { useEffect, useState } from 'react'
import { axios } from '../../utils/axios'
import { useRouter } from "next/navigation";
import { useSearchContext } from "@/contexts/SearchContext";




const Page = () => {
  const {jjobs} = useSearchContext()
console.log({jjobs})

    const [jobs, setjobs] = useState();

    useEffect(() => {
        const fetchDataAsync = async () => {
          try {
            const response = await axios(`/jobs?populate=company,company.companyLogo,category,job&filter[job][jobTitle][$contains]=ds&fields[0]=company&filters[category][category][$eq]=it`);
            setjobs(response.data.data);
          
          } catch (error) {
            
            console.error(error);
          }
        };
    
        fetchDataAsync();
      }, []);
      console.log(jobs)
  
  return (
    <div>
      <Navbar />
      <div className=" px-10 pt-5 lg:pt-0 lg:px-20 bg-[#D9EAF5] h-[750px] lg:h-[500px]  flex flex-row justify-center  items-center flex-wrap">
        <div className=" lg:w-[60%] flex flex-col gap-10 ">
          <h1 className=" text-[#444C63]  font-bold text-[45px] ">Find Job</h1>
          <p className="text-[1.5rem]  font-[400]">
            create a profile and apply for new job opportunities find
            professionals that best match your job requirements
          </p>
        
        </div>
        <div className=" lg:w-[40%]">
          <Image
            className=" m-auto"
            width={400}
            height={400}
            src={findjop}
            alt="offer.png"
          />
        </div>
      </div>
      <div className=" pt-5 px-5 md:grid md:grid-cols-4 gap-10 flex flex-col">
        <div className="col-span-1">
         
        </div>
        <div className="col-span-3 grid grid-cols-1 gap-y-5 mx-0 mt-12 ">
          {jobs?.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.attributes.job.data.attributes.jobTitle}
              image={job.attributes.company?.data.attributes.companyLogo?.data?.[0].attributes.url}
              name={job.attributes.company?.data.attributes.name}
              isCompany={job.isCompany}
              salary={job.attributes.salary}
              time={job.attributes.type}
              description={job.attributes.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
