# Blog Management System — Angular Frontend

Angular 20 + TypeScript + Angular Material

## Prerequisites
- Node.js 18+
- npm or yarn

## Setup

```bash
npm install
```

## Configuration

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080'
};
```

## Run

```bash
npm start
# Opens at http://localhost:4200
```

## Build for Production

```bash
npm run build
# Output in dist/frontend-angular/
```

## Architecture

```
src/app/
├── components/     — Reusable UI components
│   ├── navbar/
│   ├── footer/
│   ├── blog-card/
│   ├── comment-section/
│   ├── dashboard-card/
│   └── confirmation-dialog/
├── pages/          — Route-level page components
│   ├── home/
│   ├── blog-list/
│   ├── blog-details/
│   ├── login/
│   ├── register/
│   ├── dashboard/
│   ├── my-account/
│   ├── my-blogs/
│   ├── create-blog/
│   └── edit-blog/
├── services/       — HTTP services (AuthService, BlogService, CommentService, UserService)
├── guards/         — Route guards (AuthGuard)
├── interceptors/   — HTTP interceptors (JwtInterceptor)
└── models/         — TypeScript interfaces
```
