export interface Tasks {
  taskId?: number;
  taskName: string; // Change 'name' to 'taskName'
  taskDescription: string; // Change 'description' to 'taskDescription'
  dueDate: string;
  priority: string;
  status: string;
  assignedTo?: string;
}
