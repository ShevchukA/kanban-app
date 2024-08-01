/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useState, ReactNode, useEffect } from 'react';

interface UiContextType {
  isDarkMode: boolean;
  isSidebarShown: boolean;
  isModalShown: boolean;
  isContentLoaded: boolean;
  activeBoardIndex: number;
  activeModal: ReactNode | null;
  toggleSidebar: () => void;
  toggleDarkMode: () => void;
  openModal: (modal: ReactNode) => void;
  closeModal: () => void;
  selectBoard: (index: number) => void;
  setContentIsLoaded: () => void;
}

interface UiContextProviderProps {
  children: ReactNode;
}

const initialState: UiContextType = {
  isDarkMode: true,
  isSidebarShown: true,
  isModalShown: false,
  isContentLoaded: false,
  activeBoardIndex: 0,
  activeModal: null,
  toggleSidebar: () => {},
  toggleDarkMode: () => {},
  openModal: () => {},
  closeModal: () => {},
  selectBoard: () => {},
  setContentIsLoaded: () => {},
};

export const UiContext = createContext(initialState);

export const UiContextProvider = ({ children }: UiContextProviderProps) => {
  const [isDarkMode, setDarkMode] = useState(true);
  const [isSidebarShown, setSidebarIsShown] = useState(true);
  const [isModalShown, setModalIsShown] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [activeModal, setActiveModal] = useState<ReactNode>(null);
  const [activeBoardIndex, setActiveBoardIndex] = useState(0);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
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

  const selectBoard = (index: number) => {
    setActiveBoardIndex(index);
  };

  const setContentIsLoaded = () => {
    setIsContentLoaded(true);
  };

  return (
    <UiContext.Provider
      value={{
        isDarkMode,
        isSidebarShown,
        isModalShown,
        isContentLoaded,
        activeBoardIndex,
        activeModal,
        toggleSidebar,
        toggleDarkMode,
        openModal,
        closeModal,
        selectBoard,
        setContentIsLoaded,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
