"use client";
import React, { useEffect, useState } from "react";
import { getToken } from "../../utils/helper";


import { SocketContext } from "@/contexts/SocketContext";
import { io } from "socket.io-client";

type Props = {
  children?: React.ReactNode;
};
const SocketProvider = ({ children }: Props) => {
  const [reload, setForceReload] = useState(false);
  const [isConnecting, setConnecting] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [socket, setSocket] = useState(io('http://localhost:1337', {
    autoConnect: false
  }));
  const [chats, setChats] = useState<any>({});
  const hadnleSocketConnection = ( ) => {
    setConnecting(false);
  }
  const handleOnlineUsersChange = (users: string[]) => {
    setOnlineUsers(users)
  }
  const sendMessage = (details: {chat: number, from: number, message: string, createdAt: Date}) => {
    socket.emit('message', {body: details})
  };
  const handleMessageReceive = (details: {chat: number, from: number, message: string}) => {
    
    setChats((chs) => {
      if (!chs[details.chat]) {
        chs[details.chat] = []
      }
      
      chs[details.chat].push(details);
      return {...chs};
    })
  };
  useEffect(() => {
    const authToken = getToken();
    if (!authToken) {
      setConnecting(false);
      return;
    };
    
    socket.auth = {authToken};
    socket.connect();
    setSocket(socket);
    socket.on('connect', hadnleSocketConnection)
    socket.on('online-users', handleOnlineUsersChange);
    socket.on('message', handleMessageReceive);

    return () => {
      socket.disconnect();
      socket.off('online-users')
      socket.off('connect')
    }
    
  }, [reload]);

  if (isConnecting) {
    return <h1>Signing in</h1>
  }
  
  return (
    <SocketContext.Provider
      value={{
        onlineUsers,
        sendMessage,
        setForceReload,
        chats
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
