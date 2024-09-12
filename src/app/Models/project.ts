import { Tasks } from './task'; // Import the Tasks interface

export interface Project {
  projectId?: number;
  projectName: string;
  projectDescription: string;
  tasks?: Tasks[]; // Add the tasks array here
}
