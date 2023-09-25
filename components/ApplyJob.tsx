import { useAuthContext } from '@/contexts/AuthContext';
import { axios } from '@/utils/axios';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Collapse, CollapseProps, Input, message, Popover } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useRouter } from 'next/navigation';


import React, { useEffect, useState } from 'react'
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
    isPostedJob?: boolean
    posted?: boolean,
    draft?: boolean,
    setp: any,
    p: boolean,
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
    setIsOpen,
    isPostedJob,
    posted,
    draft,
    setp,
    p,
}: props) => {
    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: 'Show details',
            children: <>
                <div className='  h-96 overflow-y-scroll line-clamp-4 break-all  p-5'>
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
                        {minsalary || maxsalary ? <p className='flex  justify-between text-gray-500 text-sm'><span className='  font-semibold  text-black'>Monthly Salary Range</span> {`S.P ${minsalary} - S.P ${maxsalary}`} </p> : ""}
                        {numberOfVacancies ? <p className='flex  justify-between text-gray-500 text-sm'><span className='  font-semibold  text-black'>Number of Vacancies</span>{numberOfVacancies} </p> : ""}
                    </div>
                    <div className='flex flex-col my-4 gap-3'>
                        <h1 className='  font-bold py-1'>Preferred Candidate</h1>
                        {yearsOfExperience ? <p className='flex  justify-between text-gray-500  text-sm'><span className='  font-semibold  text-black'>Years of Experience	</span>{yearsOfExperience} </p> : ""}
                        {nationality ? <p className='flex  justify-between text-gray-500  text-sm'><span className='  font-semibold  text-black'>Nationality</span>{nationality} </p> : ""}

                        {minAge || maxAge ? <p className='flex  justify-between text-gray-500  text-sm'><span className='  font-semibold  text-black'>Age</span> {`Min: ${minAge} - Max: ${maxAge}`} </p> : ""}

                    </div>
                </div>
            </>,
        },

    ];
    const [text, setText] = useState('');
    const [notiOpen, setNotiOpen] = useState(false);
    const { user } = useAuthContext();
    const router = useRouter();

    return (
        <div className={`w-[25rem]   border-t-4 border-primary rounded-md    ${isPostedJob ? "" : "fixed overflow-y-scroll"}`} >
            <div className='flex  justify-end mt-3'>
                {isPostedJob ? "" : <CloseOutlined className=' ' onClick={() => setIsOpen(false)} />}
                {posted ? <div className=' flex gap-3'><Button type='primary' className=' bg-green-400' onClick={() => { router.push(`../candidates?job=${id}`) }}>Show Candidates</Button><Button className=' ' danger onClick={async () => {
                    await axios.delete("/jobs/" + id);
                    console.log(p)
                    message.success("deleted successfully");
                    setp((p) => !p);
                    console.log(p)
                }}>Delete</Button>  </div> : ""}
                {draft ? <div className=' flex gap-3'><Button className=' ' danger onClick={async () => {
                    await axios.delete("/jobs/" + id);
                    console.log(p)
                    message.success("deleted successfully");
                    setp((p) => !p);
                    console.log(p)
                }}>Delete</Button>
                    <Button type='primary' className=' bg-green-400' onClick={async () => {
                        await axios.put("/jobs/" + id, { data: { publishedAt: new Date() } });
                        console.log(p)
                        message.success("Post successfully");
                        setp((p) => !p);
                        console.log(p)
                    }}>Post</Button>  </div> : ""}

            </div>
            <div className="w-full p-5 ">
                <h1 className="font-semibold text-xl mb-3">{title}</h1>
                <p className=" font-semibold  text-sm  mb-3">{companyName}  <span className=" text-gray-400  font-light"> . {location}</span></p>
                <div className="flex justify-between items-center py-5">
                    <p className=" text-gray-400 text-sm">{time}</p>
                    <Popover title="Do you want to add any information ?" trigger="click" onOpenChange={open => setNotiOpen(open)} open={notiOpen} content={() => (
                        <div className='flex flex-col gap-5'>
                            <TextArea rows={5} onChange={(e) => { setText(e.target.value) }} />
                            <Button type='primary' onClick={async () => {
                                await axios.post('/applications', {
                                    data: {
                                        job: id,
                                        userInfo: user?.userInfo?.id,
                                        additionalInfo: text
                                    }
                                })
                                message.success('Applied sucessfully')
                                setIsOpen(false);
                                setText('')
                            }} >
                                Ok
                            </Button>
                        </div>

                    )}>
                        {isPostedJob ? "" : <Button type="primary" className="  font-bold text-sm" onClick={() => {
                            if (user?.userInfo?.id) {
                                setNotiOpen(true);
                            }
                            else {
                                router.push('/auth/login')
                            }
                        }}>Apply</Button>}
                    </Popover>
                </div>
            </div>
            <Collapse items={items} />

        </div >
    )
}

export default ApplyJob