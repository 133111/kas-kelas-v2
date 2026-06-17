<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BillingSession extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'billing_date',
        'amount_per_student',
        'status',
        'notes',
    ];

    protected $casts = [
        'billing_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function debts()
    {
        return $this->hasMany(Debt::class);
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function getPaidCountAttribute()
    {
        return $this->payments()->where('status', 'paid')->count();
    }

    public function getUnpaidCountAttribute()
    {
        return $this->payments()->where('status', 'unpaid')->count();
    }

    public function getAbsentCountAttribute()
    {
        return $this->payments()->where('status', 'absent')->count();
    }

    public function getTotalCollectedAttribute()
    {
        return $this->payments()->where('status', 'paid')->sum('amount');
    }
}
