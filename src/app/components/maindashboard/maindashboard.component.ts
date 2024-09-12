import { Component, OnInit } from '@angular/core';
import { MaindashboardService } from '../../services/maindashboard.service';

@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit {
  peopleList: any[] = [];
  projectList: any[] = [];
  greeting: string = 'Hello'; 
  collaboratorsCount: number = 0;
  userName: any;

  constructor(private mainDashboardService: MaindashboardService) { }

  ngOnInit(): void {
    this.loadUserDetails();
    this.loadProjects();
  }

  loadUserDetails(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      for (const key in decodedToken) {
        if (key.endsWith('/claims/name')) {
          this.userName = decodedToken[key];
        }
      }
      
      this.greeting = `Hello, ${this.userName}`;
    }
  }

  
  loadEmployees(projectId: number): void {
    this.mainDashboardService.getEmployeesByProject(projectId).subscribe(
      (response) => {
        this.peopleList = response.map((employee: any) => ({ name: employee.employeeName }));
        this.collaboratorsCount = this.peopleList.length;
      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  
  loadProjects(): void {
    this.mainDashboardService.getProjects().subscribe(
      (response) => {
        console.log('Projects Response:', response); 
        this.projectList = response.map((project: any) => ({ id: project.projectId, name: project.projectName }));
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }

  
  onProjectClick(projectId: number): void {
    
    if (projectId) {
      this.loadEmployees(projectId);  
      console.log('Project clicked: ', projectId);
    } else {
      console.error('Project ID is undefined');
    }
  }

  
  getInitials(name: string): string {
    const initials = name.split(' ').map(n => n[0]).join('');
    return initials.toUpperCase();
  }
}
