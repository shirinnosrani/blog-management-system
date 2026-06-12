import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-edit-blog',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, MatFormFieldModule, MatInputModule,
    MatButtonModule, MatIconModule, MatSnackBarModule, MatProgressSpinnerModule],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.scss'
})
export class EditBlogComponent implements OnInit {
  form: FormGroup;
  loading = false;
  fetchingBlog = true;
  blogId!: number;

  constructor(
    private fb: FormBuilder,
    private blogService: BlogService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.blogId = Number(this.route.snapshot.paramMap.get('id'));
    this.blogService.getBlogById(this.blogId).subscribe({
      next: blog => {
        this.form.patchValue({ title: blog.title, content: blog.content });
        this.fetchingBlog = false;
      },
      error: () => {
        this.snackBar.open('Blog not found.', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
        this.router.navigate(['/my-blogs']);
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    this.blogService.updateBlog(this.blogId, this.form.value).subscribe({
      next: blog => {
        this.snackBar.open('Blog updated successfully!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        this.router.navigate(['/blogs', blog.id]);
      },
      error: () => {
        this.loading = false;
        this.snackBar.open('Failed to update blog.', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }
}
