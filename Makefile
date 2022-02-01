.PHONY: add-migration
add-migration:
	npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate --name $(name)

.PHONY: create-migration
create-migration:
	npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create --name $(name)
	
.PHONY: apply-migration
apply-migration:
	npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run
	
.PHONY: build
build:
	cd ./docker && docker-compose --env-file ../.env.docker build
	cd ./docker && docker-compose --env-file ../.env.docker up -d

.PHONY: build-no-cache
build-no-cache:
	cd ./docker && docker-compose --env-file ../.env.docker build --no-cache
	cd ./docker && docker-compose --env-file ../.env.docker up -d

.PHONY: upd
upd:
	cd ./docker && docker-compose --env-file ../.env.docker up -d

.PHONY: upb
upb:
	cd ./docker && docker-compose --env-file ../.env.docker up --build

.PHONY: up
up:
	cd ./docker && docker-compose --env-file ../.env.docker up

.PHONY: migrate
migrate: 
	docker exec -it ivp-rss-http-api npm run apply-migrations