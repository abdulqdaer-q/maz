"use client";
import PostedJob from "@/components/PostedJob";
import CompanyProfile from "@/components/profile/CompanyProfile";
import Profile from "@/components/profile/Profile";
import { useAuthContext } from "@/contexts/AuthContext";
import { axios } from "@/utils/axios";
import { API, BASE_SERVEFR_URL } from "@/utils/constant";
import { EditOutlined, EllipsisOutlined, SettingOutlined, StockOutlined, UserOutlined } from "@ant-design/icons/lib/icons";
import { Avatar, Card } from "antd";
import Meta from "antd/es/card/Meta";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "react-circular-progressbar/dist/styles.css";
const points = (location, nationality, age, sex, experiences, educations, skills, sexPref, minAge,country, nationalities) => {
    console.log(location, nationality, age, sex, experiences, skills)
    let totalPoints = 0;
    console.log({nationalities, nationality});
    
    (location ? totalPoints += (location?.id === country?.id ?  5 : 2) : totalPoints += 0);
    (!!nationality ? ( totalPoints += (nationalities)?.find(e => e.id === nationality.id) ? 5: 2  ) : totalPoints += 0);
    (age != null ? totalPoints += ((!minAge || minAge < age) ? 4: 1 ) : totalPoints += 0);
    (sex != null ? totalPoints += ((!sexPref || sexPref === sex) ? 4 : 1) : totalPoints += 0);
    (experiences.length > 0 ? totalPoints += experiences.length / 3 : totalPoints += 0);
    (educations.length > 0 ? totalPoints += educations.length / 3 : totalPoints += 0);
    (skills?.length > 0 ? totalPoints += 2 : totalPoints += 0)
    return totalPoints.toFixed(2)
}
const Page = () => {
    const { user, isCompany, setForceReload, isLoading } = useAuthContext();
    const router = useRouter();
    const param = useSearchParams();
    const idJob = param.get("job")


    const [candidates, setCandidates] = useState<any>();

    useEffect(() => {
        setForceReload((p) => !p);
        const fetchCandidates = async () => {
            const { data } = await axios.get<any>(`/applications?populate[userInfo][fields][0]=firstName&populate[userInfo][fields][1]=lastName&populate[userInfo][fields][2]=gender&populate[userInfo][fields][3]=birthday&populate[userInfo][populate][photo][fields][0]=url&populate[userInfo][populate][residenceCountry][fields][0]=name&populate[userInfo][populate][nationality][fields][0]=name&populate[userInfo][populate][nationality][fields][1]=id&populate[userInfo][populate][skills][fields][0]=name&populate[userInfo][populate][experiences][fields][0]=jobTitle&populate[userInfo][populate][educations][fields][0]=degree&populate[userInfo][populate][user][fields][0]=id&populate[job][fields][0]=title&fields[0]=additionalInfo&filters[job][id][$eq]=${idJob}`);
            const {data: job} = await axios.get('/jobs/'+idJob+"?populate=country,nationalities");
            console.log(job);
            console.log({data});
            
            setCandidates(data.map(can => ({
                ...can,
                points: points(can.userInfo?.residenceCountry, can.userInfo?.nationality, can.userInfo?.birthday, can.userInfo?.gender, can.userInfo?.experiences, can.userInfo?.educations, can.userInfo?.skills, job.genderPerfrence, job.minimumAge,job.country, job.nationalities)
            })).sort((a,b ) => b.points - a.points)
            );
        };
        fetchCandidates();
    }, []);

    if (isLoading || !user) {
        return <h1>Loading</h1>;
    }
    if (!isCompany) {
        router.push("/profile");
        return;
    }
   

    return (
        < div className=" mx-40 my-10 flex  flex-col flex-wrap w-3/2 ">
            <h1 className="m-auto text-xl my-5">Candidates</h1>
            <div className="flex flex-row gap-4 ">
                {candidates?.map((can) => {
                    return (
                        <Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    style={{ height: 200 }}
                                    alt="example"
                                    src={`${BASE_SERVEFR_URL}${can.userInfo?.photo?.url}`}
                                />
                            }
                            actions={[
                                <UserOutlined onClick={() => router.push(`profile/${can.userInfo.user.id}`)} />,
                                <div className="flex  mx-10 gap-5">
                                    <StockOutlined disabled key={"Rate"} /><span >{can.points}</span>
                                </div>
                            ]}
                        >
                            <Meta
                                avatar={<Avatar src={`${BASE_SERVEFR_URL}${can.userInfo?.photo?.url}`} />}
                                title={`${can.userInfo?.firstName} ${can.userInfo?.lastName}`}
                                description={can.job?.title}

                            />
                        </Card>

                    )
                })}
            </div>

        </div>
    )

};
export default Page;
