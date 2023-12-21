import { createContext, useRef } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

// eslint-disable-next-line react/prop-types
export const SocketContextProvider = ({ children }) => {
  let socket = useRef(null);
  socket.current = io("http://localhost:20396", {
    transports: ["websocket"],
  });

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
