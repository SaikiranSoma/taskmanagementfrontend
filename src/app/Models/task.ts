export interface Tasks {
    name: string;
    description: string;
    dueDate: string;
    priority: string;
    status: string;
    assignedTo?: string; // Optional field for assignee
  }