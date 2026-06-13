import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Blog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-my-blogs',
  standalone: true,
  imports: [RouterLink, DatePipe, MatButtonModule, MatIconModule, MatTableModule,
    MatProgressSpinnerModule, MatSnackBarModule, MatDialogModule, MatTooltipModule],
  templateUrl: './my-blogs.component.html',
  styleUrl: './my-blogs.component.scss'
})
export class MyBlogsComponent implements OnInit {
  blogs: Blog[] = [];
  loading = true;
  displayedColumns = ['title', 'createdAt', 'comments', 'actions'];

  constructor(
    private blogService: BlogService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.blogService.getMyBlogs().subscribe({
      next: b => { this.blogs = b; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  confirmDelete(blog: Blog): void {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Delete Blog', message: `Are you sure you want to delete "${blog.title}"? This cannot be undone.` }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.blogService.deleteBlog(blog.id).subscribe({
          next: () => {
            this.blogs = this.blogs.filter(b => b.id !== blog.id);
            this.snackBar.open('Blog deleted successfully.', 'Close', { duration: 3000 });
          },
          error: () => this.snackBar.open('Failed to delete blog.', 'Close', { duration: 3000, panelClass: 'snackbar-error' })
        });
      }
    });
  }
}
