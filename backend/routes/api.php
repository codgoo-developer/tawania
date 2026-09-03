<?php

use App\Http\Controllers\Api\HomeContentController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardOverviewController;
use App\Http\Controllers\Api\GeneralAssemblyMemberController;
use App\Http\Controllers\Api\SubmissionController;
use App\Http\Controllers\Api\BoardMemberController;
use App\Http\Controllers\Api\ExecutiveDirectorController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\MeetingController;
use App\Http\Controllers\Api\EthicsController;
use App\Http\Controllers\Api\PolicyController;
use App\Http\Controllers\Api\FeedbackCardController;
use App\Http\Controllers\Api\FinancialController;
use App\Http\Controllers\Api\RegulationController;
use App\Http\Controllers\Api\WorkshopController;
use App\Http\Controllers\Api\GovernanceDocumentController;

Route::prefix('v1')->group(function () {
    // Auth Routes
    Route::post('/auth/login', [AuthController::class, 'login']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // General Assembly Members
    Route::get('/dashboard/overview', [DashboardOverviewController::class, 'index']);
    Route::apiResource('/members', GeneralAssemblyMemberController::class);
    Route::apiResource('/meetings', MeetingController::class);
    Route::apiResource('/ethics', EthicsController::class);
    Route::apiResource('/policies', PolicyController::class);
    Route::post('/feedback-cards/sync', [FeedbackCardController::class, 'sync']);
    Route::apiResource('/feedback-cards', FeedbackCardController::class);
    Route::apiResource('/financials', FinancialController::class);
    Route::apiResource('/regulations', RegulationController::class);
    Route::apiResource('/workshops', WorkshopController::class);

    // Submissions, Whistleblowing & Satisfaction Surveys
    Route::get('/submissions', [SubmissionController::class, 'index']);
    Route::post('/submissions', [SubmissionController::class, 'store']);
    Route::put('/submissions/{id}/status', [SubmissionController::class, 'updateStatus']);
    Route::post('/submissions/{id}/confirm-membership', [SubmissionController::class, 'confirmMembership']);
    Route::delete('/submissions/{id}', [SubmissionController::class, 'destroy']);

    // Board Members & Executive Director (المدير التنفيذي)
    Route::apiResource('/board-members', BoardMemberController::class);

    // Projects
    Route::apiResource('/projects', ProjectController::class);

    // Executive Director
    Route::get('/executive-director', [ExecutiveDirectorController::class, 'show']);
    Route::put('/executive-director', [ExecutiveDirectorController::class, 'update']);

    // Gallery
    Route::apiResource('/gallery', GalleryController::class);

    // Governance Documents
    Route::apiResource('/governance', GovernanceDocumentController::class);
});

// Home Page Content Management Routes
Route::get('v1/home-content', [HomeContentController::class, 'index']);
Route::put('v1/home-content/{sectionKey}', [HomeContentController::class, 'updateSection']);
