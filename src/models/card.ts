export interface Card {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: { title: string; isCompleted: boolean }[];
}
