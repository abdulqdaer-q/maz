import React, { useEffect, useRef } from "react";

interface MessageProps {
  message: string;
  sender: string;
  isSent: boolean;
  ref?: any;
  isLast: boolean;
}

const Message: React.FC<MessageProps> = ({ message, sender, isSent,isLast }) => {
  const messageClass = isSent ? "bg-blue-500 text-white" : "bg-gray-200";
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    console.log(ref.current);
    
    if (ref.current && isLast) {
      ref.current.scrollTo();
      //ref.current.scrollTop = ref.current.clientHeight * 2;
    }
  },[ref])
  return (
    <div
      ref={ref}
      className={`flex mb-2 p-2 rounded-md ${
        isSent ? "justify-end" : "justify-start"
      }`}
    >
      <div className={`px-4 py-2 rounded-md ${messageClass}`}>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-green-600">{sender}</p>
      </div>
    </div>
  );
};

export default Message;
