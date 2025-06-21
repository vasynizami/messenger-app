import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { ApiService } from './api-service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private apiService: ApiService) {
    // Check if user is already logged in (e.g., token in localStorage)
    this.checkAuthStatus();
  }

  signup(credentials: SignupCredentials): Observable<LoginResponse> {
    return this.apiService.post('signup', credentials).pipe(
      tap((response: LoginResponse) => {
        // Store token and user data after successful signup
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Update authentication state
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.apiService.post('login', credentials).pipe(
      tap((response: LoginResponse) => {
        // Store token
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        // Update authentication state
        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next(response.user);
      })
    );
  }

  logout(): Observable<any> {
    return this.apiService.post('logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.isAuthenticatedSubject.next(false);
        this.currentUserSubject.next(null);
      })
    );
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('auth_token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this.isAuthenticatedSubject.next(true);
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
}
