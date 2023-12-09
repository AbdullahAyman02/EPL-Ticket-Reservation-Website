import { createContext } from "react";
import { useState } from "react";

export const ReserveContext = createContext();

// eslint-disable-next-line react/prop-types
export const ReserveContextProvider = ({ children }) => {
  const [toReserve, setToReserve] = useState([]);
  return (
    <ReserveContext.Provider value={{ toReserve, setToReserve }}>
      {children}
    </ReserveContext.Provider>
  );
};
