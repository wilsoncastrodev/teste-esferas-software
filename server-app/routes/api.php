<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\OrderController;

Route::apiResources([
    'customers' => CustomerController::class,
    'products' => ProductController::class,
    'orders' => OrderController::class,
]);
