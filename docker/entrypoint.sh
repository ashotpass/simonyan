#!/bin/sh
set -e

# Railway's MySQL plugin exposes MYSQL_URL (and a private-network MYSQL_PRIVATE_URL).
# Map either to DB_URL so Laravel's database config can consume it directly,
# in addition to the individual MYSQL* variables already supported.
if [ -z "${DB_URL:-}" ]; then
    if [ -n "${MYSQL_PRIVATE_URL:-}" ]; then
        export DB_URL="$MYSQL_PRIVATE_URL"
    elif [ -n "${MYSQL_URL:-}" ]; then
        export DB_URL="$MYSQL_URL"
    elif [ -n "${DATABASE_URL:-}" ]; then
        export DB_URL="$DATABASE_URL"
    fi
fi

# Surface what we resolved so a stuck deploy is debuggable from logs.
echo "DB_CONNECTION=${DB_CONNECTION:-<unset>}"
if [ -n "${DB_URL:-}" ]; then
    echo "DB_URL=<set via MYSQL_URL/MYSQL_PRIVATE_URL/DATABASE_URL>"
else
    echo "MYSQLHOST=${MYSQLHOST:-<unset>} MYSQLPORT=${MYSQLPORT:-<unset>} MYSQLDATABASE=${MYSQLDATABASE:-<unset>} MYSQLUSER=${MYSQLUSER:-<unset>}"
    if [ -z "${MYSQLHOST:-}" ] && [ -z "${DB_HOST:-}" ]; then
        echo "ERROR: No database host configured. Attach Railway's MySQL plugin to this service" >&2
        echo "       and reference its variables (MYSQL_URL or MYSQLHOST/MYSQLPORT/MYSQLDATABASE/MYSQLUSER/MYSQLPASSWORD)." >&2
        exit 1
    fi
fi

# Wait for the database, but cap the wait so a misconfigured deploy fails loudly
# instead of looping forever. ~2 minutes total (60 * 2s).
attempts=0
max_attempts=60
until php artisan tinker --execute='DB::connection()->getPdo();' > /tmp/db-check.log 2>&1; do
    attempts=$((attempts + 1))
    if [ "$attempts" -ge "$max_attempts" ]; then
        echo "ERROR: Database not reachable after $((max_attempts * 2))s. Last error:" >&2
        cat /tmp/db-check.log >&2
        exit 1
    fi
    echo "Waiting for database... (attempt ${attempts}/${max_attempts})"
    sleep 2
done
echo "Database is reachable."

php artisan migrate --force
php artisan db:seed --force --class=ProductionSeeder
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan filament:cache-components || true
php artisan storage:link || true

exec /usr/bin/supervisord -c /etc/supervisord.conf
