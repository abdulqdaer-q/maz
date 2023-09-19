"use client"

import ApplyJob from "@/components/ApplyJob";
import Filter from "@/components/Filter";
import JobCard from "@/components/JobCa";


const Page = () => {
  const handleApply = () => {
    console.log("apply")
  }

  return (
    <div className="flex  m-28   justify-between">
      <div className="w-1/4">
        <Filter />
      </div>
      <div className="w-1/3">
        <JobCard
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
        />
      </div>

      <div className="w-1/4">
        <ApplyJob
          id="2"
          title="Chinese Marketing Planning - (CAN SPEAK CHINESE AND ENGLISH) WORK EXPERIENCE: BLOCKCHAIN"
          companyName="Grand Fortune Road Management Consultancies"
          location="Dubai"
          maxsalary="1500"
          minsalary="500"
          time="2 days"
          description="As a Marketing Specialist, you will be responsible for formulating and executing comprehensive marketing strategies and event planning, focusing on media cooperation in overseas and online markets. At the same time, you will also be responsible for the management of online media advertising, the editing of platform copywriting, and event packaging. Specific responsibilities include, but are not limited to, the following:"
          skills="Bachelor degree or above in marketing, advertising media, or related majors is preferred.
          Have at least 1 year of experience in market planning, event planning, or related work. Applicants with experience in overseas markets will be given priority.
          Familiar with the process and strategies of online media cooperation, familiar with the promotion channels of different platforms, and has rich docking experience.
          Have good creative and copywriting skills, and be able to write attractive advertising copy and platform copy.
          Have work experience related to the Metaverse and blockchain and a certain understanding of the industry and products.
          Excellent communication and coordination skills, with the ability to work effectively with internal teams and external partners.
          Good data analysis skills and the ability to make reasonable decisions and optimization measures based on market data
          Proficient in office software, such as the Microsoft Office suite (Word, Excel, PowerPoint, etc.).
          There are no restrictions on nationality or gender.
          BLOCKCHAIN EXPERIENCE"
          industry="IT Services"
          employmentType="Full Time Employee"
          numberOfVacancies="1"
          yearsOfExperience="2"
          nationality="China; Macau; Singapore; Thailand"
          maxAge="40"
          minAge="25"
          onApply={handleApply}
        />
      </div>
    </div>
  );
};

export default Page;
