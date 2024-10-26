# Product Management System

This is a simple product management system with a backend REST API built with Node.js, Express, and PostgreSQL, and a frontend using Axios and Bootstrap. 

### Deployment:
You can see the deployment on the website:
<http://20.244.94.77:3000/products>

Credential:
username: user
password: password

## Table of Contents
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [Usage](#usage)

## Installation

### 1. Install PostgreSQL
Update the package list and install PostgreSQL:
```bash
sudo apt update
sudo apt install postgresql
```

### 2. Install Node.js and npm

Install Node.js and npm:

```bash
sudo apt install npm node
```

## Database Setup

### 1. Start and Enable PostgreSQL Service

Start and enable PostgreSQL to run on boot:
```bash
sudo systemctl start postgresql.service
sudo systemctl enable postgresql.service
```

### 2. Create Database and Tables

Access the PostgreSQL prompt:
```bash
sudo -u postgres psql
```

Create a new database and switch to it:

```sql
postgres=# CREATE DATABASE product_management;
postgres=# \c product_management;
```
Create the products and users tables:

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price FLOAT NOT NULL,
    quantity INTEGER NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);
```
Create a PostgreSQL user with a strong password for database access:
```sql
CREATE USER admin WITH PASSWORD 'Str0ngk3y46721' SUPERUSER;
```

Insert a user in users table:
```sql
INSERT INTO users (username, password) VALUES (Your_USERNAME, Your_PASSWORD_HASH);
```

Exit the PostgreSQL prompt with `\q`.


## Backend Setup

1. Navigate to the backend directory and initialize a Node.js project:
```bash
cd product-management-backend
npm init -y
```
2. Install the necessary dependencies:
```bash
npm install express pg bcryptjs jsonwebtoken dotenv cors
```
3. Create an .env file in the root of the backend directory:
```bash
PORT=5000
DATABASE_URL=postgresql://admin:Str0ngk3y46721@localhost:5432/product_management
JWT_SECRET=your_jwt_secret
```

## Frontend Setup

1. Navigate to the frontend directory and install Axios and Bootstrap:

```bash
cd product-management-frontend
nvm install 18.18.0
nvm use 18.18.0
npm install axios bootstrap
```

2. Update the Axios library link in your frontend code, replacing localhost with your backend server’s IP or domain name to ensure connectivity.

## Usage

Start the PostgreSQL server if it isn’t already running:

```bash
sudo systemctl start postgresql.service
```
Run the backend server:

``` bash
node index.js
```
Run and build the Frontend :
``` bash
npm run build
npm start
```
Open the frontend in a browser, making sure it connects to the backend API as specified.
