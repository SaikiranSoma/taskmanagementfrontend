import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/create-project.service';

import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Project } from '../../Models/project';
import { Tasks } from '../../Models/task';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.css']
})
export class MyProjectsComponent implements OnInit {
  projectId!: number;
  todo: Tasks[] = [];
  inprogress: Tasks[] = [];
  completed: Tasks[] = [];

  constructor(private route: ActivatedRoute, private projectService: ProjectService) {}

  ngOnInit(): void {
    // Get the project ID from the route parameters
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Load the tasks for the selected project
    this.loadProjectTasks();
  }

  // Load tasks for the selected project
  loadProjectTasks(): void {
    this.projectService.getAllProjectsAndTasks().subscribe(
      (projects: Project[]) => {
        const project = projects.find(p => p.projectId === this.projectId);
  
        if (project && project.tasks) {
          project.tasks.forEach(task => {
            const formattedTask: Tasks = {
              taskName: task.taskName, // Map backend field 'taskName' to 'name'
              taskDescription: task.taskDescription, // Map 'taskDescription' to 'description'
              dueDate: task.dueDate,
              priority: this.mapPriority(task.status), // Map the status to priority
              status: this.mapStatus(task.status), // Handle status mapping
              assignedTo: task.assignedTo // Optional, if it exists in backend
            };
  
            // Push the task into the correct array based on status
            if (task.status === 'Todo') {
              this.todo.push(formattedTask);
            } else if (task.status === 'InProgress') {
              this.inprogress.push(formattedTask);
            } else if (task.status === 'Completed') {
              this.completed.push(formattedTask);
            }
          });
        }
      },
      (error) => {
        console.error('Error loading project tasks', error);
      }
    );
  }
  
  // Optional helper method to map status to priority
  mapPriority(status: string): string {
    if (status === 'Todo') return 'High';
    if (status === 'InProgress') return 'Medium';
    if (status === 'Completed') return 'Low';
    return 'Low'; // Default priority
  }
  
  // Optional helper method to map status
  mapStatus(status: string): string {
    if (status === 'Todo') return 'To Do';
    if (status === 'InProgress') return 'In Progress';
    if (status === 'Completed') return 'Completed';
    return 'Unknown'; // Default status if not matched
  }
  

  // Drag and drop functionality (same as before)
  drop(event: CdkDragDrop<Tasks[]>) {
    if (!event.previousContainer.data || !event.container.data) {
      console.error('Data for one of the containers is undefined');
      return;
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

      const task = event.container.data[event.currentIndex];
      if (event.container.id === 'todo') {
        task.priority = 'High';
        task.status = 'To Do';
      } else if (event.container.id === 'inprogress') {
        task.priority = 'Medium';
        task.status = 'In Progress';
      } else if (event.container.id === 'completed') {
        task.priority = 'Low';
        task.status = 'Completed';
      }
    }
  }
}
