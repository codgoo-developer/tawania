<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('users')) Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->unique();
            $table->string('password');
            $table->string('role')->default('admin');
            $table->rememberToken();
            $table->timestamps();
        });

        
        if (!Schema::hasTable('personal_access_tokens')) {
            Schema::create('personal_access_tokens', function (Blueprint $table) {
                $table->id();
                $table->morphs('tokenable');
                $table->string('name');
                $table->string('token', 64)->unique();
                $table->text('abilities')->nullable();
                $table->timestamp('last_used_at')->nullable();
                $table->timestamp('expires_at')->nullable();
                $table->timestamps();
            });
        }
  
        Schema::create('general_assembly_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_en')->nullable();
            $table->integer('shares_count')->default(50);
            $table->string('join_year')->default('1445');
            $table->string('city')->default('مكة المكرمة / الجموم');
            $table->string('phone')->nullable();
            $table->string('national_id')->nullable();
            $table->string('status')->default('approved');
            $table->timestamps();
        });

        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->string('submission_code')->unique();
            $table->string('module');
            $table->string('sender_name');
            $table->string('sender_contact');
            $table->string('title');
            $table->text('details');
            $table->json('json_data')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
        });

        Schema::create('board_members', function (Blueprint $table) {
            $table->id();
            $table->string('name_ar');
            $table->string('name_en')->nullable();
            $table->string('role_ar');
            $table->string('role_en')->nullable();
            $table->string('badge_ar')->nullable();
            $table->string('badge_en')->nullable();
            $table->string('email')->nullable();
            $table->text('bio_ar')->nullable();
            $table->text('bio_en')->nullable();
            $table->string('initials_ar')->nullable();
            $table->integer('order')->default(1);
            $table->boolean('is_ceo')->default(false);
            $table->boolean('is_chairman')->default(false);
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar');
            $table->string('title_en')->nullable();
            $table->string('category_ar')->nullable();
            $table->string('category_en')->nullable();
            $table->string('location_ar')->nullable();
            $table->string('location_en')->nullable();
            $table->string('image_url')->nullable();
            $table->text('description_ar')->nullable();
            $table->text('description_en')->nullable();
            $table->string('investment_amount')->nullable();
            $table->string('status')->default('active');
            $table->timestamps();
        });

        Schema::create('gallery_items', function (Blueprint $table) {
            $table->id();
            $table->string('title_ar');
            $table->string('title_en')->nullable();
            $table->string('category')->default('events');
            $table->string('image_url');
            $table->string('event_date')->nullable();
            $table->timestamps();
        });

        Schema::create('governance_documents', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('title_ar');
            $table->string('title_en')->nullable();
            $table->string('doc_number')->nullable();
            $table->string('year')->nullable();
            $table->string('file_url')->nullable();
            $table->string('category')->nullable();
            $table->json('metadata')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('governance_documents');
        Schema::dropIfExists('gallery_items');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('board_members');
        Schema::dropIfExists('submissions');
        Schema::dropIfExists('general_assembly_members');
        Schema::dropIfExists('users');
    }
};
