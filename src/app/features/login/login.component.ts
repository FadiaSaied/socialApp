import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  isLoading = signal(false);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
    },
    { updateOn: 'submit' },
  );
  sendLoginData(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/timeline']);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
          }
        },
        error: (err) => {
          console.log(err.error.message);

          if (err.error.message) {
            this.isLoading.set(false);
          }
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
