
import { useAuthContext } from "@/contexts/AuthContext";
import { useSocketContext } from "@/contexts/SocketContext";
import { getPhotoLink } from "@/lib/getPhotoLink";
import { User } from "@/types/User";
import { axios } from "@/utils/axios";
import { PlusOutlined } from "@ant-design/icons";
import { Button, message, Modal, Select } from "antd";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Chat {
  name: string;
  image: string;
  id: number;
  userId: number;
  isOnline?: boolean;
}

interface SidebarProps {
  //chats: Chat[];
  activeChat: number | null;
  onChatSelect: (chat: number, image: string, name: string, receiver: number) => void; // Update the type
}

const Sidebar: React.FC<SidebarProps> = ({ activeChat, onChatSelect }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const {onlineUsers, } = useSocketContext();
  const { user } = useAuthContext();
  const [users, setUsers] = useState<User[]>([]);
  const [relodChats, setReloadChats] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    
    
    if (user) {
      const fetcher = async () => {
        const { data } = await axios.get<Chat[]>(
          `/chats?filters[$or][0][user1][id][$eq]=${user.id}&filters[$or][1][user2][id][$eq]=${user.id}&populate[user1][fields][0]=id&populate[user1][populate][company][fields][0]=companyName&populate[user1][populate][userInfo][fields][0]=firstName&populate[user1][populate][userInfo][fields][1]=lastName&populate[user1][populate][userInfo][populate][photo][fields][0]=url&populate[user2][fields][0]=id&populate[user2][populate][company][fields][0]=companyName&populate[user2][populate][userInfo][fields][0]=firstName&populate[user2][populate][userInfo][fields][1]=lastName&populate[user2][populate][userInfo][populate][photo][fields][0]=url&sort=id:desc`
        );
        const online = onlineUsers.map(e => +e).filter((e) => e !== user?.id);
        console.log({online});
        
        const chats = 
          data.map((e) => {
            const user1 = e.user1.id;
            
            
            if (user1 === user.id) {
              return {

                isOnline: online.findIndex((x) => e.user2.id === x)!==-1,
                name: !!e.user2.userInfo
                  ? e.user2?.userInfo?.firstName +
                    " " +
                    e.user2?.userInfo?.lastName
                  : e.user2.company?.companyName,
                image: !!e.user2.userInfo
                  ? getPhotoLink(e.user2.userInfo.photo?.url)
                  : "https://fintechng.org/portal/assets/img/logo-default.svg",
                id: e.id,
                userId: e.user2.id,
              };
            } else {
              return {
                isOnline: online.findIndex((x) => e.user1.id === x)!==-1,
                name: !!e.user1.userInfo
                  ? e.user1?.userInfo?.firstName +
                    " " +
                    e.user1?.userInfo?.lastName
                  : e.user1.company?.companyName,
                image: !!e.user1.userInfo
                  ? getPhotoLink(e.user1.userInfo.photo?.url)
                  : "https://fintechng.org/portal/assets/img/logo-default.svg",
                id: e.id,
                userId: e.user1.id,
              };
            }
          }).sort((a, b) => b.isOnline ? 1 : 0 - (a.isOnline? 1: 0))
         
          
          setChats(chats);
          if (firstRender) {
            setFirstRender(false);
            const f = chats.find(e => e.id === activeChat);
            console.log({f});
            
            if (f)
            onChatSelect(f.id, f.image, f.name, f.userId)
          }
      };
      fetcher();
      const x = setInterval(() => {
        fetcher();
      }, 15000)
      return () => clearInterval(x); 
    }
  }, [user, relodChats]);
  useEffect(() => {
    const fetcher = async () => {
      const { data } = await axios.get("/users?populate=userInfo,company");
      setUsers(data);
    };
    fetcher();
  }, []);

 
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(-1);

  return (
    <div className="w-1/4 bg-white h-screen p-2">
      {!!user?.id && (
        <Modal
          title="New Chat"
          open={open}
          onOk={async () => {
            if (selectedUser === -1) {
              message.error("please select a user to chat with");
              return;
            }
            if (!user?.id) {
              message.error("please login");
              return;
            }
            const user1 = Math.min(selectedUser, user.id);
            const user2 = Math.max(selectedUser, user.id);
            const { data } = await axios.post("/chats", {
              data: {
                user1,
                user2,
              },
            });
            setReloadChats((e) => !e);
            setOpen(false);
            /* onChatSelect(
              data.id,
              "",
              users.find((e) => e.id === selectedUser)?.email
            ); */
          }}
          onCancel={() => {
            setOpen(false);
          }}
        >
          <Select
            className="!w-full"
            onChange={(e) => {
              setSelectedUser(e);
            }}
            showSearch
            optionFilterProp="label"
            options={users
              .filter(
                (e) =>
                  !chats.some((ch) => ch.userId === e.id) && e.id !== user.id
              )
              .map((e) => ({
                label: !!e.userInfo
                  ? e.userInfo.firstName + " " + e.userInfo.lastName
                  : e.company?.companyName,
                value: e.id,
              }))}
          ></Select>
        </Modal>
      )}
      <div className="flex justify-between">
        <h2 className="text-3xl font-semibold p-2  mb-4">Chats</h2>
        <Button
          icon={<PlusOutlined />}
          onClick={() => {
            setOpen(true);
          }}
        ></Button>
      </div>
      <div className="h-[2px] bg-gray-200 w-full" />
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={` mt-5 cursor-pointer ${
              chat.isOnline ? "!border-[#008000] border-2" : ""
            } ${
              (activeChat) === chat.id ? "bg-blue-200 rounded-md" : ""
            }`}
            onClick={() => onChatSelect(chat.id, chat.image, chat.name, chat.userId)}
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
