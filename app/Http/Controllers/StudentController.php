<?php

namespace App\Http\Controllers;

use App\Models\BillingSession;
use App\Models\Payment;
use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $query = Student::where('is_active', true);

        if ($request->filled('search')) {
            $query->where('name', 'like', "%{$request->search}%");
        }

        $students = $query->orderBy('nomor_absen')
            ->get()
            ->map(function ($student) {
                $totalSessions = BillingSession::count();
                $paidCount = $student->payments()->where('status', 'paid')->count();
                $absentCount = $student->payments()->where('status', 'absent')->count();
                $totalDebt = $student->debts()->where('is_settled', false)->sum('amount');

                return [
                    'id' => $student->id,
                    'name' => $student->name,
                    'nomor_absen' => $student->nomor_absen,
                    'payment_rate' => $totalSessions > 0 ? round(($paidCount / $totalSessions) * 100, 1) : 0,
                    'paid_count' => $paidCount,
                    'absent_count' => $absentCount,
                    'total_sessions' => $totalSessions,
                    'total_debt' => $totalDebt,
                ];
            });

        return Inertia::render('Students/Index', [
            'students' => $students,
            'filters' => $request->only(['search']),
        ]);
    }

    public function show($id)
    {
        $student = Student::findOrFail($id);

        $totalSessions = BillingSession::count();
        $paidCount = $student->payments()->where('status', 'paid')->count();

        // Payment history
        $paymentHistory = Payment::where('student_id', $id)
            ->with('billingSession')
            ->latest('created_at')
            ->get()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'session_date' => $payment->billingSession->billing_date->format('d M Y'),
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'paid_at' => $payment->paid_at ? $payment->paid_at->format('d M Y H:i') : null,
                ];
            });

        // Payment chart data (last 12 sessions)
        $sessions = BillingSession::latest('billing_date')->take(12)->get()->reverse()->values();
        $chartData = $sessions->map(function ($session) use ($id) {
            $payment = Payment::where('billing_session_id', $session->id)
                ->where('student_id', $id)
                ->first();
            return [
                'date' => $session->billing_date->format('d/m'),
                'status' => $payment ? $payment->status : 'no_data',
                'value' => $payment && $payment->status === 'paid' ? 1 : 0,
            ];
        });

        // Active debts
        $debts = $student->debts()
            ->where('is_settled', false)
            ->with('billingSession')
            ->get()
            ->map(function ($debt) {
                return [
                    'id' => $debt->id,
                    'amount' => $debt->amount,
                    'session_date' => $debt->billingSession->billing_date->format('d M Y'),
                ];
            });

        return Inertia::render('Students/Show', [
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'nomor_absen' => $student->nomor_absen,
                'payment_rate' => $totalSessions > 0 ? round(($paidCount / $totalSessions) * 100, 1) : 0,
                'paid_count' => $paidCount,
                'total_sessions' => $totalSessions,
                'total_debt' => $student->debts()->where('is_settled', false)->sum('amount'),
                'total_paid_amount' => $student->payments()->where('status', 'paid')->sum('amount'),
            ],
            'paymentHistory' => $paymentHistory,
            'chartData' => $chartData,
            'debts' => $debts,
        ]);
    }

    public function edit($id)
    {
        $student = Student::findOrFail($id);

        return Inertia::render('Students/Edit', [
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'nomor_absen' => $student->nomor_absen,
            ]
        ]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'nomor_absen' => ['required', 'integer', 'min:1', 'max:100'],
        ]);

        $student->update($validated);

        return redirect()->route('students.index')->with('success', 'Data siswa ' . $student->name . ' berhasil diperbarui.');
    }
}

