<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

class BaseController extends Controller
{
    public function sendResponse($result, $message = null)
    {
        $response = $result;

        if ($message) {
            $response['message'] = $message;
        }

        return response($response, 201);
    }

    public function sendError($message, $errorMessages = [], $code = 404)
    {
        $response['message'] = $message;

        if (!empty($errorMessages)) {
            $response['data'] = $errorMessages;
        }

        return response($response, $code);
    }
}
