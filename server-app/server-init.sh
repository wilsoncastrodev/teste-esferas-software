#!/bin/bash -it

cp .env.example .env
composer install
chmod -R 777 storage
php artisan route:clear
php artisan cache:clear
php artisan config:clear
php artisan key:generate
php artisan migrate
