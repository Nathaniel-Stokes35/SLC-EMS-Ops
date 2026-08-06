# SLC-EMS-OPS

## Contributors

* **Nathaniel Stokes**
* **[Contributor Name]**
* **[Contributor Name]**

## Overview

**SLC-EMS-OPS** is a REST API designed to support emergency medical aviation operations associated with **Salt Lake City International Airport (SLC)**.

The application provides a centralized backend for managing and monitoring operational information involving:

* Pilots
* Helicopters
* Airports
* Weather conditions

The goal of SLC-EMS-OPS is to provide structured access to the information needed to monitor aviation resources and conditions relevant to EMS flight operations.

## Technology Stack

SLC-EMS-OPS is built with **Node.js** and **Express** using a CommonJS project structure.

The project uses:

* **Node.js** — JavaScript runtime
* **Express 5** — Web server and REST API framework
* **MongoDB** — Database
* **MongoDB Node.js Driver** — Database connectivity and operations
* **Passport.js** — Authentication
* **GitHub OAuth** — User authentication through GitHub
* **Express Session** — Session management
* **Connect Mongo** — Persistent MongoDB-backed session storage
* **Express Validator** — Request validation
* **Validator.js** — Additional data validation
* **CORS** — Cross-origin resource sharing
* **Swagger UI Express** — Interactive API documentation
* **Swagger Autogen** — Swagger/OpenAPI documentation generation
* **dotenv** — Environment variable management
* **Nodemon** — Development server with automatic restart

## Data Resources

The API is organized around four primary operational resources.

### Pilots

Stores and manages information related to pilots involved in EMS aviation operations.

### Helicopters

Stores information about helicopters and aircraft resources available for EMS operations.

### Airports

Provides airport-related information relevant to flight operations centered around Salt Lake City International Airport.

### Weather

Provides weather information used to monitor environmental conditions that may affect aviation and EMS operations.

## Project Structure

A typical project structure may resemble:

```text
SLC-EMS-Ops/
│
├── controllers/
│   ├── pilots.js
│   ├── helicopters.js
│   ├── airports.js
│   └── weather.js
│
├── routes/
│   ├── pilots.js
│   ├── helicopters.js
│   ├── airports.js
│   └── weather.js
│
├── middleware/
│
├── public/
│
├── server.js
├── swagger.js
├── swagger.json
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── README.md
```

> The exact structure may differ as development continues.

## Getting Started

### Prerequisites

Before running the application, make sure you have:

* Node.js installed
* npm installed
* Access to a MongoDB database
* GitHub OAuth credentials if testing authenticated functionality

### Installation

Clone the repository:

```bash
git clone https://github.com/Nathaniel-Stokes35/SLC-EMS-Ops.git
```

Navigate into the project:

```bash
cd SLC-EMS-Ops
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory of the project.

The application may require environment variables similar to:

```env
MONGODB_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

Use the variable names expected by the application if they differ from the examples above.

**Never commit the `.env` file or authentication secrets to the repository.**

## Running the Application

### Production / Standard Start

```bash
npm start
```

This runs:

```bash
node server.js
```

### Development

```bash
npm run dev
```

This uses Nodemon to automatically restart the server when source files change.

### Generate Swagger Documentation

```bash
npm run swagger
```

This runs:

```bash
node swagger.js
```

to generate or update the Swagger API documentation.

## API Documentation

SLC-EMS-OPS uses **Swagger/OpenAPI** documentation to provide an interactive description of the API.

Once the application is running, the Swagger interface can be used to inspect and test available API routes.

The API documentation is generated using `swagger-autogen` and served using `swagger-ui-express`.

## Authentication

SLC-EMS-OPS uses **Passport.js** with **GitHub OAuth** for authentication.

Authenticated users sign in through GitHub rather than providing their GitHub credentials directly to SLC-EMS-OPS.

Session information is managed using `express-session` and can be persisted in MongoDB using `connect-mongo`.

Authentication may be used to restrict operations that modify API data while allowing appropriate public access to read-only resources.

## Validation

Incoming API data is validated before database operations are performed.

The project includes:

* `express-validator`
* `validatorjs`

Validation helps prevent malformed or incomplete information from being stored in the database and allows the API to return meaningful HTTP error responses when requests are invalid.

## API Resources

The API is intended to expose RESTful routes for the following resources:

```text
/pilots
/helicopters
/airports
/weather
```

Individual routes and supported HTTP methods should be referenced through the project's Swagger documentation as development progresses.

Typical REST operations may include:

```text
GET     /resource
GET     /resource/:id
POST    /resource
PUT     /resource/:id
DELETE  /resource/:id
```

## HTTP Response Codes

The API should return appropriate HTTP status codes based on the result of each request, including:

| Status                      | Meaning                                 |
| --------------------------- | --------------------------------------- |
| `200 OK`                    | Request completed successfully          |
| `201 Created`               | A new resource was successfully created |
| `204 No Content`            | Request succeeded with no response body |
| `400 Bad Request`           | Request data was invalid                |
| `401 Unauthorized`          | Authentication is required              |
| `403 Forbidden`             | User does not have permission           |
| `404 Not Found`             | Requested resource could not be found   |
| `500 Internal Server Error` | An unexpected server error occurred     |

## Development Scripts

| Command           | Description                                 |
| ----------------- | ------------------------------------------- |
| `npm start`       | Starts the application using Node.js        |
| `npm run dev`     | Starts the development server using Nodemon |
| `npm run swagger` | Generates/updates Swagger documentation     |

## Repository

The source code for SLC-EMS-OPS is maintained on GitHub:

`Nathaniel-Stokes35/SLC-EMS-Ops`

Issues and bugs can be reported through the repository's **Issues** section.

## License

This project is licensed under the **ISC License**.

---

**SLC-EMS-OPS**
*Salt Lake City Emergency Medical Services Aviation Operations API*
