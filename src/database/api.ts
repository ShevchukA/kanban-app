import { Board } from '../models/board';
import data from './data.json';

const URL = 'https://api.jsonbin.io/v3/b/66ac4f3bad19ca34f8904051';

const ACCESS_KEY =
  '$2a$10$KnfxyrKeEXoDUTQQK5xRieuDPVoRhbcGtF5rWHJRWR4GNNmXlmtZa';

// Queries

export async function getBoards() {
  const res = await fetch(URL, {
    method: 'GET',
    headers: {
      'X-Access-Key': ACCESS_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Can't load boards... Network response was not ok`);
  }

  const data = await res.json();

  return data.record;
}

// Mutations

export async function updateBoards(boards: Board[]) {
  const res = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': ACCESS_KEY,
    },
    body: JSON.stringify(boards),
  });
  if (!res.ok) {
    throw new Error(`Can't update server data`);
  }

  const data = await res.json();

  return data.record;
}

export async function resetServerData() {
  const res = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': ACCESS_KEY,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Can't reset data`);
  }
}
