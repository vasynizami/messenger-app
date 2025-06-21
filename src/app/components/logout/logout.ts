import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="logout-container">
      <div class="logout-card">
        <h3>Logging out...</h3>
        <p>Please wait while we sign you out.</p>
      </div>
    </div>
  `,
  styleUrl: './logout.scss',
})
export class Logout implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.performLogout();
  }

  private performLogout(): void {
    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.router.navigate(['/login']);
        })
      )
      .subscribe({
        next: () => {
          console.log('Logout successful');
        },
        error: (error) => {
          console.error('Logout failed:', error);
        },
      });
  }
}
