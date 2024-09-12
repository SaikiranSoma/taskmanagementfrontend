import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Router,NavigationEnd } from '@angular/router';


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
  userInitial:string=' '

  constructor(private router: Router,private eRef: ElementRef) {}

  ngOnInit() {
    this.loadUserDetails();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDropdownOpen = false; // Close dropdown on navigation
      }
    });
  }

  loadUserDetails() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      console.log(decodedToken); 
      for (const key in decodedToken) {
        if (key.endsWith('/claims/name')) {  
          this.userName = decodedToken[key];
        } else if (key.endsWith('/claims/country')) {  
          this.userTimezone = decodedToken[key];
        }
      }
      this.userInitial = this.userName.charAt(0).toUpperCase();
      console.log(this.userName);  
      console.log(this.userTimezone);
      console.log(this.userInitial)  
    }
  }
  

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  signOut() {
    localStorage.removeItem('token');
    console.log('Signed out');
  }

  
  // Close dropdown when clicking outside of it
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.isDropdownOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }


}
