# Lession

## Docker
### Setup mysql database
```
cd docker
docker-compose up
```
## Run Project
```
yarn install
yarn run dev
```
## Migrate & Rollback database
```
#migrate
yarn run knex migrate:latest
#rollback
yarn run knex migrate:rollback
```