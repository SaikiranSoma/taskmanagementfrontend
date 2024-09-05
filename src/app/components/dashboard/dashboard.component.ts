import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // todo = [
  //   { name: 'Development', priority: 'High', status: 'On track' },
  // ];

  // inprogress = [
  //   { name: 'Testing Project', priority: 'Medium', status: 'On track' },
  // ];

  // completed = [
  //   { name: 'Testing', priority: 'High', status: 'At risk' },
  // ];

  // // Update method to type the event as CdkDragDrop
  // drop(event: CdkDragDrop<any[]>) {
  //   if (event.previousContainer === event.container) {
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex,
  //     );
  //   }
  // }

  // // Method to add a new task to the appropriate array
  // addTask(status: string) {
  //   const newTask = { name: 'New Task', priority: 'Low', status: 'To be updated' };
  //   if (status === 'todo') {
  //     this.todo.push(newTask);
  //   } else if (status === 'inprogress') {
  //     this.inprogress.push(newTask);
  //   } else if (status === 'completed') {
  //     this.completed.push(newTask);
  //   }
  // }
}
