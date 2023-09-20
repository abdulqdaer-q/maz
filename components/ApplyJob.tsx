import { Button } from 'antd';
import React from 'react'
type props = {
    id: string;
    title: string;
    companyName: string;
    location: string;
    industry: string;
    maxsalary: number;
    minsalary: number;
    time: string;
    description: string;
    skills: string;
    employmentType: string;
    numberOfVacancies: number;
    yearsOfExperience: number;
    nationality: string;
    maxAge: number;
    minAge: number;
    onApply: (data: any) => void;
    isOpen: boolean
};
const ApplyJob = ({

    title,
    companyName,
    location,
    industry,
    maxsalary,
    minsalary,
    employmentType,
    time,
    description,
    skills,
    numberOfVacancies,
    yearsOfExperience,
    nationality,
    maxAge,
    minAge,
    onApply,
    isOpen,
}: props) => {
    return (
        <div className={`w-full  h-full border-t-4 border-primary rounded-md  ${isOpen ? `` : `hidden`}`} >

            <div className="w-full p-5 ">
                <h1 className="font-semibold text-xl mb-3">{title}</h1>
                <p className=" font-semibold  text-sm  mb-3">{companyName}  <span className=" text-gray-400  font-light"> . {location}</span></p>
                <div className="flex justify-between items-center py-5">
                    <p className=" text-gray-400 text-sm">{time}</p>
                    <Button type="primary" className="  font-bold text-sm" onClick={onApply}>Apply</Button>
                </div>
            </div>
            <div className='  h-96 overflow-y-scroll p-5'>
                <div className='flex flex-col my-4 '>
                    <h1 className='  font-bold py-1'>Job Description</h1>
                    <p className=' text-sm text-gray-500'>{description}</p>
                </div>
                <div className='flex flex-col my-4 '>
                    <h1 className='  font-bold py-1'>Skills</h1>
                    <p className=' text-sm text-gray-500'>{skills}</p>
                </div>
                <div className='flex flex-col my-4 gap-3 '>
                    <h1 className='  font-bold py-1'>Job Details</h1>
                    {location ? <p className='flex  justify-between text-gray-500 text-sm'><span className='  font-semibold  text-black' >Job Location</span>{location} </p> : ""}
                    {industry ? <p className='flex  justify-between text-gray-500 text-sm'><span className='  font-semibold  text-black'>Job Industry</span>{industry} </p> : ""}
                    {employmentType ? <p className='flex  justify-between text-gray-500 text-sm'><span className='  font-semibold  text-black'>Employment Type</span>{employmentType} </p> : ""}
                    {minsalary || maxsalary ? <p className='flex  justify-between text-gray-500 text-sm'><span className='  font-semibold  text-black'>Monthly Salary Range</span> {`$ ${minsalary} - $ ${maxsalary}`} </p> : ""}
                    {numberOfVacancies ? <p className='flex  justify-between text-gray-500 text-sm'><span className='  font-semibold  text-black'>Number of Vacancies</span>{numberOfVacancies} </p> : ""}
                </div>
                <div className='flex flex-col my-4 gap-3'>
                    <h1 className='  font-bold py-1'>Preferred Candidate</h1>
                    {yearsOfExperience ? <p className='flex  justify-between text-gray-500  text-sm'><span className='  font-semibold  text-black'>Years of Experience	</span>{yearsOfExperience} </p> : ""}
                    {nationality ? <p className='flex  justify-between text-gray-500  text-sm'><span className='  font-semibold  text-black'>Nationality</span>{nationality} </p> : ""}

                    {minAge || maxAge ? <p className='flex  justify-between text-gray-500  text-sm'><span className='  font-semibold  text-black'>Age</span> {`Min: ${minAge} - Max: ${maxAge}`} </p> : ""}

                </div>
            </div>
        </div>
    )
}

export default ApplyJob