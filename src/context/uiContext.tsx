import { createContext, useState, ReactNode, useEffect } from "react";

type UiContextType = {
  isDarkMode: boolean;
  isSidebarShown: boolean;
  isModalShown: boolean;
  activeBoardIndex: number;
  activeModal: ReactNode | null;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
  selectBoard: (board: number) => void;
};

type UiContextProviderPropsType = {
  children: ReactNode;
};

const initialState: UiContextType = {
  isDarkMode: true,
  isSidebarShown: true,
  isModalShown: false,
  activeBoardIndex: 0,
  activeModal: null,
  toggleSidebar: () => {},
  toggleDarkMode: () => {},
  openModal: () => {},
  closeModal: () => {},
  selectBoard: () => {},
};

export const UiContext = createContext(initialState);

export const UiContextProvider = ({ children }: UiContextProviderPropsType) => {
  const [isDarkMode, setDarkMode] = useState(true);
  const [isSidebarShown, setSidebarIsShown] = useState(true);
  const [isModalShown, setModalIsShown] = useState(false);
  const [activeModal, setActiveModal] = useState<ReactNode>(null);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);

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
    setSidebarIsShown((prevState) => !prevState);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevState) => !prevState);
  };

  const openModal = (modal: ReactNode) => {
    setActiveModal(modal);
    setModalIsShown(true);
  };

  const closeModal = () => {
    setModalIsShown(false);
  };

  const selectBoard = (board: number) => {
    setActiveBoardIndex(board);
  };

  return (
    <UiContext.Provider
      value={{
        isDarkMode,
        isSidebarShown,
        isModalShown,
        activeBoardIndex,
        activeModal,
        toggleSidebar,
        toggleDarkMode,
        openModal,
        closeModal,
        selectBoard,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
