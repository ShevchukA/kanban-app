import { Card } from "./card";

export interface Column {
  id: string;
  name: string;
  tasks: Card[];
}
