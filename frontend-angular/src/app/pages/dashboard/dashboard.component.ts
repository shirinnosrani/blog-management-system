import { Component, OnInit, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { DashboardCardComponent } from '../../components/dashboard-card/dashboard-card.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, MatButtonModule, MatIconModule, MatProgressSpinnerModule, DashboardCardComponent, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  profile: User | null = null;
  loading = true;
  currentUser = computed(() => this.authService.currentUser());

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: p => { this.profile = p; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }
}
