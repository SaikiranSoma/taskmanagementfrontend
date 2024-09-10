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
        
        if (event.url === '/register') {
          this.showNavbar = false; 
        } 
        else if (event.url === '/login') {
          this.showNavbar = false;
        }
        else if (event.url === '/dashboard') {
          this.showNavbar = false; 
        }
        else if (event.url === '/dashboard/create-project') {
          this.showNavbar = false; 
        }
        else if (event.url === '/dashboard/my-projects') {
          this.showNavbar = false; 
        }
        else if (event.url === '/dashboard/maindashboard') {
          this.showNavbar = false; 
        }
        else {
          this.showNavbar = true;  
        }
      }
    });
  }

}
