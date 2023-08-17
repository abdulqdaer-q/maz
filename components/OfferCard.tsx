import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React from "react";
import { BASE_SERVEFR_URL } from "@/utils/constant";
type propsType = {
  id: number;
  jobTitle: string;
  companyImg: StaticImageData | string;
  companyName:string
  publisherName: string;
  salary: number;
};

const OfferCard = ({
  id,
  jobTitle,
  companyImg,
  companyName,
  publisherName,
  salary,
}: propsType) => {
  return (
    <Link href={`offer-service/${id}`}>
      <div className="max-w-xs bg-white border border-gray-200 rounded-lg shadow">
        <a href="#">
          <Image
            width={500}
            height={500}
            className="rounded-t-lg h-28 object-cover w-full "
            src={BASE_SERVEFR_URL+companyImg}
            alt=""
          />
        </a>
        <div className="p-2">
          <a href="#">
            <h5 className="mb-2 text-base font-bold tracking-tight text-gray-900 ">
              {jobTitle}
            </h5>
          </a>
          <div className=" pb-4  flex flex-row gap-3 items-end">
            <p  className="text-[14px] ">{companyName}</p>
            <p className="text-[14px] ">{publisherName}</p>
          </div>

          <div className=" pt-4 font-light text-[14px]  border-t-2 border-gray-600 flex flex-row gap-3 justify-between items-center">
            <p> {jobTitle}</p>
            <p className="text-sky-500">{salary}$</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OfferCard;
