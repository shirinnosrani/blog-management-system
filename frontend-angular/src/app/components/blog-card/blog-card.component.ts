import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Blog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [RouterLink, DatePipe, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input({ required: true }) blog!: Blog;

  get preview(): string {
    return this.blog.content.length > 150
      ? this.blog.content.substring(0, 150) + '...'
      : this.blog.content;
  }
}
