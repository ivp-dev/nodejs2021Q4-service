# Run application with Docker

## Windows

To avoid this [issue with powershell and docker](https://forums.docker.com/t/error-while-running-docker-code-in-powershell/34059/5) run this code snippet before you will clone the repository

```sh
git config --global core.autocrlf input
```

```sh
git clone https://github.com/ivp-dev/nodejs2021Q4-service.git

cd ./nodejs2021Q4-service

git switch postgres

npm install

cd ./docker

docker-compose --env-file ../.env build

docker-compose --env-file ../.env up -d

docker exec -it ivp-rss-http-api npm run apply-migrations

npm run test:auth

```

## Linux / Mac OS

```sh

git clone https://github.com/ivp-dev/nodejs2021Q4-service.git

cd ./nodejs2021Q4-service

git switch postgres

npm install

make build

make migrate

npm run test:auth

```

## API description

> localhost:4000/login - Auth
- POST login - get JWT token
> localhost:4000/users
- POST users - add user
- GET users - get users
- GET users/:id - get user by id
- PUT users/:id - update user by id
- DELETE users/:id - delete user by id
> localhost:4000/boards
- POST boards - add board
- GET boards - get boards
- GET boards/:id - get board by id
- PUT boards/:id - update board by id
- DELETE boards/:id - delete board by id
> localhost:4000/boards/:boardId/tasks
- POST tasks - add task
- GET tasks - get all tasks
- GET tasks/:id - get task by id
- PUT tasks/:id - update task by id
- DELETE tasks/:id - delete task by id
> localhost:4000/file
- POST file - add file
- GET file/:fileName - get file by name

# Performance comparison of both platforms (Fastify vs Express)

## Exress

![express](https://user-images.githubusercontent.com/24565710/152748014-547f8a79-93e6-46f5-9178-95f6bdfb8415.png)

## Fastify

![fastify](https://user-images.githubusercontent.com/24565710/152748056-d379cdd9-7f06-4805-882e-e12f45068826.png)

# RS School REST service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm test
```

To run only one of all test suites (users, boards or tasks)

```
npm test <suite name>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization (users, boards or tasks)

```
npm run test:auth <suite name>
```

## Development

If you're using VSCode, you can get a better developer experience from integration with [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) extensions.

### Auto-fix and format

```
npm run lint
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
