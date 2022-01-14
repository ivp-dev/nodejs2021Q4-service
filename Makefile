.PHONY: add-migration
add-migration:
	npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate --name $(name)

create-migration:
	npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create --name $(name)
	
apply-migration:
	npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run

.PHONY: build
build:
	cd ./docker && docker-compose --env-file ../.env.docker build
	cd ./docker && docker-compose --env-file ../.env.docker up -d
	docker exec -it ivp-rss-http-api npm run apply-migrations

.PHONY: build-no-cache
build-no-cache:
	cd ./docker && docker-compose --env-file ../.env.docker build --no-cache
	cd ./docker && docker-compose --env-file ../.env.docker up -d
	docker exec -it ivp-rss-http-api npm run apply-migrations

.PHONY: upd
upd:
	cd ./docker && docker-compose --env-file ../.env.docker up -d
	docker exec -it ivp-rss-http-api npm run apply-migrations

.PHONY: up
up:
	cd ./docker && docker-compose --env-file ../.env.docker up
	docker exec -it ivp-rss-http-api npm run apply-migrations