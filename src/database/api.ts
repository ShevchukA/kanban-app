import { Board } from '../models/board';
import data from './data.json';

interface Record {
  boards: Board[];
}

//response type JSONBin.io
export interface JSONBinResponse {
  record: Record;
  metadata: {
    id: string;
    private: boolean;
    createdAt: string;
  };
}

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

  // check for empty board list
  if (data.record[0] === null) {
    return [];
  }

  return data.record;
}

// Mutations

export async function updateBoards(boards: Board[]) {
  // prevent blank bin on JSONBin.io
  const updatedBoards = boards.length > 0 ? boards : [null];

  const res = await fetch(URL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'X-Access-Key': ACCESS_KEY,
    },
    body: JSON.stringify(updatedBoards),
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
