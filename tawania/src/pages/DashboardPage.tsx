import { useToast } from '../context/ToastContext';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  ShieldCheck,
  HeartHandshake,
  Smile,
  FileText,
  BookOpen,
  DollarSign,
  Sparkles,
  Calendar,
  Award,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Flame,
  Store,
  MapPin,
  Search,
  CheckCircle2,
  CheckCheck,
  Clock,
  Inbox,
  LogOut,
  Bell,
  UserCheck,
  UserPlus,
  UserCog,
  TrendingUp,
  Filter,
  Eye,
  X,
  Save,
  MessageSquareQuote,
  MessageSquare,
  Users,
  Crown,
  Image as ImageIcon,
  Building,
  Activity,
  Layers,
  ArrowRight,
  ArrowLeft,
  Briefcase,
  Lock,
  Download,
  FolderOpen,
  Printer,
  Phone,
  Send,
  Mail,
  LayoutGrid,
  Table as TableIcon,
  Copy,
  Check,
  Share2,
  Globe,
  RotateCcw,
  Layout,
  Target,
  Menu,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Upload
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/apiService';
import {
  useGovernanceData,
  initialBoardMembers,
  initialGalleryItems,
  initialSiteContactSettings,
  ProjectsHeaderData,
  BoardIntroData,
  SiteContactSettings,
  HeroSlideItem,
  HomeAboutData,
  HomeStatItem,
  StrategicGoalItem,
  TestimonialItemModel,
  PolicyItem,
  RegulationItem,
  FinancialItem,
  WorkshopItem,
  MeetingItem,
  EthicsItem,
  SubmissionItem
} from '../context/GovernanceDataContext';
import { useI18n } from '../i18n';
import { AlShamelLogo } from '../components/common/AlShamelLogo';

type TabType =
  | 'submissions'
  | 'gallery'
  | 'board-members'
  | 'members'
  | 'projects'
  | 'overview'
  | 'policies'
  | 'regulations'
  | 'financials'
  | 'workshops'
  | 'meetings'
  | 'ethics'
  | 'contact-info'
  | 'contact-messages'
  | 'executive-director'
  | 'home-management'
  | 'membership-requests'
  | 'feedback';

export const DashboardPage: React.FC = () => {
  const toast = useToast();
  const { locale, dir, getLocalizedPath } = useI18n();
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    galleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
    boardMembers,
    executiveDirector,
    updateExecutiveDirector,
    addBoardMember,
    updateBoardMember,
    deleteBoardMember,
    generalAssemblyMembers,
    addMember,
    updateMember,
    deleteMember,
    policies,
    regulations,
    financials,
    workshops,
    meetings,
    ethics,
    submissions,
    contactSettings,
    updateContactSettings,
    projectsHeader,
    updateProjectsHeader,
    boardIntro,
    updateBoardIntro,
    feedbackCards,
    updateFeedbackCards,
    addPolicy,
    updatePolicy,
    deletePolicy,
    addRegulation,
    updateRegulation,
    deleteRegulation,
    addFinancial,
    updateFinancial,
    deleteFinancial,
    addWorkshop,
    updateWorkshop,
    deleteWorkshop,
    addMeeting,
    updateMeeting,
    deleteMeeting,
    addEthics,
    updateEthics,
    deleteEthics,
    addSubmission,
    updateSubmissionStatus,
    deleteSubmission,
    homeHeroSlides,
    updateHomeHeroSlides,
    addHomeHeroSlide,
    deleteHomeHeroSlide,
    homeAboutData,
    updateHomeAboutData,
    homeStatsData,
    updateHomeStatsData,
    strategicGoals,
    addStrategicGoal,
    updateStrategicGoal,
    deleteStrategicGoal,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    resetToDefaults,
    notifications = [],
    unreadNotificationsCount = 0,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    deleteNotification,
    refreshNotifications
  } = useGovernanceData();

  const [notification, setNotification] = useState<string | null>(null);

  const safeNotifs = Array.isArray(notifications) ? notifications : [];
  const safeUnreadCount = typeof unreadNotificationsCount === 'number' ? unreadNotificationsCount : safeNotifs.filter(n => !n.isRead).length;

  
  // Refresh notifications and submissions on dashboard mount & every 15s
  useEffect(() => {
    refreshNotifications();
    refreshSubmissions();
    const interval = setInterval(() => {
      refreshNotifications();
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCategoryFilter, setNotificationCategoryFilter] = useState<'all' | 'unread' | 'whistleblowing' | 'membership' | 'survey' | 'contact_message'>('all');
  const notificationDropdownRef = useRef<HTMLDivElement>(null);

  // Close notification dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    };
    if (isNotificationOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isNotificationOpen]);

  // Handler: click on notification item to review
  const handleOpenNotificationItem = (notif: any) => {
    markNotificationAsRead(notif.id);
    setIsNotificationOpen(false);

    // Switch to submissions tab with corresponding filter
    setActiveTab('submissions');
    if (notif.module === 'whistleblowing') {
      setSubmissionFilter('whistleblowing');
    } else if (notif.module === 'membership') {
      setSubmissionFilter('membership');
    } else if (notif.module === 'survey') {
      setSubmissionFilter('survey');
    } else if (notif.module === 'contact_message') {
      setSubmissionFilter('contact_message');
    }

    // Find and open viewingSubmission modal if submission exists
    const matchedSub = submissions.find(s => String(s.id) === String(notif.id) || (s.title && notif.title && s.title.includes(notif.code)));
    if (matchedSub) {
      setViewingSubmission(matchedSub);
    }
  };

  const [submissionFilter, setSubmissionFilter] = useState<'all' | 'whistleblowing' | 'survey' | 'survey_supporters' | 'survey_assembly' | 'survey_customers' | 'survey_staff' | 'membership' | 'feedback' | 'contact_message'>('all');
  const [submissionViewMode, setSubmissionViewMode] = useState<'cards' | 'table'>('cards');
  const [viewingSubmission, setViewingSubmission] = useState<SubmissionItem | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  // Handler: Confirm membership submission and add to generalAssemblyMembers
  const handleConfirmMembershipFromSubmission = async (sub: SubmissionItem) => {
    let extractedShares = 50;
    const sharesMatch = sub.title.match(/(d+)s*سهم/) || sub.details.match(/عدد الأسهم[^d]*(d+)/);
    if (sharesMatch && sharesMatch[1]) {
      extractedShares = parseInt(sharesMatch[1], 10) || 50;
    }

    const alreadyExists = generalAssemblyMembers.some(
      (m) => m.name.trim().toLowerCase() === sub.senderName.trim().toLowerCase()
    );

    if (!alreadyExists) {
      await addMember({
        name: sub.senderName.trim(),
        nameEn: sub.senderName.trim(),
        sharesCount: extractedShares,
        joinYear: '1446',
        city: 'جدة',
        status: 'approved' as any
      });
    }

    await updateSubmissionStatus(sub.id, 'resolved');

    toast.success(
      locale === 'ar' ? 'تم اعتماد العضوية بنجاح' : 'Membership Approved',
      locale === 'ar'
        ? `تم اعتماد العضو "${sub.senderName}" بحصة (${extractedShares} سهم) وإضافته فورياً لسجل الجمعية العمومية!`
        : `Member "${sub.senderName}" has been approved and added to General Assembly Roster!`
    );
  };

  // Board Member Modal State
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const [editingBoardMember, setEditingBoardMember] = useState<any>(null);

  // Executive Director Modal State
  const [isExecDirectorModalOpen, setIsExecDirectorModalOpen] = useState(false);
  const [execDirectorForm, setExecDirectorForm] = useState({
    nameAr: '',
    roleAr: 'المدير التنفيذي للجمعية',
    phone: '',
    email: '',
    descriptionAr: '',
    image: ''
  });

  const handleOpenEditExecDirector = () => {
    setExecDirectorForm({
      nameAr: executiveDirector?.nameAr || 'أ. محمد ذواب مفرح الحربي',
      roleAr: executiveDirector?.roleAr || 'المدير التنفيذي للجمعية',
      phone: executiveDirector?.phone || '+966531389196',
      email: executiveDirector?.email || 'mohamad89196@gmail.com',
      descriptionAr: executiveDirector?.descriptionAr || executiveDirector?.bioAr || 'يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الأهداف التشغيلية والمبادرات التنموية.',
      image: executiveDirector?.image || ''
    });
    setIsExecDirectorModalOpen(true);
  };

  // Feedback Dashboard Copy / Share Links State & Helpers
  const [copiedDashboardLinkId, setCopiedDashboardLinkId] = useState<string | null>(null);

  const handleCopyDashboardLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedDashboardLinkId(id);
    setTimeout(() => setCopiedDashboardLinkId(null), 2000);
  };

  const handleShareDashboardLink = async (title: string, url: string) => {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(url);
      setCopiedDashboardLinkId('share-' + url);
      setTimeout(() => setCopiedDashboardLinkId(null), 2000);
    }
  };

  // Feedback Platform Cards Management State & Handlers
  const initialFeedbackCardsList = [
    {
      id: 'stakeholder-drive',
      titleAr: 'التغذيه الراجعة لاصحاب العلاقه',
      titleEn: 'Stakeholder Feedback Document',
      descriptionAr: 'تصفح المستند الموثق الخاص بالتغذية الراجعة واستجابات أصحاب العلاقة والشركاء.',
      descriptionEn: 'Browse verified document for stakeholder feedback and official partner responses.',
      url: 'https://drive.google.com/file/d/1GZtIwKitQNrezCYUaogUX8NS2LSL78ah/view?usp=sharing',
      platform: 'drive' as const,
      platformName: 'Google Drive',
      badgeAr: 'Google Drive PDF',
      badgeEn: 'Verified Document',
      accentColor: 'emerald' as const
    },
    {
      id: 'consumer-maps',
      titleAr: 'تقييمات استهلاكية تعاونية الرضا',
      titleEn: 'Consumer Hypermarket Google Reviews',
      descriptionAr: 'اطّلع على تقييمات وآراء العملاء المباشرة لأسواق ومنافذ البيع على خرائط جوجل.',
      descriptionEn: 'View verified live customer ratings and reviews for consumer markets on Google Maps.',
      url: 'https://maps.app.goo.gl/k7U4w9STDQVS1TPe7',
      platform: 'maps' as const,
      platformName: 'Google Maps',
      badgeAr: 'Google Maps',
      badgeEn: 'Google Maps Reviews',
      accentColor: 'amber' as const
    },
    {
      id: 'gas-maps',
      titleAr: 'تقييمات غـــاز الــرضــا',
      titleEn: 'Al-Reeda Gas Station Google Reviews',
      descriptionAr: 'تصفح تقييمات وتعليقات العملاء والمستفيدين لمحطة وخدمة غاز الرضا على الخريطة.',
      descriptionEn: 'Explore ratings and customer feedback for Al-Reeda gas services on Google Maps.',
      url: 'https://www.google.com/maps/place/%D8%BA%D8%A7%D8%B2+%D8%A7%D9%84%D8%B1%D8%B6%D8%A7%E2%80%AD/@21.5165623,39.6158877,15z/data=!4m8!3m7!1s0x15c221ebbb6af7a7:0x95b19c95aba8422e!8m2!3d21.5165623!4d39.6158877!9m1!1b1!16s%2Fg%2F11rzbf_l0k',
      platform: 'maps' as const,
      platformName: 'Google Maps',
      badgeAr: 'Google Maps',
      badgeEn: 'Google Maps Location',
      accentColor: 'blue' as const
    }
  ];

  // Dynamic feedbackCards from useGovernanceData

  const [isFeedbackCardModalOpen, setIsFeedbackCardModalOpen] = useState(false);
  const [editingFeedbackCard, setEditingFeedbackCard] = useState<any | null>(null);
  const [feedbackCardForm, setFeedbackCardForm] = useState<Partial<any>>({
    titleAr: '',
    descriptionAr: '',
    url: '',
    platform: 'drive',
    platformName: 'Google Drive',
    badgeAr: 'Google Drive PDF',
    accentColor: 'emerald'
  });

  useEffect(() => {
    // Sync with MySQL via updateFeedbackCards
  }, [feedbackCards]);

  const handleOpenAddFeedbackCard = () => {
    setEditingFeedbackCard(null);
    setFeedbackCardForm({
      titleAr: '',
      descriptionAr: '',
      url: '',
      platform: 'drive',
      platformName: 'Google Drive',
      badgeAr: 'Google Drive PDF',
      accentColor: 'emerald'
    });
    setIsFeedbackCardModalOpen(true);
  };

  const handleOpenEditFeedbackCard = (card: any) => {
    setEditingFeedbackCard(card);
    setFeedbackCardForm({ ...card });
    setIsFeedbackCardModalOpen(true);
  };

  const handleSaveFeedbackCard = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackCardForm.titleAr?.trim() || !feedbackCardForm.url?.trim()) return;

    let updatedList: any[] = [];
    if (editingFeedbackCard) {
      const cleanId = editingFeedbackCard.slug_id || editingFeedbackCard.slugId || editingFeedbackCard.id;
      updatedList = feedbackCards.map((c: any) =>
        c.id === cleanId || c.slug_id === cleanId
          ? {
            ...c,
            ...feedbackCardForm,
            id: cleanId,
            slug_id: cleanId,
            titleAr: feedbackCardForm.titleAr,
            titleEn: feedbackCardForm.titleEn || feedbackCardForm.titleAr,
            descriptionAr: feedbackCardForm.descriptionAr || '',
            descriptionEn: feedbackCardForm.descriptionEn || '',
            url: feedbackCardForm.url,
            platform: feedbackCardForm.platform || 'maps',
            platformName:
              feedbackCardForm.platformName ||
              (feedbackCardForm.platform === 'drive' ? 'Google Drive' : 'Google Maps'),
            badgeAr:
              feedbackCardForm.badgeAr ||
              (feedbackCardForm.platform === 'drive' ? 'Google Drive PDF' : 'Google Maps'),
            badgeEn:
              feedbackCardForm.badgeEn ||
              (feedbackCardForm.platform === 'drive' ? 'Verified Document' : 'Google Maps Location'),
            accentColor:
              feedbackCardForm.accentColor ||
              (feedbackCardForm.platform === 'drive' ? 'emerald' : 'amber')
          }
          : c
      );
      toast.success(
        locale === 'ar' ? 'تم تحديث المنصة' : 'Platform Updated',
        locale === 'ar' ? 'تم حفظ تعديلات منصة التقييم في قاعدة البيانات فورياً' : 'Saved to database'
      );
    } else {
      const newId = 'fc-' + Date.now();
      const newCard = {
        id: newId,
        slug_id: newId,
        titleAr: feedbackCardForm.titleAr,
        titleEn: feedbackCardForm.titleEn || feedbackCardForm.titleAr,
        descriptionAr: feedbackCardForm.descriptionAr || '',
        descriptionEn: feedbackCardForm.descriptionEn || '',
        url: feedbackCardForm.url,
        platform: feedbackCardForm.platform || 'maps',
        platformName:
          feedbackCardForm.platformName ||
          (feedbackCardForm.platform === 'drive' ? 'Google Drive' : 'Google Maps'),
        badgeAr:
          feedbackCardForm.badgeAr ||
          (feedbackCardForm.platform === 'drive' ? 'Google Drive PDF' : 'Google Maps'),
        badgeEn:
          feedbackCardForm.badgeEn ||
          (feedbackCardForm.platform === 'drive' ? 'Verified Document' : 'Google Maps Location'),
        accentColor:
          feedbackCardForm.accentColor ||
          (feedbackCardForm.platform === 'drive' ? 'emerald' : 'amber')
      };
      updatedList = [...feedbackCards, newCard];
      toast.success(
        locale === 'ar' ? 'تمت إضافة المنصة' : 'Platform Added',
        locale === 'ar' ? 'تمت إضافة منصة التقييم الجديدة إلى قاعدة البيانات بنجاح' : 'Created in database'
      );
    }

    await updateFeedbackCards(updatedList);
    setIsFeedbackCardModalOpen(false);
  };

  const handleDeleteFeedbackCard = async (id: string) => {
    if (confirm(locale === 'ar' ? 'هل أنت متأكد من حذف منصة التقييم؟' : 'Are you sure you want to delete this platform?')) {
      const updatedList = feedbackCards.filter((c: any) => c.id !== id && c.slug_id !== id);
      await updateFeedbackCards(updatedList);
      toast.success(
        locale === 'ar' ? 'تم الحذف' : 'Deleted',
        locale === 'ar' ? 'تم حذف منصة التقييم من قاعدة البيانات بنجاح' : 'Deleted from database'
      );
    }
  };

  const handleResetFeedbackCards = async () => {
    await updateFeedbackCards(initialFeedbackCardsList);
    toast.success(
      locale === 'ar' ? 'تمت استعادة المنصات الأصلية' : 'Feedback Cards Reset',
      locale === 'ar' ? 'تمت استعادة المنصات الافتراضية وحفظها في قاعدة البيانات' : 'Reset to default cards in database'
    );
  };
  const handleSaveExecDirector = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateExecutiveDirector({
      ...execDirectorForm,
      descriptionAr: execDirectorForm.descriptionAr,
      bioAr: execDirectorForm.descriptionAr
    });
    setIsExecDirectorModalOpen(false);
    toast.success(
      locale === 'ar' ? 'تم تحديث بيانات المدير التنفيذي' : 'Executive Director Updated',
      locale === 'ar'
        ? 'تم حفظ بيانات المدير التنفيذي في السيرفر وتطبيقها فورياً على كافة الصفحات'
        : 'Executive Director profile updated successfully!'
    );
  };

  const [boardForm, setBoardForm] = useState({
    nameAr: '',
    roleAr: 'عضو مجلس الإدارة',
    badgeAr: 'عضو مجلس الإدارة',
    email: 'info@shamil.org.sa',
    phone: '',
    bioAr: '',
    initialsAr: '',
    image: '',
    order: 1,
    isChairman: false
  });

  const handleOpenAddBoardMember = () => {
    setEditingBoardMember(null);
    setBoardForm({
      nameAr: '',
      roleAr: 'عضو مجلس الإدارة',
      badgeAr: 'عضو مجلس الإدارة',
      email: 'info@shamil.org.sa',
      phone: '',
      bioAr: '',
      initialsAr: '',
      image: '',
      order: ((boardMembers && boardMembers.length > 0) ? boardMembers : initialBoardMembers).length + 1,
      isChairman: false
    });
    setIsBoardModalOpen(true);
  };

  const handleOpenEditBoardMember = (member: any) => {
    setEditingBoardMember(member);
    setBoardForm({
      nameAr: member.nameAr || '',
      roleAr: member.roleAr || '',
      badgeAr: member.badgeAr || '',
      email: member.email || 'info@shamil.org.sa',
      phone: member.phone || '',
      bioAr: member.bioAr || '',
      initialsAr: member.initialsAr || '',
      image: member.image || '',
      order: member.order || 1,
      isChairman: !!member.isChairman
    });
    setIsBoardModalOpen(true);
  };

  const handleSaveBoardMember = async (e: React.FormEvent) => {
    e.preventDefault();
    let initials = boardForm.initialsAr;
    if (!initials && boardForm.nameAr) {
      const parts = boardForm.nameAr.trim().split(' ');
      initials = parts.length > 1 ? `${parts[0][0]} . ${parts[parts.length - 1][0]}` : parts[0].slice(0, 2);
    }

    const payload = {
      ...boardForm,
      initialsAr: initials
    };

    if (editingBoardMember) {
      await updateBoardMember(editingBoardMember.id, payload);
      toast.success(
        locale === 'ar' ? 'تم تحديث عضو المجلس' : 'Board Member Updated',
        locale === 'ar' ? 'تم حفظ التعديلات في قاعدة البيانات وتحديث الصفحة فورياً' : 'Saved to database successfully'
      );
    } else {
      await addBoardMember(payload);
      toast.success(
        locale === 'ar' ? 'تمت إضافة عضو المجلس' : 'Board Member Added',
        locale === 'ar' ? 'تمت إضافة العضو الجديد لقاعدة البيانات بنجاح' : 'Created in database successfully'
      );
    }
    setIsBoardModalOpen(false);
  };

  // Gallery Modal State
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<any>(null);
  const [galleryForm, setGalleryForm] = useState({
    titleAr: '',
    titleEn: '',
    category: 'projects',
    categoryNameAr: 'مشاريع الجمعية',
    imageUrl: '',
    date: new Date().toISOString().slice(0, 10),
    locationAr: 'محافظة جدة',
    locationEn: 'Jeddah Governorate',
    captionAr: '',
    captionEn: ''
  });

  const handleOpenAddGalleryItem = () => {
    setEditingGalleryItem(null);
    setGalleryForm({
      titleAr: '',
      titleEn: '',
      category: 'projects',
      categoryNameAr: 'مشاريع الجمعية',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      date: new Date().toISOString().slice(0, 10),
      locationAr: 'محافظة جدة',
      locationEn: 'Jeddah Governorate',
      captionAr: '',
      captionEn: ''
    });
    setIsGalleryModalOpen(true);
  };

  const handleOpenEditGalleryItem = (item: any) => {
    setEditingGalleryItem(item);
    setGalleryForm({
      titleAr: item.titleAr || '',
      titleEn: item.titleEn || '',
      category: item.category || 'projects',
      categoryNameAr: item.categoryNameAr || 'مشاريع الجمعية',
      imageUrl: item.imageUrl || '',
      date: item.date || new Date().toISOString().slice(0, 10),
      locationAr: item.locationAr || '',
      locationEn: item.locationEn || '',
      captionAr: item.captionAr || '',
      captionEn: item.captionEn || ''
    });
    setIsGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    let catNameAr = 'مشاريع الجمعية';
    if (galleryForm.category === 'events') catNameAr = 'الفعاليات والجمعيات';
    else if (galleryForm.category === 'partnerships') catNameAr = 'الشراكات والاتفاقيات';
    else if (galleryForm.category === 'activities') catNameAr = 'الأنشطة والتدريب';

    const payload = {
      ...galleryForm,
      categoryNameAr: catNameAr
    };

    if (editingGalleryItem) {
      await updateGalleryItem(editingGalleryItem.id, payload);
      toast.success(
        locale === 'ar' ? 'تم تحديث عنصر المعرض' : 'Gallery Item Updated',
        locale === 'ar' ? 'تم تحديث بيانات وتفاصيل الصورة في السيرفر وتطبيقها فورياً' : 'Gallery item updated to server successfully'
      );
    } else {
      await addGalleryItem(payload);
      toast.success(
        locale === 'ar' ? 'تمت إضافة صورة للمعرض' : 'Gallery Item Added',
        locale === 'ar' ? 'تمت إضافة الصورة الجديدة وحفظها في قاعدة البيانات' : 'New gallery item created successfully'
      );
    }
    setIsGalleryModalOpen(false);
  };

  // General Assembly Members Modal State
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [memberName, setMemberName] = useState('');
  const [memberNameEn, setMemberNameEn] = useState('');
  const [memberShares, setMemberShares] = useState(100);
  const [memberJoinYear, setMemberJoinYear] = useState('1440');
  const [memberCity, setMemberCity] = useState('الجموم');

  const openMemberModal = (item?: any) => {
    if (item) {
      setEditingMember(item);
      setMemberName(item.name || '');
      setMemberNameEn(item.nameEn || '');
      setMemberShares(item.sharesCount || 100);
      setMemberJoinYear(item.joinYear || '1440');
      setMemberCity(item.city || 'الجموم');
    } else {
      setEditingMember(null);
      setMemberName('');
      setMemberNameEn('');
      setMemberShares(100);
      setMemberJoinYear('1440');
      setMemberCity('الجموم');
    }
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim()) return;

    if (editingMember) {
      await updateMember({
        ...editingMember,
        name: memberName.trim(),
        nameEn: memberNameEn.trim(),
        sharesCount: memberShares,
        joinYear: memberJoinYear,
        city: memberCity
      });
      toast.success(
        locale === 'ar' ? 'تم تحديث العضو' : 'Member Updated',
        locale === 'ar' ? 'تم تحديث بيانات العضو في قاعدة البيانات فورياً' : 'Updated in database'
      );
    } else {
      await addMember({
        name: memberName.trim(),
        nameEn: memberNameEn.trim(),
        sharesCount: memberShares,
        joinYear: memberJoinYear,
        city: memberCity,
        status: 'approved' as any
      });
      toast.success(
        locale === 'ar' ? 'تمت إضافة العضو' : 'Member Added',
        locale === 'ar' ? 'تم حفظ العضو الجديد في سجل الجمعية العمومية' : 'Created in database'
      );
    }
    setIsMemberModalOpen(false);
  };

  // -------------------------------------------------------------------------
  // GOVERNANCE MODULES STATES & HANDLERS (Policies, Regulations, Workshops, Financials, Meetings, Ethics)
  // -------------------------------------------------------------------------
  // Helper for normalizing governance form state defaults
  const getGovernanceFormDefaults = <T extends Record<string, any>>(item?: T | null) => {
    if (!item) return {};
    return {
      ...item,
      descriptionAr: item.descriptionAr || item.descAr || '',
      descAr: item.descAr || item.descriptionAr || '',
      pdfUrl: item.pdfUrl || item.fileUrl || item.downloadUrl || '',
      fileUrl: item.fileUrl || item.pdfUrl || item.downloadUrl || '',
      date: item.date || item.dateAr || '',
      dateAr: item.dateAr || item.date || '',
      surplus: item.surplus || item.netSurplus || '',
      netSurplus: item.netSurplus || item.surplus || '',
      revenue: item.revenue || '',
      sec: item.sec === 'foundation' ? 'bylaws' : item.sec,
      type: item.type === 'general_assembly' ? 'assembly' : item.type
    };
  };

  // PDF File Upload Handler (Persistent Data URL)
  const handlePdfFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      alert(locale === 'ar' ? 'الرجاء اختيار ملف بصيغة PDF فقط' : 'Please select a valid PDF file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onSuccess(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Image File Upload Handler (Persistent Data URL)
  const handleImageFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert(locale === 'ar' ? 'الرجاء اختيار ملف صورة فقط (JPG, PNG, WEBP...)' : 'Please select an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        onSuccess(result);
      }
    };
    reader.readAsDataURL(file);
  };

  // 1. Policies Modal
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<PolicyItem | null>(null);
  const [policyForm, setPolicyForm] = useState<Partial<PolicyItem & { descriptionAr?: string; pdfUrl?: string }>>({
    titleAr: '', titleEn: '', descAr: '', descEn: '', code: '', version: '',
    approvedDate: '', approvedByAr: 'مجلس الإدارة', approvedByEn: 'Board of Directors',
    category: 'general', fileSize: '1.0 MB', fileUrl: '', pdfUrl: '', descriptionAr: ''
  });

  const handleOpenAddPolicy = () => {
    setEditingPolicy(null);
    setPolicyForm({
      titleAr: '', titleEn: '', descAr: '', descEn: '', code: '', version: '',
      approvedDate: '', approvedByAr: 'مجلس الإدارة', approvedByEn: 'Board of Directors',
      category: 'general', fileSize: '1.0 MB', fileUrl: '', pdfUrl: '', descriptionAr: ''
    });
    setIsPolicyModalOpen(true);
  };
  const handleOpenEditPolicy = (item: PolicyItem) => {
    setEditingPolicy(item);
    const desc = item.descAr || (item as any).descriptionAr || '';
    const file = item.fileUrl || (item as any).pdfUrl || '';
    setPolicyForm({
      ...item,
      titleAr: item.titleAr || '',
      titleEn: item.titleEn || '',
      code: item.code || '',
      version: item.version || '',
      approvedDate: item.approvedDate || '',
      approvedByAr: item.approvedByAr || 'مجلس الإدارة',
      approvedByEn: item.approvedByEn || 'Board of Directors',
      category: item.category || 'general',
      descAr: desc,
      descEn: item.descEn || '',
      fileSize: item.fileSize || '1.0 MB',
      fileUrl: file,
      pdfUrl: file,
      descriptionAr: desc
    });
    setIsPolicyModalOpen(true);
  };
  const handleSavePolicy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyForm.titleAr?.trim()) return;

    const descVal = policyForm.descAr || policyForm.descriptionAr || '';
    const fileVal = policyForm.fileUrl || policyForm.pdfUrl || '';

    const payload: any = {
      ...(editingPolicy || {}),
      ...policyForm,
      category: policyForm.category || 'general',
      titleAr: policyForm.titleAr?.trim() || '',
      titleEn: policyForm.titleEn?.trim() || null,
      code: policyForm.code?.trim() || ('POL-SHM-' + Date.now().toString().slice(-4)),
      version: policyForm.version?.trim() || 'الإصدار 1.0',
      approvedDate: policyForm.approvedDate?.trim() || new Date().toISOString().split('T')[0],
      approvedByAr: policyForm.approvedByAr?.trim() || 'مجلس الإدارة',
      approvedByEn: policyForm.approvedByEn?.trim() || 'Board of Directors',
      descAr: descVal,
      descEn: policyForm.descEn?.trim() || null,
      fileSize: policyForm.fileSize || '1.0 MB',
      fileUrl: fileVal,
      pdfUrl: fileVal,
      descriptionAr: descVal
    };

    if (editingPolicy) {
      await updatePolicy(payload);
      toast.success(
        locale === 'ar' ? 'تم تحديث السياسة' : 'Policy Updated',
        locale === 'ar' ? 'تم حفظ كافة بيانات السياسة وملف PDF بنجاح في قاعدة البيانات' : 'Saved to database'
      );
    } else {
      await addPolicy({
        ...payload,
        id: `pol-${Date.now()}`
      });
      toast.success(
        locale === 'ar' ? 'تمت إضافة السياسة' : 'Policy Added',
        locale === 'ar' ? 'تمت إضافة السياسة الجديدة في قاعدة البيانات بنجاح' : 'Created in database'
      );
    }
    setIsPolicyModalOpen(false);
  };

  // 2. Regulations Modal
  const [isRegulationModalOpen, setIsRegulationModalOpen] = useState(false);
  const [editingRegulation, setEditingRegulation] = useState<RegulationItem | null>(null);
  const [regulationForm, setRegulationForm] = useState<Partial<RegulationItem & { descriptionAr?: string; pdfUrl?: string }>>({
    titleAr: '',
    titleEn: '',
    sec: 'foundation' as any,
    type: 'وثيقة تأسيسية',
    num: 'REG-001',
    descAr: '',
    descEn: '',
    descriptionAr: '',
    fileSize: '2.5 MB',
    fileUrl: '',
    pdfUrl: ''
  });

  const handleOpenAddRegulation = () => {
    setEditingRegulation(null);
    setRegulationForm({
      titleAr: '',
      titleEn: '',
      sec: 'foundation' as any,
      type: 'وثيقة تأسيسية',
      num: 'REG-' + Math.floor(100 + Math.random() * 900),
      descAr: '',
      descEn: '',
      descriptionAr: '',
      fileSize: '2.5 MB',
      fileUrl: '',
      pdfUrl: ''
    });
    setIsRegulationModalOpen(true);
  };

  const handleOpenEditRegulation = (item: RegulationItem) => {
    setEditingRegulation(item);
    const file = item.fileUrl || (item as any).pdfUrl || (item as any).file_url || '';
    const desc = item.descAr || (item as any).descriptionAr || '';
    setRegulationForm({
      ...item,
      titleAr: item.titleAr || '',
      titleEn: item.titleEn || '',
      sec: item.sec || 'foundation',
      type: item.type || 'وثيقة تأسيسية',
      num: item.num || '',
      descAr: desc,
      descEn: item.descEn || '',
      descriptionAr: desc,
      fileSize: item.fileSize || '2.5 MB',
      fileUrl: file,
      pdfUrl: file
    });
    setIsRegulationModalOpen(true);
  };

  const handleSaveRegulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regulationForm.titleAr?.trim()) return;

    const fileVal = regulationForm.fileUrl || regulationForm.pdfUrl || (regulationForm as any).file_url || '';
    const descVal = regulationForm.descAr || regulationForm.descriptionAr || '';

    const payload: any = {
      ...(editingRegulation || {}),
      ...regulationForm,
      id: editingRegulation ? (editingRegulation.id || (editingRegulation as any).slug_id) : `reg-${Date.now()}`,
      slug_id: editingRegulation ? ((editingRegulation as any).slug_id || editingRegulation.id) : `reg-${Date.now()}`,
      sec: regulationForm.sec || 'foundation',
      titleAr: regulationForm.titleAr?.trim() || '',
      titleEn: regulationForm.titleEn?.trim() || null,
      type: regulationForm.type || 'لائحة تنظيمية',
      num: regulationForm.num?.trim() || ('REG-' + Math.floor(100 + Math.random() * 900)),
      descAr: descVal,
      descEn: regulationForm.descEn?.trim() || null,
      descriptionAr: descVal,
      fileSize: regulationForm.fileSize || '2.5 MB',
      fileUrl: fileVal,
      pdfUrl: fileVal,
      file_url: fileVal
    };

    if (editingRegulation) {
      await updateRegulation(payload);
      toast.success(
        locale === 'ar' ? 'تم تحديث اللائحة' : 'Regulation Updated',
        locale === 'ar' ? 'تم حفظ بيانات اللائحة وملف الـ PDF بنجاح في قاعدة البيانات' : 'Saved to database'
      );
    } else {
      await addRegulation({
        ...payload,
        id: `reg-${Date.now()}`,
        slug_id: `reg-${Date.now()}`
      });
      toast.success(
        locale === 'ar' ? 'تمت إضافة اللائحة' : 'Regulation Added',
        locale === 'ar' ? 'تمت إضافة اللائحة الجديدة في قاعدة البيانات بنجاح' : 'Created in database'
      );
    }
    setIsRegulationModalOpen(false);
  };

  const handleDeleteRegulation = async (id: string | number, title: string) => {
    if (confirm(locale === 'ar' ? `حذف "${title}"؟` : `Delete "${title}"?`)) {
      await deleteRegulation(id);
      toast.success(
        locale === 'ar' ? 'تم الحذف' : 'Deleted',
        locale === 'ar' ? 'تم حذف اللائحة من قاعدة البيانات بنجاح' : 'Deleted from database'
      );
    }
  };

  // 3. Financials Modal
  const [isFinancialModalOpen, setIsFinancialModalOpen] = useState(false);
  const [editingFinancial, setEditingFinancial] = useState<FinancialItem | null>(null);
  const [financialForm, setFinancialForm] = useState<Partial<FinancialItem & { pdfUrl?: string; descriptionAr?: string }>>({
    titleAr: '',
    titleEn: '',
    year: '2023',
    status: 'معتمد',
    revenue: '',
    expenses: '',
    surplus: '',
    netSurplus: '',
    auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
    auditFirmEn: 'Certified Chartered Accountants',
    fileSize: '3.5 MB',
    fileUrl: '',
    pdfUrl: ''
  });

  const handleOpenAddFinancial = () => {
    setEditingFinancial(null);
    setFinancialForm({
      titleAr: '',
      titleEn: '',
      year: '2024',
      status: 'معتمد',
      revenue: '',
      expenses: '',
      surplus: '',
      netSurplus: '',
      auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
      auditFirmEn: 'Certified Chartered Accountants',
      fileSize: '3.5 MB',
      fileUrl: '',
      pdfUrl: ''
    });
    setIsFinancialModalOpen(true);
  };

  const handleOpenEditFinancial = (item: FinancialItem) => {
    setEditingFinancial(item);
    const file = item.fileUrl || (item as any).pdfUrl || (item as any).downloadUrl || '';
    const surplusVal = item.netSurplus || (item as any).surplus || '';
    setFinancialForm({
      ...item,
      titleAr: item.titleAr || '',
      titleEn: item.titleEn || '',
      year: String(item.year || '2023'),
      status: item.status || 'معتمد',
      revenue: item.revenue || '',
      expenses: item.expenses || '',
      surplus: surplusVal,
      netSurplus: surplusVal,
      auditFirmAr: item.auditFirmAr || 'مكتب المحاسب القانوني المعتمد',
      auditFirmEn: item.auditFirmEn || 'Certified Chartered Accountants',
      fileSize: item.fileSize || '3.5 MB',
      fileUrl: file,
      pdfUrl: file
    });
    setIsFinancialModalOpen(true);
  };

  const handleSaveFinancial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!financialForm.titleAr?.trim()) return;

    const fileVal = financialForm.pdfUrl || financialForm.fileUrl || (financialForm as any).downloadUrl || '';
    const surplusVal = financialForm.netSurplus || financialForm.surplus || '';

    const payload: any = {
      ...(editingFinancial || {}),
      ...financialForm,
      year: String(financialForm.year || '2023').trim(),
      titleAr: financialForm.titleAr?.trim() || '',
      titleEn: financialForm.titleEn?.trim() || null,
      status: financialForm.status || 'معتمد',
      revenue: financialForm.revenue?.trim() || '',
      expenses: financialForm.expenses?.trim() || '',
      surplus: surplusVal,
      netSurplus: surplusVal,
      auditFirmAr: financialForm.auditFirmAr?.trim() || 'مكتب المحاسب القانوني المعتمد',
      auditFirmEn: financialForm.auditFirmEn?.trim() || 'Certified Chartered Accountants',
      fileSize: financialForm.fileSize || '3.5 MB',
      fileUrl: fileVal,
      pdfUrl: fileVal,
      downloadUrl: fileVal
    };

    if (editingFinancial) {
      await updateFinancial(payload);
      toast.success(
        locale === 'ar' ? 'تم تحديث القائمة المالية' : 'Financial Statement Updated',
        locale === 'ar' ? 'تم حفظ كافة بيانات القائمة المالية وملف PDF بنجاح في قاعدة البيانات' : 'Saved to database'
      );
    } else {
      await addFinancial({
        ...payload,
        id: `fin-${payload.year || Date.now()}`,
        slug_id: `fin-${payload.year || Date.now()}`
      });
      toast.success(
        locale === 'ar' ? 'تمت إضافة القائمة المالية' : 'Financial Statement Added',
        locale === 'ar' ? 'تمت إضافة القائمة المالية الجديدة في قاعدة البيانات بنجاح' : 'Created in database'
      );
    }
    setIsFinancialModalOpen(false);
  };

  const handleDeleteFinancial = async (id: string | number, title: string) => {
    if (confirm(locale === 'ar' ? `هل أنت متأكد من حذف (${title})؟` : `Delete (${title})?`)) {
      await deleteFinancial(id);
      toast.success(
        locale === 'ar' ? 'تم الحذف' : 'Deleted',
        locale === 'ar' ? 'تم حذف القائمة المالية من قاعدة البيانات بنجاح' : 'Deleted from database'
      );
    }
  };

  // 4. Workshops Modal
  const [isWorkshopModalOpen, setIsWorkshopModalOpen] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState<WorkshopItem | null>(null);
  const [workshopForm, setWorkshopForm] = useState<Partial<WorkshopItem & { descriptionAr?: string; pdfUrl?: string }>>({
    titleAr: '',
    titleEn: '',
    type: 'internal',
    dateAr: '',
    dateEn: '',
    date: '',
    locationAr: '',
    locationEn: '',
    attendeesCount: 30,
    hoursCount: 4,
    targetAudienceAr: '',
    targetAudienceEn: '',
    trainerAr: '',
    trainerEn: '',
    descAr: '',
    descEn: '',
    descriptionAr: '',
    fileSize: '3.5 MB',
    fileUrl: '',
    pdfUrl: ''
  });

  const handleOpenAddWorkshop = () => {
    setEditingWorkshop(null);
    setWorkshopForm({
      titleAr: '',
      titleEn: '',
      type: 'internal',
      dateAr: '2024-05-15م',
      dateEn: 'May 2024',
      date: '2024-05-15م',
      locationAr: 'المقر الرئيسي للجمعية',
      locationEn: 'Cooperative HQ',
      attendeesCount: 30,
      hoursCount: 4,
      targetAudienceAr: 'أعضاء مجلس الإدارة والإدارة التنفيذية',
      targetAudienceEn: 'Board & Executive Team',
      trainerAr: 'مستشار الحوكمة والامتثال',
      trainerEn: 'Governance Senior Consultant',
      descAr: '',
      descEn: '',
      descriptionAr: '',
      fileSize: '3.5 MB',
      fileUrl: '',
      pdfUrl: ''
    });
    setIsWorkshopModalOpen(true);
  };

  const handleOpenEditWorkshop = (item: WorkshopItem) => {
    setEditingWorkshop(item);
    const file = item.fileUrl || (item as any).pdfUrl || '';
    const desc = item.descAr || (item as any).descriptionAr || '';
    const dateVal = item.dateAr || (item as any).date || '';
    setWorkshopForm({
      ...item,
      titleAr: item.titleAr || '',
      titleEn: item.titleEn || '',
      type: item.type || 'internal',
      dateAr: dateVal,
      dateEn: item.dateEn || '',
      date: dateVal,
      locationAr: item.locationAr || '',
      locationEn: item.locationEn || '',
      attendeesCount: item.attendeesCount || 30,
      hoursCount: item.hoursCount || 4,
      targetAudienceAr: item.targetAudienceAr || '',
      targetAudienceEn: item.targetAudienceEn || '',
      trainerAr: item.trainerAr || '',
      trainerEn: item.trainerEn || '',
      descAr: desc,
      descEn: item.descEn || '',
      descriptionAr: desc,
      fileSize: item.fileSize || '3.5 MB',
      fileUrl: file,
      pdfUrl: file
    });
    setIsWorkshopModalOpen(true);
  };

  const handleSaveWorkshop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!workshopForm.titleAr?.trim()) return;

    const fileVal = workshopForm.fileUrl || workshopForm.pdfUrl || '';
    const descVal = workshopForm.descAr || workshopForm.descriptionAr || '';
    const dateVal = workshopForm.dateAr || workshopForm.date || '';

    const payload: any = {
      ...(editingWorkshop || {}),
      ...workshopForm,
      type: workshopForm.type || 'internal',
      titleAr: workshopForm.titleAr?.trim() || '',
      titleEn: workshopForm.titleEn?.trim() || null,
      dateAr: dateVal,
      dateEn: workshopForm.dateEn?.trim() || null,
      date: dateVal,
      locationAr: workshopForm.locationAr?.trim() || 'المقر الرئيسي للجمعية',
      locationEn: workshopForm.locationEn?.trim() || null,
      attendeesCount: Number(workshopForm.attendeesCount) || 30,
      hoursCount: Number(workshopForm.hoursCount) || 4,
      targetAudienceAr: workshopForm.targetAudienceAr?.trim() || 'منسوبو الجمعية والشركاء',
      targetAudienceEn: workshopForm.targetAudienceEn?.trim() || null,
      trainerAr: workshopForm.trainerAr?.trim() || 'مستشار الحوكمة والتدريب',
      trainerEn: workshopForm.trainerEn?.trim() || null,
      descAr: descVal,
      descEn: workshopForm.descEn?.trim() || null,
      descriptionAr: descVal,
      fileSize: workshopForm.fileSize || '3.5 MB',
      fileUrl: fileVal,
      pdfUrl: fileVal
    };

    if (editingWorkshop) {
      await updateWorkshop(payload);
      toast.success(
        locale === 'ar' ? 'تم تحديث الورشة' : 'Workshop Updated',
        locale === 'ar' ? 'تم حفظ بيانات ومخرجات الورشة وملف PDF بنجاح في قاعدة البيانات' : 'Saved to database'
      );
    } else {
      await addWorkshop({
        ...payload,
        id: `wkp-${Date.now()}`,
        slug_id: `wkp-${Date.now()}`
      });
      toast.success(
        locale === 'ar' ? 'تمت إضافة الورشة' : 'Workshop Added',
        locale === 'ar' ? 'تمت إضافة الورشة الجديدة في قاعدة البيانات بنجاح' : 'Created in database'
      );
    }
    setIsWorkshopModalOpen(false);
  };

  const handleDeleteWorkshop = async (id: string | number, title: string) => {
    if (confirm(locale === 'ar' ? `حذف "${title}"؟` : `Delete "${title}"?`)) {
      await deleteWorkshop(id);
      toast.success(
        locale === 'ar' ? 'تم الحذف' : 'Deleted',
        locale === 'ar' ? 'تم حذف الورشة من قاعدة البيانات بنجاح' : 'Deleted from database'
      );
    }
  };

  // 5. Meetings Modal
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [editingMeeting, setEditingMeeting] = useState<MeetingItem | null>(null);
  const [meetingForm, setMeetingForm] = useState<Partial<MeetingItem> & { date?: string; pdfUrl?: string; descriptionAr?: string; descriptionEn?: string }>({
    titleAr: '',
    titleEn: '',
    meetingNumber: '',
    type: 'general_assembly',
    dateAr: '',
    dateEn: '',
    locationAr: 'المقر الرئيسي للجمعية',
    locationEn: 'Main Headquarters',
    attendeesCount: 0,
    decisionsCount: 0,
    descAr: '',
    descEn: '',
    fileSize: '2.0 MB',
    fileUrl: '',
    pdfUrl: '',
    date: '',
    descriptionAr: '',
    descriptionEn: ''
  });

  const handleOpenAddMeeting = () => {
    setEditingMeeting(null);
    setMeetingForm({
      titleAr: '',
      titleEn: '',
      meetingNumber: '',
      type: 'general_assembly',
      dateAr: '',
      dateEn: '',
      locationAr: 'المقر الرئيسي للجمعية',
      locationEn: 'Main Headquarters',
      attendeesCount: 0,
      decisionsCount: 0,
      descAr: '',
      descEn: '',
      fileSize: '2.0 MB',
      fileUrl: '',
      pdfUrl: '',
      date: '',
      descriptionAr: '',
      descriptionEn: ''
    });
    setIsMeetingModalOpen(true);
  };

  const handleOpenEditMeeting = (item: MeetingItem) => {
    setEditingMeeting(item);
    const desc = item.descAr || (item as any).descriptionAr || '';
    const file = item.fileUrl || (item as any).pdfUrl || '';
    const dateVal = item.dateAr || (item as any).date || '';
    setMeetingForm({
      ...item,
      titleAr: item.titleAr || '',
      titleEn: item.titleEn || '',
      meetingNumber: item.meetingNumber || '',
      type: item.type === 'board' ? 'board' : 'general_assembly',
      dateAr: dateVal,
      dateEn: item.dateEn || '',
      locationAr: item.locationAr || 'المقر الرئيسي للجمعية',
      locationEn: item.locationEn || 'Main Headquarters',
      attendeesCount: item.attendeesCount || 0,
      decisionsCount: item.decisionsCount || 0,
      descAr: desc,
      descEn: item.descEn || '',
      fileSize: item.fileSize || '2.0 MB',
      fileUrl: file,
      pdfUrl: file,
      date: dateVal,
      descriptionAr: desc
    });
    setIsMeetingModalOpen(true);
  };

  const handleSaveMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!meetingForm.titleAr?.trim()) return;

    const rawType = meetingForm.type === 'board' ? 'board' : 'general_assembly';
    const dateVal = meetingForm.dateAr || meetingForm.date || 'أبريل 2024م';
    const descVal = meetingForm.descAr || meetingForm.descriptionAr || '';
    const fileVal = meetingForm.fileUrl || meetingForm.pdfUrl || '';

    const payload: any = {
      ...(editingMeeting || {}),
      ...meetingForm,
      type: rawType,
      titleAr: meetingForm.titleAr?.trim() || '',
      titleEn: meetingForm.titleEn?.trim() || null,
      meetingNumber: meetingForm.meetingNumber?.trim() || (rawType === 'board' ? `BM-${Date.now().toString().slice(-4)}` : `GA-${Date.now().toString().slice(-4)}`),
      dateAr: dateVal,
      dateEn: meetingForm.dateEn?.trim() || null,
      locationAr: meetingForm.locationAr?.trim() || 'المقر الرئيسي للجمعية',
      locationEn: meetingForm.locationEn?.trim() || 'Main Headquarters',
      attendeesCount: Number(meetingForm.attendeesCount) || 0,
      decisionsCount: Number(meetingForm.decisionsCount) || 0,
      descAr: descVal,
      descEn: meetingForm.descEn?.trim() || null,
      fileSize: meetingForm.fileSize || '2.0 MB',
      fileUrl: fileVal,
      pdfUrl: fileVal,
      date: dateVal,
      descriptionAr: descVal
    };

    if (editingMeeting) {
      await updateMeeting(payload);
      toast.success(
        locale === 'ar' ? 'تم تحديث المحضر' : 'Meeting Updated',
        locale === 'ar' ? 'تم حفظ كافة بيانات المحضر وملف PDF بنجاح في قاعدة البيانات' : 'Updated in database'
      );
    } else {
      await addMeeting({
        ...payload,
        id: rawType === 'board' ? `bm-${Date.now()}` : `ga-${Date.now()}`
      });
      toast.success(
        locale === 'ar' ? 'تمت إضافة المحضر' : 'Meeting Added',
        locale === 'ar' ? 'تمت إضافة محضر الاجتماع الجديد في قاعدة البيانات بنجاح' : 'Created in database'
      );
    }
    setIsMeetingModalOpen(false);
  };

  // 6. Ethics Modal
  const [isEthicsModalOpen, setIsEthicsModalOpen] = useState(false);
  const [editingEthics, setEditingEthics] = useState<EthicsItem | null>(null);
  const [ethicsForm, setEthicsForm] = useState<Partial<EthicsItem> & { descriptionAr?: string; descriptionEn?: string; pdfUrl?: string }>({
    titleAr: '',
    titleEn: '',
    descAr: '',
    descEn: '',
    fileName: 'Ethical-Charter-and-Code-of-Conduct.pdf',
    fileSize: '2.4 MB',
    fileUrl: '',
    pdfUrl: '',
    descriptionAr: '',
    descriptionEn: ''
  });

  const handleOpenAddEthics = () => {
    setEditingEthics(null);
    setEthicsForm({
      titleAr: '',
      titleEn: '',
      descAr: '',
      descEn: '',
      fileName: 'Ethical-Charter-and-Code-of-Conduct.pdf',
      fileSize: '2.4 MB',
      fileUrl: '',
      pdfUrl: '',
      descriptionAr: '',
      descriptionEn: ''
    });
    setIsEthicsModalOpen(true);
  };

  const handleOpenEditEthics = (item: EthicsItem) => {
    setEditingEthics(item);
    const desc = item.descAr || (item as any).descriptionAr || '';
    const file = item.fileUrl || (item as any).pdfUrl || '';
    setEthicsForm({
      ...item,
      titleAr: item.titleAr || '',
      titleEn: item.titleEn || '',
      descAr: desc,
      descEn: item.descEn || (item as any).descriptionEn || '',
      fileName: item.fileName || 'Ethical-Charter-and-Code-of-Conduct.pdf',
      fileSize: item.fileSize || '2.4 MB',
      fileUrl: file,
      pdfUrl: file,
      descriptionAr: desc
    });
    setIsEthicsModalOpen(true);
  };

  const handleSaveEthics = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ethicsForm.titleAr?.trim()) return;

    const descVal = ethicsForm.descAr || ethicsForm.descriptionAr || '';
    const fileVal = ethicsForm.fileUrl || ethicsForm.pdfUrl || '';

    const payload: any = {
      ...(editingEthics || {}),
      ...ethicsForm,
      titleAr: ethicsForm.titleAr?.trim() || '',
      titleEn: ethicsForm.titleEn?.trim() || null,
      descAr: descVal,
      descEn: ethicsForm.descEn?.trim() || null,
      fileName: ethicsForm.fileName?.trim() || 'Ethical-Charter-and-Code-of-Conduct.pdf',
      fileSize: ethicsForm.fileSize || '2.4 MB',
      fileUrl: fileVal,
      pdfUrl: fileVal
    };

    if (editingEthics) {
      await updateEthics(payload);
      toast.success(
        locale === 'ar' ? 'تم تحديث الميثاق الأخلاقي' : 'Ethics Charter Updated',
        locale === 'ar' ? 'تم حفظ تعديلات وثيقة الميثاق الأخلاقي وملف PDF في قاعدة البيانات' : 'Saved to database successfully'
      );
    } else {
      await addEthics({
        ...payload,
        id: `eth-${Date.now()}`
      });
      toast.success(
        locale === 'ar' ? 'تمت إضافة الميثاق الأخلاقي' : 'Ethics Item Added',
        locale === 'ar' ? 'تمت إضافة بند الميثاق الأخلاقي الجديد في قاعدة البيانات بنجاح' : 'Created in database'
      );
    }
    setIsEthicsModalOpen(false);
  };

  const handleDeleteEthics = async (id: string | number, title: string) => {
    if (confirm(locale === 'ar' ? `هل أنت متأكد من حذف (${title})؟` : `Delete (${title})?`)) {
      await deleteEthics(id);
      toast.success(
        locale === 'ar' ? 'تم الحذف' : 'Deleted',
        locale === 'ar' ? 'تم حذف بند الميثاق الأخلاقي من قاعدة البيانات بنجاح' : 'Deleted from database'
      );
    }
  };

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [projName, setProjName] = useState('');
  const [projImage, setProjImage] = useState('');
  const [projDesc, setProjDesc] = useState('');
  const [projSubDesc, setProjSubDesc] = useState('');
  const [projFeatures, setProjFeatures] = useState<string[]>([]);
  const [projSocietyAr, setProjSocietyAr] = useState('');
  const [projSocietyEn, setProjSocietyEn] = useState('');

  const openProjectModal = (item?: any) => {
    if (item) {
      setEditingProject(item);
      setProjName(item.name || '');
      setProjImage(item.image || '');
      setProjDesc(item.description || '');
      setProjSubDesc(item.subDescription || '');
      setProjFeatures(item.features ? [...item.features] : []);
      setProjSocietyAr(item.societyNameAr || '');
      setProjSocietyEn(item.societyNameEn || '');
    } else {
      setEditingProject(null);
      setProjName('');
      setProjImage('');
      setProjDesc('');
      setProjSubDesc('');
      setProjFeatures([]);
      setProjSocietyAr('الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم');
      setProjSocietyEn('THE MULTI-PURPOSE COOPERATIVE SOCIETY, REDA, IN JAMOUM GOVERNORATE');
    }
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projName.trim()) return;

    const projectData = {
      id: editingProject ? editingProject.id : 'proj-' + Date.now(),
      name: projName.trim(),
      image: projImage.trim() || undefined,
      description: projDesc.trim() || undefined,
      subDescription: projSubDesc.trim() || undefined,
      features: projFeatures.filter(f => f.trim() !== ''),
      societyNameAr: projSocietyAr.trim() || undefined,
      societyNameEn: projSocietyEn.trim() || undefined,
    };

    if (editingProject) {
      updateProject(projectData);
    } else {
      addProject(projectData);
    }
    setIsProjectModalOpen(false);
  };

  const addFeatureInput = () => {
    setProjFeatures(prev => [...prev, '']);
  };

  const updateFeatureInput = (index: number, val: string) => {
    setProjFeatures(prev => {
      const updated = [...prev];
      updated[index] = val;
      return updated;
    });
  };

  const removeFeatureInput = (index: number) => {
    setProjFeatures(prev => prev.filter((_, i) => i !== index));
  };

  // -------------------------------------------------------------------------
  // HOME PAGE MANAGEMENT STATES & HANDLERS
  // -------------------------------------------------------------------------
  const [homeSubTab, setHomeSubTab] = useState<'hero' | 'about' | 'stats' | 'goals' | 'testimonials'>('about');

  // About Section Form
  const [aboutForm, setAboutForm] = useState<HomeAboutData>(homeAboutData);
  useEffect(() => { setAboutForm(homeAboutData); }, [homeAboutData]);

  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHomeAboutData(aboutForm);
    toast.success(
      locale === 'ar' ? 'تم حفظ وتحديث قسم من نحن' : 'About Us Updated',
      locale === 'ar' ? 'تم حفظ وتحديث المحتوى في سيرفر البيانات وتطبيقها فورياً على الواجهة' : 'Changes saved to live server successfully'
    );
  };

  // Live Stats Form
  const [statsForm, setStatsForm] = useState<HomeStatItem[]>(homeStatsData);
  useEffect(() => { setStatsForm(homeStatsData); }, [homeStatsData]);

  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateHomeStatsData(statsForm);
    toast.success(
      locale === 'ar' ? 'تم حفظ الإحصائيات' : 'Stats Saved',
      locale === 'ar' ? 'تم حفظ الأرقام والإحصائيات وتحديثها فورياً في قواعد البيانات والواجهة' : 'Stats updated to live server successfully'
    );
  };

  // Hero Slide Modal
  const [isHeroModalOpen, setIsHeroModalOpen] = useState(false);
  const [editingHeroSlide, setEditingHeroSlide] = useState<HeroSlideItem | null>(null);
  const [heroSlideForm, setHeroSlideForm] = useState<Partial<HeroSlideItem>>({});

  const handleOpenAddHeroSlide = () => {
    setEditingHeroSlide(null);
    setHeroSlideForm({
      id: 'slide-' + Date.now(),
      titleAr: '',
      titleEn: '',
      subtitleAr: '',
      subtitleEn: '',
      highlightAr: '',
      highlightEn: '',
      ctaTextAr: 'اكتشف مشاريعنا',
      ctaTextEn: 'Discover Our Projects',
      ctaLink: '/projects',
      badgeAr: 'تعاونية الشامل',
      badgeEn: 'AlShamel Cooperative',
      bgImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80'
    });
    setIsHeroModalOpen(true);
  };

  const handleOpenEditHeroSlide = (slide: HeroSlideItem) => {
    setEditingHeroSlide(slide);
    setHeroSlideForm(slide);
    setIsHeroModalOpen(true);
  };

  const handleSaveHeroSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSlideForm.titleAr) return;
    if (editingHeroSlide) {
      updateHomeHeroSlides(homeHeroSlides.map(s => s.id === editingHeroSlide.id ? { ...editingHeroSlide, ...heroSlideForm } as HeroSlideItem : s));
      showNotification(locale === 'ar' ? 'تم تحديث شريحة الهيرو بنجاح!' : 'Hero slide updated!');
    } else {
      addHomeHeroSlide({
        id: heroSlideForm.id || ('slide-' + Date.now()),
        titleAr: heroSlideForm.titleAr || '',
        titleEn: heroSlideForm.titleEn || heroSlideForm.titleAr || '',
        subtitleAr: heroSlideForm.subtitleAr || '',
        subtitleEn: heroSlideForm.subtitleEn || heroSlideForm.subtitleAr || '',
        highlightAr: heroSlideForm.highlightAr || '',
        highlightEn: heroSlideForm.highlightEn || '',
        ctaTextAr: heroSlideForm.ctaTextAr || 'اكتشف مشاريعنا',
        ctaTextEn: heroSlideForm.ctaTextEn || 'Discover Projects',
        ctaLink: heroSlideForm.ctaLink || '/projects',
        badgeAr: heroSlideForm.badgeAr || 'تعاونية الشامل',
        badgeEn: heroSlideForm.badgeEn || 'AlShamel Cooperative',
        bgImage: heroSlideForm.bgImage || 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=2000&q=80'
      });
      showNotification(locale === 'ar' ? 'تمت إضافة شريحة هيرو جديدة!' : 'New hero slide added!');
    }
    setIsHeroModalOpen(false);
  };

  // Strategic Goal Modal
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<StrategicGoalItem | null>(null);
  const [goalForm, setGoalForm] = useState<Partial<StrategicGoalItem>>({});

  const handleOpenAddGoal = () => {
    setEditingGoal(null);
    setGoalForm({
      id: Date.now(),
      number: strategicGoals.length + 1,
      titleAr: '',
      titleEn: '',
      descriptionAr: '',
      descriptionEn: ''
    });
    setIsGoalModalOpen(true);
  };

  const handleOpenEditGoal = (goal: StrategicGoalItem) => {
    setEditingGoal(goal);
    setGoalForm(goal);
    setIsGoalModalOpen(true);
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!goalForm.titleAr) return;
    if (editingGoal) {
      updateStrategicGoal({ ...editingGoal, ...goalForm } as StrategicGoalItem);
      showNotification(locale === 'ar' ? 'تم تحديث الهدف الاستراتيجي!' : 'Goal updated!');
    } else {
      addStrategicGoal({
        id: goalForm.id || Date.now(),
        number: Number(goalForm.number) || (strategicGoals.length + 1),
        titleAr: goalForm.titleAr || '',
        titleEn: goalForm.titleEn || goalForm.titleAr || '',
        descriptionAr: goalForm.descriptionAr || '',
        descriptionEn: goalForm.descriptionEn || ''
      });
      showNotification(locale === 'ar' ? 'تمت إضافة هدف استراتيجي جديد!' : 'New goal added!');
    }
    setIsGoalModalOpen(false);
  };

  // Testimonial Modal
  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItemModel | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<TestimonialItemModel>>({});

  const handleOpenAddTestimonial = () => {
    setEditingTestimonial(null);
    setTestimonialForm({
      id: 't-' + Date.now(),
      nameAr: '',
      nameEn: '',
      roleAr: 'مواطن - عميل دائم',
      roleEn: 'Regular Customer',
      organizationAr: 'محافظة جدة',
      organizationEn: 'Jeddah Resident',
      quoteAr: '',
      quoteEn: '',
      rating: 5,
      projectRelatedAr: 'استهلاكية الشامل',
      projectRelatedEn: 'AlShamel Consumer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      date: new Date().toISOString().slice(0, 10)
    });
    setIsTestimonialModalOpen(true);
  };

  const handleOpenEditTestimonial = (item: TestimonialItemModel) => {
    setEditingTestimonial(item);
    setTestimonialForm(item);
    setIsTestimonialModalOpen(true);
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testimonialForm.nameAr || !testimonialForm.quoteAr) return;
    if (editingTestimonial) {
      updateTestimonial({ ...editingTestimonial, ...testimonialForm } as TestimonialItemModel);
      showNotification(locale === 'ar' ? 'تم تحديث التقييم والشهادة!' : 'Testimonial updated!');
    } else {
      addTestimonial({
        id: testimonialForm.id || ('t-' + Date.now()),
        nameAr: testimonialForm.nameAr || '',
        nameEn: testimonialForm.nameEn || testimonialForm.nameAr || '',
        roleAr: testimonialForm.roleAr || 'عميل دائم',
        roleEn: testimonialForm.roleEn || 'Regular Customer',
        organizationAr: testimonialForm.organizationAr || 'جدة',
        organizationEn: testimonialForm.organizationEn || 'Jeddah',
        quoteAr: testimonialForm.quoteAr || '',
        quoteEn: testimonialForm.quoteEn || testimonialForm.quoteAr || '',
        rating: Number(testimonialForm.rating) || 5,
        projectRelatedAr: testimonialForm.projectRelatedAr || 'مشاريع الجمعية',
        projectRelatedEn: testimonialForm.projectRelatedEn || 'Society Projects',
        avatar: testimonialForm.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        date: testimonialForm.date || new Date().toISOString().slice(0, 10)
      });
      showNotification(locale === 'ar' ? 'تمت إضافة رأي/شهادة جديدة بنجاح!' : 'New testimonial added!');
    }
    setIsTestimonialModalOpen(false);
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Read active tab from URL search param or localStorage
  const [boardIntroForm, setBoardIntroForm] = useState<BoardIntroData>(() => boardIntro || {
    cycleBadgeAr: 'الدورة الانتخابية الثانية',
    cycleBadgeEn: 'Second Electoral Term',
    titleAr: 'أعضاء مجلس الإدارة',
    titleEn: 'Board of Directors',
    descAr: 'تدار الجمعية من قبل مجلس إدارة عدد أعضائه لا يقل عن خمسة أعضاء تنتخبهم الجمعية العمومية. ومدة عضوية مجلس الإدارة الحالي (الثاني) المنتخب أربع سنوات. ويبلغ عدد أعضائه في دورته الحالية خمسة أعضاء لإدارة الجمعية في خلال الفترة من 1443/6/22 هـ حتى 1447/6/22 هـ.',
    descEn: 'The cooperative is managed by a Board of Directors of no fewer than five members elected by the General Assembly. The current term is four years from 1443/6/22 AH to 1447/6/22 AH.',
    startDate: '1443/6/22 هـ',
    endDate: '1447/6/22 هـ',
    durationYears: 4,
    membersCount: 5
  });
  const [savingBoardIntro, setSavingBoardIntro] = useState(false);

  useEffect(() => {
    if (boardIntro) {
      setBoardIntroForm(boardIntro);
    }
  }, [boardIntro]);

  const handleSaveBoardIntro = async () => {
    setSavingBoardIntro(true);
    try {
      const ok = await updateBoardIntro(boardIntroForm);
      if (ok) {
        toast.success(locale === 'ar' ? 'تم حفظ وتحديث بيانات الدورة الانتخابية ومجلس الإدارة بنجاح' : 'Board cycle info saved successfully');
      } else {
        toast.error(locale === 'ar' ? 'حدث خطأ أثناء الحفظ' : 'Failed to save board info');
      }
    } catch {
      toast.error(locale === 'ar' ? 'حدث خطأ أثناء الحفظ' : 'Failed to save board info');
    } finally {
      setSavingBoardIntro(false);
    }
  };

  const [projectsHeaderForm, setProjectsHeaderForm] = useState<ProjectsHeaderData>({
    badgeAr: 'مشاريع واستثمارات الجمعية',
    badgeEn: 'Cooperative Enterprises',
    titleAr: 'مشاريعنا التنموية',
    titleEn: 'Our Development Projects',
    descAr: 'تعاونية الشامل أسست مشاريع متعددة عبر مختلف المجالات منذ تأسيسها بما في ذلك التسويق والأسواق الاستهلاكية والتوزيع ومصنع التعبئة والتغليف والأعلاف وتنمية الثروة الحيوانية والزراعية.',
    descEn: 'AlShamel Cooperative has established diverse impactful projects across various sectors since inception, including marketing, consumer markets, distribution, packaging facilities, and feed & agricultural development.'
  });

  useEffect(() => {
    if (projectsHeader) {
      setProjectsHeaderForm({
        badgeAr: projectsHeader.badgeAr || 'مشاريع واستثمارات الجمعية',
        badgeEn: projectsHeader.badgeEn || 'Cooperative Enterprises',
        titleAr: projectsHeader.titleAr || 'مشاريعنا التنموية',
        titleEn: projectsHeader.titleEn || 'Our Development Projects',
        descAr: projectsHeader.descAr || 'تعاونية الشامل أسست مشاريع متعددة عبر مختلف المجالات منذ تأسيسها بما في ذلك التسويق والأسواق الاستهلاكية والتوزيع ومصنع التعبئة والتغليف والأعلاف وتنمية الثروة الحيوانية والزراعية.',
        descEn: projectsHeader.descEn || 'AlShamel Cooperative has established diverse impactful projects across various sectors since inception, including marketing, consumer markets, distribution, packaging facilities, and feed & agricultural development.'
      });
    }
  }, [projectsHeader]);

  const [savingProjectsHeader, setSavingProjectsHeader] = useState(false);

  const handleSaveProjectsHeader = async () => {
    setSavingProjectsHeader(true);
    const ok = await updateProjectsHeader(projectsHeaderForm);
    setSavingProjectsHeader(false);
    if (ok) {
      toast.success(locale === 'ar' ? 'تم حفظ عنوان ووصف قسم المشاريع بنجاح' : 'Projects section header updated successfully');
    } else {
      toast.error(locale === 'ar' ? 'حدث خطأ أثناء الحفظ' : 'Failed to save projects header');
    }
  };

  const location = useLocation();

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && tabParam.trim()) {
        const target = tabParam.trim();
        if (target === 'governance') return 'policies';
        return target as TabType;
      }
    } catch { }
    return 'overview';
  });

  // Sync activeTab whenever URL query string changes
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tabParam = params.get('tab');
    if (tabParam) {
      const target = tabParam === 'governance' ? 'policies' : tabParam;
      setActiveTab(target as TabType);
      localStorage.setItem('tawania_dashboard_tab', target);
    } else {
      setActiveTab('overview');
      localStorage.setItem('tawania_dashboard_tab', 'overview');
    }
  }, [location.search]);

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const handleTabChange = (tabId: TabType | 'governance') => {
    let effectiveTab: TabType = tabId === 'governance' ? 'policies' : tabId;
    let savedTabName: string = tabId;

    if (tabId === 'governance') {
      effectiveTab = 'policies';
      savedTabName = 'policies';
    } else if (tabId === 'submissions') {
      effectiveTab = 'submissions';
      setSubmissionFilter('all');
    } else if (tabId === 'membership-requests') {
      effectiveTab = 'membership-requests';
      savedTabName = 'membership-requests';
    } else if (tabId === 'feedback') {
      effectiveTab = 'feedback';
      savedTabName = 'feedback';
    } else if (tabId === 'contact-messages') {
      effectiveTab = 'contact-messages';
      savedTabName = 'contact-messages';
    }

    setActiveTab(effectiveTab);
    setSearchQuery('');
    setIsMobileNavOpen(false);
    try {
      localStorage.setItem('tawania_dashboard_tab', savedTabName);
      const url = new URL(window.location.href);
      url.searchParams.set('tab', savedTabName);
      window.history.replaceState({}, '', url.toString());
    } catch { }
  };

  const checkIsTabActive = (tabId: string) => {
    if (activeTab === 'submissions') {
      if (tabId === 'submissions') {
        return submissionFilter === 'all' || submissionFilter === 'whistleblowing' || submissionFilter.startsWith('survey');
      }
    }
    return activeTab === tabId;
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [membersCurrentPage, setMembersCurrentPage] = useState(1);
  const [overviewApiData, setOverviewApiData] = useState<any>(null);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const res = await apiService.getDashboardOverview();
        if (res && res.success && res.data) {
          setOverviewApiData(res.data);
        }
      } catch (err) {
        console.error('Error fetching dashboard overview:', err);
      }
    };
    fetchOverview();
  }, []);
  const [membersPerPage, setMembersPerPage] = useState(20);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      const saved = localStorage.getItem('tawania_dashboard_tab');
      const target = tabParam || saved;
      if (target === 'membership-requests') setSubmissionFilter('membership');
      else if (target === 'feedback') setSubmissionFilter('feedback');
      else if (target === 'contact-messages') setSubmissionFilter('contact_message');
    } catch { }
  }, []);

  // Sub-group filter states
  const [policyFilter, setPolicyFilter] = useState<'all' | 'general' | 'aml'>('all');
  const [regulationFilter, setRegulationFilter] = useState<'all' | 'foundation' | 'financial' | 'laws'>('all');
  const [workshopFilter, setWorkshopFilter] = useState<'all' | 'internal' | 'community'>('all');
  const [meetingFilter, setMeetingFilter] = useState<'all' | 'general_assembly' | 'board'>('all');
  const [financialYearFilter, setFinancialYearFilter] = useState<string>('all');

  const handleLogout = () => {
    logout();
    navigate(getLocalizedPath('/login'));
  };


  // Navigation hierarchy matching main website Navbar (Main Links & Sublinks)
  const navSections = [
    {
      groupKey: 'home',
      groupTitleAr: 'الرئيسية والمؤشرات',
      groupTitleEn: 'Overview & Hub',
      tabs: [
        {
          id: 'overview',
          labelAr: 'ملخص مؤشرات الأداء',
          labelEn: 'Overview Hub',
          descAr: 'الإحصائيات والملخص العام للجمعية',
          descEn: 'Statistics & overall summary',
          icon: Activity,
          count: null
        },
        {
          id: 'home-management',
          labelAr: 'إدارة الواجهة الرئيسية',
          labelEn: 'Home Page Management',
          descAr: 'إدارة الهيرو، من نحن، الإحصائيات، الأهداف، قالوا عنا',
          descEn: 'Manage Hero, About, Live Stats, Objectives, Testimonials',
          icon: Layout,
          count: 5
        }
      ]
    },
    {
      groupKey: 'members-group',
      groupTitleAr: 'عضوية الجمعية العمومية',
      groupTitleEn: 'General Assembly Membership',
      tabs: [
        {
          id: 'membership-requests',
          labelAr: 'طلبات الانضمام والعضوية الجديدة',
          labelEn: 'Membership Applications',
          descAr: 'متابعة، مراجعة، واعتماد طلبات المساهمين الجدد',
          descEn: 'Review & approve new member applications',
          icon: UserCheck,
          count: (submissions || []).filter((s) => s.module === 'membership').length,
          alert: (submissions || []).filter((s) => s.module === 'membership' && s.status === 'pending').length > 0
        },
        {
          id: 'members',
          labelAr: 'سجل أعضاء الجمعية العمومية',
          labelEn: 'General Assembly Directory',
          descAr: 'إدارة وتحديث سجل الأعضاء والمساهمين المعتمدين',
          descEn: 'Manage member roster & shares',
          icon: Users,
          count: (generalAssemblyMembers || []).length
        }
      ]
    },
    {
      groupKey: 'governance-board',
      groupTitleAr: 'مجلس الإدارة والقيادة التنفيذية',
      groupTitleEn: 'Board & Executive Leadership',
      tabs: [
        {
          id: 'executive-director',
          labelAr: 'المدير التنفيذي للجمعية',
          labelEn: 'Executive Director (CEO)',
          descAr: 'إدارة وتحديث بيانات وسيرة وصلاحيات المدير التنفيذي',
          descEn: 'Manage Executive Director profile & responsibilities',
          icon: UserCog,
          count: 1
        },
        {
          id: 'board-members',
          labelAr: 'أعضاء مجلس الإدارة',
          labelEn: 'Board of Directors',
          descAr: 'إدارة وتحديث بيانات أعضاء المجلس والدورة الانتخابية',
          descEn: 'Manage Board of Directors roster',
          icon: Crown,
          count: ((boardMembers && boardMembers.length > 0) ? boardMembers : initialBoardMembers).length
        },
        {
          id: 'projects',
          labelAr: 'مشاريع واستثمارات الجمعية',
          labelEn: 'Projects Management',
          descAr: 'إدارة وتعديل بطاقات ومبادرات المشاريع',
          descEn: 'Manage project cards',
          icon: Briefcase,
          count: (projects || []).length
        },
        {
          id: 'gallery',
          labelAr: 'معرض الصور والفعاليات',
          labelEn: 'Gallery & Events',
          descAr: 'إدارة وتحديث ألبومات الصور والفعاليات والمشاريع',
          descEn: 'Manage photo gallery & event media',
          icon: ImageIcon,
          count: ((galleryItems && galleryItems.length > 0) ? galleryItems : initialGalleryItems).length
        }
      ]
    },
    {
      groupKey: 'submissions-group',
      groupTitleAr: 'الشكاوي وقياس الرضا والمقترحات',
      groupTitleEn: 'Complaints, Surveys & Feedback',
      tabs: [
        {
          id: 'submissions',
          labelAr: 'الشكاوي وقياس الرضا والمقترحات',
          labelEn: 'Complaints, Surveys & Feedback',
          descAr: 'متابعة البلاغات السرية واستبيانات رضا الجهات الداعمة',
          descEn: 'Manage whistleblowing reports & partner surveys',
          icon: MessageSquareQuote,
          count: submissions.filter((s) => s.module === 'whistleblowing' || s.module === 'survey').length,
          alert: submissions.filter((s) => (s.module === 'whistleblowing' || s.module === 'survey') && s.status === 'pending').length > 0
        },
        {
          id: 'feedback',
          labelAr: 'التغذية الراجعة والمقترحات',
          labelEn: 'Feedback & Suggestions',
          descAr: 'متابعة آراء وتوصيات ومقترحات المستفيدين والعملاء',
          descEn: 'Manage customer feedback & recommendations',
          icon: MessageSquare,
          count: submissions.filter((s) => s.module === 'feedback').length,
          alert: submissions.filter((s) => s.module === 'feedback' && s.status === 'pending').length > 0
        },
        {
          id: 'contact-messages',
          labelAr: 'رسائل تواصل معنا المباشرة',
          labelEn: 'Direct Contact Messages',
          descAr: 'متابعة والرد على رسائل نموذج اتصل بنا',
          descEn: 'Incoming contact form submissions from website visitors',
          icon: Mail,
          count: submissions.filter((s) => s.module === 'contact_message').length,
          alert: submissions.filter((s) => s.module === 'contact_message' && s.status === 'pending').length > 0
        },
        {
          id: 'contact-info',
          labelAr: 'قنوات التواصل وبيانات الجمعية',
          labelEn: 'Contact Channels & Site Info',
          descAr: 'إدارة الهواتف، البريد، العنوان، الخريطة وشعاري الموقع الفاتح والداكن',
          descEn: 'Manage phone, email, address, Google Maps & logos',
          icon: Phone,
          count: 1
        }
      ]
    },
    {
      groupKey: 'governance',
      groupTitleAr: 'الحوكمة',
      groupTitleEn: 'Governance',
      tabs: [
        {
          id: 'meetings',
          labelAr: 'محاضر الاجتماعات',
          labelEn: 'Meeting Minutes',
          descAr: 'الجمعية العمومية والمجلس',
          descEn: 'General assembly & board',
          icon: Calendar,
          count: meetings.length
        },
        {
          id: 'ethics',
          labelAr: 'الميثاق الأخلاقي',
          labelEn: 'Ethics Charter',
          descAr: 'قواعد السلوك والنزاهة المؤسسية',
          descEn: 'Institutional conduct code',
          icon: Award,
          count: ethics.length
        },
        {
          id: 'policies',
          labelAr: 'السياسات المؤسسية',
          labelEn: 'Policies & AML',
          descAr: 'تعارض، إبلاغ، غسل أموال',
          descEn: 'Governance & AML policies',
          icon: FileText,
          count: policies.length
        },
        {
          id: 'financials',
          labelAr: 'القوائم المالية المدققة',
          labelEn: 'Financial Statements',
          descAr: 'تقارير الأعوام 2019-2023م',
          descEn: 'Audited annual financials',
          icon: DollarSign,
          count: financials.length
        },
        {
          id: 'regulations',
          labelAr: 'اللوائح والأنظمة والملفات المالية',
          labelEn: 'Regulations & Bylaws',
          descAr: 'تأسيسية، مالية، وأنظمة',
          descEn: 'Bylaws, certificates & finance',
          icon: BookOpen,
          count: regulations.length
        },
        {
          id: 'workshops',
          labelAr: 'الورش والشراكات المجتمعية',
          labelEn: 'Workshops & Community',
          descAr: 'ورش داخلية وشراكات مجتمعية',
          descEn: 'Internal & community workshops',
          icon: Sparkles,
          count: workshops.length
        }
      ]
    },

  ];

  return (
    <div className="min-h-screen max-w-full overflow-x-hidden bg-[#F4F6F5] text-[#17211E] flex flex-col font-sans pt-[70px] lg:pt-[75px]" dir={dir}>
      {/* Top Navbar matching main website Header design */}
      <header className="fixed top-0 inset-x-0 z-40 w-full h-[70px] lg:h-[75px] bg-white border-b border-gray-200/90 flex items-center shrink-0">
        <div className="w-full h-full flex items-center justify-between">
          {/* Logo & Column Divider (Matches sidebar width lg:w-64 xl:w-68) */}
          <div className="flex items-center gap-3 px-4 lg:px-0 lg:w-64 xl:w-68 shrink-0 lg:border-e lg:border-gray-200/90 h-full justify-start lg:justify-center">
            <Link to={getLocalizedPath('/')} className="flex items-center justify-center">
              <AlShamelLogo size="sm" textColor="#0A4D38" />
            </Link>
          </div>

          {/* Content Header Actions (Search + Notifications + User Avatar + Mobile Drawer Toggle) */}
          <div className="flex-1 h-full px-4 sm:px-6 flex items-center justify-between gap-3 min-w-0">
            {/* Search Input with ⌘K (visible on md+) */}
            <div className="relative max-w-md w-full hidden md:block">
              <Search className="w-4 h-4 text-gray-400 absolute start-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={locale === 'ar' ? 'بحث سريع في المستندات واللوائح والقرارات...' : 'Search anything...'}
                className="w-full ps-10 pe-12 py-2 rounded-full bg-gray-50/80 hover:bg-gray-100/80 focus:bg-white   focus:border-[#0B6B4F] focus:ring-2 focus:ring-[#0B6B4F]/10 text-xs text-gray-800 placeholder-gray-400 transition-all outline-none"
              />
              <kbd className="absolute end-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded text-[10px] font-mono text-gray-400 bg-white">
                ⌘K
              </kbd>
            </div>

            {/* Right Controls matching website header */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 ms-auto shrink-0">
              {/* Public Site Link (hidden on sm/mobile, available inside mobile drawer) */}
              <Link
                to={getLocalizedPath('/')}
                target="_blank"
                className="hidden md:flex h-8 w-8 rounded-full bg-gray-50 hover:bg-[#EBF4F0]   text-gray-600 hover:text-[#0B6B4F] transition-all items-center justify-center cursor-pointer shadow-2xs"
                title={locale === 'ar' ? 'معاينة الموقع' : 'Public Site'}
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              {/* Dynamic Notifications Dropdown */}
              <div className="relative" ref={notificationDropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                  className={`h-8 w-8 rounded-full ${isNotificationOpen ? 'bg-[#0B6B4F] text-white shadow-md' : 'bg-gray-50 hover:bg-[#EBF4F0] text-gray-600 hover:text-[#0B6B4F]'} relative transition-all flex items-center justify-center cursor-pointer shadow-2xs`}
                  title={locale === 'ar' ? 'الإشعارات والتنبيهات' : 'Notifications'}
                  aria-expanded={isNotificationOpen}
                >
                  <Bell className="w-3.5 h-3.5" />
                  {safeUnreadCount > 0 && (
                    <span className="min-w-[17px] h-[17px] px-1 bg-rose-600 text-white text-[9px] font-black rounded-full absolute -top-1.5 -right-1.5 ring-2 ring-white flex items-center justify-center animate-pulse shadow-sm">
                      {safeUnreadCount > 9 ? '9+' : safeUnreadCount}
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isNotificationOpen && (
                  <div className="absolute top-full end-0 mt-2.5 w-[360px] sm:w-[420px] max-w-[92vw] bg-white rounded-2xl shadow-2xl border border-gray-100/90 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[520px]">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#12332B] to-[#0B6B4F] text-white p-3.5 px-4 flex items-center justify-between shrink-0 shadow-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-[#C9A45C]">
                          <Bell className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white leading-tight">
                            {locale === 'ar' ? 'مركز الإشعارات والتنبيهات' : 'Notification Center'}
                          </h4>
                          <span className="text-[10px] text-white/70 font-medium">
                            {safeUnreadCount > 0
                              ? (locale === 'ar' ? `${safeUnreadCount} إشعار جديد غير مقروء` : `${safeUnreadCount} unread`)
                              : (locale === 'ar' ? 'جميع الإشعارات مقروءة' : 'All caught up')}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {safeUnreadCount > 0 && (
                          <button
                            type="button"
                            onClick={async (e) => {
                              e.stopPropagation();
                              await markAllNotificationsAsRead();
                              toast.success(
                                locale === 'ar' ? 'تم تحديد جميع الإشعارات كمقروءة' : 'All notifications marked as read'
                              );
                            }}
                            className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                            title={locale === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all read'}
                          >
                            <CheckCheck className="w-3 h-3 text-[#C9A45C]" />
                            <span>{locale === 'ar' ? 'تمييز الكل' : 'Mark All'}</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => setIsNotificationOpen(false)}
                          className="w-6 h-6 rounded-lg text-white/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Filter Category Pills */}
                    <div className="p-2 px-3 bg-gray-50/90 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 no-scrollbar">
                      {[
                        { id: 'all', labelAr: 'الكل', labelEn: 'All', count: safeNotifs.length },
                        { id: 'unread', labelAr: 'غير مقروءة', labelEn: 'Unread', count: safeUnreadCount },
                        { id: 'whistleblowing', labelAr: 'البلاغات', labelEn: 'Complaints', count: safeNotifs.filter(n => n.module === 'whistleblowing').length },
                        { id: 'membership', labelAr: 'العضوية', labelEn: 'Membership', count: safeNotifs.filter(n => n.module === 'membership').length },
                        { id: 'survey', labelAr: 'الاستبيانات', labelEn: 'Surveys', count: safeNotifs.filter(n => n.module === 'survey').length },
                        { id: 'contact_message', labelAr: 'الرسائل', labelEn: 'Messages', count: safeNotifs.filter(n => n.module === 'contact_message').length },
                      ].map(cat => (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setNotificationCategoryFilter(cat.id as any)}
                          className={`px-2.5 py-1 rounded-full text-[10.5px] font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1 ${
                            notificationCategoryFilter === cat.id
                              ? 'bg-[#0B6B4F] text-white shadow-xs'
                              : cat.id === 'unread' && safeUnreadCount > 0
                              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200'
                              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200/60'
                          }`}
                        >
                          <span>{locale === 'ar' ? cat.labelAr : cat.labelEn}</span>
                          {cat.count > 0 && (
                            <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                              notificationCategoryFilter === cat.id
                                ? 'bg-white/25 text-white'
                                : cat.id === 'unread'
                                ? 'bg-rose-600 text-white'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {cat.count}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Notifications List */}
                    <div className="overflow-y-auto flex-1 divide-y divide-gray-100 max-h-[350px]">
                      {(() => {
                        const filteredNotifs = safeNotifs.filter(n => {
                          if (notificationCategoryFilter === 'all') return true;
                          if (notificationCategoryFilter === 'unread') return !n.isRead;
                          return n.module === notificationCategoryFilter;
                        });

                        if (filteredNotifs.length === 0) {
                          return (
                            <div className="py-12 px-4 text-center flex flex-col items-center justify-center text-gray-400">
                              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#0B6B4F] flex items-center justify-center mb-2.5 shadow-inner">
                                <Inbox className="w-6 h-6" />
                              </div>
                              <p className="text-xs font-bold text-gray-700">
                                {locale === 'ar' ? 'لا توجد إشعارات في هذا القسم' : 'No notifications in this category'}
                              </p>
                              <p className="text-[11px] text-gray-400 mt-0.5">
                                {locale === 'ar' ? 'جميع الواردات والطلبات محدثة ومقروءة' : 'All incoming items are up to date'}
                              </p>
                            </div>
                          );
                        }

                        return filteredNotifs.map(notif => {
                          const isUnread = !notif.isRead;
                          const isComplaint = notif.module === 'whistleblowing';
                          const isMember = notif.module === 'membership';
                          const isSurvey = notif.module === 'survey';

                          return (
                            <div
                              key={notif.id}
                              onClick={() => handleOpenNotificationItem(notif)}
                              className={`p-3 px-3.5 hover:bg-emerald-50/50 transition-colors cursor-pointer relative flex items-start gap-2.5 group ${
                                isUnread ? 'bg-emerald-50/25' : 'bg-white opacity-85 hover:opacity-100'
                              }`}
                            >
                              {/* Unread indicator dot */}
                              {isUnread && (
                                <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0 mt-2 ring-2 ring-rose-200 animate-pulse" />
                              )}

                              {/* Category Icon */}
                              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-2xs transition-transform group-hover:scale-105 ${
                                isComplaint
                                  ? 'bg-rose-50 text-rose-600 border border-rose-100'
                                  : isMember
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                  : isSurvey
                                  ? 'bg-purple-50 text-purple-600 border border-purple-100'
                                  : 'bg-sky-50 text-sky-600 border border-sky-100'
                              }`}>
                                {isComplaint ? (
                                  <AlertTriangle className="w-4 h-4" />
                                ) : isMember ? (
                                  <UserPlus className="w-4 h-4" />
                                ) : isSurvey ? (
                                  <Smile className="w-4 h-4" />
                                ) : (
                                  <Mail className="w-4 h-4" />
                                )}
                              </div>

                              {/* Content Details */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-1 mb-0.5">
                                  <span className="text-[11.5px] font-bold text-gray-900 truncate">
                                    {locale === 'ar' ? (notif.titleAr || notif.title) : (notif.titleEn || notif.title)}
                                  </span>
                                  {notif.code && (
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-gray-100 font-mono text-gray-600 shrink-0 font-semibold border border-gray-200/50">
                                      {notif.code}
                                    </span>
                                  )}
                                </div>

                                <p className="text-[11px] text-gray-600 line-clamp-2 leading-relaxed">
                                  {notif.message || notif.title}
                                </p>

                                <div className="flex items-center justify-between mt-1.5 pt-1 border-t border-gray-100/60 text-[10px] text-gray-400">
                                  <span className="text-gray-500 font-medium truncate max-w-[170px]">
                                    {notif.senderName}
                                  </span>
                                  <div className="flex items-center gap-1 shrink-0 font-medium">
                                    <Clock className="w-2.5 h-2.5 text-gray-400" />
                                    <span>{notif.timeAgo || notif.createdAt}</span>
                                  </div>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                                {isUnread && (
                                  <button
                                    type="button"
                                    onClick={async (e) => {
                                      e.stopPropagation();
                                      await markNotificationAsRead(notif.id);
                                    }}
                                    className="p-1 rounded-md text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                                    title={locale === 'ar' ? 'تحديد كمقروء' : 'Mark as read'}
                                  >
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={async (e) => {
                                    e.stopPropagation();
                                    await deleteNotification(notif.id);
                                  }}
                                  className="p-1 rounded-md text-gray-300 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                                  title={locale === 'ar' ? 'حذف الإشعار' : 'Delete'}
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          );
                        });
                      })()}
                    </div>

                    {/* Footer */}
                    <div className="p-2.5 px-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setIsNotificationOpen(false);
                          setActiveTab('submissions');
                          setSubmissionFilter('all');
                        }}
                        className="text-[11px] font-bold text-[#0B6B4F] hover:text-[#08523C] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <span>{locale === 'ar' ? 'عرض كافة الواردات والطلبات' : 'View all submissions'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {safeNotifs.length} {locale === 'ar' ? 'سجل' : 'items'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar & Info */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2 ps-2 border-s border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-[#0B6B4F] text-white flex items-center justify-center text-xs font-black shadow-xs ring-2 ring-[#0B6B4F]/20">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div className="hidden md:flex flex-col text-start leading-tight">
                    <span className="text-xs font-bold text-gray-800">{user?.name}</span>
                    <span className="text-[10px] text-[#0B6B4F] font-semibold">
                      {locale === 'ar' ? user?.roleTitleAr || 'مدير النظام' : user?.roleTitleEn || 'System Admin'}
                    </span>
                  </div>
                  {/* Logout Button (hidden on sm/mobile, available inside mobile drawer) */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="hidden md:flex p-1.5 rounded-full text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer ms-1 items-center justify-center"
                    title={locale === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  >
                    <LogOut className={`w-3.5 h-3.5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              ) : (
                <Link
                  to={getLocalizedPath('/login')}
                  className="px-3.5 py-1.5 rounded-full bg-[#0B6B4F] text-white text-xs font-bold shadow-xs hover:bg-[#08523C] transition-colors"
                >
                  {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
                </Link>
              )}

              {/* Mobile Drawer Toggle Trigger (Matches website Header.tsx button) */}
              <button
                type="button"
                id="dashboard-mobile-drawer-toggle"
                onClick={() => setIsMobileNavOpen(true)}
                className="lg:hidden h-8 w-8 flex items-center justify-center text-[#12332B] hover:bg-[#EBF4F0] rounded-full transition-colors cursor-pointer   hover:border-[#12332B]/20 shadow-2xs ms-1"
                aria-label="Open Menu"
              >
                <Menu className="w-4 h-4 text-[#0B6B4F]" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Floating Notification */}
      {notification && (
        <div className="fixed bottom-6 end-6 z-50 bg-[#0A3D2F] text-white px-5 py-3 rounded-2xl shadow-xl border border-[#C9A45C]/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom duration-300 text-xs font-bold">
          <CheckCircle2 className="w-4 h-4 text-[#C9A45C]" />
          <span>{notification}</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="w-full flex-1 flex flex-col lg:flex-row min-h-[calc(100vh-70px)]">
        {/* Mobile Slide-Out Drawer (Styled exactly like website MobileDrawer.tsx) */}
        {isMobileNavOpen && (
          <div
            className="fixed inset-0 z-50 flex bg-[#12332B]/60 backdrop-blur-xs lg:hidden animate-in fade-in duration-200"
            onClick={() => setIsMobileNavOpen(false)}
          >
            <div
              className={`w-[85%] max-w-xs sm:max-w-sm bg-white h-full flex flex-col shadow-2xl overflow-hidden ${dir === 'rtl' ? 'mr-auto' : 'ml-auto'
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Drawer Header */}
              <div className="p-4 border-b border-[#12332B]/10 flex items-center justify-between bg-[#05241C] text-white">
                <AlShamelLogo size="xs" textColor="#FFFFFF" />
                <button
                  type="button"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close Menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="text-[11px] font-black text-gray-400 uppercase tracking-wider px-1">
                  {locale === 'ar' ? 'أقسام الحوكمة ولوحة التحكم' : 'Dashboard Sections'}
                </div>

                {navSections.map((group) => (
                  <div key={group.groupKey} className="space-y-1.5">
                    {group.groupKey !== 'home' && (
                      <div className="px-2 pt-2 pb-1 text-[10px] font-black text-[#0B6B4F] uppercase tracking-wider border-t border-gray-100">
                        {locale === 'ar' ? group.groupTitleAr : group.groupTitleEn}
                      </div>
                    )}

                    <div className="space-y-1">
                      {group.tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = checkIsTabActive(tab.id);
                        return (
                          <button
                            key={tab.id}
                            type="button"
                            onClick={() => handleTabChange(tab.id as TabType)}
                            className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all text-start cursor-pointer ${isActive
                              ? 'bg-gradient-to-r from-[#095B42] to-[#064230] text-white shadow-xs'
                              : 'bg-[#F7F8F6] text-gray-700 hover:bg-[#EBF4F0] hover:text-[#0B6B4F]'
                              }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#0B6B4F]'}`} />
                              <span>{locale === 'ar' ? tab.labelAr : tab.labelEn}</span>
                            </div>

                            {tab.count !== null && (
                              <span
                                className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full ${isActive
                                  ? 'bg-white/20 text-white'
                                  : 'bg-white text-[#0B6B4F] border border-gray-200'
                                  }`}
                              >
                                {tab.count}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-gray-100 bg-[#F7F8F6] flex items-center justify-between text-xs font-bold text-gray-700">
                <Link
                  to={getLocalizedPath('/')}
                  target="_blank"
                  onClick={() => setIsMobileNavOpen(false)}
                  className="flex items-center gap-1.5 text-[#0B6B4F]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>معاينة الموقع</span>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                  <span>خروج</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Desktop Sidebar Nav Tabs (lg:) */}
        <aside className="hidden lg:block fixed top-[70px] lg:top-[75px] bottom-0 start-0 z-30 w-64 xl:w-68 bg-white border-e border-gray-200/90 p-3 space-y-3 overflow-y-auto">
          <div className="space-y-3">
            {navSections.map((group) => (
              <div key={group.groupKey} className="space-y-1">
                {group.groupKey !== 'home' && (
                  <div className="px-3 pt-2 pb-1 text-[10px] font-black text-gray-400 uppercase tracking-wider flex items-center gap-1.5 border-t border-gray-100">
                    <span>{locale === 'ar' ? group.groupTitleAr : group.groupTitleEn}</span>
                  </div>
                )}

                <div className="space-y-1">
                  {group.tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = checkIsTabActive(tab.id);
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => handleTabChange(tab.id as TabType)}
                        className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs transition-all text-start cursor-pointer group ${isActive
                          ? 'bg-[#EBF4F0] text-[#0B6B4F] font-bold'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 font-medium'
                          }`}
                      >
                        {/* Active vertical edge indicator */}
                        {isActive && (
                          <span className="absolute start-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-e-full bg-[#0B6B4F]" />
                        )}

                        <div className="flex items-center gap-2.5 min-w-0">
                          <Icon
                            className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-[#0B6B4F]' : 'text-gray-400 group-hover:text-gray-600'
                              }`}
                          />
                          <span className="truncate">{locale === 'ar' ? tab.labelAr : tab.labelEn}</span>
                        </div>

                        {tab.count !== null && (
                          <span
                            className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full shrink-0 ms-2 ${isActive
                              ? 'bg-[#0B6B4F]/15 text-[#0B6B4F]'
                              : tab.alert
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200/70'
                              }`}
                          >
                            {tab.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-3 sm:p-4 lg:p-5 space-y-4 bg-[#F8F9FA] lg:ms-64 xl:ms-68">
          {/* 1. OVERVIEW HUB */}
          {activeTab === 'overview' && (
            <div className="space-y-6 text-start">
              {/* Header Hero Banner */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B6B4F] via-[#095B42] to-[#064230] p-6 sm:p-8 text-white shadow-lg">
                <div className="relative z-10 max-w-3xl space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-bold backdrop-blur-xs border border-white/10">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{overviewApiData?.header?.badge || 'نظام الحوكمة الرقمية والإفصاح المؤسسي'}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-snug">
                    {overviewApiData?.header?.title || 'مرحباً بك في لوحة تحكم حوكمة تعاونية الشامل'}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-normal">
                    {overviewApiData?.header?.subtitle || 'إدارة متكاملة وشاملة لجميع سياسات ولوائح الحوكمة، القوائم والملفات المالية، الورش التدريبية والشراكات المجتمعية، محاضر الجمعية العمومية والمجلس، الميثاق الأخلاقي وصندوق البلاغات.'}
                  </p>
                </div>
                {/* Decorative background glow */}
                <div className="absolute -end-10 -bottom-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
              </div>

              {/* Dynamic KPI Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {/* 1. Policies */}
                <button
                  type="button"
                  onClick={() => setActiveTab('policies')}
                  className="p-4 rounded-3xl bg-white hover:border-[#0B6B4F]/40 hover:shadow-md transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#0B6B4F] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-gray-900 font-mono">
                      {overviewApiData?.stats?.policies?.count ?? policies.length}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-gray-800">
                    {overviewApiData?.stats?.policies?.labelAr || (locale === 'ar' ? 'السياسات المعتمدة' : 'Policies')}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {overviewApiData?.stats?.policies?.subLabelAr || `${policies.filter((p) => p.category === 'aml').length} ${locale === 'ar' ? 'مكافحة غسل الأموال' : 'AML'}`}
                  </div>
                </button>

                {/* 2. Regulations */}
                <button
                  type="button"
                  onClick={() => setActiveTab('regulations')}
                  className="p-4 rounded-3xl bg-white hover:border-[#0B6B4F]/40 hover:shadow-md transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-gray-900 font-mono">
                      {overviewApiData?.stats?.regulations?.count ?? regulations.length}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-gray-800">
                    {overviewApiData?.stats?.regulations?.labelAr || (locale === 'ar' ? 'اللوائح والأنظمة' : 'Regulations')}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {overviewApiData?.stats?.regulations?.subLabelAr || `${regulations.filter((r) => r.sec === 'financial').length} ${locale === 'ar' ? 'ملفات ولوائح مالية' : 'Financial'}`}
                  </div>
                </button>

                {/* 3. Workshops */}
                <button
                  type="button"
                  onClick={() => setActiveTab('workshops')}
                  className="p-4 rounded-3xl bg-white hover:border-[#0B6B4F]/40 hover:shadow-md transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-gray-900 font-mono">
                      {overviewApiData?.stats?.workshops?.count ?? workshops.length}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-gray-800">
                    {overviewApiData?.stats?.workshops?.labelAr || (locale === 'ar' ? 'الورش المقامة' : 'Workshops')}
                  </div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {overviewApiData?.stats?.workshops?.subLabelAr || `${workshops.reduce((acc, w) => acc + (w.attendeesCount || 0), 0)} ${locale === 'ar' ? 'مستفيد' : 'Attendees'}`}
                  </div>
                </button>

                {/* 4. Submissions */}
                <button
                  type="button"
                  onClick={() => setActiveTab('submissions')}
                  className="p-4 rounded-3xl bg-white hover:border-amber-400 hover:shadow-md transition-all text-start cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-gray-900 font-mono">
                      {overviewApiData?.stats?.submissions?.count ?? submissions.length}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-gray-800">
                    {overviewApiData?.stats?.submissions?.labelAr || (locale === 'ar' ? 'صندوق البلاغات' : 'Submissions')}
                  </div>
                  <div className="text-[10px] text-amber-600 font-semibold mt-0.5">
                    {overviewApiData?.stats?.submissions?.subLabelAr || `${submissions.filter((s) => s.status === 'pending').length} ${locale === 'ar' ? 'قيد الانتظار' : 'Pending'}`}
                  </div>
                </button>

                {/* 5. Members (NEW) */}
                <button
                  type="button"
                  onClick={() => setActiveTab('members')}
                  className="p-4 rounded-3xl bg-white hover:border-[#0B6B4F]/40 hover:shadow-md transition-all text-start cursor-pointer group col-span-2 sm:col-span-1"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Users className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-black text-gray-900 font-mono">
                      {overviewApiData?.stats?.members?.count ?? (generalAssemblyMembers || []).length}
                    </span>
                  </div>
                  <div className="font-bold text-xs text-gray-800">
                    {overviewApiData?.stats?.members?.labelAr || (locale === 'ar' ? 'أعضاء العمومية' : 'Members')}
                  </div>
                  <div className="text-[10px] text-emerald-700 font-semibold mt-0.5 truncate">
                    {overviewApiData?.stats?.members?.subLabelAr || `${(generalAssemblyMembers || []).reduce((acc, m) => acc + (m.sharesCount || 0), 0).toLocaleString()} سهم مسجل`}
                  </div>
                </button>
              </div>

              {/* Sub-groups Directory Cards */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <h3 className="font-black text-sm text-gray-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'دليل الأقسام والمجموعات الفرعية للحوكمة' : 'Governance Sub-groups Matrix'}</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                  {/* Subgroup 1 */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="font-bold text-gray-800 flex items-center justify-between">
                      <span>{locale === 'ar' ? 'السياسات ومكافحة غسل الأموال' : 'Policies & AML'}</span>
                      <span className="text-[10px] bg-emerald-100 text-[#0B6B4F] px-2 py-0.5 rounded-full font-mono font-bold">{policies.length}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {locale === 'ar' ? 'تعارض المصالح، الإبلاغ، حفظ الوثائق، الهبات، خصوصية البيانات، ودليل وسياسات مكافحة غسل الأموال والاشتباه.' : 'Conflict, Whistleblowing, Privacy, Gifts, Member relations, and AML due diligence manual.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('policies')}
                      className="text-[11px] font-bold text-[#0B6B4F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? 'إدارة السياسات' : 'Manage'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Subgroup 2 */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="font-bold text-gray-800 flex items-center justify-between">
                      <span>{locale === 'ar' ? 'اللوائح والملفات المالية والشهادات' : 'Regulations & Files'}</span>
                      <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-mono font-bold">{regulations.length}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {locale === 'ar' ? 'اللائحة الأساسية ومحضر اعتمادها، شهادة التسجيل، والملفات المالية (المكافآت، الصرف، المشتريات، المقبوضات، الدليل المالي، الاستثمار).' : 'Basic bylaws, registration certificate, remuneration, disbursement, procurement, receipts, and investment.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('regulations')}
                      className="text-[11px] font-bold text-[#0B6B4F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? 'إدارة اللوائح' : 'Manage'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Subgroup 3 */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="font-bold text-gray-800 flex items-center justify-between">
                      <span>{locale === 'ar' ? 'الورش المقامة والشركات المجتمعية' : 'Workshops & Community'}</span>
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-mono font-bold">{workshops.length}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {locale === 'ar' ? 'الورش المقامة الداخلية (الحوكمة، التعارض، مكافحة غسل الأموال)، والورش بالشراكات المجتمعية التوعوية.' : 'Internal governance workshops and community partnerships training sessions.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('workshops')}
                      className="text-[11px] font-bold text-[#0B6B4F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? 'إدارة الورش' : 'Manage'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Subgroup 4 */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="font-bold text-gray-800 flex items-center justify-between">
                      <span>{locale === 'ar' ? 'القوائم المالية المدققة' : 'Financial Statements'}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono font-bold">{financials.length}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {locale === 'ar' ? 'القوائم المالية المدققة للأعوام (2019، 2020، 2021، 2022، 2023) والإيرادات وصافي الفائض المحقق.' : 'Audited statements (2019-2023), certified revenue, operational expenses, and surplus.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('financials')}
                      className="text-[11px] font-bold text-[#0B6B4F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? 'إدارة القوائم' : 'Manage'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Subgroup 5 */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="font-bold text-gray-800 flex items-center justify-between">
                      <span>{locale === 'ar' ? 'محاضر الجمعية العمومية والمجلس' : 'Meetings & Minutes'}</span>
                      <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-mono font-bold">{meetings.length}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {locale === 'ar' ? 'محاضر اجتماعات الجمعية العمومية العادية ومحاضر جلسات مجلس الإدارة وقراراتها الرسمية.' : 'General assembly regular meetings and board minutes with approved resolutions.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('meetings')}
                      className="text-[11px] font-bold text-[#0B6B4F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? 'إدارة المحاضر' : 'Manage'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>

                  {/* Subgroup 6 */}
                  <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 space-y-2">
                    <div className="font-bold text-gray-800 flex items-center justify-between">
                      <span>{locale === 'ar' ? 'الميثاق الأخلاقي وقواعد السلوك' : 'Ethical Charter'}</span>
                      <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-mono font-bold">{ethics.length}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      {locale === 'ar' ? 'المبادئ الأخلاقية الحاكمة: النزاهة والصدق، الشفافية، العدالة، والامتثال للأنظمة.' : 'Ethical code of conduct, core integrity values, transparency, and regulatory compliance.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab('ethics')}
                      className="text-[11px] font-bold text-[#0B6B4F] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? 'إدارة الميثاق' : 'Manage'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Two Column Grid: Latest Members & Latest Submissions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Latest Registered Members */}
                <div className="bg-white rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-black text-sm text-gray-900 flex items-center gap-2">
                      <Users className="w-4 h-4 text-[#0B6B4F]" />
                      <span>{locale === 'ar' ? 'أحدث الأعضاء المسجلين بالجمعية العمومية' : 'Latest Registered Members'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('members')}
                      className="text-xs text-[#0B6B4F] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? `عرض الكل (${overviewApiData?.stats?.members?.count ?? (generalAssemblyMembers || []).length})` : 'View All'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {(overviewApiData?.latestMembers || (generalAssemblyMembers || []).slice(-5).reverse()).map((member: any) => (
                      <div key={member.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200/60 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0">
                            {member.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-xs text-gray-900">{member.name}</div>
                            <div className="text-[10px] text-gray-400 font-mono">
                              {member.membershipNumber || `MEM-${member.id}`} • {member.city || 'القصيم'}
                            </div>
                          </div>
                        </div>

                        <div className="text-end">
                          <span className="px-2.5 py-1 rounded-lg bg-[#EBF4F0] text-[#0B6B4F] font-mono font-bold text-xs block">
                            {Number(member.sharesCount || member.shares_count || 0).toLocaleString()} سهم
                          </span>
                          <span className="text-[10px] text-gray-400 font-mono mt-0.5 block">
                            انضم عام {member.joinYear || member.join_year || '1445'} هـ
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Latest Submissions & Complaints */}
                <div className="bg-white rounded-3xl p-5 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="font-black text-sm text-gray-900 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>{locale === 'ar' ? 'أحدث البلاغات والاستبيانات والطلبات الواردة' : 'Latest Reports & Inquiries'}</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('submissions')}
                      className="text-xs text-[#0B6B4F] font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>{locale === 'ar' ? `عرض الكل (${overviewApiData?.stats?.submissions?.count ?? submissions.length})` : 'View All'}</span>
                      {dir === 'rtl' ? <ArrowLeft className="w-3 h-3" /> : <ArrowRight className="w-3 h-3" />}
                    </button>
                  </div>

                  <div className="divide-y divide-gray-100">
                    {(overviewApiData?.latestSubmissions || submissions.slice(0, 5)).map((sub: any) => (
                      <div key={sub.id} className="py-3 flex items-center justify-between gap-3 first:pt-0 last:pb-0">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-gray-900 truncate max-w-[240px]" title={sub.title}>
                              {sub.title}
                            </span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${sub.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : sub.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-emerald-100 text-emerald-800'
                              }`}>
                              {sub.status === 'pending' ? 'جديد' : sub.status === 'in_progress' ? 'قيد المعالجة' : 'معتمد'}
                            </span>
                          </div>
                          <div className="text-[10px] text-gray-400 truncate">
                            {sub.senderName || sub.sender_name} • {sub.createdAt || sub.created_at}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const foundSub = submissions.find((s) => String(s.id) === String(sub.id)) || sub;
                            setViewingSubmission(foundSub);
                          }}
                          className="px-2.5 py-1 rounded-xl bg-gray-100 hover:bg-[#0B6B4F] hover:text-white text-gray-700 font-bold text-xs transition-colors shrink-0 cursor-pointer"
                        >
                          معالجة
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'board-members' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header & Add Button */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-[#0B6B4F]" />
                    <h3 className="font-black text-xl text-gray-900">
                      أعضاء مجلس الإدارة
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500">
                    إدارة وتحديث قائمة بيانات وأدوار أعضاء مجلس إدارة جمعية الشامل التعاونية
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddBoardMember}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-sm transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>إضافة عضو مجلس جديد</span>
                </button>
              </div>

              {/* Board Intro & Electoral Cycle Management Card */}
              <div className="bg-white rounded-3xl p-6 border border-emerald-500/20 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0B6B4F]/10 flex items-center justify-center text-[#0B6B4F]">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {locale === 'ar' ? 'بيانات الدورة الانتخابية ومقدمة مجلس الإدارة' : 'Electoral Cycle & Board Intro Settings'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {locale === 'ar' ? 'تعديل شارة الدورة الانتخابية وعنوان ووصف القسم المعروض في الرئيسية وصفحة المجلس' : 'Manage cycle badge, title, and description displayed on public site'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveBoardIntro}
                    disabled={savingBoardIntro}
                    className="px-4 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#095B42] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingBoardIntro ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (locale === 'ar' ? 'حفظ إعدادات الدورة' : 'Save Cycle Settings')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {locale === 'ar' ? 'شارة الدورة الانتخابية (عربي)' : 'Cycle Badge (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={boardIntroForm.cycleBadgeAr || ''}
                      onChange={(e) => setBoardIntroForm({ ...boardIntroForm, cycleBadgeAr: e.target.value })}
                      className="w-full px-3 py-2 text-xsrounded-xl focus:ring-2 focus:ring-[#0B6B4F] outline-none font-bold"
                      placeholder="مثال: الدورة الانتخابية الثانية"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {locale === 'ar' ? 'عنوان القسم الرئيسي (عربي)' : 'Main Title (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={boardIntroForm.titleAr || ''}
                      onChange={(e) => setBoardIntroForm({ ...boardIntroForm, titleAr: e.target.value })}
                      className="w-full px-3 py-2 text-xsrounded-xl focus:ring-2 focus:ring-[#0B6B4F] outline-none font-bold"
                      placeholder="مثال: أعضاء مجلس الإدارة"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {locale === 'ar' ? 'الوصف التعريفي المعتمد للدورة الانتخابية (عربي)' : 'Cycle Description (Arabic)'}
                  </label>
                  <textarea
                    rows={3}
                    value={boardIntroForm.descAr || ''}
                    onChange={(e) => setBoardIntroForm({ ...boardIntroForm, descAr: e.target.value })}
                    className="w-full px-3 py-2 text-xsrounded-xl focus:ring-2 focus:ring-[#0B6B4F] outline-none leading-relaxed font-medium"
                    placeholder="أدخل النص التعريفي للدورة..."
                  />
                </div>
              </div>

              {/* Board Members Cards Grid */}
              <div className="flex flex-wrap justify-center gap-6">
                {((boardMembers && boardMembers.length > 0) ? boardMembers : initialBoardMembers)
                  .sort((a: any, b: any) => a.order - b.order)
                  .map((member: any) => (
                    <div
                      key={member.id}
                      className={`w-full sm:w-[calc(50%-16px)] lg:w-[calc(33.333%-16px)] max-w-[320px] bg-white rounded-3xl p-5 border flex flex-col justify-between transition-all duration-300 relative group ${member.isChairman
                        ? 'border-[#0B6B4F]/40 bg-gradient-to-b from-[#F3F8F5] via-white to-white shadow-md'
                        : 'border-gray-200 shadow-2xs hover:shadow-md'
                        }`}
                    >
                      <div className="text-center space-y-3">
                        {/* Role badge */}
                        <span
                          className={`inline-block text-[11px] font-bold px-3 py-1 rounded-full ${member.isChairman
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-[#EBF4F0] text-[#0B6B4F]'
                            }`}
                        >
                          {member.roleAr}
                        </span>

                        {/* Avatar Initials / Photo */}
                        <div className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-[#0B6B4F] to-[#063325] text-amber-200 font-bold font-serif text-xl flex items-center justify-center border-2 border-white shadow-inner overflow-hidden">
                          {member.image ? (
                            <img src={member.image} alt={member.nameAr} className="w-full h-full object-cover" />
                          ) : (
                            <span>{member.initialsAr || (member.nameAr ? member.nameAr.slice(0, 5) : 'عضو')}</span>
                          )}
                        </div>

                        <h4 className="font-bold text-base text-gray-900">{member.nameAr || member.nameEn || 'عضو مجلس الإدارة'}</h4>
                        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">{member.bioAr}</p>
                      </div>

                      {/* Actions */}
                      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-gray-400">ترتيب: #{member.order}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleOpenEditBoardMember(member)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                            title="تعديل البيانات"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`هل أنت تأكد من حذف العضو (${member.nameAr})؟`)) {
                                deleteBoardMember(member.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Board Member Modal */}
              {isBoardModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h3 className="font-black text-lg text-gray-900">
                        {editingBoardMember ? 'تعديل بيانات عضو مجلس الإدارة' : 'إضافة عضو مجلس إدارة جديد'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsBoardModalOpen(false)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveBoardMember} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">اسم العضو *</label>
                        <input
                          type="text"
                          required
                          value={boardForm.nameAr}
                          onChange={(e) => setBoardForm({ ...boardForm, nameAr: e.target.value })}
                          placeholder="أ / علي إبراهيم السليمي"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">المسمى الوظيفي في المجلس</label>
                          <input
                            type="text"
                            value={boardForm.roleAr}
                            onChange={(e) => setBoardForm({ ...boardForm, roleAr: e.target.value })}
                            placeholder="رئيس مجلس الإدارة / نائب رئيس..."
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">رفع صورة العضو (اختياري)</label>
                          <div className="flex items-center gap-2">
                            {boardForm.image && (
                              <img src={boardForm.image} alt="معاينة" className="w-9 h-9 rounded-full object-cover border border-emerald-300 shrink-0" />
                            )}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    setBoardForm({ ...boardForm, image: event.target?.result as string });
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                              className="w-full text-[11px] text-gray-500 file:me-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-emerald-50 file:text-[#095B42] hover:file:bg-emerald-100 cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
                          <input
                            type="email"
                            value={boardForm.email}
                            onChange={(e) => setBoardForm({ ...boardForm, email: e.target.value })}
                            placeholder="info@shamil.org.sa"
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none dir-ltr"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-gray-700 mb-1">الترتيب في القائمة</label>
                          <input
                            type="number"
                            min={1}
                            value={boardForm.order}
                            onChange={(e) => setBoardForm({ ...boardForm, order: parseInt(e.target.value) || 1 })}
                            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">نبذة عن العضو</label>
                        <textarea
                          rows={3}
                          value={boardForm.bioAr}
                          onChange={(e) => setBoardForm({ ...boardForm, bioAr: e.target.value })}
                          placeholder="يرأس مجلس إدارة تعاونية الشامل..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none"
                        />
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <input
                          type="checkbox"
                          id="isChairmanCheck"
                          checked={boardForm.isChairman}
                          onChange={(e) => setBoardForm({ ...boardForm, isChairman: e.target.checked })}
                          className="w-4 h-4 text-[#095B42] rounded border-gray-300 focus:ring-0 cursor-pointer"
                        />
                        <label htmlFor="isChairmanCheck" className="font-bold text-gray-800 cursor-pointer">
                          تمبيز العضو كرئيس لمجلس الإدارة (تاج وشارة خاصة)
                        </label>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setIsBoardModalOpen(false)}
                          className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer"
                        >
                          حفظ البيانات
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* DEDICATED MODULE: Gallery & Events Tab */}
          {/* ========================================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Header & Add Button */}
              <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#0B6B4F]" />
                    <h3 className="font-black text-xl text-gray-900">
                      معرض الصور والفعاليات الميدانية
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500">
                    إدارة وتحديث ألبومات وصور فعاليات ومشاريع جمعية الشامل التعاونية
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpenAddGalleryItem}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-sm transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>إضافة صورة / فعالية جديدة</span>
                </button>
              </div>

              {/* Gallery Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {((galleryItems && galleryItems.length > 0) ? galleryItems : initialGalleryItems).map((item: any) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                        <img
                          src={item.imageUrl}
                          alt={item.titleAr}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="p-4 space-y-2">
                        <h4 className="font-bold text-sm text-gray-900 leading-snug line-clamp-2">
                          {item.titleAr}
                        </h4>
                        {item.captionAr && (
                          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                            {item.captionAr}
                          </p>
                        )}
                        <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                          <span>{item.date}</span>
                          <span>{item.locationAr}</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex items-center justify-end gap-2 border-t border-gray-100/50">
                      <button
                        type="button"
                        onClick={() => handleOpenEditGalleryItem(item)}
                        className="p-2 rounded-xl text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>تعديل</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`هل أنت تأكد من حذف هذه الصورة (${item.titleAr})؟`)) {
                            deleteGalleryItem(item.id);
                          }
                        }}
                        className="p-2 rounded-xl text-red-600 hover:bg-red-50 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>حذف</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Gallery Modal */}
              {isGalleryModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                      <h3 className="font-black text-lg text-gray-900">
                        {editingGalleryItem ? 'تعديل صورة / فعالية' : 'إضافة صورة أو فعالية جديدة'}
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsGalleryModalOpen(false)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveGalleryItem} className="space-y-4 text-xs">
                      <div>
                        <label className="block font-bold text-gray-700 mb-1">عنوان الصورة / الفعالية *</label>
                        <input
                          type="text"
                          required
                          value={galleryForm.titleAr}
                          onChange={(e) => setGalleryForm({ ...galleryForm, titleAr: e.target.value })}
                          placeholder="اجتماع الجمعية العمومية السنوي..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">تاريخ الفعالية</label>
                        <input
                          type="date"
                          value={galleryForm.date}
                          onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">رفع صورة الفعالية / المعرض *</label>
                        <div className="space-y-2">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = (event) => {
                                  setGalleryForm({ ...galleryForm, imageUrl: event.target?.result as string });
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                            className="w-full text-xs text-gray-500 file:me-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-[#095B42] hover:file:bg-emerald-100 cursor-pointer border border-gray-300 rounded-xl p-1"
                          />
                          {galleryForm.imageUrl && (
                            <div className="relative h-32 rounded-xl overflow-hidden border border-emerald-200 bg-gray-50 shadow-2xs">
                              <img src={galleryForm.imageUrl} alt="معاينة الصورة" className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => setGalleryForm({ ...galleryForm, imageUrl: '' })}
                                className="absolute top-2 end-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2 py-1 rounded-lg transition-colors cursor-pointer shadow-xs"
                              >
                                إزالة الصورة
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">الموقع / القاعة</label>
                        <input
                          type="text"
                          value={galleryForm.locationAr}
                          onChange={(e) => setGalleryForm({ ...galleryForm, locationAr: e.target.value })}
                          placeholder="قاعة الاجتماعات الرئيسية - جدة"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-gray-700 mb-1">وصف مختصر (Caption)</label>
                        <textarea
                          rows={2}
                          value={galleryForm.captionAr}
                          onChange={(e) => setGalleryForm({ ...galleryForm, captionAr: e.target.value })}
                          placeholder="جانب من حضور وتصويت المساهمين..."
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none"
                        />
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setIsGalleryModalOpen(false)}
                          className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer"
                        >
                          حفظ الصورة
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}




          {/* ========================================================================= */}
          {/* ========================================================================= */}
          {/* DEDICATED MODULE: Feedback Tab (إدارة منصات التغذية الراجعة والتقييمات) */}
          {/* ========================================================================= */}
          {activeTab === 'feedback' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Module Header */}
              <div className="bg-white rounded-3xl p-6   shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/60 flex items-center justify-center text-purple-700 shadow-xs">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      إدارة منصات التغذية الراجعة والتقييمات
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      إضافة، تعديل، وحذف منصات التقييم الخارجية المعتمدة لجمعية الشامل (Google Drive / Google Maps)
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={handleResetFeedbackCards}
                    className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="إعادة ضبط القائمة الافتراضية"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إعادة ضبط</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenAddFeedbackCard}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs cursor-pointer transition-all"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إضافة منصة جديدة</span>
                  </button>
                </div>
              </div>

              {/* Official Managed Platforms Grid */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-gray-900 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-purple-600" />
                    منصات التقييم والتغذية الراجعة المعتمدة ({feedbackCards.length})
                  </h3>
                  <span className="text-xs text-gray-500 font-bold">
                    روابط الوصول والوثائق المباشرة
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {feedbackCards.map((item) => {
                    const isDrive = item.platform === 'drive';
                    const isMaps = item.platform === 'maps';
                    const IconComponent = isDrive ? FileText : isMaps ? (item.id.includes('gas') ? Flame : Store) : Globe;

                    const isCopied = copiedDashboardLinkId === item.id;

                    const colorStyles = {
                      emerald: {
                        border: 'hover:border-emerald-500',
                        badgeBg: 'bg-emerald-100/80 text-emerald-800 border-emerald-200/60',
                        iconBg: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
                        btnBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
                        titleHover: 'group-hover:text-emerald-700'
                      },
                      amber: {
                        border: 'hover:border-amber-500',
                        badgeBg: 'bg-amber-100/80 text-amber-800 border-amber-200/60',
                        iconBg: 'bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white',
                        btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
                        titleHover: 'group-hover:text-amber-700'
                      },
                      blue: {
                        border: 'hover:border-blue-500',
                        badgeBg: 'bg-blue-100/80 text-blue-800 border-blue-200/60',
                        iconBg: 'bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white',
                        btnBg: 'bg-blue-600 hover:bg-blue-700 text-white',
                        titleHover: 'group-hover:text-blue-700'
                      },
                      purple: {
                        border: 'hover:border-purple-500',
                        badgeBg: 'bg-purple-100/80 text-purple-800 border-purple-200/60',
                        iconBg: 'bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white',
                        btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
                        titleHover: 'group-hover:text-purple-700'
                      }
                    }[item.accentColor || 'emerald'] || {
                      border: 'hover:border-emerald-500',
                      badgeBg: 'bg-emerald-100/80 text-emerald-800 border-emerald-200/60',
                      iconBg: 'bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white',
                      btnBg: 'bg-emerald-700 hover:bg-emerald-800 text-white',
                      titleHover: 'group-hover:text-emerald-700'
                    };

                    return (
                      <div
                        key={item.id}
                        className={`bg-white rounded-3xl p-6 hover:shadow-md ${colorStyles.border} transition-all flex flex-col justify-between space-y-5 group relative`}
                      >
                        <div className="space-y-3.5">
                          {/* Header: Icon + Badge + Management Edit/Delete Controls */}
                          <div className="flex items-center justify-between">
                            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors shadow-xs ${colorStyles.iconBg}`}>
                              <IconComponent className="w-5 h-5" />
                            </div>

                            <div className="flex items-center gap-1.5">
                              <span className={`px-2.5 py-1 rounded-full font-bold text-[10px] border ${colorStyles.badgeBg}`}>
                                {item.badgeAr}
                              </span>

                              {/* Management Actions: Edit & Delete */}
                              <button
                                type="button"
                                onClick={() => handleOpenEditFeedbackCard(item)}
                                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-purple-100 hover:text-purple-700 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                                title="تعديل المنصة"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteFeedbackCard(item.id)}
                                className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-red-100 hover:text-red-600 text-gray-600 flex items-center justify-center transition-colors cursor-pointer"
                                title="حذف المنصة"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>

                          <div>
                            <span className="text-[10px] font-bold text-gray-400 block mb-0.5">{item.platformName}</span>
                            <h4 className={`font-bold text-base text-gray-900 ${colorStyles.titleHover} transition-colors leading-snug`}>
                              {item.titleAr}
                            </h4>
                          </div>

                          <p className="text-xs text-gray-500 leading-relaxed">
                            {item.descriptionAr}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-gray-100 space-y-2.5">
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-2xs ${colorStyles.btnBg}`}
                          >
                            <span>{isDrive ? 'فتح المستند' : 'تصفح التقييمات'}</span>
                            <ExternalLink className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                          </a>

                          <div className="flex items-center justify-between gap-2 text-xs">
                            <button
                              type="button"
                              onClick={() => handleCopyDashboardLink(item.id, item.url)}
                              className="flex-1 py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold flex items-center justify-center gap-1.5 transition-colors text-[11px] cursor-pointer"
                            >
                              {isCopied ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span className="text-emerald-700">تم النسخ</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5 text-gray-500" />
                                  <span>نسخ الرابط</span>
                                </>
                              )}
                            </button>

                            <button
                              type="button"
                              onClick={() => handleShareDashboardLink(item.titleAr, item.url)}
                              className="py-1.5 px-3 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold flex items-center justify-center gap-1.5 transition-colors text-[11px] cursor-pointer"
                            >
                              <Share2 className="w-3.5 h-3.5 text-gray-500" />
                              <span>مشاركة</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {feedbackCards.length === 0 && (
                    <div className="col-span-full p-12 bg-white rounded-3xltext-center space-y-3">
                      <Globe className="w-8 h-8 text-gray-300 mx-auto" />
                      <p className="text-sm font-bold text-gray-600">لا توجد منصات تقييم مضافة حالياً</p>
                      <button
                        type="button"
                        onClick={handleOpenAddFeedbackCard}
                        className="px-4 py-2 rounded-xl bg-[#095B42] text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>إضافة أول منصة</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>



              {/* Modal Form for Adding / Editing Feedback Card */}
              {isFeedbackCardModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                          <Globe className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-black text-lg text-gray-900">
                            {editingFeedbackCard ? 'تعديل منصة تقييم' : 'إضافة منصة تقييم جديدة'}
                          </h3>
                          <p className="text-xs text-gray-500">
                            أدخل تفاصيل المنصة والرابط الخاص بالتغذية الراجعة
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsFeedbackCardModalOpen(false)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveFeedbackCard} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          عنوان المنصة / المستند (بالعربية) *
                        </label>
                        <input
                          type="text"
                          required
                          value={feedbackCardForm.titleAr || ''}
                          onChange={(e) => setFeedbackCardForm({ ...feedbackCardForm, titleAr: e.target.value })}
                          placeholder="مثال: التغذيه الراجعة لاصحاب العلاقه"
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            نوع المنصة *
                          </label>
                          <select
                            value={feedbackCardForm.platform || 'drive'}
                            onChange={(e) => {
                              const plat = e.target.value as 'drive' | 'maps' | 'other';
                              setFeedbackCardForm({
                                ...feedbackCardForm,
                                platform: plat,
                                platformName: plat === 'drive' ? 'Google Drive' : plat === 'maps' ? 'Google Maps' : 'منصة معتمدة',
                                badgeAr: plat === 'drive' ? 'Google Drive PDF' : plat === 'maps' ? 'Google Maps' : 'رابط موثق',
                                accentColor: plat === 'drive' ? 'emerald' : plat === 'maps' ? 'amber' : 'purple'
                              });
                            }}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs bg-white"
                          >
                            <option value="drive">Google Drive</option>
                            <option value="maps">Google Maps</option>
                            <option value="other">منصة أخرى (Custom)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            تسمية الشارة (Badge)
                          </label>
                          <input
                            type="text"
                            value={feedbackCardForm.badgeAr || ''}
                            onChange={(e) => setFeedbackCardForm({ ...feedbackCardForm, badgeAr: e.target.value })}
                            placeholder="مثال: Google Drive PDF"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          رابط الوصول (URL) *
                        </label>
                        <input
                          type="url"
                          required
                          value={feedbackCardForm.url || ''}
                          onChange={(e) => setFeedbackCardForm({ ...feedbackCardForm, url: e.target.value })}
                          placeholder="https://drive.google.com/... أو https://maps.app.goo.gl/..."
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          الوصف والتفاصيل بالعربية
                        </label>
                        <textarea
                          rows={3}
                          value={feedbackCardForm.descriptionAr || ''}
                          onChange={(e) => setFeedbackCardForm({ ...feedbackCardForm, descriptionAr: e.target.value })}
                          placeholder="وصف مختصر لمحتوى المستند أو تقييمات المنصة..."
                          className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs resize-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            اللون الرئيسي (Accent)
                          </label>
                          <select
                            value={feedbackCardForm.accentColor || 'emerald'}
                            onChange={(e) => setFeedbackCardForm({ ...feedbackCardForm, accentColor: e.target.value as any })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs bg-white"
                          >
                            <option value="emerald">أخضر زمردي (Emerald)</option>
                            <option value="amber">أصفر كهرماني (Amber)</option>
                            <option value="blue">أزرق سماوي (Blue)</option>
                            <option value="purple">بنفسجي (Purple)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                          type="button"
                          onClick={() => setIsFeedbackCardModalOpen(false)}
                          className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold text-xs cursor-pointer hover:bg-gray-200"
                        >
                          إلغاء
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#095B42] to-[#064230] text-white font-bold text-xs cursor-pointer hover:brightness-110 shadow-xs"
                        >
                          {editingFeedbackCard ? 'حفظ التعديلات' : 'إضافة المنصة'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* DEDICATED MODULE: Direct Contact Messages Tab (رسائل تواصل معنا المباشرة) */}
          {/* ========================================================================= */}
          {activeTab === 'contact-messages' && (
            <div className="space-y-6 animate-in fade-in duration-200 text-start">
              {/* Header */}
              <div className="bg-white rounded-3xl p-6   shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-700 shadow-xs">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      {locale === 'ar' ? 'رسائل تواصل معنا المباشرة' : 'Direct Contact Messages'}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {locale === 'ar'
                        ? 'متابعة، مراجعة، والرد على استفسارات ورسائل الزوار الواردة عبر نموذج اتصل بنا في الموقع'
                        : 'Manage, review, and respond to incoming contact form submissions from website visitors'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-2 rounded-xl bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                    <Mail className="w-4 h-4 text-amber-600" />
                    <span>{locale === 'ar' ? 'إجمالي الرسائل (' + submissions.filter(s => s.module === 'contact_message').length + ')' : 'Total Messages (' + submissions.filter(s => s.module === 'contact_message').length + ')'}</span>
                  </span>
                </div>
              </div>

              {/* Quick Stats Grid */}
              {(() => {
                const contactMsgs = submissions.filter((s) => s.module === 'contact_message');
                const pendingMsgs = contactMsgs.filter((s) => s.status === 'pending');
                const inProgressMsgs = contactMsgs.filter((s) => s.status === 'in_progress');
                const resolvedMsgs = contactMsgs.filter((s) => s.status === 'resolved' || s.status === 'reviewed');

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl   shadow-2xs">
                      <span className="text-xs font-bold text-gray-400 block mb-1">إجمالي الرسائل الواردة</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-gray-900 font-mono">{contactMsgs.length}</span>
                        <span className="text-xs font-bold text-gray-500">رسالة تواصل</span>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-amber-200/80 bg-amber-50/30 shadow-2xs">
                      <span className="text-xs font-bold text-amber-700 block mb-1">رسائل بانتظار الرد والمراجعة</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-amber-900 font-mono">{pendingMsgs.length}</span>
                        <span className="text-xs font-bold text-amber-600">بانتظار الرد</span>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/30 shadow-2xs">
                      <span className="text-xs font-bold text-emerald-700 block mb-1">رسائل تم التعامل معها والرد عليها</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-emerald-900 font-mono">{resolvedMsgs.length + inProgressMsgs.length}</span>
                        <span className="text-xs font-bold text-emerald-600">رسالة تمت المعالجة</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Messages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {submissions
                  .filter((s) => s.module === 'contact_message')
                  .map((sub) => (
                    <div
                      key={sub.id}
                      className="p-5 rounded-3xl bg-white hover:shadow-md transition-all space-y-4 text-xs flex flex-col justify-between"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2.5">
                          <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                            {locale === 'ar' ? 'رسالة تواصل مباشرة' : 'Direct Message'}
                          </span>
                          <span className="text-gray-400 font-mono text-[11px]">{sub.createdAt}</span>
                        </div>

                        <h4 className="font-bold text-sm text-gray-900 leading-snug">{sub.title}</h4>

                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200/70 text-gray-700 leading-relaxed line-clamp-3">
                          {sub.details}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 space-y-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <div>
                            <div className="font-bold text-gray-900">{sub.senderName}</div>
                            <div className="text-gray-400 font-mono text-[10px] mt-0.5">{sub.senderContact}</div>
                          </div>

                          <select
                            value={sub.status}
                            onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as SubmissionItem['status'])}
                            className="bg-gray-50rounded-lg px-2 py-1 text-[10px] font-bold text-gray-700 focus:ring-1 focus:ring-[#0B6B4F] cursor-pointer"
                          >
                            <option value="pending">جديد</option>
                            <option value="in_progress">قيد المعالجة</option>
                            <option value="reviewed">تمت المراجعة</option>
                            <option value="resolved">تم الإغلاق</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => setViewingSubmission(sub)}
                            className="flex-1 px-3 py-2 rounded-xl bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 text-white font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>{locale === 'ar' ? 'معاينة والرد التفصيلي' : 'View & Reply'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(locale === 'ar' ? 'حذف هذه الرسالة نهائياً؟' : 'Delete message?')) {
                                deleteSubmission(sub.id);
                                showNotification(locale === 'ar' ? 'تم الحذف' : 'Deleted');
                              }
                            }}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                {submissions.filter((s) => s.module === 'contact_message').length === 0 && (
                  <div className="col-span-full p-8 bg-gray-50 rounded-2xltext-center text-xs text-gray-500">
                    {locale === 'ar' ? 'لا توجد رسائل تواصل مباشرة مسجلة حالياً' : 'No direct contact messages recorded yet'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* DEDICATED MODULE: Contact & Channels Tab (قنوات التواصل وبيانات الجمعية) */}
          {/* ========================================================================= */}
          {activeTab === 'contact-info' && (
            <ContactSettingsModule
              contactSettings={contactSettings}
              updateContactSettings={updateContactSettings}
              showNotification={showNotification}
              locale={locale}
            />
          )}

          {/* ========================================================================= */}
          {/* DEDICATED MODULE: Executive Director Tab (المدير التنفيذي للجمعية) */}
          {/* ========================================================================= */}
          {activeTab === 'executive-director' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl   shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EBF5F0] to-[#D5EFE7] border border-[#0B6B4F]/20 flex items-center justify-center text-[#0B6B4F] shadow-xs">
                    <UserCog className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      المدير التنفيذي والإدارة التنفيذية
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      إدارة بيانات، قرارات، وسيرة المدير التنفيذي وتسيير أعمال جمعية الشامل التعاونية
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>الإدارة التنفيذية الرسمية (معتمد)</span>
                  </span>
                </div>
              </div>

              {/* CEO Executive Card & Details */}
              {(() => {
                const ceo = executiveDirector || {
                  id: 'exec-dir-1',
                  nameAr: 'أ. محمد ذواب مفرح الحربي',
                  roleAr: 'المدير التنفيذي للجمعية',
                  phone: '+966531389196',
                  email: 'mohamad89196@gmail.com',
                  descriptionAr: 'يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الخطط التشغيلية والمبادرات التنموية.'
                };

                // Auto-calculate first 2 letters from name
                const cleanedName = ceo.nameAr ? ceo.nameAr.replace(/^(أ\/\s*|أ\.\s*|د\.\s*|م\.\s*)/, '').trim() : '';
                const words = cleanedName.split(/\s+/).filter(Boolean);
                const autoInitials = words.length >= 2
                  ? `${words[0][0]} . ${words[1][0]}`
                  : cleanedName.slice(0, 2) || 'م . ح';

                return (
                  <div className=" max-w-2xl mx-auto bg-white rounded-3xl p-4  text-center space-y-6 relative overflow-hidden">
                    {/* Top Accent Ribbon */}
                    <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#0B6B4F] via-[#84CC16] to-[#0B6B4F]" />

                    {/* Luxury Avatar / Photo */}
                    <div className="relative inline-block mx-auto mt-2">
                      <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#095B42] via-[#0B6B4F] to-[#042B1F] text-amber-200 font-bold font-serif text-3xl flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                        {ceo.image ? (
                          <img src={ceo.image} alt={ceo.nameAr} className="w-full h-full object-cover" />
                        ) : (
                          <span className="font-serif tracking-wider select-none">{autoInitials}</span>
                        )}
                      </div>
                      <span className="absolute bottom-1 end-1 bg-emerald-500 w-6 h-6 rounded-full border-2 border-white shadow-xs flex items-center justify-center" title="نشط على رأس العمل">
                        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-gray-900 leading-snug">{ceo.nameAr}</h3>
                      <p className="text-xs font-bold text-[#095B42] bg-[#EBF4F0] px-4 py-1 rounded-full inline-block border border-[#095B42]/15">
                        {ceo.roleAr}
                      </p>
                      {ceo.email && (
                        <p className="text-xs text-gray-500 font-mono dir-ltr mt-1 block">{ceo.email}</p>
                      )}
                      {/* Description & Key Tasks value placed under name */}
                      <p className="text-xs text-gray-700 leading-relaxed font-medium bg-[#F8FAF8] p-3.5 rounded-2xl border border-gray-200/60 mt-3 text-start">
                        {ceo.descriptionAr || ceo.bioAr || 'يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الأهداف التشغيلية والمبادرات التنموية.'}
                      </p>
                    </div>

                    {/* Contact Channels & Direct Actions */}
                    {ceo.phone && (
                      <div className=" flex flex-wrap items-center justify-center gap-3 text-xs">
                        <a
                          href={`tel:${ceo.phone}`}
                          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-50 hover:bg-emerald-50 text-gray-700 hover:text-[#095B42] font-bold transition-all border border-gray-200/60"
                          dir="ltr"
                        >
                          <Phone className="w-4 h-4 text-[#095B42]" />
                          <span className="font-mono text-xs">{ceo.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${ceo.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-bold transition-all shadow-2xs"
                        >
                          <MessageSquare className="w-4 h-4 fill-white" />
                          <span>محادثة واتساب</span>
                        </a>
                      </div>
                    )}

                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={handleOpenEditExecDirector}
                        className="w-full py-3.5 rounded-2xl bg-[#095B42] hover:bg-[#074633] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                        <span>تعديل بيانات المدير التنفيذي</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* ========================================================================= */}
          {/* DEDICATED MODULE: Membership Requests Tab (طلبات الانضمام والعضوية الجديدة) */}
          {/* ========================================================================= */}
          {activeTab === 'membership-requests' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl   shadow-2xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#EBF5F0] to-[#D5EFE7] border border-[#0B6B4F]/20 flex items-center justify-center text-[#0B6B4F] shadow-xs">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      {locale === 'ar' ? 'طلبات الانضمام والعضوية الجديدة' : 'New Membership Applications'}
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                      {locale === 'ar'
                        ? 'متابعة، مراجعة، واعتماد طلبات المساهمين الجدد الواردة من نموذج الموقع الإلكتروني'
                        : 'Review and confirm incoming shareholder and member applications from website'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={getLocalizedPath('/members/register')}
                    target="_blank"
                    className="px-3.5 py-2.5 rounded-xl bg-gray-50 hover:bg-[#EBF4F0]text-xs font-bold text-gray-700 hover:text-[#0B6B4F] transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>معاينة نموذج التسجيل</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => setActiveTab('members')}
                    className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-[#095B42] to-[#064230] text-white text-xs font-bold shadow-xs hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>سجل الأعضاء المعتمدين</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats Grid */}
              {(() => {
                const allReqs = (submissions || []).filter((s) => s.module === 'membership');
                const pendingReqs = allReqs.filter((s) => s.status === 'pending');
                const resolvedReqs = allReqs.filter((s) => s.status === 'resolved');

                return (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl   shadow-2xs">
                      <span className="text-xs font-bold text-gray-400 block mb-1">إجمالي طلبات العضوية</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-gray-900 font-mono">{allReqs.length}</span>
                        <span className="text-xs font-bold text-gray-500">طلب مسجل</span>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-amber-200/80 bg-amber-50/30 shadow-2xs">
                      <span className="text-xs font-bold text-amber-700 block mb-1">طلبات قيد الانتظار والمراجعة</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-amber-900 font-mono">{pendingReqs.length}</span>
                        <span className="text-xs font-bold text-amber-600">بانتظار التحقق والاعتماد</span>
                      </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-emerald-200/80 bg-emerald-50/30 shadow-2xs">
                      <span className="text-xs font-bold text-emerald-700 block mb-1">طلبات معتمدة ومضافة للسجل</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-emerald-900 font-mono">{resolvedReqs.length}</span>
                        <span className="text-xs font-bold text-emerald-600">أصبحوا أعضاء رسميين</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Requests Cards List */}
              <div className="space-y-4">
                {(submissions || [])
                  .filter((s) => s.module === 'membership')
                  .map((sub) => {
                    const isConfirmed = generalAssemblyMembers.some(
                      (m) => m.name.trim().toLowerCase() === sub.senderName.trim().toLowerCase()
                    );

                    return (
                      <div
                        key={sub.id}
                        className={`bg-white rounded-2xl p-5 border transition-all duration-200 shadow-2xs ${sub.status === 'pending'
                          ? 'border-amber-300/80 bg-gradient-to-r from-amber-50/20 to-white'
                          : 'border-gray-200'
                          }`}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-bold text-base text-gray-900">{sub.senderName}</h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-bold ${sub.status === 'pending'
                                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                  : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                  }`}
                              >
                                {sub.status === 'pending'
                                  ? (locale === 'ar' ? 'قيد الانتظار والمراجعة' : 'Pending Review')
                                  : (locale === 'ar' ? 'معتمد في سجل الأعضاء ✓' : 'Confirmed Member')}
                              </span>
                            </div>

                            <p className="font-bold text-xs text-[#0B6B4F]">{sub.title}</p>
                            <p className="text-xs text-gray-600 leading-relaxed font-mono dir-ltr text-end sm:text-start">
                              {sub.senderContact}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{sub.details}</p>
                          </div>

                          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                            <button
                              type="button"
                              onClick={() => setViewingSubmission(sub)}
                              className="px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold transition-colors cursor-pointer"
                            >
                              معاينة كامل البيانات
                            </button>

                            {sub.status === 'pending' && !isConfirmed && (
                              <button
                                type="button"
                                onClick={() => handleConfirmMembershipFromSubmission(sub)}
                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#095B42] to-[#064230] text-white text-xs font-bold shadow-xs hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer"
                              >
                                <CheckCircle2 className="w-4 h-4" />
                                <span>اعتماد وإضافة للسجل</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}


          {/* ========================================================================= */}
          {/* DEDICATED MODULE: Members Directory Roster Tab (سجل أعضاء الجمعية العمومية) */}
          {/* ========================================================================= */}
          {activeTab === 'members' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl   shadow-2xs">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {locale === 'ar' ? 'سجل أعضاء الجمعية العمومية' : 'General Assembly Members Directory'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {locale === 'ar'
                      ? 'إضافة، تعديل، وحذف أعضاء الجمعية العمومية ومتابعة حصص الأسهم وسنة الانضمام'
                      : 'Add, update, and manage member records, share counts, and membership data'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    to={getLocalizedPath('/members/directory')}
                    target="_blank"
                    className="px-3.5 py-2.5 rounded-xl bg-gray-50 hover:bg-[#EBF4F0]text-xs font-bold text-gray-700 hover:text-[#0B6B4F] transition-colors flex items-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>معاينة السجل</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => openMemberModal()}
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#095B42] to-[#064230] text-white text-xs font-bold shadow-xs hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'إضافة عضو جديد' : 'Add New Member'}</span>
                  </button>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-xl  ">
                  <span className="text-[11px] font-bold text-gray-400 block mb-1">إجمالي الأعضاء</span>
                  <span className="text-xl font-black text-[#0B6B4F] font-mono">{(generalAssemblyMembers || []).length} عضو</span>
                </div>
                <div className="bg-white p-4 rounded-xl  ">
                  <span className="text-[11px] font-bold text-gray-400 block mb-1">إجمالي الأسهم</span>
                  <span className="text-xl font-black text-gray-800 font-mono">
                    {(generalAssemblyMembers || []).reduce((acc, m) => acc + (m.sharesCount || 0), 0).toLocaleString()}
                  </span>
                </div>
                <div className="bg-white p-4 rounded-xl  ">
                  <span className="text-[11px] font-bold text-gray-400 block mb-1">نوع الكيان</span>
                  <span className="text-sm font-bold text-emerald-700">جمعية تعاونية مساهمة</span>
                </div>
                <div className="bg-white p-4 rounded-xl  ">
                  <span className="text-[11px] font-bold text-gray-400 block mb-1">الجهة الإشرافية</span>
                  <span className="text-sm font-bold text-gray-700 truncate block">المركز الوطني للقطاع غير الربحي</span>
                </div>
              </div>

              {/* Directory Roster Table Section */}
              {(() => {
                const filteredMembers = (generalAssemblyMembers || []).filter((m) => {
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.trim().toLowerCase();
                  return (
                    m.name.toLowerCase().includes(q) ||
                    (m.nameEn && m.nameEn.toLowerCase().includes(q)) ||
                    (m.city && m.city.toLowerCase().includes(q)) ||
                    ((m as any).membershipNumber && String((m as any).membershipNumber).toLowerCase().includes(q))
                  );
                });

                const totalItems = filteredMembers.length;
                const totalPages = Math.max(1, Math.ceil(totalItems / membersPerPage));
                const safeCurrentPage = Math.min(membersCurrentPage, totalPages);
                const startIndex = (safeCurrentPage - 1) * membersPerPage;
                const endIndex = Math.min(startIndex + membersPerPage, totalItems);
                const paginatedMembers = filteredMembers.slice(startIndex, endIndex);

                // Generate page numbers to display with smart ellipsis
                const getPageNumbers = () => {
                  const pages: (number | string)[] = [];
                  if (totalPages <= 7) {
                    for (let i = 1; i <= totalPages; i++) pages.push(i);
                  } else {
                    pages.push(1);
                    if (safeCurrentPage > 3) pages.push('...');
                    const start = Math.max(2, safeCurrentPage - 1);
                    const end = Math.min(totalPages - 1, safeCurrentPage + 1);
                    for (let i = start; i <= end; i++) pages.push(i);
                    if (safeCurrentPage < totalPages - 2) pages.push('...');
                    pages.push(totalPages);
                  }
                  return pages;
                };

                return (
                  <div className="space-y-4">
                    {/* Search & Control Bar */}
                    <div className="bg-white p-4 rounded-2xl   flex flex-col sm:flex-row items-center justify-between gap-3 shadow-2xs">
                      <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 text-gray-400 absolute start-3 top-3.5" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setMembersCurrentPage(1);
                          }}
                          placeholder={locale === 'ar' ? 'بحث باسم العضو، رقم العضوية، أو المدينة...' : 'Search by member name, ID, or city...'}
                          className="w-full ps-9 pe-4 py-2.5 rounded-xltext-xs focus:border-[#0B6B4F] outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                        <div className="flex items-center gap-2 text-xs text-gray-600 font-bold">
                          <span>عرض:</span>
                          <select
                            value={membersPerPage}
                            onChange={(e) => {
                              setMembersPerPage(Number(e.target.value));
                              setMembersCurrentPage(1);
                            }}
                            className="bg-[#F8FAF8]rounded-lg px-2.5 py-1.5 text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#0B6B4F] cursor-pointer"
                          >
                            <option value={10}>10 أعضاء</option>
                            <option value={20}>20 عضو</option>
                            <option value={50}>50 عضو</option>
                            <option value={100}>100 عضو</option>
                          </select>
                        </div>

                        <div className="text-xs text-gray-500 font-bold bg-[#F8FAF8] px-3 py-1.5 rounded-xl border border-gray-200/60">
                          {totalItems > 0 ? (
                            <span>
                              عرض {startIndex + 1} - {endIndex} من أصل {totalItems} عضو
                            </span>
                          ) : (
                            <span>لا توجد نتائج مطابقة</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* General Assembly Members Directory Table */}
                    <div className="bg-white rounded-2xl   overflow-hidden shadow-2xs">
                      <div className="overflow-x-auto">
                        <table className="w-full text-end text-xs">
                          <thead className="bg-[#F8FAF8] text-gray-700 font-bold border-b border-gray-200">
                            <tr>
                              <th className="p-4 text-start whitespace-nowrap">#</th>
                              <th className="p-4 text-start whitespace-nowrap">اسم العضو / المساهم</th>
                              <th className="p-4 text-center whitespace-nowrap">عدد الأسهم</th>
                              <th className="p-4 text-center whitespace-nowrap">سنة الانضمام</th>
                              <th className="p-4 text-center whitespace-nowrap">المدينة</th>
                              <th className="p-4 text-center whitespace-nowrap">الإجراءات</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {paginatedMembers.length > 0 ? (
                              paginatedMembers.map((member, idx) => (
                                <tr key={member.id} className="hover:bg-gray-50/80 transition-colors">
                                  <td className="p-4 font-mono font-bold text-gray-400 text-start whitespace-nowrap">
                                    {startIndex + idx + 1}
                                  </td>
                                  <td className="p-4 font-bold text-gray-900 text-start">
                                    <div className="flex items-center gap-2">
                                      <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 border border-emerald-200">
                                        {member.name.charAt(0)}
                                      </div>
                                      <div>
                                        <div className="font-bold text-gray-900">{locale === 'ar' ? member.name : member.nameEn || member.name}</div>
                                        {(member as any).membershipNumber && (
                                          <span className="text-[10px] font-mono text-gray-400">عضوية: {(member as any).membershipNumber}</span>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-4 text-center font-mono font-bold text-[#0B6B4F] whitespace-nowrap">
                                    {(member.sharesCount ?? (member as any).shares_count ?? 0).toLocaleString()} سهم
                                  </td>
                                  <td className="p-4 text-center font-mono text-gray-600 whitespace-nowrap">
                                    {member.joinYear ? `${member.joinYear} هـ` : '-'}
                                  </td>
                                  <td className="p-4 text-center text-gray-600 whitespace-nowrap">
                                    <span className="px-2.5 py-1 rounded-lg bg-gray-50   font-medium">
                                      {member.city || 'القصيم'}
                                    </span>
                                  </td>
                                  <td className="p-4 text-center whitespace-nowrap">
                                    <div className="flex items-center justify-center gap-1">
                                      <button
                                        type="button"
                                        onClick={() => openMemberModal(member)}
                                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                        title="تعديل"
                                      >
                                        <Edit2 className="w-4 h-4" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (confirm(`هل أنت متأكد من حذف العضو (${member.name})؟`)) {
                                            deleteMember(member.id);
                                          }
                                        }}
                                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                                        title="حذف"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={6} className="py-12 text-center text-gray-400 font-medium">
                                  لا توجد بيانات مطابقة للبحث حالياً.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination Controls Footer */}
                      {totalPages > 1 && (
                        <div className="p-4 border-t border-gray-200/80 bg-[#F8FAF8] flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="text-xs text-gray-500 font-bold">
                            صفحة <span className="text-gray-900 font-mono font-black">{safeCurrentPage}</span> من <span className="text-gray-900 font-mono font-black">{totalPages}</span> (إجمالي {totalItems} عضو)
                          </div>

                          <div className="flex items-center gap-1.5">
                            {/* Prev Page Button */}
                            <button
                              type="button"
                              disabled={safeCurrentPage <= 1}
                              onClick={() => setMembersCurrentPage((prev) => Math.max(1, prev - 1))}
                              className="px-3 py-1.5 rounded-xlbg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-gray-700 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                              <span>السابق</span>
                            </button>

                            {/* Page Numbers */}
                            <div className="flex items-center gap-1">
                              {getPageNumbers().map((p, pIdx) => {
                                if (p === '...') {
                                  return (
                                    <span key={`dots-${pIdx}`} className="px-2 text-gray-400 font-bold text-xs">
                                      ...
                                    </span>
                                  );
                                }
                                const pageNum = p as number;
                                const isActive = pageNum === safeCurrentPage;
                                return (
                                  <button
                                    key={pageNum}
                                    type="button"
                                    onClick={() => setMembersCurrentPage(pageNum)}
                                    className={`min-w-[32px] h-8 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer flex items-center justify-center ${isActive
                                      ? 'bg-[#0B6B4F] text-white shadow-sm ring-2 ring-[#0B6B4F]/20'
                                      : 'bg-white text-gray-700 hover:bg-gray-100   shadow-2xs'
                                      }`}
                                  >
                                    {pageNum}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Next Page Button */}
                            <button
                              type="button"
                              disabled={safeCurrentPage >= totalPages}
                              onClick={() => setMembersCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                              className="px-3 py-1.5 rounded-xlbg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-bold text-gray-700 flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                            >
                              <span>التالي</span>
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}


          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Projects Section Header & Description Management */}
              <div className="bg-white p-6 rounded-2xl   shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#53A528]" />
                    <div>
                      <h3 className="text-base font-bold text-gray-900">
                        {locale === 'ar' ? 'إعدادات ووصف قسم مشاريعنا التنموية' : 'Projects Section Header & Description'}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {locale === 'ar' ? 'التحكم بالعنوان والشارة والوصف العام المعروض في الصفحة الرئيسية وصفحة المشاريع' : 'Manage title, badge, and intro description displayed on public site'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveProjectsHeader}
                    disabled={savingProjectsHeader}
                    className="px-4 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#095B42] text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{savingProjectsHeader ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (locale === 'ar' ? 'حفظ إعدادات القسم' : 'Save Header')}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {locale === 'ar' ? 'شارة القسم (عربي)' : 'Badge (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={projectsHeaderForm.badgeAr || ''}
                      onChange={(e) => setProjectsHeaderForm({ ...projectsHeaderForm, badgeAr: e.target.value })}
                      className="w-full px-3 py-2 text-xsrounded-xl focus:ring-2 focus:ring-[#0B6B4F] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      {locale === 'ar' ? 'عنوان القسم الرئيسي (عربي)' : 'Main Title (Arabic)'}
                    </label>
                    <input
                      type="text"
                      value={projectsHeaderForm.titleAr || ''}
                      onChange={(e) => setProjectsHeaderForm({ ...projectsHeaderForm, titleAr: e.target.value })}
                      className="w-full px-3 py-2 text-xsrounded-xl focus:ring-2 focus:ring-[#0B6B4F] outline-none font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    {locale === 'ar' ? 'الوصف العام لقسم المشاريع التنموية (عربي)' : 'Section Description (Arabic)'}
                  </label>
                  <textarea
                    rows={3}
                    value={projectsHeaderForm.descAr || ''}
                    onChange={(e) => setProjectsHeaderForm({ ...projectsHeaderForm, descAr: e.target.value })}
                    className="w-full px-3 py-2 text-xsrounded-xl focus:ring-2 focus:ring-[#0B6B4F] outline-none leading-relaxed"
                    placeholder="أدخل وصف قسم المشاريع..."
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl   shadow-2xs">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {locale === 'ar' ? 'إدارة مشاريع الجمعية' : 'Cooperative Projects Management'}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {locale === 'ar'
                      ? 'إضافة وتعديل بطاقات المشاريع (الاسم، الوصف، التفاصيل، والمميزات)'
                      : 'Manage project card data (Name, Description, Sub-description, Features)'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openProjectModal()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#095B42] to-[#064230] text-white text-xs font-bold shadow-xs hover:brightness-110 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'إضافة مشروع جديد' : 'Add New Project'}</span>
                </button>
              </div>

              {/* Projects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {(projects || []).map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-2xl border border-gray-200/90 p-5 shadow-2xs flex flex-col justify-between space-y-4 hover:border-[#0B6B4F]/30 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                        <span className="text-xs font-mono text-gray-400">ID: {project.id}</span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => openProjectModal(project)}
                            className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                            title="تعديل"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteProject(project.id)}
                            className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>


                      {project.image && (
                        <div className="h-32 w-full rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                          <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                      )}

                      <h3 className="text-xl font-extrabold text-[#4AA01E]">
                        {project.name}
                      </h3>

                      {project.description && (
                        <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      )}

                      {project.subDescription && (
                        <p className="text-[11px] font-semibold text-gray-500 bg-gray-50 p-2 rounded-lg whitespace-pre-line">
                          {project.subDescription}
                        </p>
                      )}

                      {project.features && project.features.length > 0 && (
                        <div className="pt-2 space-y-1">
                          <span className="text-[10px] font-bold text-[#0B6B4F] uppercase">المميزات ({project.features.length}):</span>
                          <div className="flex flex-wrap gap-1">
                            {project.features.map((f, idx) => (
                              <span key={idx} className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-md border border-emerald-200">
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-100 text-[10px] text-gray-400 truncate">
                      {project.societyNameAr || 'الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-start">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'إدارة السياسات المؤسسية ومكافحة غسل الأموال' : 'Manage Governance & AML Policies'}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'ar' ? 'إضافة وتعديل وحذف السياسات المعتمدة وأدلة مكافحة غسل الأموال والامتثال' : 'Add, edit, or delete governance policies and AML manuals'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={getLocalizedPath('/policies/conflict-of-interest')}
                    target="_blank"
                    className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{locale === 'ar' ? 'معاينة صفحة السياسات' : 'View Public Page'}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPolicy(null);
                      setPolicyForm({
                        titleAr: '',
                        titleEn: '',
                        code: 'POL-SHM-' + Math.floor(10 + Math.random() * 90),
                        category: 'general',
                        version: 'الإصدار 1.0 (معتمد)',
                        approvedDate: '2024/02/15م',
                        approvedByAr: 'مجلس إدارة جمعية الشامل التعاونية بعقلة الصقور (ترخيص 234)',
                        approvedByEn: 'Board of Directors - AlShamel Multipurpose Cooperative (License #234)',
                        descAr: '',
                        descEn: '',
                        descriptionAr: '',
                        fileSize: '1.2 MB',
                        fileUrl: '',
                        pdfUrl: '',
                        articlesAr: []
                      });
                      setIsPolicyModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'إضافة سياسة جديدة' : 'Add Policy'}</span>
                  </button>
                </div>
              </div>

              {/* Policies Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-5 rounded-2xl bg-[#F7F8F6]   hover:border-[#0B6B4F]/30 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {policy.code || policy.id}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {policy.category === 'aml' ? 'مكافحة غسل الأموال' : 'سياسة عامة'}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 leading-snug">
                        {policy.titleAr}
                      </h4>
                      {policy.descAr && (
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {policy.descAr}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between gap-2">
                      <Link
                        to={getLocalizedPath(`/policies/${(policy as any).slug_id || policy.id}`)}
                        target="_blank"
                        className="text-xs text-[#0B6B4F] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>معاينة</span>
                      </Link>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditPolicy(policy)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => { if (window.confirm(locale === 'ar' ? 'حذف هذه السياسة؟' : 'Delete policy?')) deletePolicy((policy as any).slug_id || policy.id); }}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'regulations' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-start">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'إدارة اللوائح والأنظمة والشهادات والملفات المالية' : 'Manage Regulations & Bylaws'}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'ar' ? 'إدارة اللائحة الأساسية، اللوائح المالية، الأنظمة العامة، وشهادات التسجيل الرسمية' : 'Manage bylaws, financial regulations, national laws, and certificates'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={getLocalizedPath('/regulations/basic-bylaws')}
                    target="_blank"
                    className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{locale === 'ar' ? 'معاينة اللائحة الأساسية' : 'View Bylaws'}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleOpenAddRegulation}
                    className="px-3.5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'إضافة لائحة / نظام' : 'Add Regulation'}</span>
                  </button>
                </div>
              </div>

              {/* Regulations Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {regulations.map((reg) => (
                  <div key={reg.id} className="p-5 rounded-2xl bg-[#F7F8F6]   hover:border-[#0B6B4F]/30 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
                          {reg.num || reg.id}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium">
                          {reg.sec === 'foundation' ? 'تأسيسي' : reg.sec === 'financial' ? 'مالي' : 'نظام عام'}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 leading-snug">
                        {reg.titleAr}
                      </h4>
                      {reg.descAr && (
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {reg.descAr}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between gap-2">
                      <Link
                        to={getLocalizedPath(`/regulations/${(reg as any).slug_id || reg.id}`)}
                        target="_blank"
                        className="text-xs text-[#0B6B4F] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>معاينة</span>
                      </Link>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditRegulation(reg)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteRegulation((reg as any).slug_id || reg.id, reg.titleAr)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'financials' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-start">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'إدارة القوائم والتقارير المالية المدققة' : 'Manage Audited Financial Statements'}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'ar' ? 'إدارة وتعديل القوائم المالية المدققة سنوياً، الإيرادات، المصروفات، وشهادات المحاسب القانوني' : 'Manage audited annual financial statements, revenue, expenses, and auditor reports'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={getLocalizedPath('/financial-statements')}
                    target="_blank"
                    className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{locale === 'ar' ? 'معاينة صفحة القوائم المالية' : 'View Financials Page'}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingFinancial(null);
                      setFinancialForm({
                        year: String(new Date().getFullYear()),
                        titleAr: '',
                        titleEn: '',
                        status: 'معتمد',
                        revenue: '',
                        expenses: '',
                        surplus: '',
                        netSurplus: '',
                        auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
                        auditFirmEn: 'Certified Chartered Accountants',
                        fileSize: '3.5 MB',
                        fileUrl: '',
                        pdfUrl: ''
                      });
                      setIsFinancialModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'إضافة قائمة مالية' : 'Add Financial Statement'}</span>
                  </button>
                </div>
              </div>

              {/* Financials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {financials.map((fin) => (
                  <div key={fin.id} className="p-5 rounded-2xl bg-[#F7F8F6]   hover:border-[#0B6B4F]/30 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-black px-3 py-1 rounded-xl bg-[#0B6B4F] text-white">
                          عام {fin.year}م
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {fin.status || 'معتمد'}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 leading-snug">
                        {fin.titleAr}
                      </h4>
                      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="p-2 rounded-xl bg-white border border-gray-200/60">
                          <span className="text-[10px] text-gray-400 block font-bold">الإيرادات:</span>
                          <span className="font-black text-gray-900 font-mono">{fin.revenue || '0 ر.س'}</span>
                        </div>
                        <div className="p-2 rounded-xl bg-white border border-gray-200/60">
                          <span className="text-[10px] text-gray-400 block font-bold">صافي الفائض:</span>
                          <span className="font-black text-emerald-700 font-mono">{fin.netSurplus || (fin as any).surplus || '0 ر.س'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between gap-2">
                      <Link
                        to={getLocalizedPath('/financial-statements')}
                        target="_blank"
                        className="text-xs text-[#0B6B4F] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>معاينة التقرير</span>
                      </Link>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditFinancial(fin)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteFinancial((fin as any).slug_id || fin.id, fin.titleAr)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'workshops' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-start">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'إدارة الورش المقامة والشراكات المجتمعية' : 'Manage Workshops & Partnerships'}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'ar' ? 'إدارة وتوثيق ورش العمل والحوكمة والشراكات المجتمعية وكشوف الحضور المعتمدة' : 'Manage governance workshops, community sessions, and verified attendance rosters'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={getLocalizedPath('/workshops/governance-intro')}
                    target="_blank"
                    className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>{locale === 'ar' ? 'معاينة ورشة الحوكمة' : 'View Workshop'}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={handleOpenAddWorkshop}
                    className="px-3.5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'إضافة ورشة عمل' : 'Add Workshop'}</span>
                  </button>
                </div>
              </div>

              {/* Workshops Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {workshops.map((w) => (
                  <div key={w.id} className="p-5 rounded-2xl bg-[#F7F8F6]   hover:border-[#0B6B4F]/30 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {w.type === 'internal' ? 'ورشة داخلية' : 'شراكات مجتمعية'}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {w.dateAr || (w as any).date}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 leading-snug">
                        {w.titleAr}
                      </h4>
                      {w.descAr && (
                        <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                          {w.descAr}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between gap-2">
                      <Link
                        to={getLocalizedPath(`/workshops/${(w as any).slug_id || w.id}`)}
                        target="_blank"
                        className="text-xs text-[#0B6B4F] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>معاينة</span>
                      </Link>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenEditWorkshop(w)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                          title="تعديل"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteWorkshop((w as any).slug_id || w.id, w.titleAr)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="حذف"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ethics' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-start">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'إدارة الميثاق الأخلاقي وقواعد السلوك المؤسسي' : 'Manage Ethical Charter'}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'ar' ? 'تعديل وتحديث وثيقة الميثاق الأخلاقي، القواعد السلوكية، ومستند الـ PDF المعتمد' : 'Edit and update ethical charter document, conduct rules, and certified PDF'}
                  </p>
                </div>

                <Link
                  to={getLocalizedPath('/ethics')}
                  target="_blank"
                  className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 inline-flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'معاينة صفحة الميثاق الأخلاقي' : 'View Ethics Page'}</span>
                </Link>
              </div>

              {/* Ethics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ethics.map((eth) => (
                  <div key={eth.id} className="p-5 rounded-2xl bg-[#F7F8F6]   hover:border-[#0B6B4F]/30 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          وثيقة رسمية معتمدة
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {eth.fileSize || '2.4 MB'}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 leading-snug">
                        {eth.titleAr}
                      </h4>
                      {eth.descAr && (
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {eth.descAr}
                        </p>
                      )}
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between gap-2">
                      <Link
                        to={getLocalizedPath('/ethics')}
                        target="_blank"
                        className="text-xs text-[#0B6B4F] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>معاينة</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenEditEthics(eth)}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        title="تعديل"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'meetings' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-start">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-base sm:text-lg font-black text-gray-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'إدارة محاضر الاجتماعات والقرارات الرسمية' : 'Manage Meetings & Minutes'}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'ar' ? 'محاضر اجتماعات الجمعية العمومية ومجلس الإدارة الموثقة' : 'Official minutes and board meeting records'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setEditingMeeting(null);
                    setMeetingForm({
                      meetingNumber: 'MTG-' + Math.floor(100 + Math.random() * 900),
                      type: 'board',
                      titleAr: '',
                      titleEn: '',
                      dateAr: '',
                      dateEn: '',
                      locationAr: 'المقر الرئيسي للجمعية',
                      locationEn: 'Cooperative HQ',
                      attendeesCount: 7,
                      decisionsCount: 3,
                      fileSize: '2.5 MB',
                      fileUrl: '',
                      pdfUrl: '',
                      decisionsAr: []
                    });
                    setIsMeetingModalOpen(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'إضافة محضر اجتماع' : 'Add Meeting'}</span>
                </button>
              </div>

              {/* Meetings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {meetings.map((mtg) => (
                  <div key={mtg.id} className="p-5 rounded-2xl bg-[#F7F8F6]   hover:border-[#0B6B4F]/30 transition-all flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          {mtg.meetingNumber}
                        </span>
                        <span className="text-[10px] text-gray-500 font-mono">
                          {mtg.dateAr}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 leading-snug">
                        {mtg.titleAr}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium pt-1">
                        <span>الحضور: {mtg.attendeesCount}</span>
                        <span>القرارات: {mtg.decisionsCount}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditMeeting(mtg)}
                        className="text-xs text-[#0B6B4F] font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>تعديل المحضر</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => { if (window.confirm(locale === 'ar' ? 'حذف هذا المحضر؟' : 'Delete meeting?')) deleteMeeting((mtg as any).slug_id || mtg.id); }}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="حذف"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'submissions' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-start">
              {/* Dynamic Header & Stats Banner */}
              {(() => {
                const getHeaderData = () => {
                  if (submissionFilter === 'membership') {
                    return {
                      title: locale === 'ar' ? 'طلبات الانضمام والعضوية الجديدة' : 'Membership Applications',
                      desc: locale === 'ar' ? 'متابعة، مراجعة، واعتماد طلبات الانضمام والموافقات للمساهمين الأعضاء الجدد' : 'Review and process new general assembly membership applications',
                      icon: UserCheck,
                      color: 'text-emerald-600',
                      bg: 'bg-emerald-50 border-emerald-200'
                    };
                  }
                  if (submissionFilter === 'contact_message') {
                    return {
                      title: locale === 'ar' ? 'رسائل تواصل معنا المباشرة' : 'Direct Contact Messages',
                      desc: locale === 'ar' ? 'متابعة والرد على رسائل واستفسارات نموذج اتصل بنا الواردة من موقع الجمعية' : 'Manage direct contact messages received from website visitors',
                      icon: Mail,
                      color: 'text-amber-600',
                      bg: 'bg-amber-50 border-amber-200'
                    };
                  }
                  if (submissionFilter === 'whistleblowing') {
                    return {
                      title: locale === 'ar' ? 'بلاغات السرية والمخالفات والشكاوى' : 'Whistleblowing Reports',
                      desc: locale === 'ar' ? 'متابعة البلاغات والشكاوى الرسمية بحرية وسرية تامة' : 'Review confidential whistleblowing reports and official complaint forms',
                      icon: AlertTriangle,
                      color: 'text-red-600',
                      bg: 'bg-red-50 border-red-200'
                    };
                  }
                  if (submissionFilter === 'survey_supporters') {
                    return {
                      title: locale === 'ar' ? 'استبيانات قياس رضا الجهات الداعمة' : 'Supporters Satisfaction Surveys',
                      desc: locale === 'ar' ? 'معاينة ومتابعة استجابات وتقييمات المؤسسات المانحة والجهات الداعمة' : 'Review responses and ratings from funding organizations and donors',
                      icon: HeartHandshake,
                      color: 'text-[#095B42]',
                      bg: 'bg-emerald-50 border-emerald-200'
                    };
                  }
                  if (submissionFilter === 'survey_assembly') {
                    return {
                      title: locale === 'ar' ? 'استبيانات قياس رضا أعضاء الجمعية العمومية' : 'General Assembly Satisfaction Surveys',
                      desc: locale === 'ar' ? 'معاينة تقييمات أعضاء الجمعية العمومية والمساهمين حول الأداء والتواصل' : 'Review ratings from general assembly members regarding performance and outreach',
                      icon: Users,
                      color: 'text-emerald-700',
                      bg: 'bg-emerald-50 border-emerald-200'
                    };
                  }
                  if (submissionFilter === 'survey_customers') {
                    return {
                      title: locale === 'ar' ? 'استبيانات قياس رضا عملاء تعاونية الرضا' : 'Al-Rida Customers Satisfaction Surveys',
                      desc: locale === 'ar' ? 'معاينة تقييمات العملاء والمستفيدين من خدمات وفروع تعاونية الرضا' : 'Review customer feedback and satisfaction ratings for Al-Rida branches',
                      icon: Smile,
                      color: 'text-blue-600',
                      bg: 'bg-blue-50 border-blue-200'
                    };
                  }
                  if (submissionFilter === 'survey_staff') {
                    return {
                      title: locale === 'ar' ? 'استبيانات قياس رضا العاملين والموظفين' : 'Staff & Employees Satisfaction Surveys',
                      desc: locale === 'ar' ? 'معاينة استبيانات الرضا الوظيفي والمناخ المهني لمنسوبي الجمعية (37 بنداً)' : 'Review employee satisfaction and workplace environment ratings (37 items)',
                      icon: Briefcase,
                      color: 'text-purple-600',
                      bg: 'bg-purple-50 border-purple-200'
                    };
                  }
                  return {
                    title: locale === 'ar' ? 'الشكاوى وقياس الرضا والطلبات التفاعلية' : 'Complaints, Surveys & Applications',
                    desc: locale === 'ar' ? 'معاينة ومتابعة ردود واستجابات جميع النماذج التفاعلية والمستفيدين بالجمعية' : 'View, manage, and print official responses for interactive website forms',
                    icon: MessageSquareQuote,
                    color: 'text-[#0B6B4F]',
                    bg: 'bg-[#EBF4F0] border-[#095B42]/20'
                  };
                };

                const hData = getHeaderData();
                const HeaderIcon = hData.icon;

                return (
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                    <div>
                      <h2 className="text-lg sm:text-xl font-black text-gray-900 flex items-center gap-2">
                        <HeaderIcon className={`w-6 h-6 ${hData.color}`} />
                        <span>{hData.title}</span>
                      </h2>
                      <p className="text-xs text-gray-500 mt-1">
                        {hData.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${hData.bg} ${hData.color}`}>
                        {locale === 'ar' ? 'السجلات المفلترة (' + submissions.filter((s) => {
                          if (submissionFilter === 'all') return true;
                          if (submissionFilter === 'membership') return s.module === 'membership';
                          if (submissionFilter === 'feedback') return s.module === 'feedback';
                          if (submissionFilter === 'whistleblowing') return s.module === 'whistleblowing';
                          if (submissionFilter === 'contact_message') return s.module === 'contact_message';
                          if (submissionFilter === 'survey_supporters') return s.module === 'survey' && (s.surveyCategory === 'supporters' || (!s.surveyCategory && (s.title.includes('الجهات الداعمة') || s.details.includes('الجهات الداعمة'))));
                          if (submissionFilter === 'survey_assembly') return s.module === 'survey' && (s.surveyCategory === 'assembly' || s.title.includes('الجمعية العمومية') || s.details.includes('الجمعية العمومية'));
                          if (submissionFilter === 'survey_customers') return s.module === 'survey' && (s.surveyCategory === 'customers' || s.title.includes('تعاونية الرضا') || s.details.includes('تعاونية الرضا'));
                          if (submissionFilter === 'survey_staff') return s.module === 'survey' && (s.surveyCategory === 'staff' || s.title.includes('العاملين') || s.details.includes('العاملين'));
                          return s.module === submissionFilter;
                        }).length + ')' : 'Filtered Records (' + submissions.length + ')'}
                      </span>
                      <span className="px-3 py-1.5 rounded-xl bg-gray-100 text-gray-800 text-xs font-bold border border-gray-200">
                        {locale === 'ar' ? 'إجمالي السجلات (' + submissions.length + ')' : 'Total Submissions (' + submissions.length + ')'}
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Search Bar & View Mode Switcher */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#F7F8F6] p-3 rounded-2xl border border-gray-200/60">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-gray-400 absolute start-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={locale === 'ar' ? 'ابحث باسم المرسل، رقم الهاتف، أو تفاصيل الرد...' : 'Search by name, contact, or response details...'}
                    className="w-full ps-9 pe-4 py-2 bg-white rounded-xl text-xsfont-medium text-gray-800 outline-none focus:ring-2 focus:ring-[#0B6B4F]"
                  />
                </div>

                {/* Switcher View Mode */}
                <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center p-1 bg-white rounded-xl border border-gray-200">
                    <button
                      type="button"
                      onClick={() => setSubmissionViewMode('cards')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${submissionViewMode === 'cards' ? 'bg-[#0B6B4F] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
                      title="عرض كبطاقات"
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmissionViewMode('table')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${submissionViewMode === 'table' ? 'bg-[#0B6B4F] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}
                      title="عرض كجدول"
                    >
                      <TableIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-groups Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-gray-100">
                <span className="text-[11px] font-bold text-gray-400 me-2">{locale === 'ar' ? 'تصنيف النموذج:' : 'Category:'}</span>

                <button
                  type="button"
                  onClick={() => setSubmissionFilter('all')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${submissionFilter === 'all'
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                >
                  <MessageSquareQuote className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'جميع الطلبات والردود (' + submissions.length + ')' : 'All Submissions (' + submissions.length + ')'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionFilter('whistleblowing')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${submissionFilter === 'whistleblowing'
                    ? 'bg-red-600 text-white shadow-md ring-2 ring-red-600/20'
                    : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                    }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'بلاغات المخالفات والشكاوى (' + submissions.filter((s) => s.module === 'whistleblowing').length + ')' : 'Whistleblowing (' + submissions.filter((s) => s.module === 'whistleblowing').length + ')'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionFilter('survey_supporters')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${submissionFilter === 'survey_supporters'
                    ? 'bg-[#095B42] text-white shadow-md ring-2 ring-[#095B42]/20'
                    : 'bg-white text-gray-700 hover:bg-[#EBF4F0] hover:text-[#095B42] border border-gray-200'
                    }`}
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{locale === 'ar'
                    ? 'استبيانات قياس رضا الجهات الداعمة (' + submissions.filter((s) => s.module === 'survey' && (s.surveyCategory === 'supporters' || (!s.surveyCategory && (s.title.includes('الجهات الداعمة') || s.details.includes('الجهات الداعمة'))))).length + ')'
                    : 'Supporters Survey'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionFilter('survey_assembly')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${submissionFilter === 'survey_assembly'
                    ? 'bg-emerald-700 text-white shadow-md ring-2 ring-emerald-700/20'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 border border-gray-200'
                    }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{locale === 'ar'
                    ? 'قياس رضا أعضاء الجمعية العمومية (' + submissions.filter((s) => s.module === 'survey' && (s.surveyCategory === 'assembly' || s.title.includes('الجمعية العمومية') || s.details.includes('الجمعية العمومية'))).length + ')'
                    : 'Assembly Survey'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionFilter('survey_customers')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${submissionFilter === 'survey_customers'
                    ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-600/20'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
                    }`}
                >
                  <Smile className="w-3.5 h-3.5" />
                  <span>{locale === 'ar'
                    ? 'قياس رضا عملاء تعاونية الرضا (' + submissions.filter((s) => s.module === 'survey' && (s.surveyCategory === 'customers' || s.title.includes('تعاونية الرضا') || s.details.includes('تعاونية الرضا'))).length + ')'
                    : 'Customers Survey'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionFilter('survey_staff')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${submissionFilter === 'survey_staff'
                    ? 'bg-purple-600 text-white shadow-md ring-2 ring-purple-600/20'
                    : 'bg-white text-gray-700 hover:bg-purple-50 hover:text-purple-600 border border-gray-200'
                    }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{locale === 'ar'
                    ? 'قياس رضا العاملين (' + submissions.filter((s) => s.module === 'survey' && (s.surveyCategory === 'staff' || s.title.includes('العاملين') || s.details.includes('العاملين'))).length + ')'
                    : 'Staff Survey'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionFilter('contact_message')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${submissionFilter === 'contact_message'
                    ? 'bg-amber-600 text-white shadow-md ring-2 ring-amber-600/20'
                    : 'bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-600 border border-gray-200'
                    }`}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'رسائل اتصل بنا المباشرة (' + submissions.filter((s) => s.module === 'contact_message').length + ')' : 'Contact Messages (' + submissions.filter((s) => s.module === 'contact_message').length + ')'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSubmissionFilter('membership')}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 ${submissionFilter === 'membership'
                    ? 'bg-emerald-600 text-white shadow-md ring-2 ring-emerald-600/20'
                    : 'bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
                    }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{locale === 'ar' ? 'طلبات العضوية (' + submissions.filter((s) => s.module === 'membership').length + ')' : 'Membership Requests (' + submissions.filter((s) => s.module === 'membership').length + ')'}</span>
                </button>
              </div>

              {/* Filtered items */}
              {(() => {
                const filtered = submissions.filter((s) => {
                  const matchesCategory = (() => {
                    if (submissionFilter === 'all') return true;
                    if (submissionFilter === 'membership') return s.module === 'membership';
                    if (submissionFilter === 'feedback') return s.module === 'feedback';
                    if (submissionFilter === 'whistleblowing') return s.module === 'whistleblowing';
                    if (submissionFilter === 'contact_message') return s.module === 'contact_message';
                    if (submissionFilter === 'survey_supporters') return s.module === 'survey' && (s.surveyCategory === 'supporters' || (!s.surveyCategory && (s.title.includes('الجهات الداعمة') || s.details.includes('الجهات الداعمة'))));
                    if (submissionFilter === 'survey_assembly') return s.module === 'survey' && (s.surveyCategory === 'assembly' || s.title.includes('الجمعية العمومية') || s.details.includes('الجمعية العمومية'));
                    if (submissionFilter === 'survey_customers') return s.module === 'survey' && (s.surveyCategory === 'customers' || s.title.includes('تعاونية الرضا') || s.details.includes('تعاونية الرضا'));
                    if (submissionFilter === 'survey_staff') return s.module === 'survey' && (s.surveyCategory === 'staff' || s.title.includes('العاملين') || s.details.includes('العاملين'));
                    return s.module === submissionFilter;
                  })();
                  if (!matchesCategory) return false;
                  if (!searchQuery.trim()) return true;
                  const q = searchQuery.toLowerCase().trim();
                  return (
                    s.title.toLowerCase().includes(q) ||
                    s.senderName.toLowerCase().includes(q) ||
                    s.senderContact.toLowerCase().includes(q) ||
                    s.details.toLowerCase().includes(q)
                  );
                });

                if (filtered.length === 0) {
                  return (
                    <div className="py-12 text-center text-gray-400 font-medium text-xs">
                      لا توجد استجابات أو ردود مطابقة للبحث حالياً.
                    </div>
                  );
                }

                if (submissionViewMode === 'table') {
                  return (
                    <div className="overflow-x-auto   rounded-2xl">
                      <table className="w-full min-w-[720px] text-start text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#F7F8F6] border-b border-gray-200 text-gray-700 font-bold">
                            <th className="py-3 px-4 text-start whitespace-nowrap">نوع الطلب</th>
                            <th className="py-3 px-4 text-start">العنوان / البيان</th>
                            <th className="py-3 px-4 text-start">المرسل والاتصال</th>
                            <th className="py-3 px-4 text-center whitespace-nowrap">التاريخ</th>
                            <th className="py-3 px-4 text-center whitespace-nowrap">الحالة</th>
                            <th className="py-3 px-4 text-center whitespace-nowrap">الإجراءات</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {filtered.map((sub) => (
                            <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors">
                              <td className="py-3 px-4 whitespace-nowrap">
                                <span
                                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${sub.module === 'whistleblowing'
                                    ? 'bg-red-100 text-red-700 border border-red-200'
                                    : sub.module === 'survey'
                                      ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                      : sub.module === 'contact_message'
                                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                        : sub.module === 'membership'
                                          ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                          : 'bg-purple-100 text-purple-700 border border-purple-200'
                                    }`}
                                >
                                  {sub.module === 'whistleblowing'
                                    ? 'بلاغ مخالفة سري'
                                    : sub.module === 'survey'
                                      ? 'استبيان قياس رضا'
                                      : sub.module === 'contact_message'
                                        ? 'تواصل معنا'
                                        : sub.module === 'membership'
                                          ? 'طلب عضوية'
                                          : 'استجابة تفاعلية'}
                                </span>
                              </td>
                              <td className="py-3 px-4 font-bold text-gray-900 max-w-[280px] truncate" title={sub.title}>
                                {sub.title}
                              </td>
                              <td className="py-3 px-4">
                                <div className="font-bold text-gray-800">{sub.senderName}</div>
                                <div className="text-[11px] text-gray-400 font-mono">{sub.senderContact}</div>
                              </td>
                              <td className="py-3 px-4 text-center font-mono text-gray-500 whitespace-nowrap">
                                {sub.createdAt}
                              </td>
                              <td className="py-3 px-4 text-center whitespace-nowrap">
                                <select
                                  value={sub.status}
                                  onChange={(e) => updateSubmissionStatus(sub.id, e.target.value as SubmissionItem['status'])}
                                  className="bg-white border border-gray-300 rounded-lg px-2 py-1 text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#0B6B4F] cursor-pointer"
                                >
                                  <option value="pending">جديد</option>
                                  <option value="in_progress">قيد المعالجة</option>
                                  <option value="reviewed">تمت المراجعة</option>
                                  <option value="resolved">مغلق ومصادق</option>
                                </select>
                              </td>
                              <td className="py-3 px-4 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-1.5">
                                  {sub.module === 'membership' && (
                                    <button
                                      type="button"
                                      onClick={() => handleConfirmMembershipFromSubmission(sub)}
                                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs inline-flex items-center gap-1 cursor-pointer"
                                      title="ترقية إلى عضو جمعية عمومية"
                                    >
                                      <UserCheck className="w-3.5 h-3.5" />
                                      <span>اعتماد</span>
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => setViewingSubmission(sub)}
                                    className="p-1.5 rounded-lg text-[#0B6B4F] hover:bg-emerald-50 cursor-pointer"
                                    title="معاينة الرد"
                                  >
                                    <Eye className="w-4 h-4" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      if (window.confirm(locale === 'ar' ? 'حذف هذا السجل نهائياً؟' : 'Delete?')) {
                                        deleteSubmission(sub.id);
                                        toast.success(locale === 'ar' ? 'تم الحذف' : 'Deleted');
                                      }
                                    }}
                                    className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer"
                                    title="حذف"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filtered.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-5 rounded-2xl bg-[#F7F8F6]   hover:border-[#0B6B4F]/30 transition-all space-y-3.5 text-xs shadow-2xs flex flex-col justify-between"
                      >
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${sub.module === 'whistleblowing'
                                ? 'bg-red-100 text-red-700 border border-red-200'
                                : sub.module === 'survey'
                                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                  : sub.module === 'contact_message'
                                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                    : sub.module === 'membership'
                                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                      : 'bg-purple-100 text-purple-700 border border-purple-200'
                                }`}
                            >
                              {sub.module === 'whistleblowing'
                                ? 'بلاغ مخالفة سري'
                                : sub.module === 'survey'
                                  ? 'استبيان قياس رضا'
                                  : sub.module === 'contact_message'
                                    ? 'تواصل معنا'
                                    : sub.module === 'membership'
                                      ? 'طلب عضوية'
                                      : 'استجابة تفاعلية'}
                            </span>
                            <span className="text-[11px] font-mono text-gray-500">{sub.createdAt}</span>
                          </div>

                          <h4 className="font-bold text-sm text-gray-900 leading-snug">{sub.title}</h4>

                          <p className="text-gray-600 line-clamp-3 leading-relaxed whitespace-pre-line bg-white p-3 rounded-xl border border-gray-200/60 font-medium">
                            {sub.details}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-gray-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                          <div>
                            <div className="font-bold text-gray-800">{sub.senderName}</div>
                            <div className="text-gray-400 font-mono">{sub.senderContact}</div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setViewingSubmission(sub)}
                              className="px-3 py-1.5 rounded-xl bg-gradient-to-br from-[#095B42] to-[#064230] hover:brightness-110 text-white font-bold text-xs shadow-2xs transition-all inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              <Eye className="w-3.5 h-3.5" />
                              <span>معاينة الرد التفصيلي</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(locale === 'ar' ? 'حذف هذا السجل نهائياً؟' : 'Delete?')) {
                                  deleteSubmission(sub.id);
                                  toast.success(locale === 'ar' ? 'تم الحذف' : 'Deleted');
                                }
                              }}
                              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}

          {activeTab === 'home-management' && (
            <div className="bg-white rounded-3xl p-4 sm:p-6 space-y-6 animate-in fade-in duration-200 text-start">
              {/* Header & Sub-navigation Tabs */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
                <div>
                  <h2 className="text-lg font-black text-gray-900 flex items-center gap-2">
                    <Layout className="w-5 h-5 text-[#0B6B4F]" />
                    <span>{locale === 'ar' ? 'إدارة محتوى الواجهة الرئيسية (Home Page)' : 'Home Page Management'}</span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {locale === 'ar' ? 'التحكم الديناميكي التام بسلايدر الهيرو، من نحن، الإحصائيات، الأهداف، والشهادات' : 'Dynamic control over hero slider, about section, live stats, strategic goals, and testimonials'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={getLocalizedPath('/')}
                    target="_blank"
                    className="px-3.5 py-2 rounded-xl bg-[#EBF4F0] hover:bg-[#0B6B4F] text-[#0B6B4F] hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{locale === 'ar' ? 'معاينة الواجهة الرئيسية' : 'Preview Home Page'}</span>
                  </Link>
                </div>
              </div>

              {/* Sub-tabs Navigation Pill bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-100 no-scrollbar">
                <button
                  type="button"
                  onClick={() => setHomeSubTab('about')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${homeSubTab === 'about' ? 'bg-[#0B6B4F] text-white shadow-xs' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'من نحن (رؤيتنا ورسالتنا)' : 'About Us & Vision'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHomeSubTab('hero')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${homeSubTab === 'hero' ? 'bg-[#0B6B4F] text-white shadow-xs' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'سلايدر الهيرو (Hero Slider)' : 'Hero Slider'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHomeSubTab('stats')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${homeSubTab === 'stats' ? 'bg-[#0B6B4F] text-white shadow-xs' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Activity className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'أرقام وإحصائيات الجمعية' : 'Live Key Stats'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHomeSubTab('goals')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${homeSubTab === 'goals' ? 'bg-[#0B6B4F] text-white shadow-xs' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Target className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'الأهداف الاستراتيجية (1-7)' : 'Strategic Goals'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setHomeSubTab('testimonials')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 shrink-0 ${homeSubTab === 'testimonials' ? 'bg-[#0B6B4F] text-white shadow-xs' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <MessageSquareQuote className="w-4 h-4" />
                  <span>{locale === 'ar' ? 'قالوا عنا (الشهادات والآراء)' : 'Testimonials'}</span>
                </button>
              </div>

              {/* 1. ABOUT US SECTION FORM */}
              {homeSubTab === 'about' && (
                <form onSubmit={handleSaveAbout} className="space-y-6 pt-2">
                  <div className="bg-[#F7F8F6] p-5 rounded-2xl border border-gray-200/70 space-y-4">
                    <h3 className="text-sm font-bold text-[#12332B] flex items-center gap-2 border-b border-gray-200 pb-2">
                      <Eye className="w-4 h-4 text-[#0B6B4F]" />
                      <span>{locale === 'ar' ? 'العناوين والوصف الرئيسي لقسم من نحن' : 'Main About Headline & Description'}</span>
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">شارة البادج (Badge Text)</label>
                        <input
                          type="text"
                          value={aboutForm.badgeAr || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, badgeAr: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs"
                          placeholder="من نحن"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">العنوان الأول (نموذج رائد في)</label>
                        <input
                          type="text"
                          value={aboutForm.titleModelAr || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, titleModelAr: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs"
                          placeholder="نموذج رائد في"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">الكلمة المبرزة (العمل التعاوني)</label>
                        <input
                          type="text"
                          value={aboutForm.titleHighlightAr || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, titleHighlightAr: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs font-bold text-[#0B6B4F]"
                          placeholder="العمل التعاوني"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">الوصف التعريفي للجمعية (فقرة من نحن الكاملة)</label>
                      <textarea
                        rows={3}
                        value={aboutForm.descriptionAr || ''}
                        onChange={(e) => setAboutForm({ ...aboutForm, descriptionAr: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs leading-relaxed"
                        placeholder="نحن كيان اقتصادي واجتماعي يهدف إلى تحقيق التنمية المستدامة..."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Vision Card Edit */}
                    <div className="bg-[#EBF4F0]/60 p-5 rounded-2xl border border-[#0B6B4F]/15 space-y-3">
                      <h4 className="text-xs font-black text-[#0B6B4F] flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        <span>بطاقة رؤيتنا (Vision Card)</span>
                      </h4>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">عنوان البطاقة</label>
                        <input
                          type="text"
                          value={aboutForm.visionTitleAr || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, visionTitleAr: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs"
                          placeholder="رؤيتنا"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">نص الرؤية</label>
                        <textarea
                          rows={3}
                          value={aboutForm.visionDescAr || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, visionDescAr: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs"
                          placeholder="تقديم حلول تعاونية رائدة تعزز التنمية المستدامة..."
                        />
                      </div>
                    </div>

                    {/* Mission Card Edit */}
                    <div className="bg-[#EBF4F0]/60 p-5 rounded-2xl border border-[#0B6B4F]/15 space-y-3">
                      <h4 className="text-xs font-black text-[#0B6B4F] flex items-center gap-1.5">
                        <Target className="w-4 h-4" />
                        <span>بطاقة رسالتنا (Mission Card)</span>
                      </h4>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">عنوان البطاقة</label>
                        <input
                          type="text"
                          value={aboutForm.missionTitleAr || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, missionTitleAr: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs"
                          placeholder="رسالتنا"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">نص الرسالة</label>
                        <textarea
                          rows={3}
                          value={aboutForm.missionDescAr || ''}
                          onChange={(e) => setAboutForm({ ...aboutForm, missionDescAr: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs"
                          placeholder="تحقيق التنمية المستدامة والتمكين الاقتصادي والاجتماعي..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F7F8F6] p-5 rounded-2xl border border-gray-200/70 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">الشعار الجانبي (Slogan)</label>
                      <input
                        type="text"
                        value={aboutForm.sloganAr || ''}
                        onChange={(e) => setAboutForm({ ...aboutForm, sloganAr: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs font-bold"
                        placeholder="جذور راسخة، رؤية طموحة."
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center justify-between">
                        <span>صورة قسم من نحن (Portrait Image)</span>
                        <span className="text-[10px] text-[#0B6B4F] font-semibold">رفع صورة أو رابط</span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={aboutForm.imageUrl?.startsWith('data:image') ? 'تم مرفق صورة من الجهاز (معتمد ومحفوظ)' : (aboutForm.imageUrl || '')}
                          onChange={(e) => setAboutForm({ ...aboutForm, imageUrl: e.target.value })}
                          readOnly={aboutForm.imageUrl?.startsWith('data:image')}
                          placeholder="/about.jpg أو اختر صورة"
                          className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs outline-none ${aboutForm.imageUrl?.startsWith('data:image') ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold' : 'border-gray-300 focus:border-[#0B6B4F]'
                            }`}
                        />
                        <label className="px-3.5 py-2.5 bg-[#0B6B4F] hover:bg-[#08523C] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                          <Upload className="w-4 h-4 text-white" />
                          <span>{aboutForm.imageUrl?.startsWith('data:image') ? 'تغيير' : 'رفع صورة'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleImageFileUpload(e, (dataUrl) => setAboutForm({ ...aboutForm, imageUrl: dataUrl }))}
                          />
                        </label>
                        {aboutForm.imageUrl && (
                          <button type="button" onClick={() => setAboutForm({ ...aboutForm, imageUrl: '' })} className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 cursor-pointer"><X className="w-4 h-4" /></button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'حفظ وتحديث قسم من نحن' : 'Save About Us Data'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* 2. HERO SLIDES SUB-TAB */}
              {homeSubTab === 'hero' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#12332B]">
                      {locale === 'ar' ? 'شرائح البانر الرئيسي (Hero Slider)' : 'Hero Banner Slides'} ({homeHeroSlides.length})
                    </h3>
                    <button
                      type="button"
                      onClick={handleOpenAddHeroSlide}
                      className="px-3.5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'إضافة شريحة هيرو جديدة' : 'Add Hero Slide'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {homeHeroSlides.map((slide, idx) => (
                      <div
                        key={slide.id}
                        className="p-5 rounded-2xl bg-[#F7F8F6] border border-gray-200/70 hover:border-[#0B6B4F]/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={slide.bgImage}
                            alt={slide.titleAr}
                            className="w-20 h-16 rounded-xl object-covershrink-0"
                          />
                          <div className="space-y-1 text-xs">
                            <span className="inline-block px-2 py-0.5 rounded-full bg-[#EBF4F0] text-[#0B6B4F] text-[10px] font-bold">
                              شريحة #{idx + 1} • {slide.badgeAr}
                            </span>
                            <h4 className="font-bold text-sm text-gray-900">
                              {slide.titleAr} <span className="text-[#0B6B4F]">{slide.highlightAr}</span>
                            </h4>
                            <p className="text-gray-500 line-clamp-1">{slide.subtitleAr}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                          <button
                            type="button"
                            onClick={() => handleOpenEditHeroSlide(slide)}
                            className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-[#0B6B4F] cursor-pointer"
                            title="تعديل"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (homeHeroSlides.length <= 1) {
                                alert(locale === 'ar' ? 'يجب الإبقاء على شريحة هيرو واحدة على الأقل' : 'Must keep at least one hero slide');
                                return;
                              }
                              if (window.confirm(locale === 'ar' ? `حذف الشريحة "${slide.titleAr}"؟` : 'Delete slide?')) {
                                deleteHomeHeroSlide(slide.id);
                                showNotification(locale === 'ar' ? 'تم الحذف' : 'Deleted');
                              }
                            }}
                            className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. LIVE STATS SUB-TAB */}
              {homeSubTab === 'stats' && (
                <form onSubmit={handleSaveStats} className="space-y-6 pt-2">
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs text-amber-900">
                    💡 الإحصائيات والأرقام الظاهرة في الشريط الأخضر الرئيسي على الواجهة الرئيسية للجمعية.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {statsForm.map((stat, idx) => (
                      <div key={stat.id || idx} className="bg-[#F7F8F6] p-5 rounded-2xl   space-y-3">
                        <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                          <span className="font-mono font-bold text-xs text-[#0B6B4F]">إحصائية #{idx + 1}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">القيمة (بالعربية)</label>
                            <input
                              type="text"
                              value={stat.valueAr}
                              onChange={(e) => {
                                const newStats = [...statsForm];
                                newStats[idx].valueAr = e.target.value;
                                setStatsForm(newStats);
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs font-bold"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] font-bold text-gray-700 mb-1">اسم المسمى الإحصائي</label>
                            <input
                              type="text"
                              value={stat.labelAr}
                              onChange={(e) => {
                                const newStats = [...statsForm];
                                newStats[idx].labelAr = e.target.value;
                                setStatsForm(newStats);
                              }}
                              className="w-full px-3 py-2 rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none text-xs"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold shadow-md transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'حفظ وتحديث الإحصائيات' : 'Save Live Stats'}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* 4. STRATEGIC GOALS SUB-TAB */}
              {homeSubTab === 'goals' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#12332B]">
                      {locale === 'ar' ? 'قائمة الأهداف الاستراتيجية' : 'Strategic Objectives List'} ({strategicGoals.length})
                    </h3>
                    <button
                      type="button"
                      onClick={handleOpenAddGoal}
                      className="px-3.5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'إضافة هدف استراتيجي جديد' : 'Add Strategic Goal'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {strategicGoals.map((goal) => (
                      <div
                        key={goal.id}
                        className="bg-[#F7F8F6] rounded-2xl p-5   hover:border-[#0B6B4F]/30 transition-all flex flex-col justify-between space-y-3 relative group"
                      >
                        <div>
                          <div className="text-2xl font-black text-[#5EA88F] font-sans mb-1">
                            0{goal.number}
                          </div>
                          <h4 className="font-bold text-sm text-[#12332B] leading-snug">
                            {goal.titleAr}
                          </h4>
                          {goal.descriptionAr && (
                            <p className="text-xs text-gray-500 mt-2 line-clamp-2">{goal.descriptionAr}</p>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-200/60">
                          <button
                            type="button"
                            onClick={() => handleOpenEditGoal(goal)}
                            className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0B6B4F] cursor-pointer"
                            title="تعديل"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(locale === 'ar' ? `حذف الهدف "${goal.titleAr}"؟` : 'Delete goal?')) {
                                deleteStrategicGoal(goal.id);
                                showNotification(locale === 'ar' ? 'تم الحذف' : 'Deleted');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                            title="حذف"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. TESTIMONIALS SUB-TAB */}
              {homeSubTab === 'testimonials' && (
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-[#12332B]">
                      {locale === 'ar' ? 'آراء وشهادات الشركاء والملاّك (قالوا عنا)' : 'Shareholder & Client Testimonials'} ({testimonials.length})
                    </h3>
                    <button
                      type="button"
                      onClick={handleOpenAddTestimonial}
                      className="px-3.5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{locale === 'ar' ? 'إضافة رأي/شهادة جديدة' : 'Add Testimonial'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {testimonials.map((t) => (
                      <div
                        key={t.id}
                        className="bg-[#F7F8F6] p-5 rounded-2xl   space-y-3 flex flex-col justify-between"
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded-full text-amber-900 font-bold text-[10px]">
                              <span>★ {t.rating}.0</span>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EBF4F0] text-[#0B6B4F]">
                              {t.projectRelatedAr}
                            </span>
                          </div>

                          <p className="text-xs text-gray-700 italic leading-relaxed">
                            "{t.quoteAr}"
                          </p>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                          <div className="flex items-center gap-2.5">
                            <img src={t.avatar} alt={t.nameAr} className="w-8 h-8 rounded-full object-cover border border-gray-300" />
                            <div className="text-xs">
                              <div className="font-bold text-gray-900">{t.nameAr}</div>
                              <div className="text-[10px] text-gray-500">{t.roleAr} • {t.organizationAr}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleOpenEditTestimonial(t)}
                              className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-[#0B6B4F] cursor-pointer"
                              title="تعديل"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(locale === 'ar' ? `حذف شهادة "${t.nameAr}"؟` : 'Delete?')) {
                                  deleteTestimonial(t.id);
                                  showNotification(locale === 'ar' ? 'تم الحذف' : 'Deleted');
                                }
                              }}
                              className="p-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                              title="حذف"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* ------------------- MODALS ------------------- */}

      {/* HERO SLIDE EDIT/ADD MODAL */}
      {isHeroModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-start">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingHeroSlide ? 'تعديل شريحة الهيرو' : 'إضافة شريحة هيرو جديدة'}</h3>
              <button type="button" onClick={() => setIsHeroModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveHeroSlide} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">شارة البادج العلوي (Badge Text) *</label>
                <input type="text" required value={heroSlideForm.badgeAr || ''} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, badgeAr: e.target.value })} placeholder="تعاونية الشامل متعددة الأغراض" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">العنوان الرئيسي *</label>
                  <input type="text" required value={heroSlideForm.titleAr || ''} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, titleAr: e.target.value })} placeholder="تأبى الرياحُ إذا اجتمعن تكسّرا.." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">الكلمة المبرزة (Highlight Text)</label>
                  <input type="text" value={heroSlideForm.highlightAr || ''} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, highlightAr: e.target.value })} placeholder="وإذا افترقنَ تكسّرت آحادا..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-bold text-[#095B42]" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">الوصف الفرعي (Subtitle Description)</label>
                <textarea rows={3} value={heroSlideForm.subtitleAr || ''} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, subtitleAr: e.target.value })} placeholder="رسالتنا: تحقيق التنمية المستدامة..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">نص زر التفاعل (CTA Button Text)</label>
                  <input type="text" value={heroSlideForm.ctaTextAr || ''} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, ctaTextAr: e.target.value })} placeholder="اكتشف مشاريعنا" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">رابط زر التفاعل (CTA Link)</label>
                  <input type="text" value={heroSlideForm.ctaLink || ''} onChange={(e) => setHeroSlideForm({ ...heroSlideForm, ctaLink: e.target.value })} placeholder="/projects" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>صورة الخلفية (Background Image)</span>
                  <span className="text-[10px] text-[#095B42] font-semibold">رفع صورة أو رابط</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={heroSlideForm.bgImage?.startsWith('data:image') ? 'تم مرفق صورة خلفية من الجهاز' : (heroSlideForm.bgImage || '')}
                    onChange={(e) => setHeroSlideForm({ ...heroSlideForm, bgImage: e.target.value })}
                    readOnly={heroSlideForm.bgImage?.startsWith('data:image')}
                    placeholder="https://images.unsplash.com/... أو اختر صورة"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs outline-none ${heroSlideForm.bgImage?.startsWith('data:image') ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold' : 'border-gray-300 focus:border-[#095B42]'
                      }`}
                  />
                  <label className="px-3.5 py-2.5 bg-[#095B42] hover:bg-[#064230] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <span>{heroSlideForm.bgImage?.startsWith('data:image') ? 'تغيير' : 'رفع صورة'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageFileUpload(e, (dataUrl) => setHeroSlideForm({ ...heroSlideForm, bgImage: dataUrl }))}
                    />
                  </label>
                  {heroSlideForm.bgImage && (
                    <button type="button" onClick={() => setHeroSlideForm({ ...heroSlideForm, bgImage: '' })} className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 cursor-pointer"><X className="w-4 h-4" /></button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsHeroModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">حفظ الشريحة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* STRATEGIC GOAL EDIT/ADD MODAL */}
      {isGoalModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-start">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingGoal ? 'تعديل الهدف الاستراتيجي' : 'إضافة هدف استراتيجي جديد'}</h3>
              <button type="button" onClick={() => setIsGoalModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveGoal} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">الرقم *</label>
                  <input type="number" required value={goalForm.number || ''} onChange={(e) => setGoalForm({ ...goalForm, number: Number(e.target.value) })} placeholder="1" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-bold" />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold text-gray-700 mb-1">عنوان الهدف الاستراتيجي *</label>
                  <input type="text" required value={goalForm.titleAr || ''} onChange={(e) => setGoalForm({ ...goalForm, titleAr: e.target.value })} placeholder="تعزيز الاستدامة المالية..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">وصف تفصيلي للهدف</label>
                <textarea rows={3} value={goalForm.descriptionAr || ''} onChange={(e) => setGoalForm({ ...goalForm, descriptionAr: e.target.value })} placeholder="رفع كفاءة تنمية الموارد..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none" />
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsGoalModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">حفظ الهدف</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TESTIMONIAL EDIT/ADD MODAL */}
      {isTestimonialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-start">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingTestimonial ? 'تعديل التقييم والشهادة' : 'إضافة شهادة / رأي جديد'}</h3>
              <button type="button" onClick={() => setIsTestimonialModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveTestimonial} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">اسم صاحب الرأي *</label>
                  <input type="text" required value={testimonialForm.nameAr || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, nameAr: e.target.value })} placeholder="أ. فهد الحربي" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">الصفة / الوظيفة</label>
                  <input type="text" value={testimonialForm.roleAr || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, roleAr: e.target.value })} placeholder="عميل دائم" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">الجهة / المدينة</label>
                  <input type="text" value={testimonialForm.organizationAr || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, organizationAr: e.target.value })} placeholder="جدة" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">المشروع المرتبط</label>
                  <input type="text" value={testimonialForm.projectRelatedAr || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, projectRelatedAr: e.target.value })} placeholder="استهلاكية الشامل" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">نص الشهادة / الرأي (الافتخار) *</label>
                <textarea rows={3} required value={testimonialForm.quoteAr || ''} onChange={(e) => setTestimonialForm({ ...testimonialForm, quoteAr: e.target.value })} placeholder="استهلاكية الشامل توفر لنا كافة مستلزمات الأسرة..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>صورة الشخص (Avatar Image)</span>
                  <span className="text-[10px] text-[#095B42] font-semibold">رفع صورة من جهازك أو إدخال رابط</span>
                </label>

                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={testimonialForm.avatar?.startsWith('data:image') ? 'تم مرفق صورة شخصية من الجهاز (معتمد ومحفوظ)' : (testimonialForm.avatar || '')}
                      onChange={(e) => setTestimonialForm({ ...testimonialForm, avatar: e.target.value })}
                      readOnly={testimonialForm.avatar?.startsWith('data:image')}
                      placeholder="https://images.unsplash.com/... أو اختر صورة من جهازك"
                      className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs outline-none ${testimonialForm.avatar?.startsWith('data:image') ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold' : 'border-gray-300 focus:border-[#095B42]'
                        }`}
                    />

                    <label className="px-3.5 py-2.5 bg-[#095B42] hover:bg-[#064230] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                      <Upload className="w-4 h-4 text-white" />
                      <span>{testimonialForm.avatar?.startsWith('data:image') ? 'تغيير' : 'رفع صورة'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageFileUpload(e, (dataUrl) => setTestimonialForm({ ...testimonialForm, avatar: dataUrl }))}
                      />
                    </label>

                    {testimonialForm.avatar && (
                      <button
                        type="button"
                        onClick={() => setTestimonialForm({ ...testimonialForm, avatar: '' })}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 cursor-pointer"
                        title="إزالة الصورة"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {testimonialForm.avatar && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-200">
                      <img
                        src={testimonialForm.avatar}
                        alt="Avatar Preview"
                        className="w-12 h-12 rounded-full object-cover border border-emerald-500/40 shadow-xs shrink-0"
                        onError={(e) => {
                          (e.currentTarget as HTMLElement).style.opacity = '0.3';
                        }}
                      />
                      <div className="text-[11px] text-gray-600 font-medium">
                        معاينة صورة الشخص المرفقة
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsTestimonialModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">حفظ الشهادة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* SUBMISSION DETAIL / RESPONSE MODAL */}
      {viewingSubmission && (
        <SubmissionDetailModal
          submission={viewingSubmission}
          onClose={() => setViewingSubmission(null)}
          onUpdateStatus={(id, status) => {
            updateSubmissionStatus(id, status);
            setViewingSubmission((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
            showNotification(locale === 'ar' ? 'تم تحديث حالة الطلب' : 'Status updated');
          }}
          onDelete={(id) => {
            deleteSubmission(id);
            setViewingSubmission(null);
            showNotification(locale === 'ar' ? 'تم الحذف' : 'Deleted');
          }}
          locale={locale}
        />
      )}

      {/* Member Modal */}
      {isMemberModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-gray-100 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
              <h3 className="text-lg font-bold text-gray-900">
                {editingMember ? 'تعديل بيانات العضو' : 'إضافة عضو جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsMemberModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  اسم العضو بالعربية <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  placeholder="مثال: أحمد عبد الله"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  اسم العضو بالإنجليزية
                </label>
                <input
                  type="text"
                  value={memberNameEn}
                  onChange={(e) => setMemberNameEn(e.target.value)}
                  placeholder="Ahmed Abdullah"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none dir-ltr"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    عدد الأسهم
                  </label>
                  <input
                    type="number"
                    value={memberShares}
                    onChange={(e) => setMemberShares(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    سنة الانضمام
                  </label>
                  <input
                    type="text"
                    value={memberJoinYear}
                    onChange={(e) => setMemberJoinYear(e.target.value)}
                    placeholder="1440"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    المدينة
                  </label>
                  <input
                    type="text"
                    value={memberCity}
                    onChange={(e) => setMemberCity(e.target.value)}
                    placeholder="الجموم"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] rounded-xl shadow-xs hover:brightness-110 cursor-pointer"
                >
                  {editingMember ? 'حفظ التعديلات' : 'إضافة العضو'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Modal */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full border border-gray-100 shadow-2xl max-h-[85vh] flex flex-col my-auto overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 sm:px-8 border-b border-gray-100 shrink-0 bg-white">
              <h3 className="text-lg font-bold text-gray-900">
                {editingProject ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="flex flex-col min-h-0 flex-1 overflow-hidden">
              <div className="p-6 sm:p-8 space-y-4 overflow-y-auto flex-1">
                {/* Project Name (Required) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    اسم المشروع <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={projName}
                    onChange={(e) => setProjName(e.target.value)}
                    placeholder="مثال: ثلاجة الرضا"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                  />
                </div>

                {/* Project Image (Optional: Upload File or Direct URL) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    رفع صورة المشروع أو أدخل الرابط (اختياري)
                  </label>
                  <div className="space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setProjImage(event.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="w-full text-xs text-gray-500 file:me-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-[#095B42] hover:file:bg-emerald-100 cursor-pointer border border-gray-300 rounded-xl p-1"
                    />

                    <input
                      type="text"
                      value={projImage}
                      onChange={(e) => setProjImage(e.target.value)}
                      placeholder="أو ضع رابط الصورة هنا: https://..."
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                    />

                    {projImage && (
                      <div className="relative h-28 w-full rounded-xl overflow-hidden border border-emerald-200 bg-gray-50 shadow-2xs">
                        <img
                          src={projImage}
                          alt="معاينة صورة المشروع"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.currentTarget as HTMLElement).style.opacity = '0.3';
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => setProjImage('')}
                          className="absolute top-2 end-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer shadow-xs"
                        >
                          إزالة الصورة
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    الوصف الرئيسي (اختياري)
                  </label>
                  <textarea
                    rows={3}
                    value={projDesc}
                    onChange={(e) => setProjDesc(e.target.value)}
                    placeholder="مثال: بدأنا بتجهيز أول مشروع وهو ثلاجة الرضا وانطلقنا لتجهيز محل العرض..."
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                  />
                </div>

                {/* Sub Description / Dates (Optional) */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    التفاصيل الإضافية / التواريخ (اختياري)
                  </label>
                  <textarea
                    rows={2}
                    value={projSubDesc}
                    onChange={(e) => setProjSubDesc(e.target.value)}
                    placeholder="مثال: من 1440/10/15 هـ إلى 1440/12/25 هـ وكان الافتتاح في 1441/1/1 هـ"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                  />
                </div>

                {/* Features List (Optional) */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-gray-700">
                      المميزات والخصائص (اختياري)
                    </label>
                    <button
                      type="button"
                      onClick={addFeatureInput}
                      className="text-[11px] font-bold text-[#0B6B4F] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      إضافة ميزة جديدة
                    </button>
                  </div>

                  <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                    {projFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feat}
                          onChange={(e) => updateFeatureInput(fIdx, e.target.value)}
                          placeholder={'ميزة ' + (fIdx + 1) + ' (مثال: خدمة التوصيل السريع)'}
                          className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-300 focus:border-[#0B6B4F] outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeatureInput(fIdx)}
                          className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg cursor-pointer"
                          title="حذف الميزة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                    {projFeatures.length === 0 && (
                      <p className="text-[11px] text-gray-400 italic">لا توجد مميزات مضافة بعد.</p>
                    )}
                  </div>
                </div>

                {/* Society Name Override (Arabic & English) */}
                <div className="pt-3 border-t border-gray-100 space-y-3">
                  <span className="text-[11px] font-black text-[#0B6B4F] uppercase tracking-wider block">
                    عنوان وشعار الجمعية أسفل البطاقة (قابل للتعديل):
                  </span>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      اسم الجمعية بالعربية
                    </label>
                    <input
                      type="text"
                      value={projSocietyAr}
                      onChange={(e) => setProjSocietyAr(e.target.value)}
                      placeholder="الجمعية التعاونية متعددة اغراض رضا بمحافظة الجموم"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      اسم الجمعية بالإنجليزية (English)
                    </label>
                    <input
                      type="text"
                      value={projSocietyEn}
                      onChange={(e) => setProjSocietyEn(e.target.value)}
                      placeholder="THE MULTI-PURPOSE COOPERATIVE SOCIETY, REDA, IN JAMOUM GOVERNORATE"
                      className="w-full px-3.5 py-2 text-xs rounded-xl border border-gray-300 focus:border-[#0B6B4F] outline-none dir-ltr"
                    />
                  </div>
                </div>
              </div>

              {/* Fixed Footer Bar */}
              <div className="p-4 sm:px-8 border-t border-gray-100 bg-gray-50/90 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-200/80 rounded-xl cursor-pointer transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] rounded-xl shadow-xs hover:brightness-110 cursor-pointer transition-all"
                >
                  حفظ المشروع
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 1. Policy Modal */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingPolicy ? 'تعديل السياسة' : 'إضافة سياسة جديدة'}</h3>
              <button type="button" onClick={() => setIsPolicyModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSavePolicy} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">عنوان السياسة *</label>
                <input type="text" required value={policyForm.titleAr || ''} onChange={(e) => setPolicyForm({ ...policyForm, titleAr: e.target.value })} placeholder="سياسة تعارض المصالح..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">التصنيف</label>
                <select value={policyForm.category || 'general'} onChange={(e) => setPolicyForm({ ...policyForm, category: e.target.value as any })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none cursor-pointer">
                  <option value="general">سياسة مؤسسية عامة</option>
                  <option value="aml">سياسات مكافحة غسل الأموال والاشتباه</option>
                  <option value="whistleblowing">الإبلاغ وحفظ الوثائق والهبات</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">وصف السياسة</label>
                <textarea rows={3} value={policyForm.descAr || policyForm.descriptionAr || ''} onChange={(e) => setPolicyForm({ ...policyForm, descAr: e.target.value, descriptionAr: e.target.value })} placeholder="وصف وتفاصيل السياسة المعتمدة..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>رابط أو ملف PDF السياسة</span>
                  <span className="text-[10px] text-[#095B42] font-semibold">رفع ملف أو رابط</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={policyForm.pdfUrl?.startsWith('data:application/pdf') ? 'تم مرفق ملف PDF بنجاح (معتمد ومحفوظ)' : (policyForm.pdfUrl || '')}
                    onChange={(e) => setPolicyForm({ ...policyForm, pdfUrl: e.target.value, fileUrl: e.target.value })}
                    readOnly={policyForm.pdfUrl?.startsWith('data:application/pdf')}
                    placeholder="https://... أو اختر ملف PDF من جهازك"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${policyForm.pdfUrl?.startsWith('data:application/pdf') ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold' : 'border-gray-300 focus:border-[#095B42]'
                      }`}
                  />
                  <label className="px-3.5 py-2.5 bg-[#095B42] hover:bg-[#064230] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <span>{policyForm.pdfUrl?.startsWith('data:application/pdf') ? 'تغيير' : 'رفع PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => handlePdfFileUpload(e, (dataUrl) => setPolicyForm({ ...policyForm, pdfUrl: dataUrl, fileUrl: dataUrl }))}
                    />
                  </label>
                  {policyForm.pdfUrl?.startsWith('data:application/pdf') && (
                    <button type="button" onClick={() => setPolicyForm({ ...policyForm, pdfUrl: '', fileUrl: '' })} className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 cursor-pointer"><X className="w-4 h-4" /></button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsPolicyModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">حفظ السياسة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Regulation Modal */}
      {isRegulationModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingRegulation ? 'تعديل بيانات اللائحة / النظام' : 'إضافة لائحة / نظام جديد'}</h3>
              <button type="button" onClick={() => setIsRegulationModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveRegulation} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">اسم اللائحة / المستند (بالعربية) *</label>
                  <input
                    type="text"
                    required
                    value={regulationForm.titleAr || ''}
                    onChange={(e) => setRegulationForm({ ...regulationForm, titleAr: e.target.value })}
                    placeholder="اللائحة الأساسية لتعاونية الشامل..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">الاسم (بالإنجليزية)</label>
                  <input
                    type="text"
                    value={regulationForm.titleEn || ''}
                    onChange={(e) => setRegulationForm({ ...regulationForm, titleEn: e.target.value })}
                    placeholder="Basic Bylaws of AlShamel..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">القسم / التصنيف *</label>
                  <select
                    value={regulationForm.sec || 'foundation'}
                    onChange={(e) => setRegulationForm({ ...regulationForm, sec: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none cursor-pointer bg-white"
                  >
                    <option value="foundation">اللائحة الأساسية ومحاضر التأسيس</option>
                    <option value="financial">اللوائح والملفات المالية</option>
                    <option value="laws">الأنظمة الوطنية واللوائح العامة</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">نوع المستند</label>
                  <input
                    type="text"
                    value={regulationForm.type || ''}
                    onChange={(e) => setRegulationForm({ ...regulationForm, type: e.target.value })}
                    placeholder="وثيقة تأسيسية / لائحة مالية"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">رمز / رقم الوثيقة</label>
                  <input
                    type="text"
                    value={regulationForm.num || ''}
                    onChange={(e) => setRegulationForm({ ...regulationForm, num: e.target.value })}
                    placeholder="REG-001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">الوصف والتفاصيل (بالعربية)</label>
                <textarea
                  rows={2}
                  value={regulationForm.descAr || regulationForm.descriptionAr || ''}
                  onChange={(e) => setRegulationForm({ ...regulationForm, descAr: e.target.value, descriptionAr: e.target.value })}
                  placeholder="الوثيقة التأسيسية المعتمدة من وزارة الموارد البشرية..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">الوصف والتفاصيل (بالإنجليزية)</label>
                <textarea
                  rows={2}
                  value={regulationForm.descEn || ''}
                  onChange={(e) => setRegulationForm({ ...regulationForm, descEn: e.target.value })}
                  placeholder="Foundational statutory bylaws ratified by official authorities..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none leading-relaxed"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>ملف وثيقة اللائحة بصيغة PDF (معتمدة ومحفوظة)</span>
                  <span className="text-[10px] text-[#095B42] font-semibold">رفع ملف أو رابط</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={
                      (regulationForm.fileUrl || regulationForm.pdfUrl)?.startsWith('data:application/pdf')
                        ? 'تم إرفاق ملف PDF بنجاح (معتمد ومحفوظ)'
                        : (regulationForm.fileUrl || regulationForm.pdfUrl || '')
                    }
                    onChange={(e) => setRegulationForm({ ...regulationForm, fileUrl: e.target.value, pdfUrl: e.target.value })}
                    readOnly={(regulationForm.fileUrl || regulationForm.pdfUrl)?.startsWith('data:application/pdf')}
                    placeholder="https://... أو اختر ملف PDF من جهازك"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${(regulationForm.fileUrl || regulationForm.pdfUrl)?.startsWith('data:application/pdf')
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                      : 'border-gray-300 focus:border-[#095B42]'
                      }`}
                  />
                  <label className="px-3.5 py-2.5 bg-[#095B42] hover:bg-[#064230] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <span>{(regulationForm.fileUrl || regulationForm.pdfUrl)?.startsWith('data:application/pdf') ? 'تغيير' : 'رفع PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => handlePdfFileUpload(e, (dataUrl) => setRegulationForm({ ...regulationForm, fileUrl: dataUrl, pdfUrl: dataUrl }))}
                    />
                  </label>
                  {(regulationForm.fileUrl || regulationForm.pdfUrl)?.startsWith('data:application/pdf') && (
                    <button
                      type="button"
                      onClick={() => setRegulationForm({ ...regulationForm, fileUrl: '', pdfUrl: '' })}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 cursor-pointer"
                      title="إزالة الملف"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsRegulationModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">
                  {editingRegulation ? 'حفظ كافة التعديلات' : 'إضافة اللائحة للسجل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Financial Modal */}
      {isFinancialModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingFinancial ? 'تعديل القائمة المالية' : 'إضافة قائمة مالية مدققة جديدة'}</h3>
              <button type="button" onClick={() => setIsFinancialModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveFinancial} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">السنة المالية *</label>
                  <input
                    type="text"
                    required
                    value={financialForm.year || ''}
                    onChange={(e) => setFinancialForm({ ...financialForm, year: e.target.value })}
                    placeholder="2023"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">العنوان بالعربية *</label>
                  <input
                    type="text"
                    required
                    value={financialForm.titleAr || ''}
                    onChange={(e) => setFinancialForm({ ...financialForm, titleAr: e.target.value })}
                    placeholder="القوائم المالية المدققة لعام 2023م"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">العنوان بالإنجليزية</label>
                  <input
                    type="text"
                    value={financialForm.titleEn || ''}
                    onChange={(e) => setFinancialForm({ ...financialForm, titleEn: e.target.value })}
                    placeholder="Audited Financial Statements for FY 2023"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">حالة الاعتماد *</label>
                  <select
                    value={financialForm.status || 'معتمد'}
                    onChange={(e) => setFinancialForm({ ...financialForm, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none cursor-pointer bg-white"
                  >
                    <option value="معتمد">معتمد رسمياً</option>
                    <option value="تحت المراجعة">تحت المراجعة</option>
                    <option value="مسودة">مسودة</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">إجمالي الإيرادات</label>
                  <input
                    type="text"
                    value={financialForm.revenue || ''}
                    onChange={(e) => setFinancialForm({ ...financialForm, revenue: e.target.value })}
                    placeholder="4,850,000 ر.س"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">صافي الفائض المحقق</label>
                  <input
                    type="text"
                    value={financialForm.netSurplus || financialForm.surplus || ''}
                    onChange={(e) => setFinancialForm({ ...financialForm, netSurplus: e.target.value, surplus: e.target.value })}
                    placeholder="1,130,000 ر.س"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono font-bold text-emerald-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">مكتب المحاسبة والتدقيق</label>
                <input
                  type="text"
                  value={financialForm.auditFirmAr || ''}
                  onChange={(e) => setFinancialForm({ ...financialForm, auditFirmAr: e.target.value })}
                  placeholder="مكتب المحاسب القانوني المعتمد"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>وثيقة القوائم المالية بصيغة PDF (معتمدة ومحفوظة)</span>
                  <span className="text-[10px] text-[#095B42] font-semibold">رفع ملف أو رابط</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={
                      (financialForm.pdfUrl || financialForm.fileUrl)?.startsWith('data:application/pdf')
                        ? 'تم إرفاق ملف PDF بنجاح (معتمد ومحفوظ)'
                        : (financialForm.pdfUrl || financialForm.fileUrl || '')
                    }
                    onChange={(e) => setFinancialForm({ ...financialForm, pdfUrl: e.target.value, fileUrl: e.target.value })}
                    readOnly={(financialForm.pdfUrl || financialForm.fileUrl)?.startsWith('data:application/pdf')}
                    placeholder="https://... أو اختر ملف PDF من جهازك"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${(financialForm.pdfUrl || financialForm.fileUrl)?.startsWith('data:application/pdf')
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                      : 'border-gray-300 focus:border-[#095B42]'
                      }`}
                  />
                  <label className="px-3.5 py-2.5 bg-[#095B42] hover:bg-[#064230] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <span>{(financialForm.pdfUrl || financialForm.fileUrl)?.startsWith('data:application/pdf') ? 'تغيير' : 'رفع PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => handlePdfFileUpload(e, (dataUrl) => setFinancialForm({ ...financialForm, pdfUrl: dataUrl, fileUrl: dataUrl }))}
                    />
                  </label>
                  {(financialForm.pdfUrl || financialForm.fileUrl)?.startsWith('data:application/pdf') && (
                    <button
                      type="button"
                      onClick={() => setFinancialForm({ ...financialForm, pdfUrl: '', fileUrl: '' })}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 cursor-pointer"
                      title="إزالة الملف"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsFinancialModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">حفظ القائمة المالية</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Workshop Modal */}
      {isWorkshopModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingWorkshop ? 'تعديل الورشة' : 'إضافة ورشة / شراكة جديدة'}</h3>
              <button type="button" onClick={() => setIsWorkshopModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveWorkshop} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">عنوان الورشة / الشراكة *</label>
                <input type="text" required value={workshopForm.titleAr || ''} onChange={(e) => setWorkshopForm({ ...workshopForm, titleAr: e.target.value })} placeholder="ورشة نشر التوعية بالحوكمة..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">تاريخ الورشة</label>
                  <input type="text" value={workshopForm.date || ''} onChange={(e) => setWorkshopForm({ ...workshopForm, date: e.target.value })} placeholder="2024-05-15م" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">عدد المستفيدين</label>
                  <input type="number" value={workshopForm.attendeesCount || 0} onChange={(e) => setWorkshopForm({ ...workshopForm, attendeesCount: parseInt(e.target.value) || 0 })} className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
                </div>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">الموقع / الجهة</label>
                <input type="text" value={workshopForm.locationAr || ''} onChange={(e) => setWorkshopForm({ ...workshopForm, locationAr: e.target.value })} placeholder="المقر الرئيسي - الجمعية التعاونية" className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">تفاصيل الورشة</label>
                <textarea rows={3} value={workshopForm.descriptionAr || ''} onChange={(e) => setWorkshopForm({ ...workshopForm, descriptionAr: e.target.value })} placeholder="جانب من محاور وحضور الورشة التوعوية..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>رابط أو ملف الورشة PDF</span>
                  <span className="text-[10px] text-[#095B42] font-semibold">رفع ملف أو رابط</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={workshopForm.fileUrl?.startsWith('data:application/pdf') ? 'تم مرفق ملف PDF بنجاح (معتمد ومحفوظ)' : (workshopForm.fileUrl || '')}
                    onChange={(e) => setWorkshopForm({ ...workshopForm, fileUrl: e.target.value })}
                    readOnly={workshopForm.fileUrl?.startsWith('data:application/pdf')}
                    placeholder="https://... أو اختر ملف PDF من جهازك"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${workshopForm.fileUrl?.startsWith('data:application/pdf') ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold' : 'border-gray-300 focus:border-[#095B42]'
                      }`}
                  />
                  <label className="px-3.5 py-2.5 bg-[#095B42] hover:bg-[#064230] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <span>{workshopForm.fileUrl?.startsWith('data:application/pdf') ? 'تغيير' : 'رفع PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => handlePdfFileUpload(e, (dataUrl) => setWorkshopForm({ ...workshopForm, fileUrl: dataUrl }))}
                    />
                  </label>
                  {workshopForm.fileUrl?.startsWith('data:application/pdf') && (
                    <button type="button" onClick={() => setWorkshopForm({ ...workshopForm, fileUrl: '' })} className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200"><X className="w-4 h-4" /></button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsWorkshopModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">حفظ الورشة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Meeting Modal */}
      {isMeetingModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingMeeting ? 'تعديل محضر الاجتماع والقرارات' : 'إضافة محضر اجتماع رسمي جديد'}</h3>
              <button type="button" onClick={() => setIsMeetingModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveMeeting} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">عنوان المحضر (بالعربية) *</label>
                  <input
                    type="text"
                    required
                    value={meetingForm.titleAr || ''}
                    onChange={(e) => setMeetingForm({ ...meetingForm, titleAr: e.target.value })}
                    placeholder="محضر اجتماع الجمعية العمومية العادية لعام 2024م..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">عنوان المحضر (بالإنجليزية)</label>
                  <input
                    type="text"
                    value={meetingForm.titleEn || ''}
                    onChange={(e) => setMeetingForm({ ...meetingForm, titleEn: e.target.value })}
                    placeholder="Ordinary General Assembly Meeting Minutes 2024..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">نوع الاجتماع *</label>
                  <select
                    value={meetingForm.type === 'board' ? 'board' : 'general_assembly'}
                    onChange={(e) => setMeetingForm({ ...meetingForm, type: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none cursor-pointer"
                  >
                    <option value="general_assembly">الجمعية العمومية</option>
                    <option value="board">مجلس الإدارة</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">رقم المحضر الرسمي</label>
                  <input
                    type="text"
                    value={meetingForm.meetingNumber || ''}
                    onChange={(e) => setMeetingForm({ ...meetingForm, meetingNumber: e.target.value })}
                    placeholder="GA-2024/01 أو BM-2024/03"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">حجم الملف</label>
                  <input
                    type="text"
                    value={meetingForm.fileSize || '2.0 MB'}
                    onChange={(e) => setMeetingForm({ ...meetingForm, fileSize: e.target.value })}
                    placeholder="2.8 MB"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">تاريخ الاجتماع (بالعربية) *</label>
                  <input
                    type="text"
                    value={meetingForm.dateAr || meetingForm.date || ''}
                    onChange={(e) => setMeetingForm({ ...meetingForm, dateAr: e.target.value, date: e.target.value })}
                    placeholder="أبريل 2024م أو 1445/10/22 هـ"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">تاريخ الاجتماع (بالإنجليزية)</label>
                  <input
                    type="text"
                    value={meetingForm.dateEn || ''}
                    onChange={(e) => setMeetingForm({ ...meetingForm, dateEn: e.target.value })}
                    placeholder="April 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">مكان الانعقاد</label>
                  <input
                    type="text"
                    value={meetingForm.locationAr || ''}
                    onChange={(e) => setMeetingForm({ ...meetingForm, locationAr: e.target.value })}
                    placeholder="المقر الرئيسي للجمعية"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">عدد الحاضرين</label>
                  <input
                    type="number"
                    min="0"
                    value={meetingForm.attendeesCount || 0}
                    onChange={(e) => setMeetingForm({ ...meetingForm, attendeesCount: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">عدد القرارات الصادرة</label>
                  <input
                    type="number"
                    min="0"
                    value={meetingForm.decisionsCount || 0}
                    onChange={(e) => setMeetingForm({ ...meetingForm, decisionsCount: parseInt(e.target.value, 10) || 0 })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">تفاصيل وموجز القرارات (بالعربية)</label>
                <textarea
                  rows={3}
                  value={meetingForm.descAr || meetingForm.descriptionAr || ''}
                  onChange={(e) => setMeetingForm({ ...meetingForm, descAr: e.target.value, descriptionAr: e.target.value })}
                  placeholder="تضمن مناقشة التقرير السنوي، واعتماد القوائم المالية المدققة لعام 2023، وإبراء ذمة مجلس الإدارة..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">تفاصيل وموجز القرارات (بالإنجليزية)</label>
                <textarea
                  rows={2}
                  value={meetingForm.descEn || ''}
                  onChange={(e) => setMeetingForm({ ...meetingForm, descEn: e.target.value })}
                  placeholder="Discussed annual performance report, approved audited financials..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none leading-relaxed"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>وثيقة المحضر بصيغة PDF (معتمدة ومحفوظة بالسيرفر)</span>
                  <span className="text-[10px] text-[#095B42] font-semibold">رفع ملف PDF أو رابط خارجي</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={
                      (meetingForm.fileUrl || meetingForm.pdfUrl)?.startsWith('data:application/pdf')
                        ? 'تم إرفاق وثيقة PDF بنجاح (جاهزة للحفظ والعرض)'
                        : (meetingForm.fileUrl || meetingForm.pdfUrl || '')
                    }
                    onChange={(e) => setMeetingForm({ ...meetingForm, fileUrl: e.target.value, pdfUrl: e.target.value })}
                    readOnly={(meetingForm.fileUrl || meetingForm.pdfUrl)?.startsWith('data:application/pdf')}
                    placeholder="/documents/AlShamel-Meeting-Minutes.pdf أو رابط مباشر"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${(meetingForm.fileUrl || meetingForm.pdfUrl)?.startsWith('data:application/pdf')
                      ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold'
                      : 'border-gray-300 focus:border-[#095B42]'
                      }`}
                  />
                  <label className="px-4 py-2.5 bg-[#095B42] hover:bg-[#064230] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <span>{(meetingForm.fileUrl || meetingForm.pdfUrl)?.startsWith('data:application/pdf') ? 'تغيير PDF' : 'رفع PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => handlePdfFileUpload(e, (dataUrl) => setMeetingForm({ ...meetingForm, fileUrl: dataUrl, pdfUrl: dataUrl }))}
                    />
                  </label>
                  {(meetingForm.fileUrl || meetingForm.pdfUrl)?.startsWith('data:application/pdf') && (
                    <button
                      type="button"
                      onClick={() => setMeetingForm({ ...meetingForm, fileUrl: '', pdfUrl: '' })}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200 cursor-pointer"
                      title="إزالة الملف"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsMeetingModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">
                  {editingMeeting ? 'حفظ كافة التعديلات' : 'إضافة المحضر للسجل'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Ethics Modal */}
      {isEthicsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 space-y-5 border border-gray-100 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="font-black text-lg text-gray-900">{editingEthics ? 'تعديل بند الميثاق الأخلاقي' : 'إضافة بند أخلاقي جديد'}</h3>
              <button type="button" onClick={() => setIsEthicsModalOpen(false)} className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSaveEthics} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">عنوان الميثاق / المبدأ *</label>
                <input type="text" required value={ethicsForm.titleAr || ''} onChange={(e) => setEthicsForm({ ...ethicsForm, titleAr: e.target.value })} placeholder="النزاهة والشفافية وحظر تعارض المصالح..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">تفاصيل القواعد والمبادئ الأخلاقية</label>
                <textarea rows={4} value={ethicsForm.descAr || ''} onChange={(e) => setEthicsForm({ ...ethicsForm, descAr: e.target.value })} placeholder="المبادئ الأخلاقية والالتزام بقواعد السلوك..." className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none resize-none" />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1 flex items-center justify-between">
                  <span>رابط وثيقة الميثاق الأخلاقي PDF</span>
                  <span className="text-[10px] text-[#095B42] font-semibold">رفع ملف أو إدخال رابط</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ethicsForm.fileUrl?.startsWith('data:application/pdf') ? 'تم مرفق ملف PDF بنجاح (معتمد ومحفوظ)' : (ethicsForm.fileUrl || '')}
                    onChange={(e) => setEthicsForm({ ...ethicsForm, fileUrl: e.target.value })}
                    readOnly={ethicsForm.fileUrl?.startsWith('data:application/pdf')}
                    placeholder="/documents/AlShamel-Ethical-Charter.pdf"
                    className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs font-mono outline-none ${ethicsForm.fileUrl?.startsWith('data:application/pdf') ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-bold' : 'border-gray-300 focus:border-[#095B42]'
                      }`}
                  />
                  <label className="px-3.5 py-2.5 bg-[#095B42] hover:bg-[#064230] text-white rounded-xl font-bold flex items-center gap-1.5 cursor-pointer shrink-0 text-xs shadow-xs transition-colors">
                    <Upload className="w-4 h-4 text-white" />
                    <span>{ethicsForm.fileUrl?.startsWith('data:application/pdf') ? 'تغيير' : 'رفع PDF'}</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={(e) => handlePdfFileUpload(e, (dataUrl) => setEthicsForm({ ...ethicsForm, fileUrl: dataUrl }))}
                    />
                  </label>
                  {ethicsForm.fileUrl?.startsWith('data:application/pdf') && (
                    <button type="button" onClick={() => setEthicsForm({ ...ethicsForm, fileUrl: '' })} className="p-2 text-red-500 hover:bg-red-50 rounded-xl border border-red-200"><X className="w-4 h-4" /></button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsEthicsModalOpen(false)} className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100 rounded-xl cursor-pointer">إلغاء</button>
                <button type="submit" className="px-6 py-2.5 font-bold text-white bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 rounded-xl shadow-xs cursor-pointer">حفظ الميثاق</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Executive Director Edit Modal */}
      {isExecDirectorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 text-start">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#095B42] flex items-center justify-center font-bold">
                  <UserCog className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-lg text-gray-900">
                    تعديل بيانات المدير التنفيذي
                  </h3>
                  <p className="text-xs text-gray-500">
                    تحديث بيانات وصفة المدير التنفيذي لتعاونية الشامل
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsExecDirectorModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveExecDirector} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">اسم المدير التنفيذي</label>
                <input
                  type="text"
                  required
                  value={execDirectorForm.nameAr}
                  onChange={(e) => setExecDirectorForm({ ...execDirectorForm, nameAr: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xlfocus:border-[#095B42] focus:ring-2 focus:ring-[#095B42]/10 outline-hidden transition-all"
                  placeholder="أ. محمد ذواب مفرح الحربي"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">المسمى الوظيفي / الصفة</label>
                <input
                  type="text"
                  required
                  value={execDirectorForm.roleAr}
                  onChange={(e) => setExecDirectorForm({ ...execDirectorForm, roleAr: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xlfocus:border-[#095B42] focus:ring-2 focus:ring-[#095B42]/10 outline-hidden transition-all"
                  placeholder="المدير التنفيذي"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">رقم الجوال / الواتساب</label>
                  <input
                    type="text"
                    value={execDirectorForm.phone}
                    onChange={(e) => setExecDirectorForm({ ...execDirectorForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xlfocus:border-[#095B42] focus:ring-2 focus:ring-[#095B42]/10 outline-hidden transition-all dir-ltr"
                    placeholder="+966531389196"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">البريد الإلكتروني</label>
                  <input
                    type="email"
                    value={execDirectorForm.email}
                    onChange={(e) => setExecDirectorForm({ ...execDirectorForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xlfocus:border-[#095B42] focus:ring-2 focus:ring-[#095B42]/10 outline-hidden transition-all dir-ltr"
                    placeholder="mohamad89196@gmail.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">الصورة الشخصية للمدير التنفيذي (اختياري)</label>
                <div className="flex items-center gap-3">
                  {execDirectorForm.image && (
                    <img src={execDirectorForm.image} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-emerald-300 shadow-2xs shrink-0" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          setExecDirectorForm({ ...execDirectorForm, image: event.target?.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-gray-500 file:me-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-50 file:text-[#095B42] hover:file:bg-emerald-100 cursor-pointer"
                  />
                  {execDirectorForm.image && (
                    <button
                      type="button"
                      onClick={() => setExecDirectorForm({ ...execDirectorForm, image: '' })}
                      className="px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold shrink-0 hover:bg-red-100 transition-colors"
                    >
                      حذف
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">الوصف والمهام الرئيسية</label>
                <textarea
                  rows={3}
                  value={execDirectorForm.descriptionAr}
                  onChange={(e) => setExecDirectorForm({ ...execDirectorForm, descriptionAr: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xlfocus:border-[#095B42] focus:ring-2 focus:ring-[#095B42]/10 outline-hidden transition-all leading-relaxed"
                  placeholder="يتولى إدارة وتسيير الأعمال التنفيذية اليومية لجمعية الشامل ومتابعة الأهداف التشغيلية والمبادرات التنموية."
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsExecDirectorModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-all cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#095B42] hover:brightness-110 text-white font-bold shadow-md transition-all cursor-pointer"
                >
                  حفظ التغييرات
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ------------------- MODAL COMPONENTS & PDF UPLOAD ------------------- */

interface PdfUploadFieldProps {
  fileUrl?: string;
  fileName?: string;
  fileSize?: string;
  onFileSelected: (url: string, fileName: string, fileSize: string) => void;
  onFileRemoved: () => void;
  label?: string;
}

const PdfUploadField: React.FC<PdfUploadFieldProps> = ({
  fileUrl,
  fileName,
  fileSize,
  onFileSelected,
  onFileRemoved,
  label = 'ملف المستند المعتمد (PDF File Upload)'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.name.toLowerCase().endsWith('.pdf') && file.type !== 'application/pdf') {
      alert('الرجاء اختيار ملف بصيغة PDF فقط (.pdf)');
      return;
    }

    const sizeInMb = (file.size / (1024 * 1024)).toFixed(1);
    const sizeStr = `${sizeInMb} MB`;
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64Url = e.target?.result as string;
      onFileSelected(base64Url, file.name, sizeStr);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  return (
    <div className="space-y-2 text-xs text-start">
      <div className="flex items-center justify-between">
        <label className="block font-bold text-gray-800 text-xs">{label}</label>
        <span className="text-[11px] text-[#0B6B4F] font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
          صيغة PDF فقط (.pdf)
        </span>
      </div>

      {fileUrl ? (
        <div className="p-4 bg-emerald-50/90 border-2 border-emerald-400/80 rounded-2xl flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-[#0B6B4F] text-white flex items-center justify-center shrink-0 shadow-xs">
              <FileText className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <span className="font-bold text-gray-900 block truncate text-xs sm:text-sm">
                {fileName || 'ملف_المستند_المعتمد.pdf'}
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[11px] text-emerald-800 font-bold font-mono">
                  {fileSize || 'جاهز للعرض'}
                </span>
                <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                  ✓ تم تجهيز ملف الـ PDF بنجاح
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-gray-800text-xs font-bold cursor-pointer transition-colors shadow-2xs"
            >
              استبدال
            </button>
            <button
              type="button"
              onClick={onFileRemoved}
              className="p-2 rounded-xl hover:bg-red-100 text-red-600 cursor-pointer transition-colors"
              title="حذف الملف"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 ${isDragging
            ? 'border-[#0B6B4F] bg-emerald-50 ring-4 ring-emerald-100 scale-[1.01]'
            : 'border-gray-300 hover:border-[#0B6B4F] bg-gradient-to-b from-gray-50/80 to-white hover:bg-emerald-50/20'
            }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-[#0B6B4F] flex items-center justify-center shadow-xs">
              <FolderOpen className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-gray-900 text-sm">
                انقر لاختيار ملف الـ PDF أو اسحبه إلى هنا
              </p>
              <p className="text-xs text-gray-500 mt-1">
                سيتم حفظ ملف الـ PDF وعرضه مباشرة بنفس تصميم المستند المعتمد
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,application/pdf"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

/* 1. POLICY MODAL */
interface PolicyModalProps {
  policy: PolicyItem | null;
  onClose: () => void;
  onSave: (policy: PolicyItem) => void;
  locale: string;
}

const PolicyModal: React.FC<PolicyModalProps> = ({ policy, onClose, onSave, locale }) => {
  const [formData, setFormData] = useState<PolicyItem>(
    policy || {
      id: `pol-${Date.now()}`,
      category: 'general',
      titleAr: '',
      titleEn: '',
      code: 'POL-SHM-07',
      version: 'الإصدار 1.0 (معتمد)',
      approvedDate: '2024/08/30م',
      approvedByAr: 'مجلس إدارة جمعية الشامل التعاونية',
      approvedByEn: 'Board of Directors',
      descAr: '',
      descEn: '',
      fileSize: '1.2 MB'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr) {
      alert(locale === 'ar' ? 'الرجاء إدخال عنوان السياسة' : 'Please enter policy title');
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-[#0B6B4F]" />
            <span>{policy ? 'تعديل السياسة المؤسسية' : 'إضافة سياسة مؤسسية جديدة'}</span>
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">رمز السياسة</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full p-2.5 bg-gray-50rounded-xl font-mono text-xs focus:ring-2 focus:ring-[#0B6B4F]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">التصنيف / المجموعة</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'general' | 'aml' })}
                className="w-full p-2.5 bg-gray-50rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#0B6B4F]"
              >
                <option value="general">سياسة حوكمة عامة</option>
                <option value="aml">مكافحة غسل الأموال والجرائم المالية</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">المعرف (Slug / ID)</label>
              <input
                type="text"
                required
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full p-2.5 bg-gray-50rounded-xl font-mono text-xs focus:ring-2 focus:ring-[#0B6B4F]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">اسم وعنوان السياسة بالعربية</label>
            <input
              type="text"
              required
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              placeholder="مثال: سياسة الأمن السيبراني والذكاء الاصطناعي"
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0B6B4F]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">الاسم بالإنجليزية (English Name)</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              placeholder="e.g. Cybersecurity & AI Policy"
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0B6B4F]"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">الوصف بالعربية</label>
            <textarea
              rows={3}
              value={formData.descAr}
              onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
              placeholder="شرح موجز لأهداف السياسة وضوابط تطبيقها..."
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs font-medium focus:ring-2 focus:ring-[#0B6B4F]"
            />
          </div>

          {/* PDF File Upload */}
          <PdfUploadField
            fileUrl={formData.fileUrl}
            fileName={formData.fileName}
            fileSize={formData.fileSize}
            onFileSelected={(url, name, size) => {
              setFormData({
                ...formData,
                fileUrl: url,
                fileName: name,
                fileSize: size
              });
            }}
            onFileRemoved={() => {
              setFormData({
                ...formData,
                fileUrl: undefined,
                fileName: undefined
              });
            }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">الإصدار والاعتماد</label>
              <input
                type="text"
                value={formData.version}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">تاريخ الاعتماد</label>
              <input
                type="text"
                value={formData.approvedDate}
                onChange={(e) => setFormData({ ...formData, approvedDate: e.target.value })}
                className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#0B6B4F] hover:bg-[#08523C] text-white font-bold transition-colors cursor-pointer"
            >
              حفظ السياسة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 2. REGULATION MODAL */
interface RegulationModalProps {
  regulation: RegulationItem | null;
  onClose: () => void;
  onSave: (reg: RegulationItem) => void;
  locale: string;
}

const RegulationModal: React.FC<RegulationModalProps> = ({ regulation, onClose, onSave, locale }) => {
  const [formData, setFormData] = useState<RegulationItem>(
    regulation || {
      id: `reg-${Date.now()}`,
      sec: 'foundation',
      titleAr: '',
      titleEn: '',
      type: 'لائحة معتمدة',
      num: 'REG-008',
      descAr: '',
      descEn: '',
      fileSize: '2.0 MB'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#0B6B4F]" />
            <span>{regulation ? 'تعديل اللائحة / الملف' : 'إضافة لائحة / ملف مالي جديد'}</span>
          </h3>
          <button type="button" onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">الرقم المرجعي</label>
              <input
                type="text"
                required
                value={formData.num}
                onChange={(e) => setFormData({ ...formData, num: e.target.value })}
                className="w-full p-2.5 bg-gray-50rounded-xl font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">المجموعة الفرعية</label>
              <select
                value={formData.sec}
                onChange={(e) => setFormData({ ...formData, sec: e.target.value as any })}
                className="w-full p-2.5 bg-gray-50rounded-xl text-xs font-semibold"
              >
                <option value="foundation">اللوائح التأسيسية والشهادات</option>
                <option value="financial">الملفات واللوائح المالية (مكافآت، صرف، مشتريات، استثمار)</option>
                <option value="laws">الأنظمة الوطنية ولوائح العمل</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">اسم اللائحة بالعربية</label>
            <input
              type="text"
              required
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">الاسم بالإنجليزية</label>
            <input
              type="text"
              value={formData.titleEn}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
              dir="ltr"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">الوصف بالعربية</label>
            <textarea
              rows={3}
              value={formData.descAr}
              onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
            />
          </div>

          {/* PDF File Upload */}
          <PdfUploadField
            fileUrl={formData.fileUrl}
            fileName={formData.fileName}
            fileSize={formData.fileSize}
            onFileSelected={(url, name, size) => {
              setFormData({
                ...formData,
                fileUrl: url,
                fileName: name,
                fileSize: size
              });
            }}
            onFileRemoved={() => {
              setFormData({
                ...formData,
                fileUrl: undefined,
                fileName: undefined
              });
            }}
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold cursor-pointer">
              إلغاء
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-[#0B6B4F] text-white font-bold cursor-pointer">
              حفظ اللائحة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 3. FINANCIAL MODAL */
interface FinancialModalProps {
  item: FinancialItem | null;
  onClose: () => void;
  onSave: (fin: FinancialItem) => void;
  locale: string;
}

const FinancialModal: React.FC<FinancialModalProps> = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState<FinancialItem>(
    item || {
      id: `fin-${Date.now()}`,
      year: '2024',
      titleAr: 'القوائم المالية المدققة للعام المالي 2024م',
      titleEn: 'Audited Financial Statements FY 2024',
      status: 'معتمد',
      auditFirmAr: 'مكتب المحاسب القانوني المعتمد',
      auditFirmEn: 'Certified Public Accountants',
      fileSize: '4.5 MB',
      revenue: '5,200,000 ر.س',
      expenses: '3,900,000 ر.س',
      netSurplus: '1,300,000 ر.س'
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span>{item ? 'تعديل السنة المالية' : 'إضافة سنة مالية وقوائم مدققة'}</span>
          </h3>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">السنة المالية</label>
              <input
                type="text"
                required
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-2.5 bg-gray-50rounded-xl font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">مراجع الحسابات المستقل</label>
              <input
                type="text"
                value={formData.auditFirmAr}
                onChange={(e) => setFormData({ ...formData, auditFirmAr: e.target.value })}
                className="w-full p-2.5 bg-gray-50rounded-xl"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">اسم المستند والقوائم بالعربية</label>
            <input
              type="text"
              required
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block font-bold text-gray-700 mb-1">الإيرادات</label>
              <input
                type="text"
                value={formData.revenue}
                onChange={(e) => setFormData({ ...formData, revenue: e.target.value })}
                className="w-full p-2 bg-gray-50rounded-xl font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">المصروفات</label>
              <input
                type="text"
                value={formData.expenses}
                onChange={(e) => setFormData({ ...formData, expenses: e.target.value })}
                className="w-full p-2 bg-gray-50rounded-xl font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">صافي الفائض</label>
              <input
                type="text"
                value={formData.netSurplus}
                onChange={(e) => setFormData({ ...formData, netSurplus: e.target.value })}
                className="w-full p-2 bg-gray-50rounded-xl font-mono text-xs text-emerald-600 font-bold"
              />
            </div>
          </div>

          {/* PDF File Upload */}
          <PdfUploadField
            fileUrl={formData.downloadUrl}
            fileName={formData.titleAr ? `${formData.year}-Financials.pdf` : undefined}
            fileSize={formData.fileSize}
            label="ملف تقرير القوائم المالية المدققة (PDF)"
            onFileSelected={(url, _name, size) => {
              setFormData({
                ...formData,
                downloadUrl: url,
                fileSize: size
              });
            }}
            onFileRemoved={() => {
              setFormData({
                ...formData,
                downloadUrl: undefined
              });
            }}
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold cursor-pointer">
              إلغاء
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-[#0B6B4F] text-white font-bold cursor-pointer">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ARABIC_MONTHS = [
  { ar: 'يناير', en: 'January' },
  { ar: 'فبراير', en: 'February' },
  { ar: 'مارس', en: 'March' },
  { ar: 'أبريل', en: 'April' },
  { ar: 'مايو', en: 'May' },
  { ar: 'يونيو', en: 'June' },
  { ar: 'يوليو', en: 'July' },
  { ar: 'أغسطس', en: 'August' },
  { ar: 'سبتمبر', en: 'September' },
  { ar: 'أكتوبر', en: 'October' },
  { ar: 'نوفمبر', en: 'November' },
  { ar: 'ديسمبر', en: 'December' },
];

const SELECTABLE_YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018'];

/* 4. WORKSHOP MODAL */
interface WorkshopModalProps {
  workshop: WorkshopItem | null;
  onClose: () => void;
  onSave: (w: WorkshopItem) => void;
  locale: string;
}

const WorkshopModal: React.FC<WorkshopModalProps> = ({ workshop, onClose, onSave }) => {
  const [formData, setFormData] = useState<WorkshopItem>(
    workshop || {
      id: `ws-${Date.now()}`,
      type: 'internal',
      titleAr: '',
      titleEn: '',
      dateAr: 'مارس 2024م',
      dateEn: 'March 2024',
      locationAr: 'المقر الرئيسي',
      locationEn: 'Headquarters',
      attendeesCount: 30,
      hoursCount: 4,
      targetAudienceAr: 'أعضاء الجمعية ومنسوبوها',
      targetAudienceEn: 'Cooperative Members & Staff',
      trainerAr: 'مستشار الحوكمة والامتثال',
      trainerEn: 'Governance Consultant',
      descAr: '',
      descEn: '',
      objectivesAr: ['التعريف بمعايير الحوكمة والامتثال التعاوني'],
      objectivesEn: ['Introduce cooperative governance standards']
    }
  );

  const initialMonth = ARABIC_MONTHS.find((m) => formData.dateAr?.includes(m.ar))?.ar || 'مارس';
  const initialYear = SELECTABLE_YEARS.find((y) => formData.dateAr?.includes(y)) || '2024';
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const handleMonthYearChange = (month: string, year: string) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    const monthObj = ARABIC_MONTHS.find((m) => m.ar === month);
    setFormData((prev) => ({
      ...prev,
      dateAr: `${month} ${year}م`,
      dateEn: `${monthObj?.en || month} ${year}`
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span>{workshop ? 'تعديل ورشة تدريبية' : 'إضافة ورشة تدريبية جديدة'}</span>
          </h3>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">نوع الورشة / المجموعة</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as 'internal' | 'community' })}
              className="w-full p-2.5 bg-gray-50rounded-xl font-semibold text-xs"
            >
              <option value="internal">ورشة مقامة داخلية (للمجلس والمنسوبين)</option>
              <option value="community">ورشة مقامة بالشراكات المجتمعية</option>
            </select>
          </div>

          {/* Month & Year Selectors */}
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">تاريخ الانعقاد (الشهر والسنة)</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <select
                  value={selectedMonth}
                  onChange={(e) => handleMonthYearChange(e.target.value, selectedYear)}
                  className="w-full p-2.5 bg-gray-50rounded-xl font-bold text-xs"
                >
                  {ARABIC_MONTHS.map((m) => (
                    <option key={m.ar} value={m.ar}>
                      {m.ar} ({m.en})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedYear}
                  onChange={(e) => handleMonthYearChange(selectedMonth, e.target.value)}
                  className="w-full p-2.5 bg-gray-50rounded-xl font-mono font-bold text-xs"
                >
                  {SELECTABLE_YEARS.map((y) => (
                    <option key={y} value={y}>
                      عام {y}م
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">اسم وعنوان الورشة بالعربية</label>
            <input
              type="text"
              required
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">الوصف التفصيلي</label>
            <textarea
              rows={3}
              value={formData.descAr}
              onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
            />
          </div>

          {/* PDF File Upload */}
          <PdfUploadField
            fileUrl={formData.fileUrl}
            fileName={formData.fileSize ? `${formData.id}-Workshop.pdf` : undefined}
            fileSize={formData.fileSize}
            label="ملف كشف الحضور والتقرير المعتمد (PDF)"
            onFileSelected={(url, _name, size) => {
              setFormData({
                ...formData,
                fileUrl: url,
                fileSize: size
              });
            }}
            onFileRemoved={() => {
              setFormData({
                ...formData,
                fileUrl: undefined
              });
            }}
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold cursor-pointer">
              إلغاء
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-[#0B6B4F] text-white font-bold cursor-pointer">
              حفظ الورشة
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 5. MEETING MODAL */
interface MeetingModalProps {
  meeting: MeetingItem | null;
  onClose: () => void;
  onSave: (m: MeetingItem) => void;
  locale: string;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ meeting, onClose, onSave }) => {
  const [formData, setFormData] = useState<MeetingItem>(
    meeting || {
      id: `meet-${Date.now()}`,
      type: 'general_assembly',
      titleAr: '',
      titleEn: '',
      meetingNumber: 'GA-2024/02',
      dateAr: 'أغسطس 2024م',
      dateEn: 'August 2024',
      locationAr: 'المقر الرئيسي للجمعية',
      locationEn: 'Main HQ',
      attendeesCount: 40,
      decisionsCount: 5,
      descAr: '',
      descEn: '',
      fileSize: '2.5 MB'
    }
  );

  const initialMonth = ARABIC_MONTHS.find((m) => formData.dateAr?.includes(m.ar))?.ar || 'أغسطس';
  const initialYear = SELECTABLE_YEARS.find((y) => formData.dateAr?.includes(y)) || '2024';
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedYear, setSelectedYear] = useState(initialYear);

  const handleMonthYearChange = (month: string, year: string) => {
    setSelectedMonth(month);
    setSelectedYear(year);
    const monthObj = ARABIC_MONTHS.find((m) => m.ar === month);
    setFormData((prev) => ({
      ...prev,
      dateAr: `${month} ${year}م`,
      dateEn: `${monthObj?.en || month} ${year}`
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#0B6B4F]" />
            <span>{meeting ? 'تعديل محضر الاجتماع' : 'إضافة محضر اجتماع رسمي'}</span>
          </h3>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">نوع الاجتماع / المحضر</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'general_assembly' | 'board' })}
                className="w-full p-2.5 bg-gray-50rounded-xl font-semibold text-xs"
              >
                <option value="general_assembly">محضر اجتماع الجمعية العمومية</option>
                <option value="board">محضر اجتماع مجلس الإدارة</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">رقم المحضر / الاجتماع</label>
              <input
                type="text"
                required
                value={formData.meetingNumber}
                onChange={(e) => setFormData({ ...formData, meetingNumber: e.target.value })}
                className="w-full p-2.5 bg-gray-50rounded-xl font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">اسم وعنوان المحضر بالعربية</label>
            <input
              type="text"
              required
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
            />
          </div>

          {/* Month & Year Selectors for Meetings */}
          <div className="space-y-1">
            <label className="block font-bold text-gray-700">تاريخ الانعقاد (الشهر والسنة)</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <select
                  value={selectedMonth}
                  onChange={(e) => handleMonthYearChange(e.target.value, selectedYear)}
                  className="w-full p-2.5 bg-gray-50rounded-xl font-bold text-xs"
                >
                  {ARABIC_MONTHS.map((m) => (
                    <option key={m.ar} value={m.ar}>
                      {m.ar} ({m.en})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={selectedYear}
                  onChange={(e) => handleMonthYearChange(selectedMonth, e.target.value)}
                  className="w-full p-2.5 bg-gray-50rounded-xl font-mono font-bold text-xs"
                >
                  {SELECTABLE_YEARS.map((y) => (
                    <option key={y} value={y}>
                      عام {y}م
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">الملخص والقرارات الصادرة</label>
            <textarea
              rows={3}
              value={formData.descAr}
              onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl text-xs"
            />
          </div>

          {/* PDF File Upload */}
          <PdfUploadField
            fileUrl={formData.fileUrl}
            fileName={formData.meetingNumber ? `${formData.meetingNumber}-Minutes.pdf` : undefined}
            fileSize={formData.fileSize}
            label="ملف محضر الاجتماع الموقع والمختوم (PDF)"
            onFileSelected={(url, _name, size) => {
              setFormData({
                ...formData,
                fileUrl: url,
                fileSize: size
              });
            }}
            onFileRemoved={() => {
              setFormData({
                ...formData,
                fileUrl: undefined
              });
            }}
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold cursor-pointer">
              إلغاء
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-[#0B6B4F] text-white font-bold cursor-pointer">
              حفظ المحضر
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* 6. ETHICS MODAL */
interface EthicsModalProps {
  item: EthicsItem | null;
  onClose: () => void;
  onSave: (eth: EthicsItem) => void;
  locale: string;
}

const EthicsModal: React.FC<EthicsModalProps> = ({ item, onClose, onSave }) => {
  const [formData, setFormData] = useState<EthicsItem>(
    item || {
      id: `eth-${Date.now()}`,
      num: 5,
      titleAr: '',
      titleEn: '',
      descAr: '',
      descEn: ''
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.titleAr) return;
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#C9A45C]" />
            <span>{item ? 'تعديل وثيقة الميثاق الأخلاقي' : 'إضافة وثيقة ميثاق أخلاقي جديدة (PDF)'}</span>
          </h3>
          <button type="button" onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">اسم وعنوان الوثيقة بالعربية</label>
            <input
              type="text"
              required
              placeholder="مثال: وثيقة الميثاق الأخلاقي وقواعد السلوك المهني والمؤسسي"
              value={formData.titleAr}
              onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Document Title (English)</label>
            <input
              type="text"
              placeholder="e.g. Ethical Charter & Institutional Code of Conduct"
              value={formData.titleEn || ''}
              onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">الوصف والبيان بالعربية</label>
            <textarea
              rows={3}
              placeholder="المبادئ الأخلاقية والقواعد السلوكية الحاكمة لجميع معاملات الجمعية مع الشركاء والمستفيدين والجهات الرقابية..."
              value={formData.descAr}
              onChange={(e) => setFormData({ ...formData, descAr: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Description (English)</label>
            <textarea
              rows={2}
              placeholder="Brief description of the ethical charter principles and code of conduct..."
              value={formData.descEn || ''}
              onChange={(e) => setFormData({ ...formData, descEn: e.target.value })}
              className="w-full p-2.5 bg-gray-50rounded-xl"
            />
          </div>

          {/* PDF File Upload */}
          <PdfUploadField
            fileUrl={formData.fileUrl}
            fileName={formData.fileName}
            fileSize={formData.fileSize}
            label="ملف وثيقة الميثاق الأخلاقي (PDF)"
            onFileSelected={(url, name, size) => {
              setFormData({
                ...formData,
                fileUrl: url,
                fileName: name,
                fileSize: size
              });
            }}
            onFileRemoved={() => {
              setFormData({
                ...formData,
                fileUrl: undefined,
                fileName: undefined
              });
            }}
          />

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-bold cursor-pointer">
              إلغاء
            </button>
            <button type="submit" className="px-5 py-2 rounded-xl bg-[#0B6B4F] text-white font-bold cursor-pointer">
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ------------------- SUBMISSION DETAIL / RESPONSE MODAL ------------------- */
interface SubmissionDetailModalProps {
  submission: SubmissionItem;
  onClose: () => void;
  onUpdateStatus: (id: string, status: SubmissionItem['status']) => void;
  onDelete: (id: string) => void;
  onConfirmMembership?: (submission: SubmissionItem) => void;
  isConfirmedMember?: boolean;
  locale: string;
}

const SubmissionDetailModal: React.FC<SubmissionDetailModalProps> = ({
  submission,
  onClose,
  onUpdateStatus,
  onDelete,
  onConfirmMembership,
  isConfirmedMember,
  locale
}) => {
  const [copied, setCopied] = useState(false);

  const rawPhone = submission.senderContact.match(/(05\d{8})/)?.[1] || '0504284861';
  const cleanPhone = rawPhone.startsWith('0') ? `966${rawPhone.slice(1)}` : rawPhone;

  const whatsappMessage = encodeURIComponent(
    `السلام عليكم ورحمة الله وبركاته،\n` +
    `أهلاً بك أ. ${submission.senderName}\n` +
    `بخصوص طلبك/استجابتك المسجلة لدى تعاونية الشامل:\n` +
    `"${submission.title}"\n` +
    `نود إفادتك بأن حالة الطلب الحالية هي: [${submission.status === 'pending'
      ? 'قيد المعالجة'
      : submission.status === 'in_progress'
        ? 'جار العمل والمتابعة'
        : submission.status === 'reviewed'
          ? 'تمت المراجعة'
          : 'تمت المعالجة والإغلاق'
    }]\n` +
    `لأي استفسارات إضافية يسعدنا تواصلك معنا.`
  );

  const handlePrint = () => {
    window.print();
  };

  const copyDetails = () => {
    const text = `استمارة رد رسمية - تعاونية الشامل\nالعنوان: ${submission.title}\nالمرسل: ${submission.senderName}\nالتواصل: ${submission.senderContact}\nالتاريخ: ${submission.createdAt}\nالتفاصيل:\n${submission.details}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const detailLines = submission.details.split('\n').filter((l) => l.trim().length > 0);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Certificate Header Clean Redesign */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-whitep-1 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
              <img src="/logo.png" alt="الجمعية" className="h-8 w-auto object-contain" />
            </div>
            <div className="min-w-0 space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#0B6B4F] uppercase tracking-wider">
                  استمارة طلب ومساهمة رسمية
                </span>
                <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md font-mono">
                  الجمعية التعاونية
                </span>
              </div>
              <h3 className="font-black text-base sm:text-lg text-gray-900 leading-snug break-words">
                {submission.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sender Info & Status Header Ribbon */}
        <div className="bg-[#FAF9F5] p-4 sm:p-5 rounded-2xl grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[11px] font-bold text-gray-400 block mb-0.5">اسم صاحب الطلب / المرسل:</span>
            <div className="font-black text-sm text-gray-900">{submission.senderName}</div>
            <div className="text-gray-500 font-mono text-[11px] mt-0.5">{submission.senderContact}</div>
          </div>

          <div>
            <span className="text-[11px] font-bold text-gray-400 block mb-0.5">تاريخ التسجيل وحالة الطلب:</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-gray-600 text-[11px] bg-white px-2 py-1 rounded-lg border border-gray-200">
                {submission.createdAt}
              </span>
              <select
                value={submission.status}
                onChange={(e) => onUpdateStatus(submission.id, e.target.value as SubmissionItem['status'])}
                className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#0B6B4F] cursor-pointer"
              >
                <option value="pending">جديد (قيد الانتظار)</option>
                <option value="in_progress">قيد المعالجة والمتابعة</option>
                <option value="reviewed">تمت المراجعة</option>
                <option value="resolved">تمت المعالجة والإغلاق</option>
              </select>
            </div>
          </div>
        </div>


        {/* Membership Confirmation & Add to Members Roster */}
        {submission.module === 'membership' && onConfirmMembership && (
          <div className="bg-[#F4FAF7] p-4 sm:p-5 rounded-2xl border border-[#0B6B4F]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#0B6B4F]/10 flex items-center justify-center text-[#0B6B4F]">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-sm text-[#0B6B4F]">
                  اعتماد الطلب وترقية المتقدم إلى عضو جمعية عمومية
                </h5>
              </div>
              <p className="text-xs text-[#2E473F] leading-relaxed pe-2">
                {isConfirmedMember
                  ? 'تم اعتماد هذا المتقدم وإدراجه رسمياً في سجل أعضاء الجمعية العمومية.'
                  : 'بالنقر على اعتماد، ستتم إضافة المتقدم فورياً إلى سجل الأعضاء الرسمي مع حفظ عدد أسهمه.'}
              </p>
            </div>

            <button
              type="button"
              disabled={isConfirmedMember}
              onClick={() => onConfirmMembership(submission)}
              className={`shrink-0 px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${isConfirmedMember
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                : 'bg-gradient-to-r from-[#095B42] to-[#064230] text-white hover:brightness-110 shadow-xs cursor-pointer'
                }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>{isConfirmedMember ? 'معتمد في السجل ✓' : 'اعتماد وإضافة إلى سجل الأعضاء'}</span>
            </button>
          </div>
        )}

        {/* Formatted Response Body Cards */}
        <div className="space-y-3">
          <h4 className="font-bold text-xs text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#095B42]" />
            <span>تفاصيل البيانات والرد المتلقى:</span>
          </h4>

          <div className="bg-[#F7F8F6] p-4 sm:p-5 rounded-2xl   space-y-2.5 text-xs text-gray-800 leading-relaxed">
            {detailLines.map((line, idx) => {
              const hasColon = line.includes(':');

              if (hasColon) {
                const parts = line.replace(/^[•-]\s*/, '').split(':');
                const label = parts[0].trim();
                const value = parts.slice(1).join(':').trim();

                return (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline justify-between p-2.5 bg-white rounded-xl border border-gray-200/60 gap-1">
                    <span className="font-bold text-[#12332B]">{label}:</span>
                    <span className="font-semibold text-gray-700">{value}</span>
                  </div>
                );
              }

              return (
                <div key={idx} className="p-2.5 bg-white rounded-xl border border-gray-200/60 font-medium">
                  {line}
                </div>
              );
            })}
          </div>
        </div>

        {/* Direct WhatsApp Response Banner */}
        <div className="bg-gradient-to-br from-[#EBF4F0] to-[#E2EFE9] p-4 rounded-2xl border border-[#095B42]/20 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <h5 className="font-bold text-xs text-[#095B42] flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-[#25D366]" />
              <span>إرسال رد رسمي عبر الواتساب للمستفيد</span>
            </h5>
            <p className="text-[11px] text-gray-600 mt-0.5">
              تواصل مباشرة مع صاحب الطلب عبر الواتساب وإفادته بتحديث حالة الطلب
            </p>
          </div>

          <a
            href={`https://wa.me/${cleanPhone}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#128C4A] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-2xs transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>إرسال الرد عبر الواتساب</span>
          </a>
        </div>

        {/* Actions Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50text-xs font-bold text-gray-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#095B42]" />
              <span>طباعة الرد</span>
            </button>

            <button
              type="button"
              onClick={copyDetails}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-50text-xs font-bold text-gray-700 transition-colors cursor-pointer"
            >
              <Copy className="w-4 h-4 text-[#C9A45C]" />
              <span>{copied ? 'تم النسخ' : 'نسخ النص'}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('حذف هذا الطلب والرد نهائياً؟')) {
                  onDelete(submission.id);
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs cursor-pointer transition-colors"
            >
              حذف الطلب
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-gray-900 hover:bg-gray-800 text-white font-bold text-xs cursor-pointer transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ------------------- CONTACT & WEBSITE CHANNELS MODULE ------------------- */
interface ContactSettingsModuleProps {
  contactSettings: SiteContactSettings;
  updateContactSettings: (settings: Partial<SiteContactSettings>) => void;
  showNotification: (msg: string) => void;
  locale: string;
}

const ContactSettingsModule: React.FC<ContactSettingsModuleProps> = ({
  contactSettings,
  updateContactSettings,
  showNotification,
  locale
}) => {
  const toast = useToast();
  const [form, setForm] = useState<SiteContactSettings>(contactSettings);

  useEffect(() => {
    setForm(contactSettings);
  }, [contactSettings]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateContactSettings(form);
    toast.success(
      locale === 'ar' ? 'تم حفظ إعدادات التواصل' : 'Contact Settings Saved',
      locale === 'ar' ? 'تم حفظ كافة بيانات التواصل والعناوين في السيرفر وتحديث الهيدر والفوتر والصفحات فورياً' : 'All contact information and addresses updated to server successfully'
    );
  };

  const handleReset = () => {
    if (window.confirm(locale === 'ar' ? 'هل تريد استعادة بيانات التواصل الافتراضية؟' : 'Reset contact details to defaults?')) {
      setForm(initialSiteContactSettings);
      updateContactSettings(initialSiteContactSettings);
      showNotification(locale === 'ar' ? 'تمت إعادة بيانات التواصل للافتراضي.' : 'Reset contact details to default.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200 text-start">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6   shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#EBF5F0] border border-[#0B6B4F]/20 flex items-center justify-center text-[#0B6B4F] shadow-xs">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900">
              إدارة قنوات التواصل وبيانات الموقع
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              تحديث بيانات التواصل، الهواتف، البريد، ساعات العمل، خريطة جوجل، وحسابات التواصل وشعار الموقع
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
          >
            إعادة ضبط
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 text-white font-bold text-xs shadow-xs cursor-pointer transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>حفظ بيانات التواصل</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Main Contact Info */}
        <div className="bg-white rounded-3xl p-6   shadow-2xs space-y-5">
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Building className="w-5 h-5 text-[#0B6B4F]" />
            <span>بيانات الاتصال والمقر الرئيسي</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                تسمية المقر الرئيسي (بالعربية) *
              </label>
              <input
                type="text"
                required
                value={form.hqTitleAr || ''}
                onChange={(e) => setForm({ ...form, hqTitleAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                العنوان والمقر الكامل *
              </label>
              <input
                type="text"
                required
                value={form.addressAr || ''}
                onChange={(e) => setForm({ ...form, addressAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                المحافظة والمنطقة (الخريطة) *
              </label>
              <input
                type="text"
                required
                value={form.regionAr || ''}
                onChange={(e) => setForm({ ...form, regionAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                رقم الهاتف المباشر (Phone) *
              </label>
              <input
                type="text"
                required
                value={form.phone || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const shouldSync = !form.whatsappPhone || form.whatsappPhone === form.phone;
                  setForm({
                    ...form,
                    phone: val,
                    whatsappPhone: shouldSync ? val : form.whatsappPhone
                  });
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                رقم الواتساب الرسمي (WhatsApp) *
              </label>
              <input
                type="text"
                required
                value={form.whatsappPhone || ''}
                onChange={(e) => setForm({ ...form, whatsappPhone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                البريد الإلكتروني الرسمي (Email) *
              </label>
              <input
                type="email"
                required
                value={form.email || ''}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                ساعات العمل الرسمية *
              </label>
              <input
                type="text"
                required
                value={form.workingHoursAr || ''}
                onChange={(e) => setForm({ ...form, workingHoursAr: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 1.5: Footer Dynamic Text */}
        <div className="bg-white rounded-3xl p-6   shadow-2xs space-y-5">
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Layout className="w-5 h-5 text-[#0B6B4F]" />
            <span>نصوص وعناوين ذيل الصفحة (Footer Dynamic Content)</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                عنوان الدعوة الرئيسية في الفوتر (Footer Callout Title)
              </label>
              <input
                type="text"
                value={form.footerCalloutTitleAr || ''}
                onChange={(e) => setForm({ ...form, footerCalloutTitleAr: e.target.value })}
                placeholder="نبني أثراً يستمر"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                وصف الدعوة في الفوتر (Footer Callout Subtitle)
              </label>
              <textarea
                rows={2}
                value={form.footerCalloutSubAr || ''}
                onChange={(e) => setForm({ ...form, footerCalloutSubAr: e.target.value })}
                placeholder="جمعية تعاونية مرخصة تهدف إلى تعزيز الاستدامة وتنمية المجتمع والاقتصاد المحلي بجدة."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                الفقرة التعريفية أسفل الشعار في الفوتر (Footer About Paragraph)
              </label>
              <textarea
                rows={2}
                value={form.footerAboutTextAr || ''}
                onChange={(e) => setForm({ ...form, footerAboutTextAr: e.target.value })}
                placeholder="تعاونية الشامل متعددة الأغراض - صرح تعاوني واستثماري رائد بجدة، يخضع لإشراف المركز الوطني لتنمية القطاع غير الربحي."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Social Links & Google Maps Link */}
        <div className="bg-white rounded-3xl p-6   shadow-2xs space-y-5">
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <Globe className="w-5 h-5 text-[#0B6B4F]" />
            <span>حسابات المنصات الاجتماعية ورابط الخريطة</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                معرف الانستغرام (Instagram Handle)
              </label>
              <input
                type="text"
                value={form.instagramHandle || ''}
                onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                رابط حساب الانستغرام (Instagram URL)
              </label>
              <input
                type="url"
                value={form.instagramUrl || ''}
                onChange={(e) => setForm({ ...form, instagramUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                معرف إكس/تويتر (Twitter/X Handle)
              </label>
              <input
                type="text"
                value={form.twitterHandle || ''}
                onChange={(e) => setForm({ ...form, twitterHandle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                رابط حساب إكس/تويتر (Twitter/X URL)
              </label>
              <input
                type="url"
                value={form.twitterUrl || ''}
                onChange={(e) => setForm({ ...form, twitterUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 mb-1">
                رابط موقع الجمعية على خرائط Google Maps
              </label>
              <input
                type="url"
                value={form.mapsUrl || ''}
                onChange={(e) => setForm({ ...form, mapsUrl: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Logos (Light & Dark) */}
        <div className="bg-white rounded-3xl p-6   shadow-2xs space-y-5">
          <h3 className="text-base font-black text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-3">
            <ImageIcon className="w-5 h-5 text-[#0B6B4F]" />
            <span>شعارات الجمعية للموقع (Light & Dark Logos)</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700">
                رابط الشعار الفاتح (Light Logo)
              </label>
              <input
                type="text"
                value={form.logoLightUrl || ''}
                onChange={(e) => setForm({ ...form, logoLightUrl: e.target.value })}
                placeholder="/logo.png"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
              <div className="p-4 bg-gray-50 rounded-2xlflex items-center justify-center">
                <img
                  src={form.logoLightUrl || '/logo.png'}
                  alt="Light Logo Preview"
                  className="h-12 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-gray-700">
                رابط الشعار الداكن (Dark Logo)
              </label>
              <input
                type="text"
                value={form.logoDarkUrl || ''}
                onChange={(e) => setForm({ ...form, logoDarkUrl: e.target.value })}
                placeholder="/logo.png"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-[#095B42] outline-none text-xs font-mono"
              />
              <div className="p-4 bg-[#05241C] rounded-2xl border border-gray-800 flex items-center justify-center">
                <img
                  src={form.logoDarkUrl || '/logo.png'}
                  alt="Dark Logo Preview"
                  className="h-12 w-auto object-contain"
                  onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#095B42] to-[#064230] hover:brightness-110 text-white font-black text-sm shadow-md cursor-pointer transition-all flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            <span>حفظ وتحديث كل بيانات الموقع الشامل</span>
          </button>
        </div>
      </form>
    </div>
  );
};
