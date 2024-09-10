import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Tasks } from '../../models/task';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent {
 
  
  todo: Tasks[] = [
    { name: 'Development', description: 'Complete feature A', dueDate: '2024-09-10', priority: 'High', status: 'To Do' }
  ];
  inprogress: Tasks[] = [
    { name: 'Testing Project', description: 'Test the application', dueDate: '2024-09-12', priority: 'Medium', status: 'In Progress' }
  ];
  completed: Tasks[] = [
    { name: 'Bug Fix', description: 'Fix bug B', dueDate: '2024-09-05', priority: 'Low', status: 'Completed' }
  ];
  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskDueDate: string = '';
  // Function for drag and drop
  drop(event: CdkDragDrop<Tasks[]>) {
    if (!event.previousContainer.data || !event.container.data) {
      console.error('Data for one of the containers is undefined');
      return;
    }
    if (event.previousContainer === event.container) {
      // Moving within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Moving between different lists
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      // Update the priority and status based on the destination column
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
  // Add new task to specific status
  addTask(status: string) {
    if (this.newTaskName && this.newTaskDescription && this.newTaskDueDate) {
      const newTask: Tasks = {
        name: this.newTaskName,
        description: this.newTaskDescription,
        dueDate: this.newTaskDueDate,
        priority: status === 'todo' ? 'High' : status === 'inprogress' ? 'Medium' : 'Low',
        status: status === 'todo' ? 'To Do' : status === 'inprogress' ? 'In Progress' : 'Completed'
      };
      if (status === 'todo') {
        this.todo.push(newTask);
      } else if (status === 'inprogress') {
        this.inprogress.push(newTask);
      } else if (status === 'completed') {
        this.completed.push(newTask);
      }
      // Clear form fields
      this.newTaskName = '';
      this.newTaskDescription = '';
      this.newTaskDueDate = '';
    }
  }
}
