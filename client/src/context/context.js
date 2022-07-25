import React, { useContext, createContext, useState, useEffect } from "react";

const AppContext = createContext();
const user = JSON.parse(localStorage.getItem("user"));

const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(user);
  const [forLoadHomePage, setForLoadHomePage] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        forLoadHomePage,
        setForLoadHomePage,
        setFile,
        file,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
