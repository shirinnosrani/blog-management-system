import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, BlogRequest } from '../models/blog.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private readonly apiUrl = `${environment.apiUrl}/api/blogs`;

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  getBlogById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  createBlog(data: BlogRequest): Observable<Blog> {
    return this.http.post<Blog>(this.apiUrl, data);
  }

  updateBlog(id: number, data: BlogRequest): Observable<Blog> {
    return this.http.put<Blog>(`${this.apiUrl}/${id}`, data);
  }

  deleteBlog(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMyBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(`${this.apiUrl}/my-blogs`);
  }
}
