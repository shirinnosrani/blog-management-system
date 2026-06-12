-- Blog Management System - MySQL Schema & Sample Data
-- Version: 1.0.0

CREATE DATABASE IF NOT EXISTS blog_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE blog_management;

-- ============================================================
-- TABLES
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name  VARCHAR(100)  NOT NULL,
    email      VARCHAR(150)  NOT NULL UNIQUE,
    password   VARCHAR(255)  NOT NULL,
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_users_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS blogs (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    title      VARCHAR(255)  NOT NULL,
    content    LONGTEXT      NOT NULL,
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id    BIGINT        NOT NULL,
    CONSTRAINT fk_blogs_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_blogs_user_id (user_id),
    INDEX idx_blogs_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS comments (
    id         BIGINT AUTO_INCREMENT PRIMARY KEY,
    comment    TEXT          NOT NULL,
    created_at DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_id    BIGINT        NOT NULL,
    blog_id    BIGINT        NOT NULL,
    CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_comments_blog FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
    INDEX idx_comments_blog_id (blog_id),
    INDEX idx_comments_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================================
-- SAMPLE DATA
-- ============================================================

-- Sample admin user (password: Admin@1234)
-- BCrypt hash for "Admin@1234"
INSERT INTO users (full_name, email, password, created_at) VALUES
('Admin User', 'admin@blogspace.com',
 '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
 NOW());

-- Sample blogs (authored by user id=1)
INSERT INTO blogs (title, content, created_at, user_id) VALUES
('Introduction to Angular',
 'Angular is a powerful TypeScript framework developed by Google for building scalable web applications. It provides a robust set of tools and patterns that help developers create complex single-page applications with ease. Angular uses a component-based architecture, which promotes reusability and maintainability. Key features include two-way data binding, dependency injection, directives, and a powerful CLI. Whether you are building a simple form or an enterprise-grade application, Angular has the tools you need to succeed.',
 NOW(), 1),

('Spring Boot Fundamentals',
 'Spring Boot simplifies Java backend development and accelerates enterprise application creation. It builds on top of the Spring Framework, providing auto-configuration, embedded servers, and production-ready features out of the box. With Spring Boot, you can get a REST API running in minutes without complex XML configurations. It integrates seamlessly with Spring Security for authentication, Spring Data JPA for database access, and many other Spring ecosystem projects. Spring Boot is the go-to choice for building microservices and RESTful APIs in the Java ecosystem.',
 NOW(), 1),

('Understanding MySQL',
 'MySQL is a reliable relational database used by millions of applications worldwide. As one of the most popular open-source databases, MySQL offers excellent performance, reliability, and ease of use. It supports ACID transactions, full-text search, spatial data, and JSON documents. MySQL is widely used in web applications, from small personal projects to large-scale enterprise systems. Understanding concepts like indexes, joins, normalization, and query optimization is essential for building efficient database-driven applications. MySQL works seamlessly with Spring Boot via Spring Data JPA and Hibernate ORM.',
 NOW(), 1),

('JWT Authentication Guide',
 'JWT (JSON Web Token) provides secure authentication for modern web applications. A JWT is a compact, self-contained token that encodes user information and is digitally signed to prevent tampering. The typical flow involves the client sending credentials to the server, which validates them and returns a signed JWT. The client then includes this token in subsequent requests via the Authorization header. JWTs are stateless, meaning the server does not need to store session information. This makes them ideal for scalable, distributed architectures. Always use HTTPS in production and set appropriate token expiration times.',
 NOW(), 1),

('Building Full Stack Applications',
 'Combining Angular, Spring Boot, and MySQL creates a robust full-stack solution for modern web development. On the frontend, Angular provides a structured framework for building dynamic, responsive user interfaces with TypeScript. Spring Boot handles the backend REST API, providing secure endpoints with JWT authentication and business logic processing. MySQL serves as the reliable data store for persistent information. This combination follows the separation of concerns principle — each layer has a clear responsibility. The Angular frontend communicates with the Spring Boot API via HTTP, exchanging JSON data, while Spring Boot manages all database interactions through JPA repositories.',
 NOW(), 1);

-- ============================================================
-- VERIFY
-- ============================================================
SELECT 'Database setup complete!' AS status;
SELECT COUNT(*) AS user_count FROM users;
SELECT COUNT(*) AS blog_count FROM blogs;
