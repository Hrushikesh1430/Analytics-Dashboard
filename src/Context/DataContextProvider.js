import { createContext, useState } from "react";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const [AppDevice, setAppDevice] = useState(0);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  const [authtoken, setAuthtoken] = useState("");

  const checkLocalStorage = async () => {
    if (localStorage.getItem("chartAnalytics")) {
      let token = localStorage.getItem("chartAnalytics");
      setAuthtoken(JSON.parse(token));
    }
  };
  return (
    <DataContext.Provider value={{ AppDevice, setAppDevice, innerWidth, setInnerWidth, checkLocalStorage, authtoken, setAuthtoken }}>
      {children}
    </DataContext.Provider>
  );
};
