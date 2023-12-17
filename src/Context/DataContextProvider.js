import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [count, setCount] = useState(0);
  return <DataContext.Provider value={{ count, setCount }}>{children}</DataContext.Provider>;
};
