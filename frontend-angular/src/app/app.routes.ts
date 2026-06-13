import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'blogs',
    loadComponent: () => import('./pages/blog-list/blog-list.component').then(m => m.BlogListComponent)
  },
  {
    path: 'blogs/:id',
    loadComponent: () => import('./pages/blog-details/blog-details.component').then(m => m.BlogDetailsComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: 'my-account',
    loadComponent: () => import('./pages/my-account/my-account.component').then(m => m.MyAccountComponent),
    canActivate: [authGuard]
  },
  {
    path: 'my-blogs',
    loadComponent: () => import('./pages/my-blogs/my-blogs.component').then(m => m.MyBlogsComponent),
    canActivate: [authGuard]
  },
  {
    path: 'create-blog',
    loadComponent: () => import('./pages/create-blog/create-blog.component').then(m => m.CreateBlogComponent),
    canActivate: [authGuard]
  },
  {
    path: 'edit-blog/:id',
    loadComponent: () => import('./pages/edit-blog/edit-blog.component').then(m => m.EditBlogComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
