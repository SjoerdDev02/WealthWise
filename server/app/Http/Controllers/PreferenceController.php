<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePreferencesRequest;
use App\Models\Preference;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Traits\HttpResponses;

class PreferenceController extends Controller
{
    use HttpResponses;

    public function updatePreferences(UpdatePreferencesRequest $request)
    {
        $preferences = Preference::where('user_id', Auth::id())->first();
    
        if (!$preferences) {
            return $this->error('', 'User preferences not found', 404);
        }
    
        $preferences->currency = $request->currency;
        $preferences->mode = $request->mode;
    
        $preferences->save();
    
        return $this->success([
            'preference' => $preferences,
            'message' => 'Preferences updated successfully'
        ]);
    }    
}
