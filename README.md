# cp-template-backend

Requirements:
NodeJS: v14.16.0
NPM: 6.14.11
Docker

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#quick-start-example">Quick Start Example</a>
    </li>
    <li>
      <a href="#initialize-postgres-db-keycloak-and-redis">Initialize Postgres DB, Keycloak and Redis</a>
      <ul>
        <li><a href="#initialization">Initialization</a></li>
        <li><a href="#using-database-admin">Using Database Admin</a></li>
      </ul>
    </li>
    <li>
      <a href="#using-migrations">Using Migrations</a>
      <ul>
        <li><a href="#generate-migration-file">Generate migration file</a></li>
        <li><a href="#run-migration">Run migration</a></li>
        <li><a href="#revert-migration">Revert migration</a></li>
        <li><a href="#create-empty-migration-file">Create empty migration file</a></li>
      </ul>
    </li>
    <li><a href="#local-development-configuration">Local development configuration</a></li>
</ol>
</details>

## Quick Start Example

- Run `docker-compose up -d` (inside docker folder) to start Postgres database
- Then run `npm run start`

## Initialize Postgres DB

All the Postgres configurations needed can be found in the docker folder.

### Initialization

From docker folder run

```sh
   docker-compose up -d
```

## Using Migrations

### Generate migration file

The migration generation script will compare the current database schema against the current entities definition.
In order to generate the difference it will look for this entities in the ./dist folder, so it is needed to
build the application first in order to generate the correct migration script

So first:

> npm run build

After that

> npm run migration:generate -- -n [migrationName]

To generate the correct migration file.

### Run migration

This command will run the pending migration files, it will compare the migrations table in the database against the
migration files located in the /dist/migration folder. This means that the application needs to be built in order to
run the migration manually.

> npm run migration:run

### Revert migration

This command will revert the last migration execution, it will take into account the migration files located in the /dist/migration folder. This means that the application needs to be built in order to run the migration manually.

> npm run migration:revert

### Create empty migration file

This command will create a new migration, it will take into account the migration files located in the /dist/migration folder. This means that the application needs to be built in order to run the migration manually.

> npm run migration:create -- -n [migrationName]

## Local development configuration

Most of the configurations needed are set by default, to check which environment variables can be set or which are
mandatory look into the /.sample-env file. Create a .env file into the root folder with the configurations needed
and start the project with

```sh
   npm run start
```
