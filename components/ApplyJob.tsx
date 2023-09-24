import { useAuthContext } from '@/contexts/AuthContext';
import { axios } from '@/utils/axios';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Input, Popover } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
type props = {
    id: number;
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
    setIsOpen: any
};
const ApplyJob = ({
    id,
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
    setIsOpen
}: props) => {
    const [text, setText] = useState('');
    const [notiOpen, setNotiOpen] = useState(false);
    const {user} = useAuthContext();
    const router = useRouter();
    return (
        <div className={`w-full  h-full border-t-4 border-primary rounded-md`} >
            <CloseOutlined className='  ml-96 my-5' onClick={() => setIsOpen(false)} />
            <div className="w-full p-5 ">
                <h1 className="font-semibold text-xl mb-3">{title}</h1>
                <p className=" font-semibold  text-sm  mb-3">{companyName}  <span className=" text-gray-400  font-light"> . {location}</span></p>
                <div className="flex justify-between items-center py-5">
                    <p className=" text-gray-400 text-sm">{time}</p>
                    <Popover title="Do you want to add any information ?" trigger="click" onOpenChange={open => setNotiOpen(open)} open={notiOpen} content={() => (
                        <div className='flex flex-col gap-5'>
                        <TextArea rows={5} onChange={(e) => {setText(e.target.value)}} />
                        <Button type='primary' onClick={async () => {
                            await axios.post('/applications', {
                                data: {
                                    job: id,
                                    userInfo: user?.userInfo?.id,
                                    additionalInfo: text
                                }
                            })
                        }} >
                            Ok
                        </Button>
                        </div>

                    )}>
                        <Button type="primary" className="  font-bold text-sm" onClick={() => {
                            if (user?.userInfo?.id) {
                                setNotiOpen(true);
                            }
                            else {
                                router.push('/auth/login')
                            }
                        }}>Apply</Button>
                    </Popover>
                </div>
            </div>
            <div className='  h-96 overflow-y-scroll  overflow-x-clip  break-before-all p-5'>
                <div className='flex flex-col my-4 '>
                    <h1 className='   font-bold py-1'>Job Description</h1>
                    <p className='  text-sm text-gray-500 '>{description}</p>
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