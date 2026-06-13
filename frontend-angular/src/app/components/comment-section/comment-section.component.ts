import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { Comment } from '../../models/comment.model';
import { CommentService } from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePipe, RouterLink,
    MatCardModule, MatButtonModule, MatIconModule, MatFormFieldModule,
    MatInputModule, MatSnackBarModule, MatDialogModule],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.scss'
})
export class CommentSectionComponent implements OnInit {
  @Input({ required: true }) blogId!: number;

  comments: Comment[] = [];
  commentControl = new FormControl('', [Validators.required, Validators.minLength(1)]);
  editingId: number | null = null;
  editControl = new FormControl('', [Validators.required]);
  loading = false;

  isLoggedIn = () => this.authService.isLoggedIn();
  currentUserId = () => this.authService.currentUser()?.userId;

  constructor(
    private commentService: CommentService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.commentService.getCommentsByBlog(this.blogId).subscribe({
      next: c => this.comments = c,
      error: () => {}
    });
  }

  submitComment(): void {
    if (this.commentControl.invalid) return;
    this.loading = true;
    this.commentService.createComment({ comment: this.commentControl.value!, blogId: this.blogId }).subscribe({
      next: c => {
        this.comments.unshift(c);
        this.commentControl.reset();
        this.snackBar.open('Comment added!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  startEdit(comment: Comment): void {
    this.editingId = comment.id;
    this.editControl.setValue(comment.comment);
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editControl.reset();
  }

  saveEdit(commentId: number): void {
    if (this.editControl.invalid) return;
    this.commentService.updateComment(commentId, this.editControl.value!).subscribe({
      next: updated => {
        const idx = this.comments.findIndex(c => c.id === commentId);
        if (idx !== -1) this.comments[idx] = updated;
        this.editingId = null;
        this.snackBar.open('Comment updated!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
      }
    });
  }

  confirmDelete(commentId: number): void {
    const ref = this.dialog.open(ConfirmationDialogComponent, {
      data: { title: 'Delete Comment', message: 'Are you sure you want to delete this comment?' }
    });
    ref.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.commentService.deleteComment(commentId).subscribe({
          next: () => {
            this.comments = this.comments.filter(c => c.id !== commentId);
            this.snackBar.open('Comment deleted.', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }
}
