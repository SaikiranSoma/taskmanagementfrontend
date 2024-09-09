import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrl: './my-projects.component.css'
})
export class MyProjectsComponent {
 
  
  todo = [
    { name: 'Development', priority: 'High', status: 'On track' },
  ];
  inprogress = [
    { name: 'Testing Project', priority: 'Medium', status: 'On track' },
  ];
  completed = [
    { name: 'Testing', priority: 'High', status: 'At risk' },
  ];
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
  addTask(status: string) {
    const newTask = { name: 'New Task', priority: 'Low', status: 'To be updated' };
    if (status === 'todo') {
      this.todo.push(newTask);
    } else if (status === 'inprogress') {
      this.inprogress.push(newTask);
    } else if (status === 'completed') {
      this.completed.push(newTask);
    }
  }
}
