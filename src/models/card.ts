import { Subtask } from "./subtask";

export interface Card {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
}
