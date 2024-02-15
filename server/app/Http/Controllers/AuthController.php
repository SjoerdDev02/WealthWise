<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\Investment;
use App\Models\Liability;
use App\Models\Preference;
use App\Models\Snapshot;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginUserRequest $request)
    {
        $request->validated($request->only(['email', 'password']));

        if (!Auth::attempt($request->only(['email', 'password']))) {
            return $this->error('', 'Credentials do not match', 401);
        }

        $user = User::with('preference')->where('email', $request->email)->first();

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function register(StoreUserRequest $request)
    {
        $request->validated($request->only(['name', 'email', 'password']));

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Preference::create([
            'user_id' => $user->id,
        ]);

        $snapshot = Snapshot::create([
            'user_id' => $user->id,
            'year' => date("Y"),
            'month' => date("n"),
            'income' => 5000,
            'expenses' => 3500,
            'total_investments' => 12000,
            'total_liabilities' => 7000,
        ]);

        Investment::create([
            'snapshot_id' => $snapshot->id,
            'source' => 'stocks',
            'amount' => 2000,
        ]);

        Liability::create([
            'snapshot_id' => $snapshot->id,
            'source' => 'mortgage',
            'amount' => 2000,
        ]);

        return $this->success([
            'user' => $user,
            'token' => $user->createToken('API Token')->plainTextToken
        ]);
    }

    public function getUser()
    {
        $user = User::with(['preference'])->find(Auth::id());
    
        if (!$user) {
            return $this->error('', 'User not authenticated', 401);
        }
    
        return $this->success([
            'user' => $user,
        ]);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();

        return $this->success([
            'message' => 'You have succesfully been logged out and your token has been removed'
        ]);
    }

    public function delete(Request $request)
    {
        $user = $request->user();

        $user->tokens()->delete();

        $user->delete();

        return $this->success([
            'message' => 'Your account has been successfully deleted'
        ]);
    }

    public function updateInfo(UpdateUserRequest $request) {
        $user = User::find(Auth::id());

        if (!$user) {
            return $this->error('', 'User not authenticated', 401);
        }

        $user->name = $request->name;
        $user->email = $request->email;

        $user->save();
    
        return $this->success([
            'message' => 'Success'
        ]);
    }

    public function updatePassword(UpdatePasswordRequest $request) {
        $user = User::find(Auth::id());
        
        if (!$user) {
            return $this->error('', 'User not authenticated', 401);
        }

        $user->password = Hash::make($request->password);

        $user->save();
    
        return $this->success([
            'message' => 'Success'
        ]);
    }
}