import { Board } from '../models/board';
import data from './data.json';

const URL =
  'https://my-kanban-e646e-default-rtdb.asia-southeast1.firebasedatabase.app/kanban';

// Queries

export async function getBoards() {
  const res = await fetch(URL + '/boards.json');
  if (!res.ok) {
    throw new Error(`Can't load boards... Network response was not ok`);
  }
  const data = await res.json();
  return data;
}

// export async function getBoard(index: number) {
//   const res = await fetch(`${URL}/boards/${index}.json`);
//   if (!res.ok) {
//     throw new Error(`Can't load board... Network response was not ok`);
//   }
//   const data = await res.json();
//   return data;
// }

// Mutations

export async function resetServerData() {
  const res = await fetch(`${URL}.json`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Can't reset data`);
  }
}

export async function updateBoards(boards: Board[]) {
  const res = await fetch(`${URL}/boards.json`, {
    method: 'PUT',
    body: JSON.stringify(boards),
  });
  if (!res.ok) {
    throw new Error(`Can't update server data`);
  }
  const data = await res.json();
  return data;
}
