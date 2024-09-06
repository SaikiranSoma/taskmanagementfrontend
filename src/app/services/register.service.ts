import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'https://your-api-endpoint/api/admin/register'; // Replace with your backend URL
  constructor(private http: HttpClient) {}
  registerAdmin(adminData: any): Observable<any> {
    return this.http.post(this.baseUrl, adminData);
  }
  getTimeZoneByCountry(country: string): Observable<any> {
    return this.http.get(`https://your-api-endpoint/api/getTimeZone/${country}`); // Replace with your time zone API URL
  }




}
