import { MemberInterface } from './member-interface';

export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface TaskData {
  id: string;
  title: string;
  status: TaskStatus;
  assignedTo?: MemberInterface[];
  createdAt: Date;
  dueTo?: Date | null;
  description?: string;
}
