<?php

namespace App\Http\Controllers;

use App\Models\BillingSession;
use App\Models\Debt;
use App\Models\Payment;
use App\Models\Setting;
use App\Models\Student;
use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    public function index()
    {
        $sessions = BillingSession::with('user')
            ->latest('billing_date')
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'billing_date' => $session->billing_date->format('Y-m-d'),
                    'billing_date_formatted' => $session->billing_date->format('d M Y'),
                    'amount_per_student' => $session->amount_per_student,
                    'status' => $session->status,
                    'notes' => $session->notes,
                    'paid_count' => $session->paid_count,
                    'unpaid_count' => $session->unpaid_count,
                    'absent_count' => $session->absent_count,
                    'total_students' => $session->payments()->count(),
                    'total_collected' => $session->total_collected,
                    'created_by' => $session->user->name,
                ];
            });

        return Inertia::render('Billing/Index', [
            'sessions' => $sessions,
        ]);
    }

    public function create()
    {
        return Inertia::render('Billing/Create', [
            'defaultAmount' => (int) Setting::getValue('billing_amount', 2000),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'billing_date' => 'required|date',
            'amount_per_student' => 'required|integer|min:1000',
            'notes' => 'nullable|string|max:500',
        ]);

        $session = BillingSession::create([
            'user_id' => auth()->id(),
            'billing_date' => $request->billing_date,
            'amount_per_student' => $request->amount_per_student,
            'status' => 'open',
            'notes' => $request->notes,
        ]);

        // Create payment records for all active students
        $students = Student::where('is_active', true)->get();
        foreach ($students as $student) {
            Payment::create([
                'student_id' => $student->id,
                'billing_session_id' => $session->id,
                'amount' => 0,
                'status' => 'unpaid',
            ]);
        }

        return redirect()->route('billing.show', $session->id)
            ->with('success', 'Sesi penagihan berhasil dibuat.');
    }

    public function show($id)
    {
        $session = BillingSession::with(['user'])->findOrFail($id);

        $payments = Payment::where('billing_session_id', $id)
            ->with('student')
            ->get()
            ->sortBy(fn($p) => $p->student->nomor_absen)
            ->values()
            ->map(function ($payment) {
                return [
                    'id' => $payment->id,
                    'student_id' => $payment->student_id,
                    'student_name' => $payment->student->name,
                    'student_nis' => $payment->student->nis,
                    'nomor_absen' => $payment->student->nomor_absen,
                    'amount' => $payment->amount,
                    'status' => $payment->status,
                    'paid_at' => $payment->paid_at ? $payment->paid_at->format('H:i, d M') : null,
                ];
            });

        // Get active debts for students in this session
        $studentIds = $payments->pluck('student_id');
        $debts = Debt::where('is_settled', false)
            ->whereIn('student_id', $studentIds)
            ->with(['student', 'billingSession'])
            ->get()
            ->map(function ($debt) {
                return [
                    'id' => $debt->id,
                    'student_id' => $debt->student_id,
                    'student_name' => $debt->student->name,
                    'amount' => $debt->amount,
                    'from_session_date' => $debt->billingSession->billing_date->format('d M Y'),
                ];
            });

        $sessionData = [
            'id' => $session->id,
            'billing_date' => $session->billing_date->format('Y-m-d'),
            'billing_date_formatted' => $session->billing_date->format('d M Y'),
            'amount_per_student' => $session->amount_per_student,
            'status' => $session->status,
            'notes' => $session->notes,
            'paid_count' => $session->paid_count,
            'unpaid_count' => $session->unpaid_count,
            'absent_count' => $session->absent_count,
            'total_collected' => $session->total_collected,
            'created_by' => $session->user->name,
        ];

        return Inertia::render('Billing/Show', [
            'session' => $sessionData,
            'payments' => $payments,
            'debts' => $debts,
        ]);
    }

    public function updatePayment(Request $request, $sessionId, $studentId)
    {
        $session = BillingSession::findOrFail($sessionId);

        if ($session->status === 'closed') {
            return back()->with('error', 'Sesi sudah ditutup.');
        }

        $payment = Payment::where('billing_session_id', $sessionId)
            ->where('student_id', $studentId)
            ->firstOrFail();

        $request->validate([
            'status' => 'required|in:paid,unpaid,absent',
        ]);

        $newStatus = $request->status;
        $oldStatus = $payment->status;

        // If changing from paid to something else, reverse the transaction
        if ($oldStatus === 'paid' && $newStatus !== 'paid') {
            $payment->update([
                'status' => $newStatus,
                'amount' => 0,
                'paid_at' => null,
            ]);

            // Remove the income transaction
            Transaction::where('billing_session_id', $sessionId)
                ->where('category', 'kas')
                ->where('description', 'like', "%{$payment->student->name}%")
                ->latest()
                ->first()
                ?->delete();
        }

        // If changing to paid
        if ($newStatus === 'paid' && $oldStatus !== 'paid') {
            $payment->update([
                'status' => 'paid',
                'amount' => $session->amount_per_student,
                'paid_at' => now(),
            ]);

            // Create income transaction
            Transaction::create([
                'type' => 'income',
                'amount' => $session->amount_per_student,
                'description' => "Kas dari {$payment->student->name}",
                'category' => 'kas',
                'billing_session_id' => $sessionId,
                'transaction_date' => now()->toDateString(),
            ]);
        }

        // If changing from absent, remove the debt
        if ($oldStatus === 'absent' && $newStatus !== 'absent') {
            Debt::where('billing_session_id', $sessionId)
                ->where('student_id', $studentId)
                ->where('is_settled', false)
                ->delete();
        }

        // If marking as absent, create a debt (2x lipat)
        if ($newStatus === 'absent' && $oldStatus !== 'absent') {
            $payment->update([
                'status' => 'absent',
                'amount' => 0,
                'paid_at' => null,
            ]);

            Debt::create([
                'student_id' => $studentId,
                'billing_session_id' => $sessionId,
                'amount' => $session->amount_per_student * 2,
                'is_settled' => false,
            ]);
        }

        // If just unpaid
        if ($newStatus === 'unpaid') {
            $payment->update([
                'status' => 'unpaid',
                'amount' => 0,
                'paid_at' => null,
            ]);
        }

        return back()->with('success', 'Status pembayaran diperbarui.');
    }

    public function close($id)
    {
        $session = BillingSession::findOrFail($id);
        $session->update(['status' => 'closed']);

        return back()->with('success', 'Sesi penagihan ditutup.');
    }

    public function destroy($id)
    {
        $session = BillingSession::findOrFail($id);

        // Delete related transactions
        Transaction::where('billing_session_id', $id)->delete();

        $session->payments()->delete();
        $session->debts()->delete();
        $session->delete();

        return redirect()->route('billing.index')
            ->with('success', 'Sesi penagihan dihapus.');
    }
}
