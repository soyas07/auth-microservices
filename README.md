# Authentication Microservice with Express, Node.js

This is a simple authentication microservice built using Express.js, Node.js, and JWT Authentication. It provides user authentication functionality for your web or mobile application.

## Features

- User Authentication: Authenticate users using json web token
- Secure Authentication: Utilize JWT Authentication to ensure secure user authentication.
- RESTful API: Follow RESTful principles to design API endpoints for user-related operations.

## Technologies Used

- Node.js: A JavaScript runtime for building server-side applications.
- Express.js: A web application framework for Node.js..
- Morgan: HTTP request logger middleware for node.js
- Helmet: Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
- Dotenv: Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`
- Cors: CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Development utilities

- Nodemon: Nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
- Eslint: ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- Jest: Jest is a delightful JavaScript Testing Framework with a focus on simplicity.
- Supertest: HTTP assertions made easy via superagent.

## APIs List
## POST: /api/v1/token 
- This API endpoint generates an access token and a refresh token based on the provided roles and set the token and refresh token into set-cookie response header.

- **Method:** `POST`
- **Endpoint:** `/api/v1/token`
- **Request Body:**
```json
{
  "roles": ["admin", "user",...]
}
```
- **Response:**
```json
{
  "message": "ok"
}
```

## POST: /api/v1/auth 
- This API endpoint authenticates for only "admin" or "user" roles and verifies token.

- **Method:** `POST`
- **Endpoint:** `/api/v1/auth`
- **Header:**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlcyI6WyJhZG1pbiIsInVzZXIiXSwiaWF0IjoxNzA2ODQ3OTcyLCJleHAiOjE3MDY4NDg4NzJ9.N2MnSZSdJgTS2L-Cfui4YRFOte2T9YS3vbNtaGB76f8
```
- **Request Body:**
```json
no request body
```
- **Response:**
```json
{
  "message": "ok"
}
```

## POST: /api/v1/renewToken 
- This API endpoint renews the token using the refresh token and set the token into the set-cookie response header.

- **Method:** `GET`
- **Endpoint:** `/api/v1/renewToken`
- **Request Body:**
```json
no request parameters
```
- **Response:**
```json
{
  "message": "ok"
}
```


## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Development

```
npm run dev
```
