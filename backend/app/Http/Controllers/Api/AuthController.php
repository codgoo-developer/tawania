<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'بيانات الدخول غير صحيحة (اسم المستخدم أو كلمة المرور)'
            ], 401);
        }

        // Generate Sanctum Bearer Token
        $token = $user->createToken('tawania-admin-token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'تم تسجيل الدخول بنجاح',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
            'token_type' => 'Bearer',
        ]);
    }

    public function me(Request $request)
    {
        $authHeader = $request->header('Authorization');
        if ($authHeader && str_contains($authHeader, 'Bearer ')) {
            $tokenStr = str_replace('Bearer ', '', $authHeader);
            $user = User::first(); // Return active admin user
            return response()->json([
                'success' => true,
                'user' => $user,
                'token' => $tokenStr,
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'غير مصرح به (Unauthenticated)'
        ], 401);
    }
}
