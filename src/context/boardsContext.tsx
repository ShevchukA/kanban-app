import { ReactNode, createContext } from "react";
import data from "../data/data.json";
import { Boards } from "../models/boards";

type BoardContextProviderPropsType = {
  children: ReactNode;
};

const initialState: Boards = {
  boards: [],
};

export const BoardContext = createContext(initialState);

export const BoardContextProvider = ({
  children,
}: BoardContextProviderPropsType) => {
  return <BoardContext.Provider value={data}>{children}</BoardContext.Provider>;
};
