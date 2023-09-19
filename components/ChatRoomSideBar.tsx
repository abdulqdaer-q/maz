import { socket } from "@/app/layout";
import { useAuthContext } from "@/contexts/AuthContext";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { axios } from "@/utils/axios";
import React, { useEffect, useState } from "react";

interface Chat {
  name: string;
  image: string;
  id: number;
}

interface SidebarProps {
  //chats: Chat[];
  activeChat: number | null;
  onChatSelect: (chat: number, image: string, name: string) => void; // Update the type
}

const Sidebar: React.FC<SidebarProps> = ({ activeChat, onChatSelect }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      const fetcher = async () => {
        const { data } = await axios.get(
          `/chats?filters[$or][0][user1][id][$eq]=${user.id}&filters[$or][1][user2][id][$eq]=${user.id}&populate[user1][fields][0]=id&populate[user1][populate][company][fields][0]=companyName&populate[user1][populate][userInfo][fields][0]=firstName&populate[user1][populate][userInfo][fields][1]=lastName&populate[user1][populate][userInfo][populate][photo][fields][0]=url&populate[user2][fields][0]=id&populate[user2][populate][company][fields][0]=companyName&populate[user2][populate][userInfo][fields][0]=firstName&populate[user2][populate][userInfo][fields][1]=lastName&populate[user2][populate][userInfo][populate][photo][fields][0]=url`
        );

        setChats(
          data.map((e) => {
            const user1 = e.user1.id;
            if (user1 === user.id) {
              return {
                name: !!e.user2.userInfo
                  ? e.user2?.userInfo?.firstName +
                    " " +
                    e.user2?.userInfo?.lastName
                  : e.user2.company.companyName,
                image: !!e.user2.userInfo
                  ? getPhotoLink(e.user2.userInfo.photo.url)
                  : "https://fintechng.org/portal/assets/img/logo-default.svg",
                id: e.id,
              };
            } else {
              return {
                name: !!e.user1.userInfo
                  ? e.user1?.userInfo?.firstName +
                    " " +
                    e.user1?.userInfo?.lastName
                  : e.user1.company.companyName,
                image: !!e.user1.userInfo
                  ? getPhotoLink(e.user1.userInfo.photo.url)
                  : "https://fintechng.org/portal/assets/img/logo-default.svg",
                id: e.id,
              };
            }
          })
        );
      };
      fetcher();
    }
  }, [user]);
  useEffect(() => {
    socket.on("online-users", (data) => {
      setChats(data.filter((e) => e.id !== user?.id));
    });
  }, [chats, user]);
  return (
    <div className="w-1/4 bg-white h-screen p-2">
      <h2 className="text-3xl font-semibold p-2  mb-4">Chats</h2>
      <div className="h-[2px] bg-gray-200 w-full" />
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={` mt-5 cursor-pointer ${
              activeChat === chat.id ? "bg-blue-200 rounded-md" : ""
            }`}
            onClick={() => onChatSelect(chat.id, chat.image, chat.name)}
          >
            <div className="flex p-5 rounded-md  items-center">
              <img
                src={chat.image}
                alt={`${chat.name} Chat`}
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-black ml-5 text-xl font-semibold">
                {chat.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
