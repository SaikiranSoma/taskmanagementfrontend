import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MaindashboardService } from '../../services/maindashboard.service';


@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrl: './maindashboard.component.css'
})
export class MaindashboardComponent {
  peopleList: any[] = [];
  projectList: any[] = [];
  greeting: string = 'Hello'; 
  collaboratorsCount: number = 0;

  constructor(private mainDashboardService: MaindashboardService) { }

  ngOnInit(): void {
    this.loadEmployees();
    this.loadProjects();
  }

  loadEmployees(): void {
    this.mainDashboardService.getEmployees().subscribe(
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
        this.projectList = response.map((project: any) => ({ name: project.projectName }));
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
  
  getInitials(name: string): string {
    const initials = name.split(' ').map(n => n[0]).join('');
    return initials.toUpperCase();
  }
}
