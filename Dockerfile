FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm run build:ssr

FROM composer:2 AS vendor
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --no-scripts \
    --ignore-platform-req=ext-intl \
    --ignore-platform-req=ext-gd

FROM dunglas/frankenphp:1-php8.4-alpine
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

EXPOSE 8080
CMD ["/entrypoint.sh"]
