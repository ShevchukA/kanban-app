import { createContext, useState, ReactNode, useEffect } from "react";

type UiContextType = {
  isDarkMode: boolean;
  isSidebarShown: boolean;
  activeBoard: number;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  selectBoard: (board: number) => void;
};

type UiContextProviderPropsType = {
  children: ReactNode;
};

const initialState: UiContextType = {
  isDarkMode: true,
  isSidebarShown: true,
  activeBoard: 0,
  toggleSidebar: () => {},
  toggleDarkMode: () => {},
  selectBoard: () => {},
};

export const UiContext = createContext(initialState);

export const UiContextProvider = ({ children }: UiContextProviderPropsType) => {
  const [isDarkMode, setDarkMode] = useState(true);
  const [isSidebarShown, setSidebarShown] = useState(true);
  const [activeBoard, setActiveBoard] = useState(0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setSidebarShown((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const selectBoard = (board: number) => {
    setActiveBoard(board);
  };

  return (
    <UiContext.Provider
      value={{
        isDarkMode: isDarkMode,
        isSidebarShown: isSidebarShown,
        activeBoard: activeBoard,
        toggleSidebar: toggleSidebar,
        toggleDarkMode: toggleDarkMode,
        selectBoard: selectBoard,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};