import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  userName: string = '';
  userTimezone: string = '';
  isDropdownOpen: boolean = false;
  userInitial: string = '';

  constructor(private router: Router, private eRef: ElementRef) {}

  ngOnInit() {
    this.loadUserDetails();

    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isDropdownOpen = false; 
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
    }
  }

  
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

 
  signOut() {
    localStorage.removeItem('token'); 
    this.router.navigate(['/login']); 
    console.log('Signed out');
  }

  
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.isDropdownOpen && !this.eRef.nativeElement.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}
