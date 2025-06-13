# Films Project

A robust RESTful API for managing a film collection, built with Node.js, TypeScript, Express, Sequelize (SQLite), Passport authentication, and Zod validation. The project supports user registration, authentication (JWT), CRUD operations for films, and bulk film import from text files.

---

## Architecture Overview

### 1. **Layered Structure**

- **Controllers (`src/controllers/`)**  
  Handle HTTP requests, validate input, and delegate business logic to services.

- **Services (`src/services/`)**  
  Encapsulate business logic and manage repository calls.

- **Repositories (`src/repositories/`)**  
  Abstract database operations using Sequelize models.

- **Models (`src/models/`)**  
  Define Sequelize models for `Film`, `Star`, and `User`, including associations.

- **Routers (`src/routers/`)**  
  Define Express routers for API endpoints, applying authentication.

- **Utils (`src/utils/`)**  
  Utility modules for validation (Zod schemas), constants, error handling, file parsing, and authentication strategies.

### 2. **Authentication**

- **User Registration & Login**  
  Users register and log in with email and password. Passwords are hashed with bcrypt.
- **JWT Authentication**  
  Protected routes require a valid JWT token, issued upon login or registration.

### 3. **Film Management**

- **CRUD Operations**  
  Create, read, update, and delete films. Each film can have multiple stars (actors).
- **Bulk Import**  
  Import films from a `.txt` file using a specific format.

### 4. **Validation & Error Handling**

- **Zod**  
  All incoming data is validated using Zod schemas.
- **Centralized Error Handler**  
  Consistent error responses for validation, database, and authentication errors.

---

## Environment Variables

Set the following variables in your `.env` file:

```env
APP_HOST=0.0.0.0
APP_PORT=8050

DB_NAME=films_demo
DB_FILE_PATH=db/db2.sqlite

JWT_SECRET=secret
```

---

## Getting Started

### 1. **Clone the Repository**

```sh
git clone https://github.com/Volodymyr0902/movies.git
```

### 2. **Install Dependencies**

```sh
npm install
```

### 3. **Configure Environment**

Copy `.env` and adjust as needed (see above).

### 4. **Database**

The project uses SQLite. The database file will be created at the path specified by `DB_FILE_PATH`.

### 5. **Build the Project**

```sh
npm run build
```

### 6. **Run in Development**

```sh
npm run dev
```

### 7. **Run in Production**

```sh
npm run start
```

### 8. **Docker Support**

Build and run the project using Docker Compose:
#### 8.1 **Run with Dockerfile**

Pull and run the app using the prebuilt image from Docker Hub:

```sh
docker pull volodymyr0902/movies
docker run --name movies --env-file .env -p 8000:8050 volodymyr0902/movies
```

#### 8.2 **Run with Docker Compose**

Run the project using Docker Compose (uses the remote image):

```sh
docker-compose up
```
---

## API Endpoints

- **/api/v1/users**  
  - `POST /` Register a new user and receive JWT

- **/api/v1/sessions**  
  - `POST /` Login and receive JWT

- **/api/v1/films** (JWT required)  
  - `GET /` List films (with filtering, sorting, pagination)
  - `POST /` Create a film
  - `GET /:id` Get film by ID
  - `PATCH /:id` Update film
  - `DELETE /:id` Delete film
  - `POST /import` Bulk import films from `.txt` file

---

## Bulk Import Format

Each film in the import file should follow this format:

```
Title: <title>
Release Year: <year>
Format: <VHS|DVD|Blu-Ray>
Stars: <star1>, <star2>, ...
```

See [`sample_movies.txt`](sample_movies.txt) for an example.