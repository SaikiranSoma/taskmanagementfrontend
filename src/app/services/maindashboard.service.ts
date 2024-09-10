import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaindashboardService {

  private employeesUrl = 'http://localhost:5123/project/4/employees';
  private apiUrl = 'http://localhost:5123/employee/projects/tasks';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.employeesUrl);
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
