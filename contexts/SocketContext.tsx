
import { createContext, useContext } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
type SocketContextType = {
  onlineUsers : string[]
  sendMessage: (x: any) => void,
  setForceReload: React.Dispatch<React.SetStateAction<boolean>>
  chats: any

};
export const SocketContext = createContext<SocketContextType>({
  onlineUsers: [],
  sendMessage: ({}) => {},
  setForceReload: () => {},
  chats: {}
  
});

export const useSocketContext = () => useContext(SocketContext);
