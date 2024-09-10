import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Person {
  name: string;
}

interface Project {
  name: string;
}


@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrl: './maindashboard.component.css'
})
export class MaindashboardComponent implements OnInit{
  peopleList: Person[] = [];
  projectList: Project[] = [];
  greeting: string = '';
  collaboratorsCount: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Set the greeting based on time of day
    const currentHour = new Date().getHours();
    
    if (currentHour < 12) {
      this.greeting = 'Good morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }

    // Fetch employees from ASP.NET Core API
    this.getPeople();

    // Fetch projects from ASP.NET Core API
    this.getProjects();
  }

  // Fetch people from the API
  getPeople(): void {
    this.http.get<Person[]>('https://your-api-url/api/employees')
      .subscribe(data => {
        this.peopleList = data;
        this.collaboratorsCount = this.peopleList.length;
      }, error => {
        console.error('Error fetching people', error);
      });
  }

  // Fetch projects from the API
  getProjects(): void {
    this.http.get<Project[]>('https://your-api-url/api/projects')
      .subscribe(data => {
        this.projectList = data;
      }, error => {
        console.error('Error fetching projects', error);
      });
  }

  // Get initials for person avatar
  getInitials(name: string): string {
    const names = name.split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.toUpperCase();
  }
}
