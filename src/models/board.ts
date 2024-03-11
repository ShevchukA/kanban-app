import { Column } from "./column";

export interface Board {
  id: number;
  name: string;
  columns: Column[] | null;
}
