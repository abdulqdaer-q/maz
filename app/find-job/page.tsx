import React from "react";
import Navbar from "@/components/Navbar";
import SearchBar from "@/components/SearchBar";
import Image from "next/image";
import findjop from "../../assets/findJob2.png";
import Filter from "@/components/Filter";
import JobCard from "@/components/JobCard";
const page = () => {
  const jobs = [
    {
      id: 1,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 2,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 3,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 4,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 5,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
    {
      id: 6,
      title: "SEO Analyst",
      image: "/logo.png",
      name: "collection tech",
      isCompany: true,
      salary: "Remote: Anywhere",
      time: "Full Time",
      description: "lorem ipsum lorem ipsumlorem ipsumlorem ipsumlorem ipsum",
    },
  ];
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
          <SearchBar />
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
          <Filter />
        </div>
        <div className="col-span-3 grid grid-cols-1 gap-y-5 mx-0 mt-12 ">
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              id={job.id}
              title={job.title}
              image={job.image}
              name={job.name}
              isCompany={job.isCompany}
              salary={job.salary}
              time={job.time}
              description={job.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
