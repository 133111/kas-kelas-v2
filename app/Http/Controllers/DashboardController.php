<?php

namespace App\Http\Controllers;

use App\Models\BillingSession;
use App\Models\Debt;
use App\Models\Student;
use App\Models\Transaction;
use Carbon\Carbon;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalIncome = Transaction::where('type', 'income')->sum('amount');
        $totalExpense = Transaction::where('type', 'expense')->sum('amount');
        $balance = $totalIncome - $totalExpense;
        $activeDebts = Debt::where('is_settled', false)->sum('amount');
        $totalStudents = Student::where('is_active', true)->count();

        // Monthly income for the last 6 months
        $monthlyData = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $income = Transaction::where('type', 'income')
                ->whereYear('transaction_date', $date->year)
                ->whereMonth('transaction_date', $date->month)
                ->sum('amount');
            $expense = Transaction::where('type', 'expense')
                ->whereYear('transaction_date', $date->year)
                ->whereMonth('transaction_date', $date->month)
                ->sum('amount');
            $monthlyData[] = [
                'month' => $date->translatedFormat('M Y'),
                'income' => $income,
                'expense' => $expense,
            ];
        }

        // Recent sessions
        $recentSessions = BillingSession::with('user')
            ->latest('billing_date')
            ->take(5)
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'billing_date' => $session->billing_date->format('d M Y'),
                    'status' => $session->status,
                    'paid_count' => $session->paid_count,
                    'total_students' => $session->payments()->count(),
                    'total_collected' => $session->total_collected,
                    'created_by' => $session->user->name,
                ];
            });

        // Recent transactions
        $recentTransactions = Transaction::latest('transaction_date')
            ->take(5)
            ->get()
            ->map(function ($tx) {
                return [
                    'id' => $tx->id,
                    'type' => $tx->type,
                    'amount' => $tx->amount,
                    'description' => $tx->description,
                    'category' => $tx->category,
                    'date' => $tx->transaction_date->format('d M Y'),
                ];
            });

        // Current month stats
        $currentMonthIncome = Transaction::where('type', 'income')
            ->whereYear('transaction_date', now()->year)
            ->whereMonth('transaction_date', now()->month)
            ->sum('amount');
        $currentMonthExpense = Transaction::where('type', 'expense')
            ->whereYear('transaction_date', now()->year)
            ->whereMonth('transaction_date', now()->month)
            ->sum('amount');

        return Inertia::render('Dashboard', [
            'stats' => [
                'balance' => $balance,
                'total_income' => $totalIncome,
                'total_expense' => $totalExpense,
                'active_debts' => $activeDebts,
                'total_students' => $totalStudents,
                'current_month_income' => $currentMonthIncome,
                'current_month_expense' => $currentMonthExpense,
            ],
            'monthlyData' => $monthlyData,
            'recentSessions' => $recentSessions,
            'recentTransactions' => $recentTransactions,
        ]);
    }
}
