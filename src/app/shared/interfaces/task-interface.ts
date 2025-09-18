export interface TaskData {
  id: string;
  title: string;
  //status: 'todo' | 'inprogress' | 'done';
  //assignedTo?: string;
  isCompleted?: boolean;
  createdAt: Date;
}
