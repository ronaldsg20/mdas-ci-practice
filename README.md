# Hello World API

A simple NestJS Hello World API that returns a greeting message.

## Description

This is a basic NestJS application that provides a simple REST API endpoint. When you make a GET request to the root path, it returns "Hello World!".

## API Usage

### Endpoint

- **GET /** - Returns "Hello World!"

### Example

```bash
curl http://localhost:3000/
```

**Response:**
```
Hello World!
```

## Installation

Install the project dependencies:

```bash
npm ci
```

## Development

Run the application in development mode:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## Build

Build the application for production:

```bash
npm run build
```

The compiled files will be in the `dist/` directory.

## Lint

Run the linter to check code quality:

```bash
npm run lint
```

## Test

Run tests:

```bash
# Unit tests
npm run test

# End-to-end tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Docker

### Using Docker Compose

Build and start the application using Docker Compose:

```bash
docker-compose up -d
```

The API will be available at `http://localhost:3000`

### Docker Compose Commands

```bash
# Start the service
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the service
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

### Using Docker directly

Build the Docker image:

```bash
docker build -t mdas-ci-practice .
```

Run the container:

```bash
docker run -p 3000:3000 mdas-ci-practice
```
