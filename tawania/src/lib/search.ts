import { projectsData } from '../data/projects';
import { boardMeetingsData, generalAssemblyMeetingsData } from '../data/meetings';
import { boardMembersData } from '../data/board';
import { Locale, SearchResultItem } from '../types';

export const performGlobalSearch = (query: string, locale: Locale): SearchResultItem[] => {
  if (!query || query.trim().length === 0) return [];
  const q = query.trim().toLowerCase();
  const results: SearchResultItem[] = [];

  // 1. Search in Projects
  projectsData.forEach(p => {
    const nameAr = p.name.ar.toLowerCase();
    const nameEn = p.name.en.toLowerCase();
    const descAr = p.shortDescription.ar.toLowerCase();
    const descEn = p.shortDescription.en.toLowerCase();
    const catAr = p.category.ar.toLowerCase();
    const catEn = p.category.en.toLowerCase();

    if (nameAr.includes(q) || nameEn.includes(q) || descAr.includes(q) || descEn.includes(q) || catAr.includes(q) || catEn.includes(q)) {
      results.push({
        id: `project-${p.slug}`,
        title: locale === 'en' ? p.name.en : p.name.ar,
        type: 'project',
        typeName: locale === 'en' ? 'Project' : 'مشروع',
        excerpt: locale === 'en' ? p.shortDescription.en : p.shortDescription.ar,
        url: `/${locale}/projects/${p.slug}`,
        category: locale === 'en' ? p.category.en : p.category.ar,
      });
    }
  });

  // 2. Search in Board
  boardMembersData.forEach(b => {
    const nameAr = b.name.ar.toLowerCase();
    const nameEn = b.name.en.toLowerCase();
    const roleAr = b.role.ar.toLowerCase();
    const roleEn = b.role.en.toLowerCase();

    if (nameAr.includes(q) || nameEn.includes(q) || roleAr.includes(q) || roleEn.includes(q)) {
      results.push({
        id: `board-${b.id}`,
        title: locale === 'en' ? b.name.en : b.name.ar,
        type: 'governance',
        typeName: locale === 'en' ? 'Board of Directors' : 'مجلس الإدارة',
        excerpt: locale === 'en' ? b.role.en : b.role.ar,
        url: `/${locale}/board`,
      });
    }
  });

  // 3. Search in Meeting records
  [...boardMeetingsData, ...generalAssemblyMeetingsData].forEach(m => {
    const titleAr = m.title.ar.toLowerCase();
    const titleEn = m.title.en.toLowerCase();

    if (titleAr.includes(q) || titleEn.includes(q) || m.year.includes(q)) {
      results.push({
        id: `meeting-${m.id}`,
        title: locale === 'en' ? m.title.en : m.title.ar,
        type: 'governance',
        typeName: locale === 'en' ? (m.type === 'board' ? 'Board Minutes' : 'Assembly Minutes') : (m.type === 'board' ? 'محضر مجلس إدارة' : 'محضر جمعية عمومية'),
        excerpt: locale === 'en' ? `Meeting Year ${m.year} - Quorum: ${m.quorumPercentage}` : `سنة الانعقاد ${m.year} - نسبة النصاب: ${m.quorumPercentage}`,
        url: m.type === 'board' ? `/${locale}/meetings/board` : `/${locale}/meetings/general-assembly`,
      });
    }
  });

  return results;
};
