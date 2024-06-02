# Todo App

This is a simple Todo application built using NestJS for the backend. It provides functionalities for user registration and managing todo lists.

## Getting Started

## Running the Application

To start the application, run:

```bash
npm run start
```

## Running Tests

Unit Tests
To run unit tests, use:

```bash
npm run test
```

To run e2e tests, use:

```bash
npm run test:e2e
```

## Project Structure

```plaintext
project-root
├── src
│   ├── application
│   │   ├── app.module.ts
│   │   ├── todo
│   │   │    ├── todo.module.ts
│   │   │    ├── commands
│   │   │    ├── command-handlers
│   │   │    ├── event-handlers
│   │   │    ├── queries
│   │   │    ├── query-handlers
│   │   │    ├── sagas
│   │   │    └── services
│   │   └── user
│   │   │    ├── user.module.ts
│   │   │    ├── commands
│   │   │    ├── command-handlers
│   │   │    ├── event-handlers
│   │   │    ├── queries
│   │   │    ├── query-handlers
│   │   │    ├── sagas
│   │   │    └── services
│   ├── domain
│   │   └── todo
│   │   │   ├── entities
│   │   │   ├── events
│   │   │   └── repositories
│   │   │
│   │   └── user
│   │       ├── entities
│   │       ├── events
│   │       └── repositories
│   ├── infrastructure
│   │   └── database
│   │
│   ├── presentation
│   │   └── controllers
│   │
│   └── shared
│
├── test
│   └── e2e
│       └── user.e2e-spec.ts
├── .gitignore
├── jest.config.js
├── jest.e2e.config.js
├── package.json
├── README.md
├── tsconfig.json
└── package.json.lock
```
## Modifications that can be done

1.Mock data

2.Dockerize app

