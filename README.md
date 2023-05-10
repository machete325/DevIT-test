# Existing user
email: admin@devit.com
password: admin

### 1. Install all dependecies for client and server

```bash
npm install
```
### 2. Raise the database in Docker and generate SEED

```bash
npm run init:db
```
### 3. Start NestJS server

```bash
npm run start:server:dev
```
### 4. Start React client

```bash
npm run start:client:dev
```