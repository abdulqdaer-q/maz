"use client";
import React, { useState, useEffect } from "react";

import Message from "./Message";
import Sidebar from "./ChatRoomSideBar";
import { useAuthContext } from "@/contexts/AuthContext";
import { socket } from "@/app/layout";
import { useRouter } from "next/navigation";
import { axios } from "@/utils/axios";
import { message } from "antd";




// Change URL as needed

type Message = {
  message: string;
  sender: string;
  isSent: boolean;
};
const ChatRoom: React.FC = () => {
  const router = useRouter();
  const {user} = useAuthContext();
  const [messages, setMessages] = useState<
    { chat: string; message: string; sender: string; isSent: boolean }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [selectedChat, setSelectedChat] = useState<{
    name: string;
    image: string;
  } | null>(null);
  const [chatMessages, setChatMessages] = useState<{
    [chatName: number]: Message[];
  }>({});

  /* useEffect(() => {
    socket.on(
      "chat-message-t",
      ({ chat, message }: { chat: string; message: string }) => {
        setChatMessages((prevChatMessages) => ({
          ...prevChatMessages,
          [chat]: [
            ...(prevChatMessages[chat] || []),
            { message, sender: "Other User", isSent: false },
          ],
        }));
      }
    );
  }, []); */
  useEffect( () => {
    if (!user) {
      console.log('a7a');
      return;
    }
    const fetcher=  async () => {
      const {data} = await axios.get('/messages')
    };
    fetcher();
    socket.on('message', ({from, activeChat ,message}) => {
        setChatMessages((prevChatMessages) => ({
          ...prevChatMessages,
          [activeChat!]: [
            ...(prevChatMessages[activeChat!] || []),
            { message: message, sender: from === user!.email ? 'You': user!.email, isSent: from === user!.email },
          ],
        }));
      
    });
    return () => socket.off('message')

  }, [activeChat]);

  const handleSendMessage = () => {
    if (!activeChat) return;

    socket.emit("message", { from: user?.email, message: inputMessage, activeChat});
    
    
    setInputMessage("");
  };
  const handleChatSelect = async (chat: number, image: string, name: string) => {
    if (!user) {
      message.error('Please Log in');
      return;
    }
    const user1 = Math.min(chat, user.id);
    const user2 = Math.max(chat, user.id);
    let chatId = 0;
   /*  const {data} = await axios.get(`/chats?populate[user1][fields][0]=id&populate[user2][fields][0]=id&filters[user1][id][$eq]=${user1}&filters[user2][id][$eq]=${user2}`)
    if (data.length > 0 ){
      chatId = data[0].id;
    }
    else {
     const {data: returnedChat} = await axios.post('/chats', {
      data: {
        user1, user2
      }
     });
     chatId = returnedChat;
     
    } */
    setActiveChat(chat);
    setSelectedChat({ name, image });
    router.push('#@'+chat)
    
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
        onChatSelect={(chatName, chatImage, v) =>
          handleChatSelect(chatName, chatImage, v )
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
          {chatMessages[activeChat || 0]?.map(
            (messageObj: any, index: any) => (
              <Message
                key={index}
                message={messageObj.message}
                sender={messageObj.sender}
                isSent={messageObj.isSent}
              />
            )
          )}
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
