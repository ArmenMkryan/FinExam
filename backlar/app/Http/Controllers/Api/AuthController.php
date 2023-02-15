<?php
namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller
{


    public function register (RegisterRequest $request) {
        $data = $request->validated();
        /** @var \App\Models\User $user */
        $user = User::Create([
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        $token = $user->createToken('main')->plainTextToken;
        return response(compact('user', 'token'));
       }

    public function login (LoginRequest $request) {
$cred = $request -> validated();
if(!Auth::attempt($cred)){
    return response()->json([
        "message" => 'Email or password is incorrect'
    ], 422);
}
/** @var User $user */
$user = Auth::user();
$token = $user->createToken('main')->plainTextToken;

return response(compact('user', 'token'));
   }

   public function logout(Request $request)
   {
       $user = Auth::user();
       $user->currentAccessToken()->delete();

       return response()->json(['message' => 'Logged out successfully.'], 200);
   }


//    public function logout (Request $request) {
// $user = $request->user();
// $user -> currentAccessToken()->delete();
// return response("", 204);
//    }
}
