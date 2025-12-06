# Quizzes Application

A complete quiz application featuring a Symfony backend and a Flutter mobile app.

## Project Structure

- **backend/**: Symfony 7 API Platform application.
    - REST & GraphQL APIs.
    - MySQL Database (Dockerized).
- **mobile/**: Flutter application.

## Getting Started

### Backend
1. Navigate to `backend/`.
2. Start Docker: `docker run ...` (see docs).
3. Install dependencies: `composer install`.
4. Run server: `symfony server:start` or `php -S ...`.

### Mobile
1. Navigate to `mobile/`.
2. Run: `flutter run`.

## CI/CD
This project uses GitHub Actions for Continuous Integration.
- **Backend**: Runs PHPUnit tests.
- **Mobile**: Runs Flutter Analyze and Tests.
