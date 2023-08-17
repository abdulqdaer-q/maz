"use client";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Message from "./Message";
import Sidebar from "./ChatRoomSideBar";
import Birawi from "../assets/birawi.jpg";
import Khair from "../assets/khair.jpg";

const socket = io("http://localhost:3001");

// Change URL as needed

type Message = {
  message: string;
  sender: string;
  isSent: boolean;
};
const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<
    { chat: string; message: string; sender: string; isSent: boolean }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<{
    name: string;
    image: string;
  } | null>(null);
  const [chatMessages, setChatMessages] = useState<{
    [chatName: string]: Message[];
  }>({});

  useEffect(() => {
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
  }, []);

  const handleSendMessage = () => {
    if (!activeChat) return;

    socket.emit("chat-message", { chat: activeChat, message: inputMessage });
    console.log('s');
    
    setChatMessages((prevChatMessages) => ({
      ...prevChatMessages,
      [activeChat]: [
        ...(prevChatMessages[activeChat] || []),
        { message: inputMessage, sender: "You", isSent: true },
      ],
    }));
    setInputMessage("");
  };
  const handleChatSelect = (chat: string, image: string) => {
    setActiveChat(chat);
    setSelectedChat({ name: chat, image });
  };

  return (
    <div className="flex h-full w-full ">
      <Sidebar
        chats={[
          { name: "Birawi", image: Birawi.src },
          { name: "Khair", image: Khair.src },
          // ... Add more chats with names and image paths
        ]}
        activeChat={activeChat}
        onChatSelect={(chatName, chatImage) =>
          handleChatSelect(chatName, chatImage)
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
          {chatMessages[activeChat || ""]?.map(
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
