<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Local Project setup

### Installation

```bash
$ npm install
```

### DB configuration

Expose a postgres DB server with the following features:

- DB name: `devify-magic`
- server port: `5432`
- username: `postgres`
- password: `postgres`

### Pass DB config through env vars

`development env`: create a file in the project root with the following name: `.env.development.local`

Add the DB config variables (if you follow the above config) it should be like this:

```
DB_USER='postgres'
DB_PASSWORD='postgres'
DB_HOST='localhost'
DB_PORT=5432
DB='devify-magic'
```

### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Containerized Project setup (app and DB engine)

Run `docker compose up` in your project root folder.
Connect to the database with your db UI interface: it will be exposes at your `localhost:5432`

Register a DB server with this info

```
- server port: `5432`
- username: `postgres`
- password: `postgres`
- hostname: `localhost`
```

Create a database with the following name: `devify-magic`

Run the migrations to create the DB tables and populate the house table: `npm run migration:run`

Check if there are any pending migration: `npm run migration:show`
if you run the migrations successfully the above command should output like this:

```
[X] 1 TablesSetup1722372435215
[X] 2 Fixture1722372479985
```

Once you create the DB, stop the running container and restart from your terminal:

```
ctrl-c
docker compose up
```

## API documentation

`Swagger`: Go to http://localhost:3000/api#/ to explore the API docs
Documentation is been autogenerate with swagger cli plugin: https://docs.nestjs.com/openapi/cli-plugin#cli-plugin

### Usage Examples:

Create a Student: POST `http://localhost:3000/students`
Body:

```
{
    "name": "harry"
    "age": "12",
    "bravery": 5,
    "loyalty": 5,
    "intelligence": 3,
    "ambition": 4
}
```

Note: use postman `raw` with JSON format to use the above JSON

Get all the students: GET `http://localhost:3000/students`

Get all the students in a house: GET `http://localhost:3000/houses/:name/students`

Assign a Student to a house: POST `http://localhost:3000/students/:id/assign-house`

## Technical decisions

### Data retrieving strategy

I chose the repository pattern to handle database queries. It's a bit verbose, but it scales better and create a better separation of concerns between the service layer and the model/entity layer. (An alternative for small project is Active Record Pattern)

### Data Validation

Data input will validated with schemas input (dto). In case the user sent extra fields for post or put request, those field will
stripped out.
The same is done for outgoing data. Is validated with interceptors and DTOs.

## Assignment algorithm

The assignment of a student to a house will follow these rules:

1. Evaluate the highest skill score for the student. If a single highest score exists, the student will be assigned according to it following this config:

```
{
 bravery: 'gryffindor',
 loyalty: 'hufflepuff',
 intelligence: 'ravenclaw',
 ambition: 'slytherin',
 }
```

2. If a Student has even skills, it will be assigned to any house matching the highest skills. The algorithm will pick the house with fewer students.
3. Suppose both of the above criteria are not sufficient to make a decision. In that case, the algorithm will select the house alphabetically from those matching the highest Student skills score.

## Business Assumptions

I've assumed that it is a business rule to separate the time to add a student from the time to assign it to a house. That being said, assigning a user is always done by posting to http://localhost:3000/students/:id/assign-house, but it will never happen automatically. However, it could be automated in the student creation and update methods.

## ToDo's list

- Move the method to add a student to a house to the house entity
- Create e2e tests
- Fix the documented code todo's
- Improve output schema DTOs

## Development process

This project has been developed incrementally, and there are many places to improve it.
Iterative, any feature could be added or enhanced.

## Architecture

The project was planed in layers, and the Nest framework guide you in that process:

- Models layer, Repository layer (persistence), service layer (business rules) and controller (presentation and validation)
- I've tried to keep my self close to the SOLID principles.
- I've follow best practices to write and also to organize the code.
- There's many ToDo's documented in the code that will improve it form architectural perspective.

## Docker useful commands

- access to the shell of the app container: `docker exec -it nest-docker-postgres sh`

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
