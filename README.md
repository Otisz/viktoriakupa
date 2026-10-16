# viktoriakupa.at

Laravel 13 + Inertia (React) site with a Filament admin panel at `/studio`.

## Local setup

Requires Docker only. PHP, Composer and Bun run inside containers; `vendor/` and `node_modules/` are written to the project folder so the IDE can index them.

```sh
cp .env.example .env
docker compose run --rm app composer install
docker compose run --rm bun bun install
docker compose run --rm app php artisan key:generate
docker compose run --rm app php artisan migrate
docker compose run --rm app php artisan storage:link
docker compose up -d
```

| Service | URL |
| --- | --- |
| Site | http://localhost:8000 |
| Admin | http://localhost:8000/studio |
| Vite | http://localhost:5173 |
| Mailpit | http://localhost:8025 |
| MySQL | localhost:3306 |

### SSR

While the `bun` service runs Vite, pages are server-rendered through Vite automatically. To test the production SSR bundle instead:

```sh
docker compose stop bun
docker compose run --rm bun bun run build:ssr
docker compose --profile ssr up -d ssr
```

## Common commands

```sh
docker compose exec app php artisan test
docker compose exec app vendor/bin/pint
docker compose exec bun bun run check
docker compose exec bun bun run types
```
