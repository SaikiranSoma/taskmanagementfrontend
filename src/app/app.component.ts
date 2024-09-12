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
    // Check the initial URL when the app loads
    this.showNavbar = this.router.url === '/home';

    // Subscribe to router events and adjust navbar visibility
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Only show the navbar on the /home route
        this.showNavbar = event.urlAfterRedirects === '/home';
      }
    });
  }
}
