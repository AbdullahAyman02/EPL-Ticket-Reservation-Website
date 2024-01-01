import { createContext, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({ children }) => {
  let socket = useRef(null);
  socket.current = io("wss://epl-back.onrender.com", {
    transports: ["websocket"],
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
