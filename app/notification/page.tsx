import { StaticImageData } from "next/image";
import React from "react";
import Birawi from "../../assets/birawi.jpg";
import Qassab from "../../assets/qssab.jpg";
import Khair from "../../assets/khair.jpg";
import NotificationCard from "@/components/NotificationCard";
import NotificationSideBar from "@/components/NotificationSideBar";

const Notification = () => {
  type notification = {
    name: string;
    photo: StaticImageData;
    description: string;
    date: string;
  }[];
  const notification: notification = [
    {
      name: "abdulsalam albirawi",
      date: "May 22,2023",
      description: "send you a connection requast",
      photo: Birawi,
    },
    {
      name: "abdulqader qassab",
      date: "May 22,2023",
      description: "send you a connection requast",
      photo: Qassab,
    },
    {
      name: "mohammad khair",
      date: "May 22,2023",
      description: "send you a connection requast",
      photo: Khair,
    },
  ];
  return (
    <div className="w-full lg:h-screen md:h-full flex  bg-slate-100">
      <div className="w-[20%] md:hidden lg:block sm:hidden">
        <NotificationSideBar />
      </div>
      <div className="bg-white py-5 m-10  w-[80%] h-fit rounded-lg  shadow-sm  ">
        <div className="border-b-2 w-full border-gray-300 px-3">
          <p className="text-xl font-semibold  mb-5">Notification</p>
        </div>
        <div className="flex w-full flex-col">
          {notification.map((item, idx) => (
            <NotificationCard
              key={idx}
              name={item.name}
              photo={item.photo}
              date={item.date}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notification;
