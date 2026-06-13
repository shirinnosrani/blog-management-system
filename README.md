# Blog Management System

A full-stack blog management application built with **Angular 20**, **Spring Boot 3**, and **MySQL 8**.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 20, TypeScript, Angular Material |
| Backend | Java 21, Spring Boot 3.2, Spring Security |
| Auth | JWT (JSON Web Tokens) |
| Database | MySQL 8+ |
| Build | Maven |

## Project Structure

```
blog-management-system/
├── frontend-angular/     ← Angular 20 frontend
├── backend-springboot/   ← Spring Boot 3 backend
├── database/             ← MySQL schema + sample data
└── docs/                 ← API documentation
```

## Quick Start

### 1. Database Setup

```bash
# Login to MySQL
mysql -u root -p

# Run the SQL script
source /path/to/database/blog_management.sql
```

### 2. Backend Setup

```bash
cd backend-springboot

# Edit src/main/resources/application.properties:
# spring.datasource.username=your_mysql_user
# spring.datasource.password=your_mysql_password

# Build and run
mvn spring-boot:run
# API runs at http://localhost:8080
```

### 3. Frontend Setup

```bash
cd frontend-angular

# Install dependencies
npm install

# Start dev server
npm start
# App runs at http://localhost:4200
```

## Features

### Public (No Login Required)
- Browse all blog posts
- Read full blog details
- View comments on blogs

### Authenticated Users
- Register / Login with JWT
- Create, edit, delete own blogs
- Comment on any blog
- Edit / delete own comments
- Personal dashboard with stats
- Update profile & change password

## Default Sample Credentials

After running the SQL script, a sample admin account is created:

| Field | Value |
|-------|-------|
| Email | admin@blogspace.com |
| Password | Admin@1234 |

## API Endpoints

### Auth
```
POST /api/auth/register   — Create account
POST /api/auth/login      — Login and get JWT
```

### Blogs
```
GET    /api/blogs          — List all blogs (public)
GET    /api/blogs/{id}     — Get blog details (public)
POST   /api/blogs          — Create blog (auth required)
PUT    /api/blogs/{id}     — Update blog (auth + owner)
DELETE /api/blogs/{id}     — Delete blog (auth + owner)
GET    /api/blogs/my-blogs — Get my blogs (auth required)
```

### Comments
```
GET    /api/blogs/{id}/comments — List comments (public)
POST   /api/comments            — Add comment (auth required)
PUT    /api/comments/{id}       — Edit comment (auth + owner)
DELETE /api/comments/{id}       — Delete comment (auth + owner)
```

### Users
```
GET /api/users/profile        — Get profile (auth required)
PUT /api/users/profile        — Update profile (auth required)
PUT /api/users/change-password — Change password (auth required)
```
