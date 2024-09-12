import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaindashboardService {

  private apiUrl = 'http://localhost:5123/employee/projects/tasks';

  constructor(private http: HttpClient) { }

  getEmployeesByProject(projectId: number): Observable<any[]> {
    const url = `http://localhost:5123/project/${projectId}/employees`;
    return this.http.get<any[]>(url);
  }
  

  getProjects(): Observable<any> {
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any>(this.apiUrl, { headers }).pipe(
      catchError((error: any) => {
        console.error('Error fetching projects:', error.message);
        return throwError(() => new Error(error.message));
      })
    );
  }
  
  
  
  
}
