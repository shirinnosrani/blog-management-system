import { Component } from '@angular/core';
import {
  FormBuilder, FormGroup, ReactiveFormsModule,
  Validators, AbstractControl
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatStepperModule } from '@angular/material/stepper';
import { AuthService } from '../../services/auth.service';

function passwordMatchValidator(group: AbstractControl) {
  const pw = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatStepperModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  /** 1 = fill form & send OTP, 2 = enter OTP, 3 = success */
  step: 1 | 2 | 3 = 1;

  loading = false;
  hidePassword = true;
  hideConfirm = true;
  otpInfoMsg = '';

  detailsForm: FormGroup;
  otpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.detailsForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]]
    });
  }

  /** Step 1 → Send OTP */
  onSendOtp(): void {
    if (this.detailsForm.invalid) return;
    this.loading = true;
    const { email } = this.detailsForm.value;

    this.authService.sendOtp(email).subscribe({
      next: (res) => {
        this.loading = false;
        this.step = 2;
        this.otpInfoMsg = res.message;
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || 'Failed to send OTP. Please try again.';
        this.snackBar.open(msg, 'Close', { duration: 5000, panelClass: 'snackbar-error' });
      }
    });
  }

  /** Step 2 → Verify OTP then register */
  onVerifyAndRegister(): void {
    if (this.otpForm.invalid) return;
    this.loading = true;
    const { email } = this.detailsForm.value;
    const { otp } = this.otpForm.value;

    this.authService.verifyOtp(email, otp).subscribe({
      next: () => {
        this.completeRegistration();
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || 'Invalid or expired OTP.';
        this.snackBar.open(msg, 'Close', { duration: 5000, panelClass: 'snackbar-error' });
      }
    });
  }

  private completeRegistration(): void {
    this.authService.register(this.detailsForm.value).subscribe({
      next: () => {
        this.loading = false;
        this.step = 3;
        setTimeout(() => this.router.navigate(['/dashboard']), 2000);
      },
      error: (err) => {
        this.loading = false;
        const msg = err?.error?.message || 'Registration failed. Please try again.';
        this.snackBar.open(msg, 'Close', { duration: 5000, panelClass: 'snackbar-error' });
      }
    });
  }

  /** Resend OTP */
  resendOtp(): void {
    const { email } = this.detailsForm.value;
    this.loading = true;
    this.otpForm.reset();
    this.authService.sendOtp(email).subscribe({
      next: (res) => {
        this.loading = false;
        this.otpInfoMsg = res.message;
        this.snackBar.open('New OTP sent!', 'Close', { duration: 3000 });
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to resend OTP.', 'Close', { duration: 4000, panelClass: 'snackbar-error' });
      }
    });
  }

  /** Go back to step 1 to edit details */
  goBack(): void {
    this.step = 1;
    this.otpForm.reset();
  }
}
