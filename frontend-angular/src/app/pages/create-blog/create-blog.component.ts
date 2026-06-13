import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-create-blog',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './create-blog.component.html',
  styleUrl: './create-blog.component.scss'
})
export class CreateBlogComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.blogService.createBlog(this.form.value).subscribe({
      next: blog => {
        this.snackBar.open('Blog published successfully!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        this.router.navigate(['/blogs', blog.id]);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to publish blog. Please try again.', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }
}
