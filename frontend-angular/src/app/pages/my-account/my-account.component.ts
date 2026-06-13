import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

function passwordMatchValidator(group: AbstractControl) {
  const pw = group.get('newPassword')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pw === confirm ? null : { passwordMismatch: true };
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, MatTabsModule, MatProgressSpinnerModule],
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.scss'
})
export class MyAccountComponent implements OnInit {
  profile: User | null = null;
  profileForm!: FormGroup;
  passwordForm!: FormGroup;
  loadingProfile = true;
  savingProfile = false;
  savingPassword = false;
  hideCurrent = true;
  hideNew = true;
  hideConfirm = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });

    this.userService.getProfile().subscribe({
      next: p => {
        this.profile = p;
        this.profileForm.patchValue({ fullName: p.fullName });
        this.loadingProfile = false;
      },
      error: () => { this.loadingProfile = false; }
    });
  }

  saveProfile(): void {
    if (this.profileForm.invalid) return;
    this.savingProfile = true;
    this.userService.updateProfile(this.profileForm.value).subscribe({
      next: p => {
        this.profile = p;
        this.savingProfile = false;
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
      },
      error: () => {
        this.savingProfile = false;
        this.snackBar.open('Failed to update profile.', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }

  changePassword(): void {
    if (this.passwordForm.invalid) return;
    this.savingPassword = true;
    this.userService.changePassword(this.passwordForm.value).subscribe({
      next: () => {
        this.passwordForm.reset();
        this.savingPassword = false;
        this.snackBar.open('Password changed successfully!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
      },
      error: (err) => {
        this.savingPassword = false;
        const msg = err?.error?.message || 'Failed to change password.';
        this.snackBar.open(msg, 'Close', { duration: 4000, panelClass: 'snackbar-error' });
      }
    });
  }
}
