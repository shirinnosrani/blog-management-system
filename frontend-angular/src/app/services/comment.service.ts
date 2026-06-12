import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment, CommentRequest } from '../models/comment.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private readonly apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getCommentsByBlog(blogId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/blogs/${blogId}/comments`);
  }

  createComment(data: CommentRequest): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/comments`, data);
  }

  updateComment(id: number, comment: string): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}/comments/${id}`, { comment });
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/comments/${id}`);
  }
}
