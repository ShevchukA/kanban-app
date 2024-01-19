import { createContext, useState, ReactNode } from "react";

type UiContextType = {
  isDarkMode: boolean;
  isSidebarShown: boolean;
  activeBoard: string;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  selectBoard: (board: string) => void;
};

type UiContextProviderPropsType = {
  children: ReactNode;
};

const initialState: UiContextType = {
  isDarkMode: true,
  isSidebarShown: true,
  activeBoard: "",
  toggleSidebar: () => {},
  toggleDarkMode: () => {},
  selectBoard: () => {},
};

export const UiContext = createContext(initialState);

export const UiContextProvider = ({ children }: UiContextProviderPropsType) => {
  const [isDarkMode, setDarkMode] = useState(true);
  const [isSidebarShown, setSidebarShown] = useState(true);
  const [activeBoard, setActiveBoard] = useState("");

  const toggleSidebar = () => {
    setSidebarShown((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const selectBoard = (board: string) => {
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
