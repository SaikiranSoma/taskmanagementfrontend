import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from '../Models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private tasksUrl = 'http://localhost:5123/employee/projects/tasks'; 
  private addProjectUrl = 'http://localhost:5123/project'; 

  constructor(private http: HttpClient) {}

  // Fetch all projects and tasks
  getAllProjectsAndTasks(): Observable<Project[]> {
    const token = localStorage.getItem('token'); // Assuming you store your token in localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Project[]>(this.tasksUrl, { headers });
  }

  // Add a new project
  addProject(project: Project): Observable<Project> {
    const token = localStorage.getItem('token'); // Get token from localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post<Project>(this.addProjectUrl, project, { headers });
  }
}
