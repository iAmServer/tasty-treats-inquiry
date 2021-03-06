import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getInquiries(): Observable<any> {
    return this.http.get(this.baseUrl + 'all');
  }

  submitInquiry(data: any): Observable<any> {
    return this.http.post(this.baseUrl + 'inquiry', data);
  }
}
