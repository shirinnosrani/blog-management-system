import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule, DatePipe],
  templateUrl: './dashboard-card.component.html',
  styleUrl: './dashboard-card.component.scss'
})
export class DashboardCardComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) value!: string | number | null;
  @Input({ required: true }) icon!: string;
  @Input() color: 'primary' | 'accent' | 'success' = 'primary';
}
