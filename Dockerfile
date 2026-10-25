FROM node:20-alpine AS frontend
# Apply Alpine security updates on top of the base image.
RUN apk upgrade --no-cache
WORKDIR /app
COPY package*.json ./
RUN npm ci
# Surface npm advisories in the build log. Fail the build on high/critical
# so a serious regression stops the deploy; moderate/low are left as warnings
# (the current moderate advisory on postcss-selector-parser is reachable only
# through attacker-controlled CSS at build time, which isn't our threat model).
RUN npm audit --audit-level=high || (echo "::error::npm audit found high/critical advisories" && exit 1)
COPY . .
RUN npm run build && npm run build:ssr

FROM composer:2 AS vendor
# Apply Alpine security updates on top of the base image.
RUN apk upgrade --no-cache
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts \
    --ignore-platform-req=ext-intl \
    --ignore-platform-req=ext-gd
# Surface any production-dep advisories in the build log. Non-blocking so a
# newly disclosed CVE doesn't take the site offline, but visible so we act.
RUN composer audit --no-dev --locked --format=plain || echo "::warning::composer audit flagged advisories (see above)"

FROM dunglas/frankenphp:1-php8.4-alpine
# Apply Alpine security updates (OpenSSL, CA certs, libxml, zlib, …) before
# PHP extensions are compiled against them. The 1-php8.4-alpine floating tag
# itself ships the latest PHP 8.4 patch release; this covers the OS layer.
RUN apk upgrade --no-cache
WORKDIR /app
RUN install-php-extensions pdo_mysql mbstring gd zip intl bcmath
RUN apk add --no-cache nodejs npm supervisor

COPY . /app
COPY --from=vendor /app/vendor /app/vendor
COPY --from=frontend /app/public/build /app/public/build
COPY --from=frontend /app/bootstrap/ssr /app/bootstrap/ssr
COPY --from=frontend /app/node_modules /app/node_modules

RUN chown -R www-data:www-data storage bootstrap/cache && chmod -R 775 storage bootstrap/cache
COPY docker/supervisord.conf /etc/supervisord.conf
COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Print the PHP version at build time so Railway's build log shows exactly
# which patch level is in the image (easy audit trail for CVE triage).
RUN php -v

EXPOSE 8080
CMD ["/entrypoint.sh"]
