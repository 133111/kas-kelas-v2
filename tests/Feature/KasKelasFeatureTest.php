<?php

namespace Tests\Feature;

use App\Models\BillingSession;
use App\Models\Debt;
use App\Models\Payment;
use App\Models\Student;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KasKelasFeatureTest extends TestCase
{
    use RefreshDatabase;

    protected User $user;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
        $this->user = User::where('username', 'XI TKJ 1')->first();
    }

    public function test_dashboard_can_be_rendered(): void
    {
        $response = $this->actingAs($this->user)->get('/dashboard');
        $response->assertStatus(200);
    }

    public function test_billing_index_and_create(): void
    {
        $response = $this->actingAs($this->user)->get('/billing');
        $response->assertStatus(200);

        $createResponse = $this->actingAs($this->user)->post('/billing', [
            'billing_date' => now()->toDateString(),
            'amount_per_student' => 2000,
            'notes' => 'Kas minggu 1',
        ]);

        $session = BillingSession::first();
        $this->assertNotNull($session);
        $createResponse->assertRedirect(route('billing.show', $session->id));

        // Check payments created for students
        $this->assertEquals(Student::where('is_active', true)->count(), Payment::where('billing_session_id', $session->id)->count());
    }

    public function test_billing_show_and_payment_actions(): void
    {
        $session = BillingSession::create([
            'user_id' => $this->user->id,
            'billing_date' => now()->toDateString(),
            'amount_per_student' => 2000,
            'status' => 'open',
        ]);

        $student = Student::first();
        Payment::create([
            'student_id' => $student->id,
            'billing_session_id' => $session->id,
            'amount' => 0,
            'status' => 'unpaid',
        ]);

        // Show page
        $response = $this->actingAs($this->user)->get("/billing/{$session->id}");
        $response->assertStatus(200);

        // Pay payment
        $payResponse = $this->actingAs($this->user)->post("/billing/{$session->id}/pay/{$student->id}", [
            'status' => 'paid',
        ]);
        $payResponse->assertSessionHas('success');
        $this->assertDatabaseHas('payments', [
            'student_id' => $student->id,
            'billing_session_id' => $session->id,
            'status' => 'paid',
            'amount' => 2000,
        ]);

        // Absent payment creates debt
        $absentResponse = $this->actingAs($this->user)->post("/billing/{$session->id}/pay/{$student->id}", [
            'status' => 'absent',
        ]);
        $absentResponse->assertSessionHas('success');
        $this->assertDatabaseHas('debts', [
            'student_id' => $student->id,
            'billing_session_id' => $session->id,
            'amount' => 4000,
            'is_settled' => false,
        ]);

        // Close session
        $closeResponse = $this->actingAs($this->user)->post("/billing/{$session->id}/close");
        $closeResponse->assertSessionHas('success');
        $this->assertEquals('closed', $session->fresh()->status);
    }

    public function test_transactions_crud(): void
    {
        $response = $this->actingAs($this->user)->get('/transactions');
        $response->assertStatus(200);

        $storeResponse = $this->actingAs($this->user)->post('/transactions', [
            'type' => 'income',
            'amount' => 50000,
            'description' => 'Sumbangan alumni',
            'category' => 'donasi',
            'transaction_date' => now()->toDateString(),
        ]);
        $storeResponse->assertRedirect(route('transactions.index'));
        $this->assertDatabaseHas('transactions', [
            'description' => 'Sumbangan alumni',
            'amount' => 50000,
        ]);

        $tx = Transaction::where('description', 'Sumbangan alumni')->first();
        $deleteResponse = $this->actingAs($this->user)->delete("/transactions/{$tx->id}");
        $deleteResponse->assertRedirect(route('transactions.index'));
        $this->assertDatabaseMissing('transactions', ['id' => $tx->id]);
    }

    public function test_students_index_and_show(): void
    {
        $response = $this->actingAs($this->user)->get('/students');
        $response->assertStatus(200);

        $student = Student::first();
        $showResponse = $this->actingAs($this->user)->get("/students/{$student->id}");
        $showResponse->assertStatus(200);

        $editResponse = $this->actingAs($this->user)->get("/students/{$student->id}/edit");
        $editResponse->assertStatus(200);

        $updateResponse = $this->actingAs($this->user)->put("/students/{$student->id}", [
            'name' => 'Ahmad Fauzi Updated',
            'nomor_absen' => $student->nomor_absen,
        ]);
        $updateResponse->assertRedirect(route('students.index'));
        $this->assertEquals('Ahmad Fauzi Updated', $student->fresh()->name);
    }

    public function test_debts_index_and_settle(): void
    {
        $session = BillingSession::create([
            'user_id' => $this->user->id,
            'billing_date' => now()->toDateString(),
            'amount_per_student' => 2000,
            'status' => 'open',
        ]);
        $student = Student::first();
        $debt = Debt::create([
            'student_id' => $student->id,
            'billing_session_id' => $session->id,
            'amount' => 4000,
            'is_settled' => false,
        ]);

        $response = $this->actingAs($this->user)->get('/debts');
        $response->assertStatus(200);

        $settleResponse = $this->actingAs($this->user)->post("/debts/{$debt->id}/settle");
        $settleResponse->assertSessionHas('success');
        $this->assertTrue($debt->fresh()->is_settled);
    }

    public function test_reports_can_be_rendered(): void
    {
        $response = $this->actingAs($this->user)->get('/reports');
        $response->assertStatus(200);
    }
}
