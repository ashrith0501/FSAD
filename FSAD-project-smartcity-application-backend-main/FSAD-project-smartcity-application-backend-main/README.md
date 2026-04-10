# SmartCity Spring Boot Backend

## What this is

This folder is a standalone Spring Boot + MySQL backend you can **cut/paste into your Spring Boot workspace**.

## Requirements

- Java 17+
- Maven
- MySQL running locally

## Configure MySQL

Edit `src/main/resources/application.properties`:

- `spring.datasource.username`
- `spring.datasource.password`

Database name: `smartcity` (auto-created if missing).

## Run

From `backend/`:

```bash
mvn spring-boot:run
```

Backend will start on:

- `http://localhost:8080`
- API base: `http://localhost:8080/api`

## Seeded demo users

- Admin: `admin@smartcity.com` / `admin123`
- User: `user@smartcity.com` / `user123`

## Implemented endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/services`
- `GET /api/issues`
- `POST /api/issues`

