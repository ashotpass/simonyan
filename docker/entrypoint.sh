#!/bin/sh
set -e

# Wait until DB is reachable (migrate:status returns 0 if up-to-date, 1 if pending migrations — both mean DB connection works).
until php artisan migrate:status > /dev/null 2>&1 || [ $? -eq 1 ]; do
    echo "Waiting for database..."
    sleep 2
done

php artisan migrate --force
php artisan db:seed --force --class=ProductionSeeder
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan filament:cache-components || true
php artisan storage:link || true

exec /usr/bin/supervisord -c /etc/supervisord.conf
