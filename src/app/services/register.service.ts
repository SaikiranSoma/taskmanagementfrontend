import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl="http://localhost:3000";
  constructor(private http: HttpClient) {}
  postData(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/Register`, userData);
  }
}
