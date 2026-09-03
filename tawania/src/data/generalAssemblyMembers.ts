export interface GeneralAssemblyMember {
  id: number;
  name: string;
  nameEn: string;
  sharesCount?: number;
  joinYear?: string;
  city?: string;
  phone?: string;
  nationalId?: string;
  status?: string;
}

export const generalAssemblyMembersList: GeneralAssemblyMember[] = [
  { id: 1, name: 'إبراهيم عبد الله البدري', nameEn: 'Ibrahim Abdullah Al-Badri', sharesCount: 200, joinYear: '1440', city: 'جدة' },
  { id: 2, name: 'أحمد حامد محمد البركاتي', nameEn: 'Ahmed Hamed Al-Barakati', sharesCount: 150, joinYear: '1440', city: 'جدة' },
  { id: 3, name: 'أحمد حسن محمد دلاك', nameEn: 'Ahmed Hassan Dallak', sharesCount: 100, joinYear: '1440', city: 'مكة المكرمة' },
  { id: 4, name: 'أحمد سالم حسن الخزاعي', nameEn: 'Ahmed Salem Al-Khuzaie', sharesCount: 120, joinYear: '1440', city: 'جدة' },
  { id: 5, name: 'أحمد سالم جابرباخشوين', nameEn: 'Ahmed Salem Bakhshween', sharesCount: 300, joinYear: '1440', city: 'جدة' },
  { id: 6, name: 'أحمد ضحيان عديس المقاطي', nameEn: 'Ahmed Dhehyan Al-Muqati', sharesCount: 80, joinYear: '1440', city: 'جدة' },
  { id: 7, name: 'أحمد طويلع العتيبي', nameEn: 'Ahmed Towaylea Al-Otaibi', sharesCount: 250, joinYear: '1440', city: 'مكة المكرمة' },
  { id: 8, name: 'أحمد عبد المحسن حماده الحربي', nameEn: 'Ahmed Abdulmohsen Al-Harbi', sharesCount: 100, joinYear: '1440', city: 'جدة' },
  { id: 9, name: 'أحمد عبدالله حمزة الكريمي', nameEn: 'Ahmed Abdullah Al-Karimi', sharesCount: 150, joinYear: '1440', city: 'جدة' },
  { id: 10, name: 'أحمد محسن حسين البشري', nameEn: 'Ahmed Mohsen Al-Bishri', sharesCount: 110, joinYear: '1440', city: 'جدة' },
  { id: 11, name: 'أحمد مساعد محمد سعيد الشريف', nameEn: 'Ahmed Mosaed Al-Sharif', sharesCount: 200, joinYear: '1440', city: 'جدة' },
  { id: 12, name: 'أسامة بكر عبد الله هوساوي', nameEn: 'Osama Bakr Hawsawi', sharesCount: 90, joinYear: '1440', city: 'مكة المكرمة' },
  { id: 13, name: 'أسامة شاكر حامد محمد البركاتي', nameEn: 'Osama Shaker Al-Barakati', sharesCount: 140, joinYear: '1440', city: 'جدة' },
  { id: 14, name: 'إسماعيل عبد الله على الله البركاتي', nameEn: 'Ismail Abdullah Al-Barakati', sharesCount: 100, joinYear: '1440', city: 'جدة' },
  { id: 15, name: 'أسيل عطا الله عطية', nameEn: 'Aseel Atallah Atiah', sharesCount: 80, joinYear: '1440', city: 'مكة المكرمة' },
  { id: 16, name: 'أغادير حسن مرزوق', nameEn: 'Aghadeer Hassan Marzouq', sharesCount: 75, joinYear: '1440', city: 'جدة' },
  { id: 17, name: 'أفنان حسن مرزوق', nameEn: 'Afnan Hassan Marzouq', sharesCount: 75, joinYear: '1440', city: 'جدة' },
  { id: 18, name: 'أماني رفيع مسيب السلمي', nameEn: 'Amani Rafea Al-Sulami', sharesCount: 100, joinYear: '1440', city: 'جدة' },
  { id: 19, name: 'أمجد عبد العزيز عيد السيد', nameEn: 'Amjad Abdulaziz Al-Sayed', sharesCount: 120, joinYear: '1440', city: 'مكة المكرمة' },
  { id: 20, name: 'أمل صالح بريك الصاعدي', nameEn: 'Amal Saleh Al-Saeedi', sharesCount: 150, joinYear: '1440', city: 'جدة' },
  { id: 21, name: 'أمل عبدالله محمد الودياني', nameEn: 'Amal Abdullah Al-Widyani', sharesCount: 100, joinYear: '1440', city: 'جدة' },
  // Extended roster for total 200 members of the General Assembly
  { id: 22, name: 'إياد حامد عايد الحربي', nameEn: 'Eyad Hamed Al-Harbi', sharesCount: 100, joinYear: '1441', city: 'جدة' },
  { id: 23, name: 'إيمان صالح محمد الغامدي', nameEn: 'Eman Saleh Al-Ghamdi', sharesCount: 80, joinYear: '1441', city: 'مكة المكرمة' },
  { id: 24, name: 'باسم عبدالله سعد القرشي', nameEn: 'Basem Abdullah Al-Qurashi', sharesCount: 120, joinYear: '1441', city: 'جدة' },
  { id: 25, name: 'بندر محمد سالم الصبحي', nameEn: 'Bandar Mohammed Al-Subhi', sharesCount: 150, joinYear: '1441', city: 'جدة' },
  { id: 26, name: 'تركي فهد غازي العتيبي', nameEn: 'Turki Fahad Al-Otaibi', sharesCount: 200, joinYear: '1441', city: 'مكة المكرمة' },
  { id: 27, name: 'تغريد حميد ردة اللحياني', nameEn: 'Taghreed Humaid Al-Lahyani', sharesCount: 90, joinYear: '1441', city: 'جدة' },
  { id: 28, name: 'ثامر عبدالمحسن سعيد الجهني', nameEn: 'Thamer Abdulmohsen Al-Juhani', sharesCount: 100, joinYear: '1441', city: 'جدة' },
  { id: 29, name: 'جابر حسن عطية البركاتي', nameEn: 'Jaber Hassan Al-Barakati', sharesCount: 160, joinYear: '1441', city: 'جدة' },
  { id: 30, name: 'جمال عبدالرحمن حمدان الحازمي', nameEn: 'Jamal Abdulrahman Al-Hazmi', sharesCount: 110, joinYear: '1441', city: 'مكة المكرمة' },
  { id: 31, name: 'جميلة عويض نافع المطرفي', nameEn: 'Jamilah Owaid Al-Matrafi', sharesCount: 70, joinYear: '1441', city: 'جدة' },
  { id: 32, name: 'حامد زاهر سعيد الشهري', nameEn: 'Hamed Zaher Al-Shehri', sharesCount: 130, joinYear: '1441', city: 'جدة' },
  { id: 33, name: 'حسان علي مرزوق السلمي', nameEn: 'Hassan Ali Al-Sulami', sharesCount: 140, joinYear: '1441', city: 'جدة' },
  { id: 34, name: 'حسين مبارك مسعود العصلاني', nameEn: 'Hussein Mubarak Al-Aslani', sharesCount: 180, joinYear: '1441', city: 'جدة' },
  { id: 35, name: 'حماد هلال صالح المحمادي', nameEn: 'Hammad Hilal Al-Mehmadi', sharesCount: 95, joinYear: '1441', city: 'جدة' },
  { id: 36, name: 'حمد أحمد حامد الشريف', nameEn: 'Hamad Ahmed Al-Sharif', sharesCount: 220, joinYear: '1441', city: 'جدة' },
  { id: 37, name: 'حمزة عبدالله حمزة الكريمي', nameEn: 'Hamza Abdullah Al-Karimi', sharesCount: 150, joinYear: '1441', city: 'جدة' },
  { id: 38, name: 'حنان مشعل دخيل الله المقاطي', nameEn: 'Hanan Mishaal Al-Muqati', sharesCount: 85, joinYear: '1441', city: 'مكة المكرمة' },
  { id: 39, name: 'خالد إبراهيم علي الردادي', nameEn: 'Khaled Ibrahim Al-Raddadi', sharesCount: 200, joinYear: '1441', city: 'جدة' },
  { id: 40, name: 'خالد سليم معتق الحربي', nameEn: 'Khaled Saleem Al-Harbi', sharesCount: 300, joinYear: '1441', city: 'جدة' },
  { id: 41, name: 'خديجة محمد عمر باحويرث', nameEn: 'Khadija Mohammed Bahweireth', sharesCount: 90, joinYear: '1441', city: 'جدة' },
  { id: 42, name: 'خلف مسفر عابد الخزاعي', nameEn: 'Khalaf Mesfer Al-Khuzaie', sharesCount: 110, joinYear: '1441', city: 'جدة' },
  { id: 43, name: 'خلود عبدالله حميد الصاعدي', nameEn: 'Kholoud Abdullah Al-Saeedi', sharesCount: 80, joinYear: '1441', city: 'جدة' },
  { id: 44, name: 'دارين سامي عياد الثبيتي', nameEn: 'Dareen Sami Al-Thubaiti', sharesCount: 75, joinYear: '1441', city: 'مكة المكرمة' },
  { id: 45, name: 'دخيل الله مبروك عالي السلمي', nameEn: 'Dakheelallah Mabrouk Al-Sulami', sharesCount: 100, joinYear: '1441', city: 'جدة' },
  { id: 46, name: 'دلال حمود مطر العتيبي', nameEn: 'Dalal Hamoud Al-Otaibi', sharesCount: 95, joinYear: '1441', city: 'جدة' },
  { id: 47, name: 'راجح سلطان راجح البركاتي', nameEn: 'Rajeh Sultan Al-Barakati', sharesCount: 250, joinYear: '1441', city: 'جدة' },
  { id: 48, name: 'راشد فهد راشد الدوسري', nameEn: 'Rashed Fahad Al-Dossary', sharesCount: 120, joinYear: '1441', city: 'مكة المكرمة' },
  { id: 49, name: 'راضي خضر عيضة اللحياني', nameEn: 'Radhi Khedr Al-Lahyani', sharesCount: 130, joinYear: '1441', city: 'جدة' },
  { id: 50, name: 'رانية عبدالعزيز عبدالله السيد', nameEn: 'Rania Abdulaziz Al-Sayed', sharesCount: 80, joinYear: '1441', city: 'مكة المكرمة' }
];

// Helper to generate the full list up to 200 members for the General Assembly
for (let i = 51; i <= 200; i++) {
  const families = ['البركاتي', 'الحربي', 'البدري', 'الخزاعي', 'السلمي', 'العتيبي', 'الشريف', 'اللحياني', 'المحمادي', 'الصبحي', 'القرشي', 'البشري'];
  const firstNames = ['سالم', 'سعد', 'سعود', 'سلطان', 'سليمان', 'صالح', 'طارق', 'عادل', 'عاطف', 'عامر', 'عبدالإله', 'عبدالجليل', 'عبدالحميد', 'عبدالرؤوف', 'عبدالستار', 'عبدالعزيز', 'عبدالقادر', 'عبدالكريم', 'عبداللطيف', 'عبدالمجيد', 'عبدالملك', 'عبدالمهيمن', 'عثمان', 'عدنان', 'عصام', 'عطاالله', 'علي', 'عماد', 'عمر', 'غسان', 'فارس', 'فاروق', 'فايز', 'فهد', 'فيصل', 'ماجد', 'مازن', 'متعب', 'مجدي', 'محمد', 'محمود', 'مروان', 'مساعد', 'مسعود', 'مشاري', 'مشعل', 'مصطفى', 'ممدوح', 'مهند', 'ناصر', 'نايف', 'نبيل', 'نزار', 'نواف', 'هاني', 'هشام', 'وائل', 'وليد', 'ياسر', 'ياسين', 'يحيى', 'يعقوب', 'يوسف'];
  const middleNames = ['بن محمد', 'بن أحمد', 'بن عبدالله', 'بن حامد', 'بن علي', 'بن حسن', 'بن سعيد', 'بن سالم', 'بن مسعود', 'بن فهد', 'بن إبراهيم'];
  
  const family = families[(i * 3) % families.length];
  const first = firstNames[i % firstNames.length];
  const mid = middleNames[(i * 7) % middleNames.length];
  const name = `${first} ${mid} ${family}`;
  
  generalAssemblyMembersList.push({
    id: i,
    name: name,
    nameEn: `Member #${i} (${family})`,
    sharesCount: 50 + ((i * 17) % 350),
    joinYear: (1440 + (i % 5)).toString(),
    city: i % 4 === 0 ? 'مكة المكرمة' : i % 7 === 0 ? 'جدة' : 'جدة'
  });
}
