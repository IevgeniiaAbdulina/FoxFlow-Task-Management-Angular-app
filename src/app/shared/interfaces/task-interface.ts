import { UserInterface } from './user-interface';

export interface TaskData {
  id: string;
  title: string;
  status?: 'todo' | 'inprogress' | 'done';
  assignedTo?: UserInterface[];
  isCompleted?: boolean;
  createdAt: Date;
  dueTo?: Date | null;
  description?: string;
}
