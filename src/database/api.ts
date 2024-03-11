import { Board } from "../models/board";
import data from "./data.json";

const URL =
  "https://my-kanban-e646e-default-rtdb.asia-southeast1.firebasedatabase.app/kanban";

export async function getBoardsList() {
  const res = await fetch(URL + "/boards.json");
  if (!res.ok) {
    throw new Error(`Can't load boards... Network response was not ok`);
  }
  const data = await res.json();
  return data;
}

export async function getBoard(index: number) {
  const res = await fetch(`${URL}/boards/${index}.json`);
  if (!res.ok) {
    throw new Error(`Can't load board... Network response was not ok`);
  }
  const data = await res.json();
  return data;
}

// Mutations

export async function resetServerData() {
  const res = await fetch(
    "https://my-kanban-e646e-default-rtdb.asia-southeast1.firebasedatabase.app/kanban.json",
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
  if (!res.ok) {
    throw new Error(`Can't reset data`);
  }
}

export async function addNewBoard(board: Board) {
  const res = await fetch(`${URL}/boards/${board.id}.json`, {
    method: "PUT",
    body: JSON.stringify(board),
  });
  if (!res.ok) {
    throw new Error(`Can't add new board. Try later...`);
  }
}