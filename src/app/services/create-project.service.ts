import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Project } from '../Models/project';
import { Tasks } from '../Models/task';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private tasksUrl = 'http://localhost:5123/employee/projects/tasks'; 
  private addProjectUrl = 'http://localhost:5123/project'; 
  private baseUrl='http://localhost:5123';

  constructor(private http: HttpClient) {}

  
  getAllProjectsAndTasks(): Observable<Project[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Project[]>(this.tasksUrl, { headers });
  }

  
  addProject(project: Project): Observable<Project> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<Project>(this.addProjectUrl, project, { headers });
  }

  addTask(task: any): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve the JWT token  
    if (!token) {
      console.error('No token found in local storage!');
      return throwError('No token found');
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' 
    });
    return this.http.post(`${this.baseUrl}/task`, task, { headers });
  }
  
  
  getEmployeesByProjectId(projectId: number): Observable<{ employeeName: string; timeZone: string }[]> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<{ employeeName: string; timeZone: string }[]>(`${this.baseUrl}/project/${projectId}/employees`, { headers });
  }
}
