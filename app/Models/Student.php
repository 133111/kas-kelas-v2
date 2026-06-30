<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'nomor_absen',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }

    public function debts()
    {
        return $this->hasMany(Debt::class);
    }

    public function activeDebts()
    {
        return $this->hasMany(Debt::class)->where('is_settled', false);
    }

    public function getPaymentRateAttribute()
    {
        $totalSessions = BillingSession::count();
        if ($totalSessions === 0) return 0;
        $paidCount = $this->payments()->where('status', 'paid')->count();
        return round(($paidCount / $totalSessions) * 100, 1);
    }

    public function getTotalDebtAttribute()
    {
        return $this->debts()->where('is_settled', false)->sum('amount');
    }
}
