import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService, SignupCredentials } from '../../services/auth-service';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        password_confirmation: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const passwordConfirmation = form.get('password_confirmation');

    if (
      password &&
      passwordConfirmation &&
      password.value !== passwordConfirmation.value
    ) {
      passwordConfirmation.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    if (
      passwordConfirmation &&
      passwordConfirmation.errors?.['passwordMismatch']
    ) {
      delete passwordConfirmation.errors['passwordMismatch'];
      if (Object.keys(passwordConfirmation.errors).length === 0) {
        passwordConfirmation.setErrors(null);
      }
    }

    return null;
  }

  public onSubmit(): void {
    if (this.signupForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials: SignupCredentials = this.signupForm.value;

      this.authService
        .signup(credentials)
        .pipe(
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe({
          next: (response) => {
            console.log('Signup successful:', response);
            this.router.navigate(['/messenger']);
          },
          error: (error) => {
            console.error('Signup failed:', error);
            this.errorMessage =
              error.error?.message || 'Signup failed. Please try again.';
          },
        });
    }
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get password_confirmation() {
    return this.signupForm.get('password_confirmation');
  }
}
