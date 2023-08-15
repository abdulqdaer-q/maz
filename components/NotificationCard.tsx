import Image, { StaticImageData } from "next/image";
import React from "react";

type props = {
  name: string;
  photo: StaticImageData;
  description: string;
  date: string;
};

const NotificationCard = ({ name, photo, description, date }: props) => {
  return (
    <div className="w-full bg-transparent px-3 border-b hover:bg-gray-100 cursor-pointer  border-gray-300 flex">
      <div className="lg:w-[5%] md:w-full">
        <Image
          width={700}
          height={700}
          alt="profile"
          src={photo.src}
          className="rounded-full mt-4 w-16 h-16 "
        />
      </div>
      <div className="m-5 lg:w-[95%] md:w-full">
        <p className="text-base font-bold mb-2">{name}</p>
        <div className="flex justify-between">
          <p className="text-base font-normal ">{description}</p>

          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
