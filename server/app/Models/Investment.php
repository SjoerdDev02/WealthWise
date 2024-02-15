<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    use HasFactory;

    protected $fillable = [
        'snapshot_id',
        'source',
        'amount',
    ];

    public function snapshot()
    {
        return $this->belongsTo(Snapshot::class);
    }
}
