<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateSnapshotRequest;
use App\Http\Requests\UpdateSnapshotRequest;
use App\Models\Investment;
use App\Models\Liability;
use App\Models\Snapshot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Traits\HttpResponses;

class SnapshotController extends Controller
{
    use HttpResponses;

    public function createSnapshot(CreateSnapshotRequest $request)
    {
        $snapshot = Snapshot::create([
            'user_id' => Auth::id(),
            'year' => $request->year,
            'month' => $request->month,
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

        $snapshot->load('investments', 'liabilities');

        return $this->success([
            'snapshot' => $snapshot,
        ]);
    }

    public function getSnapshot(Request $request)
    {
        $year = $request->query('year');
        $month = $request->query('month');
    
        $query = Snapshot::where('user_id', Auth::id())->with(['investments', 'liabilities']);
    
        if ($year) {
            $query->where('year', $year);
        }
        if ($month) {
            $query->where('month', $month);
        }
    
        $snapshot = $query->latest()->first();

        if (!$snapshot) {
            return $this->success([]);
        }

        return $this->success([
            'snapshot' => $snapshot,
        ]);
    }

    public function updateSnapshot(UpdateSnapshotRequest $request)
    {
        // Getting snapshot
        $snapshot = Snapshot::find($request->id);
    
        // Check if the snapshot exists
        if (!$snapshot) {
            return $this->error('', 'Snapshot not found', 404);
        }
    
        // Update snapshot attributes
        $snapshot->update([
            'year' => $request->year,
            'month' => $request->month,
            'income' => $request->income,
            'expenses' => $request->expenses,
            'total_investments' => $request->total_investments,
            'total_liabilities' => $request->total_liabilities,
        ]);
    
        // Delete existing investments and liabilities associated with the snapshot
        $snapshot->investments()->delete();
        $snapshot->liabilities()->delete();
    
        // Insert new investments and liabilities
        foreach ($request->investments as $investment) {
            $snapshot->investments()->create([
                'source' => $investment['source'],
                'amount' => $investment['amount'],
            ]);
        }
    
        foreach ($request->liabilities as $liability) {
            $snapshot->liabilities()->create([
                'source' => $liability['source'],
                'amount' => $liability['amount'],
            ]);
        }
    
        // Return success message with the updated snapshot
        $updated_snapshot = Snapshot::where('id', $snapshot->id)->with(['investments', 'liabilities'])->first();
    
        return $this->success([
            'snapshot' => $updated_snapshot,
        ]);
    }    
}