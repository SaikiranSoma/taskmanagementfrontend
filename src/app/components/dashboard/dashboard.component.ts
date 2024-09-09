import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  userName = 'Saikiran';
  userEmail = 'saikiran@example.com';  // Replace with actual data

  signOut() {
    // Sign-out logic
  }
}
