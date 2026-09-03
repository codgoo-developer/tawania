<?php

if (!function_exists('api_response')) {
    function api_response($success = true, $message = '', $data = null, $code = 200) {
        return response()->json([
            'success' => $success,
            'message' => $message,
            'data' => $data,
        ], $code);
    }
}
