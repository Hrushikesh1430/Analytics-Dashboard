import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [AppDevice, setAppDevice] = useState(0);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  return <DataContext.Provider value={{ AppDevice, setAppDevice, innerWidth, setInnerWidth }}>{children}</DataContext.Provider>;
};
