import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable } from '@angular/core';
import { Observable, of, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  public error = new EventEmitter();
  // public baseUrl = location.origin.includes('localhost')
  //   ? 'http://my-deployed-server.com'
  //   : location.origin;
  public baseUrl = 'http://localhost:4200';
  public token = '';

  public get(url: string): Observable<any> {
    // return this.http.get(`${this.baseUrl}/${url}`);
    return of([
      {
        id: 1,
        phoneNumber: '7771112233',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
        timestamp: new Date().toISOString(),
      },
      {
        id: 2,
        phoneNumber: '7771112233',
        text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
        timestamp: new Date().toISOString(),
      },
    ]);
  }

  public post(url: string, body: any | null): Observable<any> {
    return this.http.post(`${this.baseUrl}/${url}`, body);
  }

  private createAuthHeaders() {
    // auth headers logic here
  }
}
