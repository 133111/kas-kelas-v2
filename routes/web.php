<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\BillingController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\DebtController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Billing
    Route::resource('billing', BillingController::class);
    Route::post('billing/{billing}/pay/{student}', [BillingController::class, 'updatePayment'])->name('billing.pay');
    Route::post('billing/{billing}/close', [BillingController::class, 'close'])->name('billing.close');
    
    // Transactions
    Route::resource('transactions', TransactionController::class);
    
    // Students
    Route::resource('students', StudentController::class);
    
    // Debts
    Route::get('debts', [DebtController::class, 'index'])->name('debts.index');
    Route::post('debts/{debt}/settle', [DebtController::class, 'settle'])->name('debts.settle');
    
    // Reports
    Route::get('reports', [ReportController::class, 'index'])->name('reports.index');

    // Simulator Mobile Screen
    Route::get('/simulator', function () {
        return Inertia::render('Simulator');
    })->name('simulator');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

