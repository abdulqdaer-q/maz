import React from "react";

interface Chat {
  name: string;
  image: string;
}

interface SidebarProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (chat: string, image: string) => void; // Update the type
}

const Sidebar: React.FC<SidebarProps> = ({
  chats,
  activeChat,
  onChatSelect,
}) => {
  return (
    <div className="w-1/4 bg-white h-screen p-2">
      <h2 className="text-3xl font-semibold p-2  mb-4">Chats</h2>
      <div className="h-[2px] bg-gray-200 w-full" />
      <ul>
        {chats.map((chat) => (
          <li
            key={chat.name}
            className={` mt-5 cursor-pointer ${
              activeChat === chat.name ? "bg-blue-200 rounded-md" : ""
            }`}
            onClick={() => onChatSelect(chat.name, chat.image)}
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
