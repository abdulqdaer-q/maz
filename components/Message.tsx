import React from "react";

interface MessageProps {
  message: string;
  sender: string;
  isSent: boolean;
}

const Message: React.FC<MessageProps> = ({ message, sender, isSent }) => {
  const messageClass = isSent ? "bg-blue-500 text-white" : "bg-gray-200";

  return (
    <div
      className={`flex mb-2 p-2 rounded-md ${
        isSent ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`px-4 py-2 rounded-md ${messageClass}`}>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-gray-500">{sender}</p>
      </div>
    </div>
  );
};

export default Message;
