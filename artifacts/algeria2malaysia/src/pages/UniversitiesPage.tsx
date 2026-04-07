import { useEffect } from "react";
import { ArrowLeft, CheckCircle, GraduationCap, MapPin, BookOpen } from "lucide-react";
import { useNavigate, getNavState } from "../hooks/useNavigate";

const WA_LINK = "https://wa.me/601112200603";

function fmtEur(rm: number) {
  return Math.round(rm / 5).toLocaleString();
}

const UNIVERSITIES = [
  {
    id: "apu",
    name: "APU",
    nameAr: "جامعة آسيا باسيفيك للتكنولوجيا والابتكار (APU)",
    nameFull: "Asia Pacific University of Technology & Innovation",
    location: "كوالالمبور — Technology Park Malaysia",
    established: "1993",
    badge: "IT & Technology",
    badgeColor: "bg-blue-600",
    desc: "جامعة خاصة رائدة في مجال التكنولوجيا وتكنولوجيا المعلومات، تستقطب طلاباً من أكثر من 130 دولة. تحتل مراتب متقدمة في تصنيفات QS Asia في تخصصات الحوسبة والهندسة والأعمال.",
    logoImg: "/logos/apu.png",
    strengths: ["رائدة في IT والأمن السيبراني والذكاء الاصطناعي", "بيئة طلابية دولية من 130+ دولة", "حرم عصري في Technology Park Malaysia", "شراكات مع IBM وMicrosoft وOracle وغيرها"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["علوم الحاسوب", "هندسة البرمجيات", "تقنية المعلومات"] },
      { level: "البكالوريوس", duration: "3 سنوات", specialties: ["هندسة البرمجيات", "الأمن السيبراني", "الذكاء الاصطناعي", "هندسة الكمبيوتر", "الأعمال والتقنية"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["تكنولوجيا المعلومات", "علم البيانات", "الأمن السيبراني"] },
    ],
    pricing: [
      { label: "Foundation", rm: "15,000 – 17,500", eur: `${fmtEur(15000)} – ${fmtEur(17500)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "19,000 – 30,000", eur: `${fmtEur(19000)} – ${fmtEur(30000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "24,000 – 38,000", eur: `${fmtEur(24000)} – ${fmtEur(38000)}`, note: "المجموع" },
    ],
    accentColor: "blue",
  },
  {
    id: "taylors",
    name: "Taylor's University",
    nameAr: "جامعة تايلور",
    nameFull: "Taylor's University Lakeside Campus",
    location: "سوبانج جايا — سيلانغور",
    established: "1969",
    badge: "Top Ranked",
    badgeColor: "bg-purple-600",
    desc: "إحدى أعرق الجامعات الخاصة في ماليزيا وأعلاها تصنيفاً عالمياً. تتميز بحرمها المطل على بحيرة صناعية وبرامج مزدوجة مع جامعات بريطانية وأسترالية. ضمن أفضل 500 جامعة عالمياً (QS 2025).",
    logoImg: "/logos/taylors.png",
    strengths: ["الأعلى تصنيفاً بين الجامعات الخاصة (QS 2025)", "حرم استثنائي مطل على بحيرة صناعية", "برامج مزدوجة مع جامعات بريطانية وأسترالية", "قوية في الأعمال والضيافة والهندسة والطب"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبيعية", "الأعمال والتكنولوجيا", "الفنون والتصميم"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["إدارة الأعمال", "الهندسة", "الضيافة والسياحة", "الطب والعلوم الصحية", "التصميم والفنون"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["إدارة الأعمال MBA", "التعليم والتدريس", "هندسة البرمجيات"] },
    ],
    pricing: [
      { label: "Foundation", rm: "15,000 – 19,000", eur: `${fmtEur(15000)} – ${fmtEur(19000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "22,000 – 42,000", eur: `${fmtEur(22000)} – ${fmtEur(42000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "32,000 – 55,000", eur: `${fmtEur(32000)} – ${fmtEur(55000)}`, note: "المجموع" },
    ],
    accentColor: "purple",
  },
  {
    id: "mmu",
    name: "MMU",
    nameAr: "جامعة الوسائط المتعددة (MMU)",
    nameFull: "Multimedia University",
    location: "سايبر جايا (الحرم الرئيسي) وملاكا",
    established: "1996",
    badge: "Technology",
    badgeColor: "bg-teal-600",
    desc: "جامعة حكومية تقنية تأسست بدعم من شركة Telekom Malaysia، متخصصة في علوم الحاسوب والهندسة الكهربائية والوسائط المتعددة. حرمها الرئيسي في قلب سايبر جايا عاصمة التكنولوجيا الماليزية.",
    logoImg: "/logos/mmu.png",
    strengths: ["متخصصة في التكنولوجيا والهندسة الكهربائية", "حرم سايبر جايا في المدينة التقنية الرائدة", "مرتبطة رسمياً بـ Telekom Malaysia", "برامج الذكاء الاصطناعي وعلم البيانات"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["علوم الحاسوب", "هندسة كهربائية", "الوسائط المتعددة"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["هندسة البرمجيات", "هندسة الاتصالات", "تكنولوجيا المعلومات", "الذكاء الاصطناعي", "الوسائط الإبداعية"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["علوم الحاسوب", "هندسة الكهرباء", "الوسائط المتعددة"] },
    ],
    pricing: [
      { label: "Foundation", rm: "11,000 – 14,000", eur: `${fmtEur(11000)} – ${fmtEur(14000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "15,000 – 24,000", eur: `${fmtEur(15000)} – ${fmtEur(24000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "22,000 – 32,000", eur: `${fmtEur(22000)} – ${fmtEur(32000)}`, note: "المجموع" },
    ],
    accentColor: "teal",
  },
  {
    id: "unikl",
    name: "UniKL",
    nameAr: "جامعة كوالالمبور (UniKL)",
    nameFull: "Universiti Kuala Lumpur",
    location: "كوالالمبور (11 حرم في 8 ولايات)",
    established: "2002",
    badge: "Engineering",
    badgeColor: "bg-orange-600",
    desc: "جامعة تقنية حكومية فريدة تضم 11 حرماً متخصصاً منتشرة عبر 8 ولايات ماليزية. كل حرم متخصص في قطاع صناعي محدد مما يضمن تدريباً عملياً مباشراً مع الصناعة.",
    logoImg: "/logos/unikl.png",
    strengths: ["11 حرم متخصص في 8 ولايات ماليزية", "تدريب عملي مباشر مع الصناعة الوطنية", "برامج هندسة تطبيقية فريدة (طيران، نفط، تصنيع)", "رسوم دراسية تنافسية"],
    programs: [
      { level: "الدبلوم", duration: "2.5-3 سنوات", specialties: ["هندسة ميكانيكية", "هندسة مدنية", "هندسة كهربائية"] },
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة الطيران", "هندسة النفط والغاز", "هندسة التصنيع", "هندسة الميكاترونيك"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة الميكاترونيك", "إدارة الهندسة"] },
    ],
    pricing: [
      { label: "الدبلوم", rm: "9,000 – 13,000", eur: `${fmtEur(9000)} – ${fmtEur(13000)}`, note: "سنوياً" },
      { label: "البكالوريوس", rm: "11,000 – 17,000", eur: `${fmtEur(11000)} – ${fmtEur(17000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "16,000 – 24,000", eur: `${fmtEur(16000)} – ${fmtEur(24000)}`, note: "المجموع" },
    ],
    accentColor: "orange",
  },
  {
    id: "lincoln",
    name: "Lincoln University",
    nameAr: "جامعة لينكولن كوليدج",
    nameFull: "Lincoln University College",
    location: "بيتالينغ جايا — سيلانغور",
    established: "2002",
    badge: "Affordable",
    badgeColor: "bg-green-600",
    desc: "جامعة خاصة معتمدة من MQA تتميز بتنوع برامجها وأسعارها التنافسية. تُعدّ من أكثر الجامعات انفتاحاً على الطلاب الدوليين وخاصة من الدول العربية والإسلامية.",
    logoImg: "/logos/lincoln.png",
    strengths: ["رسوم تنافسية ومناسبة للطلاب العرب", "قبول مرن وإجراءات سريعة", "تخصصات واسعة: طب، صيدلة، أعمال، هندسة", "دعم خاص للطلاب الدوليين"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الصحية", "الأعمال والتكنولوجيا"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["إدارة الأعمال", "علوم الحاسوب", "التمريض والصحة العامة", "الصيدلة", "الهندسة", "القانون"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["MBA", "الصحة العامة", "هندسة البرمجيات"] },
    ],
    pricing: [
      { label: "Foundation", rm: "7,500 – 11,000", eur: `${fmtEur(7500)} – ${fmtEur(11000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "9,000 – 15,000", eur: `${fmtEur(9000)} – ${fmtEur(15000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "15,000 – 22,000", eur: `${fmtEur(15000)} – ${fmtEur(22000)}`, note: "المجموع" },
    ],
    accentColor: "green",
  },
  {
    id: "utp",
    name: "UTP",
    nameAr: "جامعة تكنولوجيا بتروناس (UTP)",
    nameFull: "Universiti Teknologi PETRONAS",
    location: "سيري إسكندر — بيراك",
    established: "1997",
    badge: "Top Engineering",
    badgeColor: "bg-yellow-600",
    desc: "جامعة هندسية حكومية تأسست بدعم بتروناس — أكبر شركة في ماليزيا. تُصنَّف ضمن أفضل الجامعات الهندسية في آسيا، وتُركّز على الهندسة والتكنولوجيا والبحث في قطاعي النفط والطاقة.",
    logoImg: "/logos/utp.png",
    strengths: ["ضمن أفضل الجامعات الهندسية في آسيا (QS)", "مدعومة من بتروناس — أقوى شركة ماليزية", "منح دراسية جزئية وكاملة متاحة", "حرم جامعي ضخم ومتكامل في البيئة الخضراء"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم والهندسة", "الرياضيات والفيزياء المتقدمة"] },
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة البترول", "هندسة كيميائية", "هندسة الكمبيوتر والمعلومات", "هندسة مدنية", "هندسة الميكانيك"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة البترول", "هندسة الطاقة المتجددة", "هندسة الكيمياء"] },
    ],
    pricing: [
      { label: "Foundation", rm: "9,000 – 12,000", eur: `${fmtEur(9000)} – ${fmtEur(12000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "15,000 – 22,000", eur: `${fmtEur(15000)} – ${fmtEur(22000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "22,000 – 32,000", eur: `${fmtEur(22000)} – ${fmtEur(32000)}`, note: "المجموع" },
    ],
    accentColor: "yellow",
  },
  {
    id: "upm",
    name: "UPM",
    nameAr: "جامعة بوترا ماليزيا (UPM)",
    nameFull: "Universiti Putra Malaysia",
    location: "سيردانغ — سيلانغور (قرب كوالالمبور)",
    established: "1931",
    badge: "Research",
    badgeColor: "bg-emerald-600",
    desc: "إحدى أعرق الجامعات الحكومية الماليزية، تأسست 1931 وتحتل مرتبة ضمن أفضل 150 جامعة في آسيا. رائدة في البحث العلمي بالزراعة والبيئة والهندسة والطب البيطري.",
    logoImg: "/logos/upm.png",
    strengths: ["ضمن أفضل 150 جامعة في آسيا (QS Asia 2025)", "حرم أخضر ضخم 1200 هكتار — الأجمل في ماليزيا", "رائدة عالمياً في الزراعة والعلوم البيئية", "رسوم تنافسية كجامعة حكومية"],
    programs: [
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["الزراعة وعلوم الغذاء", "هندسة مدنية وبيئية", "علوم الحاسوب", "الطب البيطري", "الصيدلة"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["علوم الزراعة والبيئة", "الهندسة البيئية", "إدارة الأعمال MBA"] },
      { level: "الدكتوراه", duration: "3-5 سنوات", specialties: ["العلوم الزراعية", "الهندسة", "علوم الحياة والبيئة"] },
    ],
    pricing: [
      { label: "البكالوريوس (دولي)", rm: "8,000 – 16,000", eur: `${fmtEur(8000)} – ${fmtEur(16000)}`, note: "سنوياً" },
      { label: "الماستر (دولي)", rm: "12,000 – 20,000", eur: `${fmtEur(12000)} – ${fmtEur(20000)}`, note: "المجموع" },
      { label: "الدكتوراه (دولي)", rm: "16,000 – 28,000", eur: `${fmtEur(16000)} – ${fmtEur(28000)}`, note: "سنوياً" },
    ],
    accentColor: "emerald",
  },
  {
    id: "utm",
    name: "UTM",
    nameAr: "جامعة تكنولوجيا ماليزيا (UTM)",
    nameFull: "Universiti Teknologi Malaysia",
    location: "جوهور بهرو — جوهور (الحرم الرئيسي) + كوالالمبور (UTM KL)",
    established: "1904",
    badge: "Top Engineering",
    badgeColor: "bg-sky-600",
    desc: "إحدى أعرق الجامعات الهندسية الحكومية في ماليزيا، تأسست 1904 وتحتل مراتب متقدمة عالمياً في الهندسة والتكنولوجيا. تمتلك حرمين رئيسيين: الحرم الأم في جوهور بهرو وحرم كوالالمبور UTM KL.",
    logoImg: "/logos/utm.png",
    strengths: ["رائدة في الهندسة والتكنولوجيا منذ 1904", "حرمان رئيسيان: جوهور بهرو وكوالالمبور", "قوية في علوم البيئة المبنية والعلوم التطبيقية", "بحث علمي متقدم وشراكات صناعية دولية"],
    programs: [
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة مدنية", "هندسة كهربائية", "هندسة ميكانيكية", "هندسة الكمبيوتر", "علوم البناء والعمارة"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة الإنشاءات", "الهندسة الكهربائية", "علوم الحاسوب"] },
      { level: "الدكتوراه", duration: "3-5 سنوات", specialties: ["تخصصات بحثية في الهندسة والتكنولوجيا"] },
    ],
    pricing: [
      { label: "البكالوريوس (دولي)", rm: "12,000 – 20,000", eur: `${fmtEur(12000)} – ${fmtEur(20000)}`, note: "سنوياً" },
      { label: "الماستر (دولي)", rm: "15,000 – 25,000", eur: `${fmtEur(15000)} – ${fmtEur(25000)}`, note: "المجموع" },
      { label: "الدكتوراه (دولي)", rm: "18,000 – 30,000", eur: `${fmtEur(18000)} – ${fmtEur(30000)}`, note: "سنوياً" },
    ],
    accentColor: "sky",
  },
  {
    id: "utem",
    name: "UTeM",
    nameAr: "جامعة تكنيكال ماليزيا ملاكا (UTeM)",
    nameFull: "Universiti Teknikal Malaysia Melaka",
    location: "دوريان تونغال — ملاكا",
    established: "2000",
    badge: "Technical Engineering",
    badgeColor: "bg-rose-600",
    desc: "جامعة حكومية تقنية متخصصة تأسست عام 2000 في ملاكا، تُركّز على الهندسة التقنية التطبيقية والتصنيع والإلكترونيك. تُقدّم تدريباً عملياً مكثفاً يُؤهّل الطلاب مباشرةً لسوق العمل الصناعي.",
    logoImg: "/logos/utem.png",
    strengths: ["متخصصة في الهندسة التقنية التطبيقية", "رائدة في تكنولوجيا التصنيع والإلكترونيك", "تدريب عملي مكثف مرتبط بالصناعة", "رسوم تنافسية كجامعة حكومية"],
    programs: [
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة الإلكترونيك", "هندسة التصنيع", "هندسة الميكاترونيك", "هندسة الكهرباء الصناعية", "هندسة الحاسوب"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة الإلكترونيك المتقدمة", "هندسة التصنيع", "إدارة الهندسة"] },
      { level: "الدكتوراه", duration: "3-5 سنوات", specialties: ["تخصصات بحثية في الهندسة التقنية"] },
    ],
    pricing: [
      { label: "البكالوريوس (دولي)", rm: "8,000 – 14,000", eur: `${fmtEur(8000)} – ${fmtEur(14000)}`, note: "سنوياً" },
      { label: "الماستر (دولي)", rm: "12,000 – 20,000", eur: `${fmtEur(12000)} – ${fmtEur(20000)}`, note: "المجموع" },
      { label: "الدكتوراه (دولي)", rm: "15,000 – 24,000", eur: `${fmtEur(15000)} – ${fmtEur(24000)}`, note: "سنوياً" },
    ],
    accentColor: "rose",
  },
  {
    id: "ucsi",
    name: "UCSI University",
    nameAr: "جامعة UCSI",
    nameFull: "UCSI University",
    location: "شيراس — كوالالمبور الجنوبية",
    established: "1986",
    badge: "Medicine & Business",
    badgeColor: "bg-pink-600",
    desc: "جامعة خاصة راسخة تأسست 1986 وتتميز بقوتها في الطب والعلوم الصحية والصيدلة. تمتلك مستشفى تعليمياً خاصاً وبرامج MBBS معتمدة دولياً من هيئات بريطانية وأمريكية.",
    logoImg: "/logos/ucsi.png",
    strengths: ["برنامج MBBS معتمد دولياً (هيئات UK/USA)", "مستشفى تعليمي خاص تابع للجامعة", "رائدة في الصيدلة والتمريض وطب الأسنان", "ضمن أفضل 600 جامعة عالمياً (QS 2025)"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبية والصحية", "الأعمال والتكنولوجيا"] },
      { level: "البكالوريوس", duration: "3-5 سنوات", specialties: ["الطب والجراحة MBBS (5 سنوات)", "الصيدلة (4 سنوات)", "التمريض", "طب الأسنان", "إدارة الأعمال", "تكنولوجيا المعلومات"] },
      { level: "الماستر", duration: "1.5-3 سنة", specialties: ["الطب التخصصي", "إدارة الأعمال MBA", "الصحة العامة"] },
    ],
    pricing: [
      { label: "Foundation", rm: "13,000 – 16,000", eur: `${fmtEur(13000)} – ${fmtEur(16000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "17,000 – 62,000", eur: `${fmtEur(17000)} – ${fmtEur(62000)}`, note: "سنوياً (الطب الأعلى)" },
      { label: "الماستر", rm: "28,000 – 68,000", eur: `${fmtEur(28000)} – ${fmtEur(68000)}`, note: "المجموع" },
    ],
    accentColor: "pink",
  },
  {
    id: "sunway",
    name: "Sunway University",
    nameAr: "جامعة صنواي",
    nameFull: "Sunway University",
    location: "بانغار سيري بيتالينغ — كوالالمبور",
    established: "1987",
    badge: "Modern Campus",
    badgeColor: "bg-indigo-600",
    desc: "جامعة خاصة حديثة تقع في مدينة صنواي المتكاملة الشهيرة. تتميز بشراكة استراتيجية حصرية مع جامعة لانكستر البريطانية (مرتبة 127 عالمياً) وتقدم برامج مزدوجة بدرجات بريطانية.",
    logoImg: "/logos/sunway.png",
    strengths: ["شراكة حصرية مع جامعة لانكستر البريطانية (#127 عالمياً)", "حرم حديث متكامل داخل مدينة صنواي", "درجات بريطانية مُعترف بها عالمياً", "بيئة طلابية دولية نابضة وفعّالة"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبيعية", "الأعمال والإدارة", "الفنون والتصميم"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["إدارة الأعمال", "الهندسة", "علوم الحاسوب", "الطب النفسي والتمريض", "المحاسبة والمال", "التصميم الجرافيكي"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["MBA", "هندسة البرمجيات", "علم النفس التطبيقي"] },
    ],
    pricing: [
      { label: "Foundation", rm: "15,000 – 18,500", eur: `${fmtEur(15000)} – ${fmtEur(18500)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "20,000 – 38,000", eur: `${fmtEur(20000)} – ${fmtEur(38000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "28,000 – 50,000", eur: `${fmtEur(28000)} – ${fmtEur(50000)}`, note: "المجموع" },
    ],
    accentColor: "indigo",
  },
  {
    id: "cityu",
    name: "City University",
    nameAr: "جامعة سيتي ماليزيا",
    nameFull: "City University Malaysia",
    location: "بيتالينغ جايا — سيلانغور",
    established: "1984",
    badge: "Engineering & Law",
    badgeColor: "bg-red-600",
    desc: "جامعة خاصة ماليزية معتمدة تأسست عام 1984، تقع في بيتالينغ جايا بولاية سيلانغور. تتميز بتنوع برامجها بين الهندسة والقانون والأعمال وتكنولوجيا المعلومات، وتستقطب طلاباً من مختلف أنحاء العالم في بيئة أكاديمية متعددة الثقافات.",
    logoImg: "/logos/cityu.png",
    strengths: [
      "معتمدة من MQA — هيئة الاعتماد الأكاديمي الماليزية",
      "تخصصات قانونية وهندسية وتقنية متكاملة",
      "رسوم تنافسية مناسبة للطلاب الجزائريين",
      "بيئة دولية متعددة الثقافات وقريبة من كوالالمبور",
    ],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبيعية", "الأعمال والإدارة", "تكنولوجيا المعلومات"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["الهندسة المدنية", "الهندسة الكهربائية", "القانون", "إدارة الأعمال", "علوم الحاسوب", "العمارة"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["هندسة البناء", "إدارة الأعمال MBA", "القانون التجاري", "تكنولوجيا المعلومات"] },
    ],
    pricing: [
      { label: "Foundation", rm: "8,000 – 12,000", eur: `${fmtEur(8000)} – ${fmtEur(12000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "12,000 – 20,000", eur: `${fmtEur(12000)} – ${fmtEur(20000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "15,000 – 26,000", eur: `${fmtEur(15000)} – ${fmtEur(26000)}`, note: "المجموع" },
    ],
    accentColor: "crimson",
  },
];

const accentMap: Record<string, { border: string; badge: string; text: string; bg: string }> = {
  blue:    { border: "border-blue-400",    badge: "bg-blue-600",    text: "text-blue-700",    bg: "bg-blue-50" },
  purple:  { border: "border-purple-400",  badge: "bg-purple-600",  text: "text-purple-700",  bg: "bg-purple-50" },
  teal:    { border: "border-teal-400",    badge: "bg-teal-600",    text: "text-teal-700",    bg: "bg-teal-50" },
  orange:  { border: "border-orange-400",  badge: "bg-orange-600",  text: "text-orange-700",  bg: "bg-orange-50" },
  green:   { border: "border-green-400",   badge: "bg-green-600",   text: "text-green-700",   bg: "bg-green-50" },
  yellow:  { border: "border-yellow-500",  badge: "bg-yellow-600",  text: "text-yellow-700",  bg: "bg-yellow-50" },
  emerald: { border: "border-emerald-400", badge: "bg-emerald-600", text: "text-emerald-700", bg: "bg-emerald-50" },
  pink:    { border: "border-pink-400",    badge: "bg-pink-600",    text: "text-pink-700",    bg: "bg-pink-50" },
  indigo:  { border: "border-indigo-400",  badge: "bg-indigo-600",  text: "text-indigo-700",  bg: "bg-indigo-50" },
  sky:     { border: "border-sky-400",     badge: "bg-sky-600",     text: "text-sky-700",     bg: "bg-sky-50" },
  rose:    { border: "border-rose-400",    badge: "bg-rose-600",    text: "text-rose-700",    bg: "bg-rose-50" },
  crimson: { border: "border-red-400",     badge: "bg-red-600",     text: "text-red-700",     bg: "bg-red-50" },
};

export default function UniversitiesPage() {
  const { go } = useNavigate();

  useEffect(() => {
    const { state } = getNavState();
    if (state.scrollTo) {
      const id = state.scrollTo;
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white py-20 px-4 text-center">
        <button
          onClick={() => go("home")}
          className="inline-flex items-center gap-2 text-green-300 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="rotate-180" />
          العودة للرئيسية
        </button>
        <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1 text-sm font-medium mb-4">
          🎓 جامعاتنا الشريكة
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">12 جامعة ماليزية معتمدة</h1>
        <p className="text-green-100 text-lg max-w-2xl mx-auto">
          نساعدك على الالتحاق بأفضل الجامعات الماليزية المعترف بها دولياً — استشارة مجانية، نتولى كل الإجراءات
        </p>
      </div>

      {/* Quick Nav */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm py-3 overflow-x-auto">
        <div className="flex gap-2 px-4 min-w-max mx-auto justify-center">
          {UNIVERSITIES.map((u) => (
            <a
              key={u.id}
              href={`#${u.id}`}
              className="px-4 py-2 rounded-full text-xs font-semibold bg-gray-100 hover:bg-green-100 hover:text-green-800 text-gray-600 transition-all whitespace-nowrap"
            >
              {u.name}
            </a>
          ))}
        </div>
      </div>

      {/* University Sections */}
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-20">
        {UNIVERSITIES.map((uni) => {
          const accent = accentMap[uni.accentColor] || accentMap.green;
          return (
            <section key={uni.id} id={uni.id} className="scroll-mt-20">
              {/* Top card */}
              <div className={`rounded-3xl overflow-hidden border-2 ${accent.border} shadow-xl`}>
                {/* Logo banner */}
                <div className={`relative flex flex-col md:flex-row items-center gap-6 px-8 py-8 bg-gradient-to-br from-white to-gray-50 border-b-2 ${accent.border}`}>
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 ${accent.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                    {uni.badge}
                  </div>
                  {/* Established */}
                  <div className="absolute top-4 right-4 text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded-full">
                    تأسست {uni.established}
                  </div>
                  {/* Logo */}
                  <div className="flex-shrink-0 w-56 h-32 bg-white rounded-2xl shadow-md flex items-center justify-center p-4 border border-gray-100 mt-6 md:mt-0">
                    <img
                      src={uni.logoImg}
                      alt={`${uni.name} logo`}
                      className="max-w-full max-h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  {/* Title */}
                  <div className="text-center md:text-right flex-1">
                    <h2 className={`text-2xl md:text-3xl font-black ${accent.text} mb-1 leading-tight`}>{uni.nameAr}</h2>
                    <p className="text-gray-500 text-sm font-medium mb-2">{uni.nameFull}</p>
                    <div className="flex items-center gap-2 text-gray-500 text-sm justify-center md:justify-end">
                      <MapPin size={14} />
                      <span>{uni.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 bg-white">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Description + Strengths */}
                    <div>
                      <p className="text-gray-700 leading-relaxed mb-5">{uni.desc}</p>
                      <h4 className="font-bold text-gray-900 mb-3">مميزات الجامعة</h4>
                      <ul className="space-y-2">
                        {uni.strengths.map((s) => (
                          <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                            <CheckCircle size={16} className={`${accent.text} flex-shrink-0 mt-0.5`} />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Programs + Pricing */}
                    <div>
                      {/* Programs */}
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        <BookOpen size={16} className={accent.text} />
                        البرامج المتاحة
                      </h4>
                      <div className="space-y-3 mb-6">
                        {uni.programs.map((prog) => (
                          <div key={prog.level} className={`${accent.bg} rounded-xl p-3`}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className={`font-bold text-sm ${accent.text}`}>{prog.level}</span>
                              <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">{prog.duration}</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {prog.specialties.map((sp) => (
                                <span key={sp} className="text-xs bg-white/80 text-gray-700 px-2 py-0.5 rounded-lg border border-white">
                                  {sp}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Pricing Table */}
                      <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                        💰 الرسوم الدراسية التقديرية
                      </h4>
                      <div className="border border-gray-200 rounded-xl overflow-hidden">
                        <div className="grid grid-cols-3 bg-gray-50 text-xs font-bold text-gray-600 px-3 py-2 border-b border-gray-200">
                          <span>المرحلة</span>
                          <span className="text-center">بالرينغت RM</span>
                          <span className="text-center">باليورو €</span>
                        </div>
                        {uni.pricing.map((p) => (
                          <div key={p.label} className="grid grid-cols-3 px-3 py-2.5 border-b border-gray-100 last:border-0 text-sm hover:bg-gray-50 transition-colors">
                            <div>
                              <div className="font-semibold text-gray-900 text-xs">{p.label}</div>
                              <div className="text-gray-400 text-xs">{p.note}</div>
                            </div>
                            <div className="text-center font-bold text-green-700 text-xs self-center">{p.rm}</div>
                            <div className="text-center font-bold text-blue-600 text-xs self-center">€ {p.eur}</div>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-gray-400 mt-2 text-center">* الأسعار تقديرية — تتفاوت حسب التخصص والسنة الدراسية</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3 flex-wrap">
                    {uni.id === "upm" && (
                      <button
                        onClick={() => go("upm")}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات UPM</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "apu" && (
                      <button
                        onClick={() => go("apu")}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات APU</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "taylors" && (
                      <button
                        onClick={() => go("taylors")}
                        className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات Taylor's</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "mmu" && (
                      <button
                        onClick={() => go("mmu")}
                        className="flex-1 bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات MMU</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "unikl" && (
                      <button
                        onClick={() => go("unikl")}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات UniKL</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "lincoln" && (
                      <button
                        onClick={() => go("lincoln")}
                        className="flex-1 bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات Lincoln</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "utp" && (
                      <button
                        onClick={() => go("utp")}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات UTP</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "utm" && (
                      <button
                        onClick={() => go("utm")}
                        className="flex-1 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات UTM</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "utem" && (
                      <button
                        onClick={() => go("utem")}
                        className="flex-1 bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات UTeM</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "ucsi" && (
                      <button
                        onClick={() => go("ucsi")}
                        className="flex-1 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات UCSI</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    {uni.id === "cityu" && (
                      <button
                        onClick={() => go("cityu-courses")}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                      >
                        <BookOpen size={16} />
                        <span>استعرض تخصصات City University</span>
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                      </button>
                    )}
                    <button
                      onClick={() => go("uni-apply", { university: uni.name })}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
                    >
                      <span>📄</span>
                      <span>طلب خطاب القبول من {uni.name}</span>
                      <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border-2 border-green-500 text-green-700 hover:bg-green-50 px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center justify-center gap-2"
                    >
                      استشارة مجانية
                    </a>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-br from-green-800 to-green-900 text-white py-16 px-4 text-center">
        <GraduationCap size={48} className="mx-auto mb-4 text-green-300" />
        <h2 className="text-3xl font-bold mb-4">لم تجد ما تبحث عنه؟</h2>
        <p className="text-green-100 mb-8 max-w-xl mx-auto text-lg">
          تواصل معنا مجاناً وسنجد لك أفضل جامعة تناسب وضعك ومستواك وميزانيتك
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => go("uni-apply")}
            className="bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>📄</span>
            <span>اطلب Offer Letter الآن</span>
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2"
          >
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </div>
  );
}
