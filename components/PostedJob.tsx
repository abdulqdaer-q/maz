"use client"
import { Job } from '@/types/Job';
import { axios } from '@/utils/axios';
import { Tabs, TabsProps } from 'antd';
import React, { useEffect, useState } from 'react'
import JobCard from './JobCard';
import ApplyJob from './ApplyJob';
import { useAuthContext } from '@/contexts/AuthContext';

const PostedJob = () => {
    const [postedjobs, setPostedjobs] = useState<Job>();
    const [draftjobs, setDraftjobs] = useState<Job>();
    const [p, setp] = useState(true);
    const { user, isLoading } = useAuthContext();
    const company = user?.company
    console.log(company)
    useEffect(() => {
        const fetchPostJobs = async () => {
            const { data: jobs } = await axios.get<Job>(`jobs?populate[industries][fields][0]=title&populate[country][fields][0]=name&populate[company][fields][0]=companyName&fields[0]=title&fields[1]=minimumSalary&fields[2]=maximumSalary&fields[3]=numberOfVacancies&fields[4]=employmentType&fields[5]=isWorkFromHome&fields[6]=jobDescription&fields[7]=desiredSkills&fields[8]=genderPerfrence&fields[9]=minimumAge&fields[10]=maximumAge&fields[11]=minimumYearsOfExperience&filters[company][id][$eq]=${company?.id}&publicationState=preview&filters[publishedAt][$null]=true`);
            setDraftjobs(jobs);
        };
        const fetchDraftJobs = async () => {
            const { data: jobs } = await axios.get<Job>(`jobs?populate[industries][fields][0]=title&populate[country][fields][0]=name&populate[company][fields][0]=companyName&fields[0]=title&fields[1]=minimumSalary&fields[2]=maximumSalary&fields[3]=numberOfVacancies&fields[4]=employmentType&fields[5]=isWorkFromHome&fields[6]=jobDescription&fields[7]=desiredSkills&fields[8]=genderPerfrence&fields[9]=minimumAge&fields[10]=maximumAge&fields[11]=minimumYearsOfExperience&filters[company][id][$eq]=${company?.id}`);
            setPostedjobs(jobs);
        };
        fetchPostJobs();
        fetchDraftJobs();
    }, [company, p]);
    console.log(postedjobs)
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Posted ',
            children: <div className='m-auto flex flex-wrap  w-2/3 gap-5'>
                {postedjobs?.map((applyJob) => {
                    return (
                        <ApplyJob
                            key={applyJob.id}
                            id={applyJob?.id}
                            title={applyJob?.title}
                            companyName={applyJob?.company?.companyName}
                            location={applyJob?.country?.name}
                            maxsalary={applyJob?.maximumSalary}
                            minsalary={applyJob?.minimumSalary}
                            time={`${Math.floor((Math.random() * 10) + 1)}days`}
                            description={applyJob?.jobDescription}
                            skills={applyJob?.desiredSkills}
                            industry={applyJob?.industries?.title}
                            employmentType={applyJob?.employmentType}
                            numberOfVacancies={applyJob?.numberOfVacancies}
                            yearsOfExperience={applyJob?.minimumYearsOfExperience}
                            nationality={applyJob?.country?.name}
                            maxAge={applyJob?.maximumAge}
                            minAge={applyJob?.minimumAge}
                            isPostedJob={true}
                            isOpen={true}
                            posted={true}
                            p={p}
                            setp={setp}
                        />
                    )
                })}
            </div>,
        },
        {
            key: '2',
            label: 'Draft',
            children: <div className='m-auto flex flex-wrap  w-2/3 gap-5'>
                {draftjobs?.map((applyJob) => {
                    return (
                        <ApplyJob
                            key={applyJob.id}
                            id={applyJob?.id}
                            title={applyJob?.title}
                            companyName={applyJob?.company?.companyName}
                            location={applyJob?.country?.name}
                            maxsalary={applyJob?.maximumSalary}
                            minsalary={applyJob?.minimumSalary}
                            skills={applyJob?.desiredSkills}
                            time={`${Math.floor((Math.random() * 10) + 1)}days`}
                            description={applyJob?.jobDescription}
                            industry={applyJob?.industries?.title}
                            employmentType={applyJob?.employmentType}
                            numberOfVacancies={applyJob?.numberOfVacancies}
                            yearsOfExperience={applyJob?.minimumYearsOfExperience}
                            nationality={applyJob?.country?.name}
                            maxAge={applyJob?.maximumAge}
                            minAge={applyJob?.minimumAge}
                            isPostedJob={true}
                            isOpen={true}
                            draft={true}
                            p={p}
                            setp={setp}
                        />
                    )
                })}
            </div>,
        },
    ];
    return (
        <div>
            <Tabs className=' ' defaultActiveKey="1" items={items} />;

        </div>
    )
}

export default PostedJob