
import { useAuthContext } from "@/contexts/AuthContext";
import { Job, Jobs } from "@/types/Job";
import { axios } from "@/utils/axios";
import React, { useEffect, useState } from "react";

export default (id?: any, filters?: string) => {
    const [jobs, setJobs] = useState<any>();
    const {user} = useAuthContext();
    useEffect(() => {
        const fetchJobs = async () => {
            if (id) {
                if (id === -1) return;
                
                let { data } = await axios.get<Job>(`/jobs/${id}?populate[industries][fields][0]=title&populate[country][fields][0]=name&populate[company][fields][0]=companyName&fields[0]=title&fields[1]=minimumSalary&fields[2]=maximumSalary&fields[3]=numberOfVacancies&fields[4]=employmentType&fields[5]=isWorkFromHome&fields[6]=jobDescription&fields[7]=desiredSkills&fields[8]=genderPerfrence&fields[9]=minimumAge&fields[10]=maximumAge&fields[11]=minimumYearsOfExperience`);
                
                
                setJobs(
                    data
                );
            } else {
                let { data } = await axios.get<Jobs>(`/jobs?${filters}populate[industries][fields][0]=title&populate[country][fields][0]=name&populate[company][fields][0]=companyName&fields[0]=title&fields[1]=minimumSalary&fields[2]=maximumSalary&fields[3]=numberOfVacancies&fields[4]=employmentType&fields[5]=isWorkFromHome&fields[6]=jobDescription&fields[7]=desiredSkills&fields[8]=genderPerfrence&fields[9]=minimumAge&fields[10]=maximumAge&fields[11]=minimumYearsOfExperience `);
                
                if (user?.userInfo?.id) {
                    const {data: apps} = await axios.get('/applications?populate=job,userInfo&filters[userInfo][id][$eq]='+ user.userInfo.id);
                    data = data.filter(e => apps.some(x => x.job?.id !== e?.id))
                }
                setJobs(
                    data?.map((e) => ({
                        title: e.title,
                        industries: e.industries,
                        country: e.country,
                        minimumSalary: e.minimumSalary,
                        maximumSalary: e.maximumSalary,
                        numberOfVacancies: e.numberOfVacancies,
                        employmentType: e.employmentType,
                        isWorkFromHome: e.isWorkFromHome,
                        jobDescription: e.jobDescription,
                        desiredSkills: e.desiredSkills,
                        minimumAge: e.minimumAge,
                        maximumAge: e.maximumAge,
                        minimumYearsOfExperience: e.minimumYearsOfExperience,
                        company: e.company,
                        id: e.id

                    }))
                );
            }
        };
        fetchJobs();
    }, [id, filters]);
    return jobs;
};
