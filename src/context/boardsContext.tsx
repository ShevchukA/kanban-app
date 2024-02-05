import { ReactNode, createContext, useState } from "react";
import { Board } from "../models/board";
// import data from "../data/data.json";

type BoardContextProviderPropsType = {
  children: ReactNode;
};

type initialStateType = {
  boards: Board[];
  updateBoards: (boards: Board[]) => void;
};

const initialState: initialStateType = {
  boards: [],
  updateBoards: () => {},
};

export const BoardContext = createContext(initialState);

export const BoardContextProvider = ({
  children,
}: BoardContextProviderPropsType) => {
  const [boards, setBoards] = useState<Board[]>([]);
  const updateBoards = (boards: Board[]) => {
    setBoards(boards);
  };

  return (
    <BoardContext.Provider
      value={{
        boards: boards,
        updateBoards: updateBoards,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
