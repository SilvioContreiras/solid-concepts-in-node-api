# Gym management (SOLID cocepts in Node.js)

## Description

This is a backend application built with Node.js, TypeScript, Fastify, and Prisma, designed to mimic the core functionalities of Gym. It includes user registration and authentication, gym management, and check-in functionalities.

## Technologies Used

-   **Node.js**: JavaScript runtime environment.
-   **TypeScript**: Superset of JavaScript that adds static typing.
-   **Fastify**: Web framework for Node.js, focusing on speed and low overhead.
-   **Prisma**: Next-generation ORM for Node.js and TypeScript.
-   **PostgreSQL**: Relational database used for storing application data.
-   **Bcryptjs**: Library for hashing passwords.
-   **Zod**: TypeScript-first schema validation with static type inference.
-   **Vitest**: Test framework.
-   **Docker**: Platform for running applications in containers.


## Setup Instructions

### Prerequisites

-   Node.js (>=18)
-   Docker and Docker Compose (for local development)

### Installation

1.  Clone the repository:

    ```bash
    git clone <repository-url>
    cd solid-concepts-in-node-api
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

3.  Set up the database using Docker Compose:

    ```bash
    docker-compose up -d
    ```

4.  Configure the `.env` file:

    ```
    DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
    NODE_ENV=dev
    PORT=3333
    ```

5.  Run Prisma migrations:

    ```bash
    npx prisma migrate dev
    ```

### Running the Application

-   **Development Mode**:

    ```bash
    npm run dev
    ```

    This command starts the server using `tsx watch src/server.ts`, which automatically restarts the server on file changes.

### Running Tests

-   **Run tests**:

    ```bash
    npm run test
    ```

-   **Run tests in watch mode**:

    ```bash
    npm run test:watch
    ```

-   **Run tests with coverage**:

    ```bash
    npm run test:coverage
    ```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Write tests for your changes.
5.  Ensure all tests pass.
6.  Submit a pull request.


### Installation

1.  Install dependencies:

    ```bash
    npm install
    ```

2.  Set up the database using Docker Compose:

    ```bash
    docker-compose up -d
    ```

3.  Configure the `.env` file:

    ```
    DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"
    NODE_ENV=dev
    PORT=3333
    ```

5.  Run Prisma migrations:

    ```bash
    npx prisma migrate dev
    ```

### Running Tests

-   **Run tests**:

    ```bash
    npm run test
    ```

-   **Run tests in watch mode**:

    ```bash
    npm run test:watch
    ```

-   **Run tests with coverage**:

    ```bash
    npm run test:coverage
    ```

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Implement your changes.
4.  Write tests for your changes.
5.  Ensure all tests pass.
6.  Submit a pull request.

## License

ISC License