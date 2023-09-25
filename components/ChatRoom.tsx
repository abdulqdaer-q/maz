"use client";
import React, { useState, useEffect, useRef } from "react";

import Message from "./Message";
import Sidebar from "./ChatRoomSideBar";
import { useAuthContext } from "@/contexts/AuthContext";

import { useParams, usePathname, useRouter,useSelectedLayoutSegment } from "next/navigation";
import { axios } from "@/utils/axios";
import { message } from "antd";
import { useSocketContext } from "@/contexts/SocketContext";


// Change URL as needed

type Message = {
  message: string;
  sender: string;
  isSent: boolean;
};
const ChatRoom: React.FC = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [_receiver, setReceiver] = useState<number>();
  const {sendMessage, chats} = useSocketContext();
  const [messages, setMessages] = useState<
    { chat: string; message: string; sender: string; isSent: boolean }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const params = useParams();
  useEffect(() => {
    setActiveChat( +window?.location?.hash?.split("#@")?.[1] || 0)
  }, [params])
  
  const [activeChat, setActiveChat] = useState<number | null>( (typeof window!=='undefined') ? +window?.location?.hash?.split("#@")?.[1] : null);
  console.log({activeChat});
  
  const [selectedChat, setSelectedChat] = useState<{
    name: string;
    image: string;
  } | null>(null);
  const [chatMessages, setChatMessages] = useState<{
    [chatName: number]: Message[];
  }>({});
  const ref = useRef();
  useEffect(() => {
    if (!activeChat || !user) {
      return;
    }
    const fetcher = async () => {
      const { data } = await axios.get("/messages?sort=id:asc&populate[sender][fields][0]=id&populate[chat][fields][0]=id&filters[chat][id][$eq]="+activeChat);

      
      setMessages(data.map (e => ({
        message: e.message,
        createdAt: e.createdAt,
        isSent: e.sender!.id === user!.id,
        id: e.id
      })));
      
    };
    fetcher();
  }, [activeChat, user]);

  const handleSendMessage = () => {
    if (!activeChat) return;
    sendMessage( {
        sender: user?.id,
        message: inputMessage,
        chat: activeChat,
        receiver: _receiver
    });

    setInputMessage("");
  };
  useEffect(() => {
    if (!activeChat || !chats || !user) {
      return;
    }
    setMessages(msgs => {
      const nowMessages = (chats?.[activeChat] || []).map(e => ({...e, isSent: e.sender === user.id}));
      const uniqueIds = {};
      const total = msgs.concat(nowMessages);
      const uniqueArray = total.filter(obj => {
        if (!uniqueIds[obj.id]) {
          uniqueIds[obj.id] = true;
          return true;
        }
        return false;
      });
      return uniqueArray;
    })
  }, [chats, activeChat, user])
  const handleChatSelect = async (
    chat: number,
    image: string,
    name: string,
    receiver: number
  ) => {
    if (!user) {
      message.error("Please Log in");
      return;
    }
    setReceiver(receiver)
    setActiveChat(chat);
    setSelectedChat({ name, image });
    router.push("#@" + chat);
    
  };

  return (
    <div className="flex h-full w-full ">
      <Sidebar
        /* chats={[
          { name: "Birawi", image: Birawi.src },
          { name: "Khair", image: Khair.src },
          // ... Add more chats with names and image paths
        ]} */
        activeChat={activeChat}
        onChatSelect={(chatName, chatImage, v, t) =>
          handleChatSelect(chatName, chatImage, v, t)
        }
      />
      <div className="w-3/4  border-l p-4">
        {selectedChat && (
          <div className=" flex gap-3">
            <img
              src={selectedChat.image}
              alt={selectedChat.name}
              className="w-12 h-12 rounded-full mb-2"
            />
            <h2 className="text-lg mt-2 font-semibold">{selectedChat.name}</h2>
          </div>
        )}
        <div className=" h-[790px] overflow-y-auto">
          {messages.map((messageObj: any, index: any) => (
            <Message
              isLast={index === messages.length - 1}
              key={index}
              message={messageObj.message}
              sender={messageObj.createdAt}
              isSent={messageObj.isSent}
            />
          ))}
        </div>
        <div className="mt-4 flex">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-grow p-2 border rounded-l-md"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
