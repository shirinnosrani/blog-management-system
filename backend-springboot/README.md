# Blog Management System — Spring Boot Backend

Java 21 + Spring Boot 3.2 + Spring Security + JWT + MySQL 8

## Prerequisites
- Java 21+
- Maven 3.8+
- MySQL 8+

## Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/blog_management?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password
app.jwt.secret=YOUR_SECRET_KEY_HERE
app.jwt.expiration=86400000
```

## Run

```bash
mvn clean install
mvn spring-boot:run
```

Backend starts at **http://localhost:8080**

## Architecture

```
com.blog/
├── controller/      — REST controllers
├── service/         — Service interfaces
├── service/impl/    — Service implementations
├── repository/      — Spring Data JPA repositories
├── entity/          — JPA entities (User, Blog, Comment)
├── dto/             — Request/Response DTOs
├── mapper/          — Entity ↔ DTO mappers
├── security/        — JWT filter, UserDetailsService
├── config/          — Security & CORS configuration
└── exception/       — Global exception handler
```
