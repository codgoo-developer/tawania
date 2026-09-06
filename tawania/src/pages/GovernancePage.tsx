import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Search,
  ChevronDown,
  CornerDownLeft,
  CornerDownRight,
  RotateCcw,
  Filter
} from 'lucide-react';
import { useI18n } from '../i18n';
import { PageHero } from '../components/layout/PageHero';

interface TreeDocItem {
  id: string;
  titleAr: string;
  titleEn: string;
  path: string;
}

interface TreeSubGroup {
  id: string;
  titleAr: string;
  titleEn: string;
  items: TreeDocItem[];
}

interface TreeMainSection {
  id: string;
  titleAr: string;
  titleEn: string;
  items?: TreeDocItem[];
  subGroups?: TreeSubGroup[];
}

export const GovernancePage: React.FC = () => {
  const { locale, dir, getLocalizedPath } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const SubBranchIcon = dir === 'rtl' ? CornerDownLeft : CornerDownRight;

  // Filter Select Options
  const filterOptions = [
    { id: 'all', labelAr: 'كافة الأقسام', labelEn: 'All Sections' },
    { id: 'meetings', labelAr: 'محاضر الاجتماعات', labelEn: 'Meeting Minutes' },
    { id: 'ethics', labelAr: 'الميثاق الأخلاقي', labelEn: 'Code of Ethics' },
    { id: 'policies', labelAr: 'السياسات', labelEn: 'Policies' },
    { id: 'aml', labelAr: 'غسل الأموال (فرع)', labelEn: 'AML Sub-branch' },
    { id: 'financials', labelAr: 'القوائم المالية', labelEn: 'Financial Statements' },
    { id: 'regulations', labelAr: 'اللوائح والأنظمة', labelEn: 'Regulations' },
    { id: 'financial-files', labelAr: 'الملفات المالية (فرع)', labelEn: 'Financial Files Sub-branch' },
    { id: 'workshops', labelAr: 'الورش التوعوية', labelEn: 'Workshops' }
  ];

  // Complete Tree Hierarchy with Parent & Child Sub-Groups in exact old order
  const governanceTree: TreeMainSection[] = [
    {
      id: 'meetings',
      titleAr: 'محاضر الاجتماعات',
      titleEn: 'Meeting Minutes',
      items: [
        {
          id: 'ga-minutes',
          titleAr: 'محاضر اجتماع الجمعية العمومية',
          titleEn: 'General Assembly Meeting Minutes',
          path: '/meetings/general-assembly'
        },
        {
          id: 'board-minutes',
          titleAr: 'محاضر اجتماع مجلس الادارة',
          titleEn: 'Board of Directors Meeting Minutes',
          path: '/meetings/board'
        }
      ]
    },
    {
      id: 'ethics',
      titleAr: 'الميثاق الأخلاقي',
      titleEn: 'Code of Ethics',
      items: [
        {
          id: 'ethics-charter',
          titleAr: 'الميثاق الاخلاقي',
          titleEn: 'Code of Ethics & Professional Conduct',
          path: '/ethics'
        }
      ]
    },
    {
      id: 'policies',
      titleAr: 'السياسات',
      titleEn: 'Policies',
      items: [
        {
          id: 'conflict',
          titleAr: 'تعارض المصالح',
          titleEn: 'Conflict of Interest',
          path: '/policies/conflict-of-interest'
        },
        {
          id: 'whistleblowing',
          titleAr: 'الابلاغ عن المخالفات',
          titleEn: 'Whistleblowing',
          path: '/whistleblowing'
        },
        {
          id: 'retention',
          titleAr: 'الاحتفاظ بالوثائق',
          titleEn: 'Document Retention',
          path: '/policies/document-retention'
        },
        {
          id: 'gift',
          titleAr: 'قبول الهبات',
          titleEn: 'Gift Acceptance',
          path: '/policies/gift-acceptance'
        },
        {
          id: 'privacy',
          titleAr: 'خصوصية البيانات',
          titleEn: 'Data Privacy Policy',
          path: '/policies/privacy-policy'
        }
      ],
      subGroups: [
        {
          id: 'aml',
          titleAr: 'غسل الأموال ومكافحة تمويل الإرهاب',
          titleEn: 'Anti-Money Laundering & Counter-Terrorism',
          items: [
            {
              id: 'aml-guide',
              titleAr: 'الدليل والمؤشرات والاجراءات',
              titleEn: 'AML Indicators & Procedures Manual',
              path: '/policies/aml-guide'
            },
            {
              id: 'aml-prevention',
              titleAr: 'سياسية الوقاية',
              titleEn: 'Prevention Policy',
              path: '/policies/aml-prevention'
            },
            {
              id: 'aml-suspicion',
              titleAr: 'سياسة الاشتباة',
              titleEn: 'Suspicion Policy',
              path: '/policies/aml-suspicion'
            }
          ]
        }
      ]
    },
    {
      id: 'financials',
      titleAr: 'القوائم المالية',
      titleEn: 'Financial Statements',
      items: [
        {
          id: 'fin-2019',
          titleAr: 'القوائم المالية لعام 2019',
          titleEn: 'Financial Statements 2019',
          path: '/financial-statements?year=2019'
        },
        {
          id: 'fin-2020',
          titleAr: 'القوائم المالية لعام 2020',
          titleEn: 'Financial Statements 2020',
          path: '/financial-statements?year=2020'
        },
        {
          id: 'fin-2021',
          titleAr: 'القوائم المالية لعام 2021',
          titleEn: 'Financial Statements 2021',
          path: '/financial-statements?year=2021'
        },
        {
          id: 'fin-2022',
          titleAr: 'القوائم المالية لعام 2022',
          titleEn: 'Financial Statements 2022',
          path: '/financial-statements?year=2022'
        },
        {
          id: 'fin-2023',
          titleAr: 'القوائم المالية لعام 2023',
          titleEn: 'Financial Statements 2023',
          path: '/financial-statements?year=2023'
        },
        {
          id: 'fin-2024',
          titleAr: 'القوائم المالية لعام 2024',
          titleEn: 'Financial Statements 2024',
          path: '/financial-statements?year=2024'
        }
      ]
    },
    {
      id: 'regulations',
      titleAr: 'اللوائح والأنظمة والشهادات',
      titleEn: 'Regulations & Bylaws',
      items: [
        {
          id: 'bylaws',
          titleAr: 'اللائحة الأساسية ( محدث )',
          titleEn: 'Basic Bylaws (Updated)',
          path: '/regulations/bylaws-charter'
        },
        {
          id: 'bylaws-minutes',
          titleAr: 'محضر اعتماد اللائحة الاساسية',
          titleEn: 'Bylaws Approval Minutes',
          path: '/regulations/bylaws-approval-minutes'
        },
        {
          id: 'cert',
          titleAr: 'شهادة تسجيل الجمعية',
          titleEn: 'Society Registration Certificate',
          path: '/regulations/society-registration-certificate'
        },
        {
          id: 'hr',
          titleAr: 'لائحة الموارد البشرية',
          titleEn: 'Human Resources Bylaws',
          path: '/regulations/hr-policy'
        },
        {
          id: 'work-reg',
          titleAr: 'لائحة تنظيم العمل',
          titleEn: 'Work Organization Bylaws',
          path: '/regulations/work-organization-bylaws'
        },
        {
          id: 'aml-law',
          titleAr: 'نظام مكافحة غسل الاموال ولائحته التنفيذية',
          titleEn: 'AML Statutory Law & Regulations',
          path: '/regulations/aml-law'
        },
        {
          id: 'ctf-law',
          titleAr: 'نظام مكافحة جرائم الارهاب وتمويله',
          titleEn: 'Counter-Terrorism Law & Enforcement',
          path: '/regulations/counter-terrorism-law'
        }
      ],
      subGroups: [
        {
          id: 'financial-files',
          titleAr: 'الملفات المالية',
          titleEn: 'Financial Files & Procedures',
          items: [
            {
              id: 'rewards',
              titleAr: 'سياسة المكافئات والامتيازات لأعضاء مجلس الإدارة',
              titleEn: 'Board Remuneration Policy',
              path: '/regulations/board-remuneration-policy'
            },
            {
              id: 'fin-bylaw',
              titleAr: 'اللائحة المالية',
              titleEn: 'Financial Bylaws',
              path: '/regulations/financial-manual'
            },
            {
              id: 'disbursement',
              titleAr: 'سياسة الصرف للبرامج والأنشطة',
              titleEn: 'Disbursement Policy',
              path: '/policies/disbursement-policy'
            },
            {
              id: 'procurement',
              titleAr: 'لائحة المشتريات',
              titleEn: 'Procurement Bylaws',
              path: '/regulations/procurement-bylaws'
            },
            {
              id: 'receipts',
              titleAr: 'إجراءات التعامل مع المقبوضات',
              titleEn: 'Receipts Handling Procedures',
              path: '/regulations/receipts-procedures'
            },
            {
              id: 'fin-guide',
              titleAr: 'دليل الإجرائات المالي',
              titleEn: 'Financial Procedures Manual',
              path: '/regulations/financial-procedures-guide'
            },
            {
              id: 'invest',
              titleAr: 'سياسة الإستثمار',
              titleEn: 'Investment Policy',
              path: '/regulations/investment-policy'
            }
          ]
        }
      ]
    },
    {
      id: 'workshops',
      titleAr: 'الورش والبرامج التوعوية',
      titleEn: 'Workshops & Training',
      subGroups: [
        {
          id: 'ws-main',
          titleAr: 'الورش المقامة',
          titleEn: 'Conducted Workshops',
          items: [
            {
              id: 'ws-gov',
              titleAr: 'ورشة التعريف بالحوكمة',
              titleEn: 'Governance Orientation Workshop',
              path: '/workshops/governance-intro'
            },
            {
              id: 'ws-conflict',
              titleAr: 'ورشة تعارض المصالح والابلاغ عن المخالفات',
              titleEn: 'Conflict & Whistleblowing Workshop',
              path: '/workshops/conflict-whistleblowing'
            },
            {
              id: 'ws-aml-ws',
              titleAr: 'ورشة غسل الاموال ومكافحة جرائم تمويل الارهاب',
              titleEn: 'AML & Counter-Terrorism Workshop',
              path: '/workshops/aml-counter-terrorism'
            }
          ]
        },
        {
          id: 'community-workshops',
          titleAr: 'الورش المقامة بالشركات المجتمعية',
          titleEn: 'Community Partnerships Workshops',
          items: [
            {
              id: 'ws-comm-conflict',
              titleAr: 'ورشة التعريف بسياسة التعارض والإبلاغ عن المخالفات',
              titleEn: 'Conflict & Whistleblowing Workshop',
              path: '/workshops/community-conflict-whistleblowing'
            },
            {
              id: 'ws-comm-aml',
              titleAr: 'ورشة غسل الاموال ومكافحة جرائم تمويل الارهاب',
              titleEn: 'AML & Counter-Terrorism Workshop',
              path: '/workshops/community-aml-counter-terrorism'
            }
          ]
        }
      ]
    }
  ];

  // Combined Search & Select Filter
  const filteredTree = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return governanceTree
      .map((sec) => {
        let matchDirectItems = true;
        let matchSubGroupOnly = false;

        if (selectedCategory !== 'all') {
          if (selectedCategory === sec.id) {
            matchDirectItems = true;
          } else if (selectedCategory === 'aml') {
            matchDirectItems = false;
            matchSubGroupOnly = true;
          } else if (selectedCategory === 'financial-files') {
            matchDirectItems = false;
            matchSubGroupOnly = true;
          } else if (selectedCategory === 'workshops' && sec.id === 'workshops') {
            matchDirectItems = true;
          } else {
            return null;
          }
        }

        // Direct items
        const directItems = matchDirectItems && !matchSubGroupOnly ? (sec.items || []) : [];
        const filteredDirectItems = directItems.filter(
          (item) =>
            !q ||
            item.titleAr.toLowerCase().includes(q) ||
            item.titleEn.toLowerCase().includes(q)
        );

        // Subgroups
        let subGroups = sec.subGroups || [];
        if (selectedCategory === 'aml') {
          subGroups = subGroups.filter((sub) => sub.id === 'aml');
        } else if (selectedCategory === 'financial-files') {
          subGroups = subGroups.filter((sub) => sub.id === 'financial-files');
        }

        const filteredSubGroups = subGroups
          .map((sub) => ({
            ...sub,
            items: sub.items.filter(
              (item) =>
                !q ||
                item.titleAr.toLowerCase().includes(q) ||
                item.titleEn.toLowerCase().includes(q)
            )
          }))
          .filter((sub) => sub.items.length > 0);

        const hasMatches =
          filteredDirectItems.length > 0 || filteredSubGroups.length > 0;

        if (!hasMatches) return null;

        const matched: TreeMainSection = {
          id: sec.id,
          titleAr: sec.titleAr,
          titleEn: sec.titleEn,
          items: filteredDirectItems,
          subGroups: filteredSubGroups
        };
        return matched;
      })
      .filter((sec): sec is TreeMainSection => sec !== null);
  }, [searchQuery, selectedCategory, governanceTree]);

  // Reusable Document Card Component
  const renderDocCard = (item: TreeDocItem) => (
    <Link
      key={item.id}
      to={getLocalizedPath(item.path)}
      className="flex flex-col items-center justify-between p-6 bg-white rounded-2xl border border-gray-100 hover:border-[#0B6B4F]/30 shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer text-center"
    >
      {/* Clean Document Icon with Shield */}
      <div className="relative mb-5 transform group-hover:scale-110 transition-transform duration-300">
        <div className="w-14 h-16 bg-white rounded-lg border-2 border-gray-300 group-hover:border-[#0B6B4F] shadow-xs flex flex-col p-2.5 justify-between transition-colors">
          <div className="w-full space-y-1.5">
            <div className="w-3/4 h-1 bg-gray-400 rounded-full" />
            <div className="w-full h-1 bg-gray-300 rounded-full" />
            <div className="w-5/6 h-1 bg-gray-300 rounded-full" />
            <div className="w-2/3 h-1 bg-gray-300 rounded-full" />
          </div>
        </div>
        {/* Small Emerald Shield Badge */}
        <div className="absolute -bottom-1.5 -start-1.5 w-6 h-6 rounded-full bg-[#0B6B4F] text-white flex items-center justify-center border-2 border-white shadow-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-[#84CC16]" />
        </div>
      </div>

      {/* Primary System Colored Pill Button */}
      <span
        className="w-full text-center py-2.5 px-4 rounded-full bg-[#0B6B4F] group-hover:bg-[#074734] text-white font-bold text-xs sm:text-[13px] shadow-sm group-hover:shadow-md transition-all duration-200 block truncate"
        title={locale === 'ar' ? item.titleAr : item.titleEn}
      >
        {locale === 'ar' ? item.titleAr : item.titleEn}
      </span>
    </Link>
  );

  return (
    <div className="space-y-10 pb-24 bg-[#FAFBF9] min-h-screen">
      {/* Page Hero with Combined Select & Search Filter */}
      <PageHero
        badge={locale === 'ar' ? 'الشفافية والمساءلة' : 'Governance & Transparency'}
        title={locale === 'ar' ? 'الحوكمة' : 'Governance & Policies'}
        subtitle={
          locale === 'ar'
            ? 'الدليل الشامل للوائح والسياسات والمحاضر والتقارير المالية المعتمدة لجمعية الرضا التعاونية'
            : 'Comprehensive directory of bylaws, policies, minutes, and financial reports'
        }
        breadcrumbs={[{ label: locale === 'ar' ? 'الحوكمة' : 'Governance' }]}
        action={
          <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-2.5">
            {/* Category Select Filter Dropdown */}
            <div className="relative w-full sm:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none ps-3.5 pe-8 py-2.5 text-xs sm:text-sm font-bold rounded-2xl bg-whitetext-[#17211E] shadow-2xs outline-none focus:border-[#0B6B4F] focus:ring-2 focus:ring-[#0B6B4F]/10 transition-all cursor-pointer"
              >
                {filterOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {locale === 'ar' ? opt.labelAr : opt.labelEn}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Search Input Box */}
            <div className="relative w-full sm:w-64 lg:w-72">
              <Search className="w-4 h-4 text-gray-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ar' ? 'البحث في الوثائق...' : 'Search documents...'}
                className="w-full ps-10 pe-9 py-2.5 text-xs sm:text-sm rounded-2xl bg-whitetext-[#17211E] shadow-2xs outline-none focus:border-[#0B6B4F] focus:ring-2 focus:ring-[#0B6B4F]/10 transition-all text-start"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute end-3 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center text-[10px] cursor-pointer"
                  aria-label="Clear Search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        }
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tree Content / Results */}
        {filteredTree.length > 0 ? (
          <div className="space-y-16">
            {filteredTree.map((section) => (
              <div key={section.id} className="space-y-10">
                {/* Main Parent Section Title */}
                <div className="text-center space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-black text-[#12332B] tracking-tight">
                    {locale === 'ar' ? section.titleAr : section.titleEn}
                  </h2>
                  <div className="w-16 h-1 bg-[#0B6B4F] mx-auto rounded-full" />
                </div>

                {/* Direct Child Items Grid */}
                {section.items && section.items.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                    {section.items.map(renderDocCard)}
                  </div>
                )}

                {/* Nested Sub-Groups (Children Branches) */}
                {section.subGroups && section.subGroups.length > 0 && (
                  <div className="space-y-10 pt-2">
                    {section.subGroups.map((subGroup) => (
                      <div
                        key={subGroup.id}
                        className="bg-[#F5F8F6] rounded-3xl p-6 sm:p-8 border border-[#0B6B4F]/20 space-y-8 relative shadow-2xs"
                      >
                        {/* Sub-Group Branch Title */}
                        <div className="flex items-center justify-center gap-2.5 text-center">
                          <SubBranchIcon className="w-5 h-5 text-[#0B6B4F] shrink-0" />
                          <h3 className="text-xl sm:text-2xl font-bold text-[#0B6B4F] tracking-tight">
                            {locale === 'ar' ? subGroup.titleAr : subGroup.titleEn}
                          </h3>
                        </div>

                        {/* Sub-Group Child Items */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                          {subGroup.items.map(renderDocCard)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State with Reset */
          <div className="text-center py-16 bg-white rounded-3xlp-8 shadow-xs space-y-4">
            <ShieldCheck className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-bold text-gray-700">
              {locale === 'ar' ? 'لم يتم العثور على وثائق مطابقة' : 'No matching documents found'}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 max-w-md mx-auto">
              {locale === 'ar'
                ? 'لا توجد نتائج تطابق بحثك الحالي، يرجى تجربة كلمات أخرى أو إعادة ضبط التصفية.'
                : 'No results match your search query. Try different keywords or reset filters.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B6B4F] hover:bg-[#074734] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{locale === 'ar' ? 'عرض كافة الوثائق' : 'Show All Documents'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
