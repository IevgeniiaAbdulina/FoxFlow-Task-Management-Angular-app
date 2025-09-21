import { UserInterface } from './user-interface';

export interface TaskData {
  id: string;
  title: string;
  status?: 'todo' | 'in-progress' | 'done';
  assignedTo?: UserInterface[];
  createdAt: Date;
  dueTo?: Date | null;
  description?: string;
}
