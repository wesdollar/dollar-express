# Retailer Product Service

Service for returning products by retailer. Supports searching products by:

- retailer
- retailer with sku
- category id
  - category id queries categories and sub categories
  - categories are and should be kept unique to retailers

## Project Setup

This project requires an Artifactory auth token. For instructions for obtaining an auth token, please refer to the Artifactory section of the README.

- Clone repo to local working directory
- Run the following commands from project root:
  - `yarn install`
  - `docker-compose up`
- From within the Docker CLI for `retailer-product-service`, run:
  - `yarn sequelize-init`

###### pgAdmin

To connect pgAdmin to your local DB instance:

- From you local terminal with the containers running, run `docker inspect pgadmin`
- Grab the `Gateway` IP address
- Use the `Gateway` IP address for "hostname/address" in connection

###### Postman Collection

A shared Postman collection is available via [this link](https://go.postman.co/workspace/Wes's-Workspace~52143f42-eb92-46f4-8874-e61ed291906b/collection/17813574-77c413c6-87e6-4d3d-8d2b-3526679f1200?action=share&creator=17813574).

## ORM for Postgres

This project uses Sequelize ORM. Sequelize provides a CLI for functions such as generating migrations, table seeders, and migrations. For a full list of Sequelize CLI commands, run `yarn sequelize-cli` from your local terminal or see [Sequelize docs](https://sequelize.org/).

If you've never worked with Sequelize before, please take the time to review [the docs](https://sequelize.org/). You are encouraged to the read the docs from start to finish so you, too, can harness the full power of Sequelize.

## Housekeeping

This project uses Yarn 3.2.1. **Do not run `npm` commands, as this will cause conflicts**. Yarn 3.2.1 leverages PnP. As such, there is no `node_modules` directory. For more information, please see the [Yarn documentation](https://yarnpkg.com/).

## Docker Setup

To launch dev environment, run `docker-compose up`.

This project is fully Dockerized for local development. The Docker setup includes:

- NodeJS, 16.16-alpine
- Postgres
- pgAdmin, web-based GUI

#### Development Environment

- Typescript
- VS Code settings are pre-configured; details available in the `.vscode` directory
  - Please do not change these settings without the permission of Wes Dollar
- Auto-formatting by way of Prettier, stock configuration
- ESLint, heavily customized, rules available in `.eslintrc`
  - Please do not modify the ESLint configuration without permission from Wes Dollar
- Jest for unit tests
- Yarn 3.2.1 for package management
- Joi for data validation
- Sequelize for ORM, db migrations and seeding

Please see `package.json` for additional tools that have been installed to make life easier, such as Lodash, Numbro, and many others.

## Testing Practices

- Unit tests should appear alongside their respective counterpart, bearing the same filename with the addition of `.test`, example below:
  - Filename `get-product.ts` should have a test in the same directory called `get-product.test.ts`
- Mock all imports appropriately, paying special attention to never calling the DB in your tests
- Integration tests should be limited to key functionality and used sparingly; this requires proper and diligent mocking
- Test coverage must remain above 80%

## To Do Items

[ ] Create Excel parser for hydrating the DB
[ ] Docker networking such that pgAdmin has a fixed gateway
[ ] Write quick-start script for setting dev environment
[ ] Comb through package dependencies to remove unused packages
