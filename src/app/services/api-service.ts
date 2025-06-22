import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public error = new EventEmitter();
  public baseUrl = 'https://messenger-service-production-4d91.up.railway.app';
  public token = '';

  public get(url: string): Observable<any> {
    const headers = this.createAuthHeaders();
    return this.http.get(`${this.baseUrl}/api/${url}`, { headers });
  }

  public post(url: string, body: any | null): Observable<any> {
    const headers = this.createAuthHeaders();

    if (url === 'login' || url === 'signup') {
      return this.http.post(`${this.baseUrl}/api/${url}`, body);
    }

    return this.http.post(`${this.baseUrl}/api/${url}`, body, { headers });
  }

  private createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    if (token) {
      return new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
