import { BASE_SERVEFR_URL } from "@/utils/constant";
import { DollarOutlined } from "@ant-design/icons";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

type props = {
    id: number;
    title: string;
    companyName: string;
    location: string;
    maxsalary: number;
    minsalary: number;
    time: string;
    description: string;
    onApply: any
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
    onApply,
}: props) {
    return (

        <div className="w-full p-5 hover:bg-slate-50  border-gray-10 border ">
            <h1 className="font-semibold text-xl text-primary mb-3">{title}</h1>
            <p className=" font-semibold  text-sm  mb-3">{companyName}  <span className=" text-gray-400  font-light"> . {location}</span></p>
            <p className="    mb-3 line-clamp-2 ">{description}</p>
            <p className=" text-gray-900"><DollarOutlined className="mr-2" /> ${minsalary} - ${maxsalary}</p>
            <div className="flex justify-between items-center py-5">
                <p className=" text-gray-400 text-sm">{time}</p>
                <Button type="primary" className="  font-bold text-sm" onClick={onApply}>Apply</Button>
            </div>

        </div>
    );
}

export default JobCard;
