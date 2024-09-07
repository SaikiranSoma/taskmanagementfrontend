import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'taskmanager';

  showNavbar = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Check if the current route is registration page
        if (event.url === '/register') {
          this.showNavbar = false; // Hide the navbar on the registration page
        } 
        else if (event.url === '/login') {
          this.showNavbar = false; // Hide the navbar on the login page
        }
        else if (event.url === '/dashboard') {
          this.showNavbar = false; // Hide the navbar on the dashboard page
        }
        else if (event.url === '/create-project') {
          this.showNavbar = false; // Hide the navbar on the createproject page
        }
        else if (event.url === '/my-projects') {
          this.showNavbar = false; // Hide the navbar on the myprojects page
        }
        else {
          this.showNavbar = true;  // Show the navbar on all other pages
        }
      }
    });
  }

}
