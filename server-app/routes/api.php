<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;
use App\Http\Controllers\Api\ProductController;

Route::apiResources([
    'customers' => CustomerController::class,
    'products' => ProductController::class,
]);
