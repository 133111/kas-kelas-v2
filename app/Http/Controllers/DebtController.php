<?php

namespace App\Http\Controllers;

use App\Models\Debt;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DebtController extends Controller
{
    public function index()
    {
        $debts = Debt::with(['student', 'billingSession'])
            ->where('is_settled', false)
            ->latest()
            ->get()
            ->map(function ($debt) {
                return [
                    'id' => $debt->id,
                    'student_id' => $debt->student_id,
                    'student_name' => $debt->student->name,
                    'student_nis' => $debt->student->nis,
                    'nomor_absen' => $debt->student->nomor_absen,
                    'amount' => $debt->amount,
                    'session_date' => $debt->billingSession->billing_date->format('d M Y'),
                    'created_at' => $debt->created_at->format('d M Y'),
                ];
            });

        $totalDebt = Debt::where('is_settled', false)->sum('amount');
        $totalDebtors = Debt::where('is_settled', false)->distinct('student_id')->count('student_id');

        return Inertia::render('Debts/Index', [
            'debts' => $debts,
            'totalDebt' => $totalDebt,
            'totalDebtors' => $totalDebtors,
        ]);
    }

    public function settle($id)
    {
        $debt = Debt::findOrFail($id);

        $debt->update([
            'is_settled' => true,
            'settled_at' => now(),
        ]);

        // Create income transaction for settled debt
        Transaction::create([
            'type' => 'income',
            'amount' => $debt->amount,
            'description' => "Pelunasan hutang {$debt->student->name}",
            'category' => 'hutang_lunas',
            'billing_session_id' => $debt->billing_session_id,
            'transaction_date' => now()->toDateString(),
        ]);

        return back()->with('success', 'Hutang berhasil dilunasi.');
    }
}
