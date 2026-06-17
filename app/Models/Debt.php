<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Debt extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'billing_session_id',
        'amount',
        'is_settled',
        'settled_in_session_id',
        'settled_at',
    ];

    protected $casts = [
        'is_settled' => 'boolean',
        'settled_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function billingSession()
    {
        return $this->belongsTo(BillingSession::class);
    }

    public function settledInSession()
    {
        return $this->belongsTo(BillingSession::class, 'settled_in_session_id');
    }
}
