<?php

namespace App\Http\Controllers;

use App\Models\BillingSession;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Transaction;
use Inertia\Inertia;

class ReportController extends Controller
{
    public function index()
    {
        // Payment diligence index per student
        $students = Student::where('is_active', true)
            ->orderBy('nomor_absen')
            ->get();

        $totalSessions = BillingSession::count();

        $diligenceData = $students->map(function ($student) use ($totalSessions) {
            $paidCount = $student->payments()->where('status', 'paid')->count();
            $absentCount = $student->payments()->where('status', 'absent')->count();
            $rate = $totalSessions > 0 ? round(($paidCount / $totalSessions) * 100, 1) : 0;

            return [
                'name' => $student->name,
                'nomor_absen' => $student->nomor_absen,
                'paid_count' => $paidCount,
                'absent_count' => $absentCount,
                'total_sessions' => $totalSessions,
                'rate' => $rate,
            ];
        });

        // Monthly trend
        $monthlyTrend = [];
        for ($i = 11; $i >= 0; $i--) {
            $date = now()->subMonths($i);
            $income = Transaction::where('type', 'income')
                ->whereYear('transaction_date', $date->year)
                ->whereMonth('transaction_date', $date->month)
                ->sum('amount');
            $expense = Transaction::where('type', 'expense')
                ->whereYear('transaction_date', $date->year)
                ->whereMonth('transaction_date', $date->month)
                ->sum('amount');
            $monthlyTrend[] = [
                'month' => $date->translatedFormat('M \'y'),
                'income' => $income,
                'expense' => $expense,
                'net' => $income - $expense,
            ];
        }

        // Category breakdown for expenses
        $expenseCategories = Transaction::where('type', 'expense')
            ->selectRaw('category, SUM(amount) as total')
            ->groupBy('category')
            ->get()
            ->map(function ($item) {
                $labels = [
                    'pengeluaran' => 'Pengeluaran Umum',
                    'lainnya' => 'Lainnya',
                ];
                return [
                    'name' => $labels[$item->category] ?? ucfirst($item->category),
                    'value' => $item->total,
                ];
            });

        // Top payers
        $topPayers = $diligenceData->sortByDesc('rate')->take(5)->values();
        $bottomPayers = $diligenceData->sortBy('rate')->take(5)->values();

        return Inertia::render('Reports/Index', [
            'diligenceData' => $diligenceData->values(),
            'monthlyTrend' => $monthlyTrend,
            'expenseCategories' => $expenseCategories,
            'topPayers' => $topPayers,
            'bottomPayers' => $bottomPayers,
            'totalSessions' => $totalSessions,
        ]);
    }
}
