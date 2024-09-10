import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


interface Project {
  name: string;
  description: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  userTimezone: string = '';
  isDropdownOpen: boolean = false;

  ngOnInit() {
    this.loadUserDetails();
  }

  loadUserDetails() {
    // Assuming the token is stored in local storage and is a JSON string.
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode token payload
      this.userName = decodedToken.userName;  // Assuming the token contains userName
      this.userTimezone = decodedToken.timezone;  // Assuming the token contains timezone
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  signOut() {
    // Implement sign-out logic here, like removing the token from local storage
    localStorage.removeItem('token');
    console.log('Signed out');
  }
}
