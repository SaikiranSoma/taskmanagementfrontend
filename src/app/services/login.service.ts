import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private role:string=null!;
  private baseUrl="http://localhost:3000";
  constructor(private http: HttpClient) {}
  postData(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Login`, data);
  }
  getUserRoleFromToken(token:string): string | null {
    return this.role;
  }

}
