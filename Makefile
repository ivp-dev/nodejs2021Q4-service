.PHONY: add-migration
add-migration:
	npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate --name $(name) --config srs/common/config.typeorm.ts

create-migration:
	npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:create --name $(name) --config srs/common/config.typeorm.ts

.PHONY: build
build:
	cd ./docker && docker-compose --env-file ../.env build
	cd ./docker && docker-compose --env-file ../.env up -d
	docker exec -it ivp-rss-http-api npm run apply-migrations

.PHONY: upd
upd:
	cd ./docker && docker-compose --env-file ../.env up -d
	docker exec -it ivp-rss-http-api npm run apply-migrations

.PHONY: up
up:
	cd ./docker && docker-compose --env-file ../.env up
	docker exec -it ivp-rss-http-api npm run apply-migrations