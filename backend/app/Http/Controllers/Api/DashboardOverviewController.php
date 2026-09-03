<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\GeneralAssemblyMember;
use App\Models\Submission;
use App\Models\PolicyItem;
use App\Models\RegulationItem;
use App\Models\WorkshopItem;
use App\Models\FinancialItem;
use App\Models\Meeting;
use App\Models\EthicsItem;
use App\Models\BoardMember;
use App\Models\Project;

class DashboardOverviewController extends Controller
{
    public function index()
    {
        try {
            // 1. Members KPIs & Latest
            $membersCount = GeneralAssemblyMember::count();
            $membersSharesTotal = (int) GeneralAssemblyMember::sum('shares_count');
            $latestMembers = GeneralAssemblyMember::orderBy('id', 'desc')->take(5)->get()->map(function ($m) {
                return [
                    'id' => $m->id,
                    'name' => $m->name,
                    'nameEn' => $m->name_en ?? $m->name,
                    'sharesCount' => (int) $m->shares_count,
                    'joinYear' => $m->join_year,
                    'city' => $m->city ?? 'القصيم',
                    'membershipNumber' => $m->membership_number ?? ('MEM-' . str_pad($m->id, 4, '0', STR_PAD_LEFT)),
                ];
            });

            // 2. Policies KPIs
            $policiesCount = PolicyItem::count();
            $amlPoliciesCount = PolicyItem::where('category', 'aml')->count();

            // 3. Regulations KPIs
            $regulationsCount = RegulationItem::count();
            $financialRegulationsCount = RegulationItem::where('sec', 'financial')->count();

            // 4. Workshops KPIs
            $workshopsCount = WorkshopItem::count();
            $workshopsAttendeesTotal = (int) WorkshopItem::sum('attendees_count');

            // 5. Financials, Meetings, Ethics, Projects, Board
            $financialsCount = FinancialItem::count();
            $meetingsCount = Meeting::count();
            $ethicsCount = EthicsItem::count();
            $projectsCount = Project::count();
            $boardMembersCount = BoardMember::count();

            // 6. Submissions KPIs & Latest
            $submissionsCount = Submission::count();
            $pendingSubmissionsCount = Submission::where('status', 'pending')->count();
            $latestSubmissions = Submission::orderBy('id', 'desc')->take(5)->get()->map(function ($s) {
                return [
                    'id' => $s->id,
                    'submissionCode' => $s->submission_code,
                    'module' => $s->module,
                    'senderName' => $s->sender_name,
                    'senderContact' => $s->sender_contact,
                    'title' => $s->title,
                    'details' => $s->details,
                    'status' => $s->status,
                    'createdAt' => is_string($s->created_at) ? $s->created_at : ($s->created_at ? $s->created_at->format('Y-m-d H:i') : date('Y-m-d H:i')),
                ];
            });

            $overviewData = [
                'header' => [
                    'badge' => 'نظام الحوكمة الرقمية والإفصاح المؤسسي',
                    'title' => 'مرحباً بك في لوحة تحكم حوكمة تعاونية الشامل',
                    'subtitle' => 'إدارة متكاملة وشاملة لجميع سياسات ولوائح الحوكمة، القوائم والملفات المالية، الورش التدريبية والشراكات المجتمعية، محاضر الجمعية العمومية والمجلس، الميثاق الأخلاقي وصندوق البلاغات.',
                ],
                'stats' => [
                    'members' => [
                        'count' => $membersCount,
                        'sharesTotal' => $membersSharesTotal,
                        'labelAr' => 'أعضاء الجمعية العمومية',
                        'subLabelAr' => number_format($membersSharesTotal) . ' سهم مسجل',
                    ],
                    'policies' => [
                        'count' => $policiesCount,
                        'amlCount' => $amlPoliciesCount,
                        'labelAr' => 'السياسات المعتمدة',
                        'subLabelAr' => $amlPoliciesCount . ' مكافحة غسل الأموال',
                    ],
                    'regulations' => [
                        'count' => $regulationsCount,
                        'financialCount' => $financialRegulationsCount,
                        'labelAr' => 'اللوائح والأنظمة',
                        'subLabelAr' => $financialRegulationsCount . ' ملفات ولوائح مالية',
                    ],
                    'workshops' => [
                        'count' => $workshopsCount,
                        'attendeesTotal' => $workshopsAttendeesTotal,
                        'labelAr' => 'الورش المقامة',
                        'subLabelAr' => $workshopsAttendeesTotal . ' مستفيد',
                    ],
                    'submissions' => [
                        'count' => $submissionsCount,
                        'pendingCount' => $pendingSubmissionsCount,
                        'labelAr' => 'صندوق البلاغات والطلبات',
                        'subLabelAr' => $pendingSubmissionsCount . ' قيد الانتظار',
                    ],
                    'financials' => [
                        'count' => $financialsCount,
                        'labelAr' => 'القوائم المالية المدققة',
                        'subLabelAr' => 'مدققة ومصادق عليها',
                    ],
                    'meetings' => [
                        'count' => $meetingsCount,
                        'labelAr' => 'محاضر الاجتماعات',
                        'subLabelAr' => 'عمومية ومجلس إدارة',
                    ],
                    'ethics' => [
                        'count' => $ethicsCount,
                        'labelAr' => 'الميثاق الأخلاقي',
                        'subLabelAr' => 'ميثاق السلوك المهني',
                    ],
                    'projects' => [
                        'count' => $projectsCount,
                        'labelAr' => 'مشاريع الجمعية',
                    ],
                    'boardMembers' => [
                        'count' => $boardMembersCount,
                        'labelAr' => 'مجلس الإدارة',
                    ]
                ],
                'latestMembers' => $latestMembers,
                'latestSubmissions' => $latestSubmissions
            ];

            return response()->json([
                'success' => true,
                'data' => $overviewData
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error retrieving dashboard overview: ' . $e->getMessage()
            ], 500);
        }
    }
}
