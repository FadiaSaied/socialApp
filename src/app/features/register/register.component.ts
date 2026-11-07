import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, TranslatePipe],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);

  isLoading = signal(false);
  registerForm = this.formBuilder.group(
    {
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: [''],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
        ],
      ],
      rePassword: ['', Validators.required],
    },
    { validators: this.confirmPassword },
  );

  sendRegisterData(): void {
    if (this.registerForm.valid) {
      this.isLoading.set(true);
      this.authService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          console.log(err);
          if (err.error.message) {
            this.isLoading.set(false);
          }
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
      console.log(this.registerForm.value);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  confirmPassword(group: AbstractControl) {
    let password = group.get('password')?.value;
    let rePassword = group.get('rePassword')?.value;

    return password !== rePassword ? { mismatch: true } : null;
  }
}
