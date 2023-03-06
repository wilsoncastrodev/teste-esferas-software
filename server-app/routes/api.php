<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CustomerController;

Route::apiResources([
    'customers' => CustomerController::class,
]);
