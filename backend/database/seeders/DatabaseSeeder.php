<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\GeneralAssemblyMember;
use App\Models\Submission;
use App\Models\BoardMember;
use App\Models\Project;
use App\Models\GalleryItem;
use App\Models\GovernanceDocument;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Admin User
        User::truncate();
        User::create([
            'name' => 'مدير النظام (Admin)',
            'email' => 'admin@tawania.sa',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
        ]);

        // 2. Executive Director & Board Members
        BoardMember::truncate();
        BoardMember::create([
            'name_ar' => 'أ / عبدالمجيد بن محمد السليمي',
            'name_en' => 'Mr. Abdulmajeed M. Al-Sulami',
            'role_ar' => 'المدير التنفيذي للجمعية',
            'role_en' => 'Executive Director (CEO)',
            'badge_ar' => 'المدير التنفيذي',
            'badge_en' => 'Executive Director',
            'email' => 'ceo@shamil.org.sa',
            'bio_ar' => 'يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الأهداف التشغيلية والمبادرات التنموية.',
            'initials_ar' => 'ع . م',
            'order' => 1,
            'is_ceo' => true,
        ]);

        BoardMember::create([
            'name_ar' => 'أ / علي إبراهيم السليمي',
            'name_en' => 'Mr. Ali Ibrahim Al-Sulami',
            'role_ar' => 'رئيس مجلس الإدارة',
            'role_en' => 'Chairman of the Board',
            'badge_ar' => 'رئيس المجلس',
            'badge_en' => 'Chairman',
            'email' => 'info@shamil.org.sa',
            'bio_ar' => 'يرأس مجلس إدارة تعاونية الشامل متعددة الأغراض ويقود مسيرة التعاونية نحو تحقيق أهدافها الاستراتيجية.',
            'initials_ar' => 'ع . ا',
            'order' => 2,
            'is_chairman' => true,
        ]);

        BoardMember::create([
            'name_ar' => 'أ / خالد يوسف الحربي',
            'name_en' => 'Mr. Khaled Youssef Al-Harbi',
            'role_ar' => 'نائب رئيس مجلس الإدارة',
            'role_en' => 'Vice Chairman',
            'badge_ar' => 'نائب الرئيس',
            'badge_en' => 'Vice Chairman',
            'email' => 'info@shamil.org.sa',
            'bio_ar' => 'يشغل منصب نائب رئيس مجلس الإدارة، ويسهم في الإشراف على مسيرة التعاونية ومشاريعها.',
            'initials_ar' => 'خ . ا',
            'order' => 3,
        ]);

        // 3. General Assembly Members
        GeneralAssemblyMember::truncate();
        GeneralAssemblyMember::create([
            'name' => 'أحمد بن محمد السليمي',
            'name_en' => 'Ahmed M. Al-Sulami',
            'shares_count' => 100,
            'join_year' => '1440',
            'city' => 'الجموم',
            'phone' => '0501234567',
            'status' => 'approved',
        ]);
        GeneralAssemblyMember::create([
            'name' => 'سعود بن عبدالعزيز الحربي',
            'name_en' => 'Saud A. Al-Harbi',
            'shares_count' => 80,
            'join_year' => '1442',
            'city' => 'مكة المكرمة',
            'phone' => '0559876543',
            'status' => 'approved',
        ]);

        // 4. Submissions
        Submission::truncate();
        Submission::create([
            'submission_code' => 'SURV-928410',
            'module' => 'survey',
            'sender_name' => 'جهة داعمة: مركز التنمية الاجتماعية بمحافظة الجموم (مدير إدارة الشراكات)',
            'sender_contact' => 'طريقة التواصل: الجوال',
            'title' => 'استبيان قياس رضا الجهات الداعمة [SURV-928410] - الرضا العام: 5/5',
            'details' => 'نتائج التقييم الممتازة من مركز التنمية الاجتماعية بمحافظة الجموم مع درجة رضا عام 5/5.',
            'status' => 'pending',
        ]);

        Submission::create([
            'submission_code' => 'WB-772594',
            'module' => 'whistleblowing',
            'sender_name' => 'مُبلّغ سري (محمي)',
            'sender_contact' => 'الهاتف: 0504284861 • البريد: reporter@shamil.org.sa',
            'title' => 'بلاغ عن مخالفة [WB-#749201]: مخالفات مالية وتجاوز اللوائح',
            'details' => 'معلومات ومستندات البلاغ السري وتفاصيل فواتير التوريد غير المبررة.',
            'status' => 'pending',
        ]);

        // 5. Projects
        Project::truncate();
        Project::create([
            'title_ar' => 'مشروع الثلاجة المركزية وسلاسل التبريد',
            'title_en' => 'Central Cold Storage & Supply Chain Project',
            'category_ar' => 'مشاريع تشغيلية ومنافذ بيع',
            'category_en' => 'Operational & Outlets',
            'location_ar' => 'محافظة الجموم',
            'location_en' => 'Al-Jamoom Province',
            'description_ar' => 'إنشاء مجمع ثلاجات مركزية لحفظ واستدامة التمور والمنتجات الزراعية وتزويد منافذ البيع.',
            'investment_amount' => '3,500,000 ر.س',
            'status' => 'active',
        ]);

        Project::create([
            'title_ar' => 'مشروع مصنع الأسمدة العضوية والإنتاج البيئي',
            'title_en' => 'Organic Fertilizer Plant Project',
            'category_ar' => 'مشاريع صناعية وبيئية',
            'category_en' => 'Industrial & Environmental',
            'location_ar' => 'منطقة مكة المكرمة',
            'location_en' => 'Makkah Al-Mukarramah Region',
            'description_ar' => 'معالجة المخلفات الزراعية وتصنيع أسمدة عضوية عالية الجودة لدعم المزارعين بالمملكة.',
            'investment_amount' => '5,000,000 ر.س',
            'status' => 'active',
        ]);

        // 6. Gallery Items
        GalleryItem::truncate();
        GalleryItem::create([
            'title_ar' => 'اجتماع الجمعية العمومية السنوي وتوزيع التقرير المالي',
            'title_en' => 'Annual General Assembly Meeting',
            'category' => 'events',
            'image_url' => '/images/gallery/assembly.jpg',
            'event_date' => '2024-05-15',
        ]);

        // 7. Governance Documents
        GovernanceDocument::truncate();
        GovernanceDocument::create([
            'type' => 'policy',
            'title_ar' => 'سياسة الإبلاغ عن المخالفات (Whistleblowing Policy)',
            'title_en' => 'Whistleblowing Policy',
            'doc_number' => 'POL-WB-001',
            'year' => '2024',
            'category' => 'سياسات الحوكمة',
        ]);
    }
}
