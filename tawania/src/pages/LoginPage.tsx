import { useToast } from '../context/ToastContext';
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  AlertCircle,
  Building2,
  FileCheck2,
  Fingerprint
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useI18n } from '../i18n';
import { AlShamelLogo } from '../components/common/AlShamelLogo';

export const LoginPage: React.FC = () => {
  const toast = useToast();
  const { locale } = useI18n();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@tawania.sa');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // If already authenticated, redirect to dashboard
  React.useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('tawania_dashboard_tab', 'overview');
      navigate('/dashboard?tab=overview', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await login(email, password);
      if (res.success) {
        toast.success('تم تسجيل الدخول بنجاح', 'مرحباً بك في لوحة تحكم الحوكمة والتحكم المؤسسي');
        localStorage.setItem('tawania_dashboard_tab', 'overview');
        navigate('/dashboard?tab=overview', { replace: true });
      } else {
        setError(res.error || (locale === 'ar' ? 'بيانات الاعتماد غير صحيحة، يرجى المحاولة مجدداً' : 'Invalid credentials, please try again'));
      }
    } catch {
      setError(locale === 'ar' ? 'حدث خطأ غير متوقع في الاتصال' : 'An unexpected connection error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-white text-[#17211E]">
      
      {/* 1. Left/Side Half: Cinematic Photography with Brand Overlay */}
      <div className="hidden lg:relative lg:flex flex-col justify-between p-8 lg:p-10 bg-[#06241C] text-white overflow-hidden">
        {/* Background Image Layer with Luxury Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80')`
          }}
        />
        {/* Deep Emerald & Vignette Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#041B15] via-[#083529]/85 to-[#041A14]/90 backdrop-blur-[1px]" />
        
        {/* Center: Quote & Value Proposition */}
        <div className="relative z-10 space-y-4 max-w-lg my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A45C]/20 border border-[#C9A45C]/40 text-xs font-bold text-amber-300 backdrop-blur-md">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C9A45C]" />
            <span>{locale === 'ar' ? 'منظومة الحوكمة الرقمية المعتمدة' : 'Official Governance Portal'}</span>
          </div>

          <h2 className="text-2xl xl:text-3xl font-black text-white leading-tight">
            {locale === 'ar'
              ? 'ريادة في العمل التعاوني والشفافية المؤسسية'
              : 'Pioneering Cooperative Enterprise & Institutional Governance'}
          </h2>

          <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
            {locale === 'ar'
              ? 'بوابة آمنة وموحدة لإدارة السياسات واللوائح، متابعة مؤشرات الأداء المالي، معالجة بلاغات المخالفات، واستبيانات الجمعية العمومية.'
              : 'A secure central portal for managing policies, monitoring financial performance metrics, whistleblower handling, and assembly governance.'}
          </p>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-1.5 text-amber-300 mb-1">
                <FileCheck2 className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">{locale === 'ar' ? 'ترخيص رسمي' : 'Licensed'}</span>
              </div>
              <p className="text-[11px] text-white/70 leading-snug">
                {locale === 'ar' ? 'ترخيص رقم (234) بإشراف المركز الوطني' : 'Official License #234'}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                <Fingerprint className="w-3.5 h-3.5" />
                <span className="text-xs font-bold">{locale === 'ar' ? 'أمان وسرية' : '256-Bit SSL'}</span>
              </div>
              <p className="text-[11px] text-white/70 leading-snug">
                {locale === 'ar' ? 'تشفير وحماية لكافة البيانات والتقارير' : 'Encrypted & Confidential'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Institutional Registration */}
        <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] text-white/60">
          <span>{locale === 'ar' ? 'جمعية الشامل التعاونية متعددة الأغراض' : 'AlShamel Multipurpose Cooperative'}</span>
          <span className="font-mono text-emerald-400 font-bold">2026</span>
        </div>
      </div>

      {/* 2. Right/Side Half: Simple, Elegant & Clean Form */}
      <div className="flex flex-col justify-between p-5 sm:p-8 lg:p-10 bg-[#FAFAF9]">
        
        {/* Top Header Bar: Clickable Logo Only */}
        <div className="flex items-center justify-start mb-4">
          <Link
            to="/"
            title={locale === 'ar' ? 'العودة للصفحة الرئيسية' : 'Go to Homepage'}
            className="group flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer"
          >
            <AlShamelLogo size="md" textColor="#0A4D38" />
          </Link>
        </div>

        {/* Center Container: Simple & Focused Form (Big, Spacious & Prominent) */}
        <div className="max-w-md w-full mx-auto my-auto space-y-6">
          
          {/* Title & Welcome */}
          <div className="text-start space-y-1.5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#12332B] tracking-tight">
              {locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              {locale === 'ar'
                ? 'مرحباً بك مجدداً، أدخل بياناتك المعتمدة للوصول إلى لوحة التحكم'
                : 'Welcome back, please enter your credentials to access the dashboard'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {/* Clean Simple Form (Big & Spacious) */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 text-start">
                {locale === 'ar' ? 'البريد الإلكتروني / اسم المستخدم' : 'Email or Username'}
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-gray-400 absolute top-3.5 sm:top-4 start-3.5 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@tawania.sa"
                  className="w-full ps-11 pe-4 py-3 sm:py-3.5 bg-white border border-gray-300 rounded-2xl text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B6B4F] focus:border-transparent transition-all shadow-xs text-start"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-gray-700 mb-1.5 text-start">
                {locale === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-gray-400 absolute top-3.5 sm:top-4 start-3.5 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full ps-11 pe-12 py-3 sm:py-3.5 bg-white border border-gray-300 rounded-2xl text-sm sm:text-base font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0B6B4F] focus:border-transparent transition-all shadow-xs text-start"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3 sm:top-3.5 end-3.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer p-1"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs sm:text-sm pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600 hover:text-gray-900">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0B6B4F] focus:ring-[#0B6B4F] border-gray-300 accent-[#0B6B4F]"
                />
                <span>{locale === 'ar' ? 'تذكر بيانات الجلسة' : 'Remember session'}</span>
              </label>

              <span className="text-gray-400 text-xs flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#0B6B4F]" />
                <span>{locale === 'ar' ? 'مشفر ومحمي' : 'Encrypted & Secure'}</span>
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 sm:py-4 px-6 bg-[#0B6B4F] hover:bg-[#08523C] text-white rounded-2xl font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <span>{locale === 'ar' ? 'جارٍ التحقق...' : 'Verifying...'}</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-[#C9A45C]" />
                  <span>{locale === 'ar' ? 'تسجيل الدخول إلى لوحة التحكم' : 'Sign In to Dashboard'}</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Bottom Footer Note */}
        <div className="mt-4 pt-3 border-t border-gray-200/80 text-center text-[10px] text-gray-400 flex items-center justify-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-[#0B6B4F]" />
          <span>
            {locale === 'ar'
              ? 'جمعية الشامل التعاونية متعددة الأغراض بعقلة الصقور (ترخيص 234)'
              : 'AlShamel Multipurpose Cooperative (License #234)'}
          </span>
        </div>

      </div>

    </div>
  );
};
