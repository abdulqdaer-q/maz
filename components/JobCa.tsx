import { BASE_SERVEFR_URL } from "@/utils/constant";
import { DollarOutlined } from "@ant-design/icons";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

type props = {
    id: string;
    title: string;
    companyName: string;
    location: string;
    maxsalary: string;
    minsalary: string;
    time: string;
    description: string;
};

function JobCard({
    id,
    title,
    companyName,
    location,
    maxsalary,
    minsalary,
    time,
    description,
}: props) {
    return (
        <Link href={`offer-job/${id}`}>
            <div className="w-full p-5 hover:bg-slate-50  border-gray-500 border ">
                <h1 className="font-semibold text-xl text-primary mb-3">{title}</h1>
                <p className=" font-semibold  text-sm  mb-3">{companyName}  <span className=" text-gray-400  font-light"> . {location}</span></p>
                <p className="   truncate mb-3 ">{description}</p>
                <p className=" text-gray-900"><DollarOutlined className="mr-2" /> ${minsalary} - ${maxsalary}</p>
                <div className="flex justify-between items-center py-5">
                    <p className=" text-gray-400 text-sm">{time}</p>
                    <Button type="primary" className="  font-bold text-sm">Apply</Button>
                </div>

            </div>
        </Link>
    );
}

export default JobCard;
