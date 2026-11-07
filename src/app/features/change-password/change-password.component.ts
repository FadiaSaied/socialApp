import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  imports: [ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css',
})
export class ChangePasswordComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  changePasswordForm = this.formBuilder.group({
    password: ['', Validators.required],
    newPassword: [
      '',
      [
        Validators.required,
        Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
      ],
    ],
  });

  sendFormData() {
    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.changePasswordForm.value).subscribe({
        next: (res) => {
          console.log(res);
          if (res.success) {
            this.authService.logOut();
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.changePasswordForm.markAllAsTouched();
    }
  }
}
