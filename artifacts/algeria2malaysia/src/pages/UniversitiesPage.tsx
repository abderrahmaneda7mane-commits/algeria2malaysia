import { ArrowLeft, CheckCircle, GraduationCap, MapPin, BookOpen, Building2 } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

const WA_LINK = "https://wa.me/601112200603";

function fmtEur(rm: number) {
  return Math.round(rm / 5).toLocaleString();
}

const UNIVERSITIES = [
  {
    id: "apu",
    name: "APU",
    nameAr: "جامعة آسيا باسيفيك",
    nameFull: "Asia Pacific University of Technology & Innovation",
    location: "كوالالمبور — Technology Park Malaysia",
    established: "1993",
    badge: "IT & Technology",
    badgeColor: "bg-blue-600",
    desc: "جامعة خاصة رائدة في مجال التكنولوجيا وتكنولوجيا المعلومات، تستقطب طلاباً من 130 دولة. تحتل مرتبة ممتازة على المستوى الآسيوي في تخصصات الحوسبة والهندسة.",
    campusImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Asia_Pacific_University_Technology_Park_Malaysia.jpg/1280px-Asia_Pacific_University_Technology_Park_Malaysia.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/d/d1/APU_Logo.svg",
    strengths: ["رائدة في IT والأمن السيبراني", "بيئة طلابية دولية 130+ دولة", "حرم عصري في Technology Park", "شراكات مع شركات تقنية عالمية"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["علوم الحاسوب", "هندسة البرمجيات", "تقنية المعلومات"] },
      { level: "البكالوريوس", duration: "3 سنوات", specialties: ["هندسة البرمجيات", "الأمن السيبراني", "الذكاء الاصطناعي", "هندسة الكمبيوتر", "الأعمال والتقنية"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["تكنولوجيا المعلومات", "علم البيانات", "الأمن السيبراني"] },
    ],
    pricing: [
      { label: "Foundation", rm: "14,000 – 16,000", eur: `${fmtEur(14000)} – ${fmtEur(16000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "18,000 – 28,000", eur: `${fmtEur(18000)} – ${fmtEur(28000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "22,000 – 35,000", eur: `${fmtEur(22000)} – ${fmtEur(35000)}`, note: "المجموع" },
    ],
    accentColor: "blue",
  },
  {
    id: "taylors",
    name: "Taylor's University",
    nameAr: "جامعة تايلور",
    nameFull: "Taylor's University Lakeside Campus",
    location: "سوبانج جايا — كوالالمبور",
    established: "1969",
    badge: "Top Ranked",
    badgeColor: "bg-purple-600",
    desc: "إحدى أعرق الجامعات الخاصة في ماليزيا وأعلاها تصنيفاً. تتميز بحرمها الجامعي الاستثنائي المطل على بحيرة صناعية، وبرامج معترف بها دولياً في الأعمال والضيافة والهندسة.",
    campusImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Taylor%27s_University_Lakeside_Campus.jpg/1280px-Taylor%27s_University_Lakeside_Campus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/38/Taylor%27s_University_logo.svg",
    strengths: ["الأعلى تصنيفاً بين الجامعات الخاصة", "حرم على بحيرة صناعية استثنائي", "برامج مزدوجة مع جامعات بريطانية", "قوية في الأعمال والضيافة والتصميم"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["علوم الطبيعية", "الأعمال والتكنولوجيا", "الفنون والتصميم"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["إدارة الأعمال", "الهندسة", "الضيافة والسياحة", "الطب والعلوم الصحية", "التصميم والفنون"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["إدارة الأعمال MBA", "التعليم", "هندسة البرمجيات"] },
    ],
    pricing: [
      { label: "Foundation", rm: "14,000 – 18,000", eur: `${fmtEur(14000)} – ${fmtEur(18000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "20,000 – 40,000", eur: `${fmtEur(20000)} – ${fmtEur(40000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "30,000 – 50,000", eur: `${fmtEur(30000)} – ${fmtEur(50000)}`, note: "المجموع" },
    ],
    accentColor: "purple",
  },
  {
    id: "mmu",
    name: "MMU",
    nameAr: "جامعة الوسائط المتعددة",
    nameFull: "Multimedia University",
    location: "سايبر جايا وملاكا",
    established: "1996",
    badge: "Technology",
    badgeColor: "bg-teal-600",
    desc: "جامعة تقنية حكومية متخصصة في علوم الحاسوب والهندسة والوسائط المتعددة. تمتلك حرمين: الأول في سايبر جايا (المدينة التقنية) والثاني في ملاكا.",
    campusImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/MMU_Cyberjaya.jpg/1280px-MMU_Cyberjaya.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/3e/Multimedia_University_logo.svg",
    strengths: ["متخصصة في التكنولوجيا والهندسة", "حرم سايبر جايا الرقمية", "برامج هندسة الاتصالات والكهرباء", "ترتبط بشركة Telekom Malaysia"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["علوم الحاسوب", "هندسة كهربائية", "الوسائط المتعددة"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["هندسة البرمجيات", "هندسة الاتصالات", "تكنولوجيا المعلومات", "الذكاء الاصطناعي", "الوسائط الإبداعية"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["علوم الحاسوب", "هندسة الكهرباء", "الوسائط المتعددة"] },
    ],
    pricing: [
      { label: "Foundation", rm: "10,000 – 13,000", eur: `${fmtEur(10000)} – ${fmtEur(13000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "14,000 – 22,000", eur: `${fmtEur(14000)} – ${fmtEur(22000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "20,000 – 28,000", eur: `${fmtEur(20000)} – ${fmtEur(28000)}`, note: "المجموع" },
    ],
    accentColor: "teal",
  },
  {
    id: "unikl",
    name: "UniKL",
    nameAr: "جامعة كوالالمبور",
    nameFull: "Universiti Kuala Lumpur",
    location: "كوالالمبور (11 حرم تقني)",
    established: "2002",
    badge: "Engineering",
    badgeColor: "bg-orange-600",
    desc: "جامعة تقنية حكومية تضم 11 حرماً متخصصاً في مختلف قطاعات الهندسة التطبيقية. تُركز على التعليم التقني المهني بالتعاون مع الصناعة الماليزية.",
    campusImg: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1280&q=85",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/e2/UniKL_Logo.svg",
    strengths: ["11 حرم في 8 ولايات ماليزية", "مرتبطة بالصناعة التقنية الوطنية", "برامج هندسة تطبيقية متخصصة", "رسوم دراسية معقولة"],
    programs: [
      { level: "الدبلوم", duration: "2-3 سنوات", specialties: ["هندسة ميكانيكية", "هندسة مدنية", "هندسة كهربائية"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["هندسة ميكانيكية", "هندسة الطيران", "هندسة النفط والغاز", "هندسة التصنيع"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["هندسة الميكاترونيك", "هندسة الصناعة"] },
    ],
    pricing: [
      { label: "الدبلوم", rm: "8,000 – 12,000", eur: `${fmtEur(8000)} – ${fmtEur(12000)}`, note: "سنوياً" },
      { label: "البكالوريوس", rm: "10,000 – 16,000", eur: `${fmtEur(10000)} – ${fmtEur(16000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "15,000 – 22,000", eur: `${fmtEur(15000)} – ${fmtEur(22000)}`, note: "المجموع" },
    ],
    accentColor: "orange",
  },
  {
    id: "lincoln",
    name: "Lincoln University",
    nameAr: "جامعة لينكولن",
    nameFull: "Lincoln University College",
    location: "بيتالينغ جايا — سيلانغور",
    established: "2002",
    badge: "Affordable",
    badgeColor: "bg-green-600",
    desc: "جامعة خاصة معتمدة تتميز بتنوع برامجها وأسعارها المعقولة. تجمع بين الجودة الأكاديمية والمرونة في القبول، مما يجعلها خياراً مميزاً للطلاب الدوليين.",
    campusImg: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1280&q=85",
    logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=200&q=80",
    strengths: ["أسعار دراسية في متناول الجميع", "قبول مرن للطلاب الدوليين", "تخصصات متنوعة وواسعة", "دعم قوي للطلاب العرب"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["الصحة والعلوم", "الأعمال والتكنولوجيا"] },
      { level: "البكالوريوس", duration: "3 سنوات", specialties: ["إدارة الأعمال", "الهندسة", "علوم الحاسوب", "التمريض والصحة", "الصيدلة", "القانون"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["MBA", "الصحة العامة", "هندسة البرمجيات"] },
    ],
    pricing: [
      { label: "Foundation", rm: "7,000 – 10,000", eur: `${fmtEur(7000)} – ${fmtEur(10000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "8,000 – 14,000", eur: `${fmtEur(8000)} – ${fmtEur(14000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "14,000 – 20,000", eur: `${fmtEur(14000)} – ${fmtEur(20000)}`, note: "المجموع" },
    ],
    accentColor: "green",
  },
  {
    id: "utp",
    name: "UTP",
    nameAr: "جامعة بتروناس للتكنولوجيا",
    nameFull: "Universiti Teknologi PETRONAS",
    location: "سيري إسكندر — بيراك",
    established: "1997",
    badge: "Top Engineering",
    badgeColor: "bg-yellow-600",
    desc: "جامعة هندسية حكومية تُعدّ من أفضل الجامعات الهندسية في ماليزيا وجنوب شرق آسيا. تأسست من قِبَل شركة بتروناس النفطية وتتخصص في الهندسة والتكنولوجيا.",
    campusImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/UTPcampus.jpg/1280px-UTPcampus.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/0/09/UTP_logo.svg",
    strengths: ["من أفضل جامعات الهندسة في آسيا", "منح دراسية متاحة", "بحث علمي في قطاع النفط والطاقة", "حرم جامعي ضخم ومتكامل"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم والهندسة", "الرياضيات والفيزياء"] },
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["هندسة البترول", "هندسة كيميائية", "هندسة الكمبيوتر", "هندسة مدنية", "هندسة الميكانيك"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["هندسة البترول", "هندسة الطاقة", "علوم التقنية"] },
    ],
    pricing: [
      { label: "Foundation", rm: "8,000 – 11,000", eur: `${fmtEur(8000)} – ${fmtEur(11000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "14,000 – 20,000", eur: `${fmtEur(14000)} – ${fmtEur(20000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "20,000 – 30,000", eur: `${fmtEur(20000)} – ${fmtEur(30000)}`, note: "المجموع" },
    ],
    accentColor: "yellow",
  },
  {
    id: "upm",
    name: "UPM",
    nameAr: "جامعة بوترا ماليزيا",
    nameFull: "Universiti Putra Malaysia",
    location: "سيردانغ — سيلانغور",
    established: "1931",
    badge: "Research",
    badgeColor: "bg-emerald-600",
    desc: "إحدى أعرق الجامعات الحكومية الماليزية وأكثرها نشاطاً في البحث العلمي. تتميز بحرمها الجامعي الأخضر الواسع وبرامجها المتنوعة في العلوم والزراعة والهندسة.",
    campusImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/UPM_Serdang.jpg/1280px-UPM_Serdang.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/e/e4/Universiti_Putra_Malaysia.svg",
    strengths: ["ضمن أفضل 300 جامعة عالمياً (QS)", "حرم جامعي أخضر ضخم 1200 هكتار", "رائدة في علوم الزراعة والبيئة", "رسوم معقولة بوصفها جامعة حكومية"],
    programs: [
      { level: "البكالوريوس", duration: "4 سنوات", specialties: ["الزراعة والغذاء", "هندسة مدنية وبيئية", "علوم الحاسوب", "الطب البيطري", "الصيدلة والعلوم الصحية"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["علوم الزراعة", "الهندسة البيئية", "إدارة الأعمال MBA"] },
      { level: "الدكتوراه", duration: "3-5 سنوات", specialties: ["العلوم الزراعية", "الهندسة", "علوم الحياة"] },
    ],
    pricing: [
      { label: "البكالوريوس (دولي)", rm: "7,000 – 14,000", eur: `${fmtEur(7000)} – ${fmtEur(14000)}`, note: "سنوياً" },
      { label: "الماستر (دولي)", rm: "10,000 – 18,000", eur: `${fmtEur(10000)} – ${fmtEur(18000)}`, note: "المجموع" },
      { label: "الدكتوراه (دولي)", rm: "15,000 – 25,000", eur: `${fmtEur(15000)} – ${fmtEur(25000)}`, note: "سنوياً" },
    ],
    accentColor: "emerald",
  },
  {
    id: "um",
    name: "UM",
    nameAr: "جامعة مالايا",
    nameFull: "Universiti Malaya",
    location: "كوالالمبور",
    established: "1905",
    badge: "#1 Malaysia",
    badgeColor: "bg-red-700",
    desc: "الجامعة رقم 1 في ماليزيا وإحدى أعرق جامعات آسيا. تأسست عام 1905 وتحتل مرتبة ممتازة في التصنيفات العالمية. تضم أكثر من 22 كلية ومعهداً متخصصاً.",
    campusImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/University_of_Malaya_Library.jpg/1280px-University_of_Malaya_Library.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/3/31/Logo_UM.svg",
    strengths: ["#1 في ماليزيا (QS World Rankings)", "ضمن أفضل 200 جامعة عالمياً", "تأسست 1905 — أعرق جامعة ماليزية", "أكثر من 22 كلية ومعهداً متخصصاً"],
    programs: [
      { level: "البكالوريوس", duration: "3-5 سنوات", specialties: ["الطب والجراحة MBBS", "القانون", "الهندسة بأنواعها", "علوم الحاسوب", "العلوم الإنسانية", "الأعمال والاقتصاد"] },
      { level: "الماستر", duration: "1.5-2 سنة", specialties: ["MBA", "العلوم الطبية", "الهندسة", "التربية والتعليم"] },
      { level: "الدكتوراه", duration: "3-5 سنوات", specialties: ["تخصصات بحثية متنوعة"] },
    ],
    pricing: [
      { label: "البكالوريوس (دولي)", rm: "6,000 – 16,000", eur: `${fmtEur(6000)} – ${fmtEur(16000)}`, note: "سنوياً" },
      { label: "الماستر (دولي)", rm: "10,000 – 20,000", eur: `${fmtEur(10000)} – ${fmtEur(20000)}`, note: "المجموع" },
      { label: "الدكتوراه (دولي)", rm: "12,000 – 22,000", eur: `${fmtEur(12000)} – ${fmtEur(22000)}`, note: "سنوياً" },
    ],
    accentColor: "red",
  },
  {
    id: "ucsi",
    name: "UCSI University",
    nameAr: "جامعة UCSI",
    nameFull: "UCSI University",
    location: "شيراس — كوالالمبور",
    established: "1986",
    badge: "Medicine & Business",
    badgeColor: "bg-pink-600",
    desc: "جامعة خاصة راسخة تتميز ببرامج الطب والعلوم الصحية والأعمال. تمتلك مستشفى تعليمياً خاصاً وتُعدّ من أفضل الجامعات في ماليزيا في مجال العلوم الطبية.",
    campusImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/UCSI_University.jpg/1280px-UCSI_University.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/2/25/UCSI_University_logo.svg",
    strengths: ["برنامج MBBS الطب معتمد دولياً", "مستشفى تعليمي خاص", "قوية في الصيدلة والتمريض", "اعتماد من هيئات طبية بريطانية وأمريكية"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبية", "الأعمال والفنون"] },
      { level: "البكالوريوس", duration: "3-5 سنوات", specialties: ["الطب والجراحة MBBS", "الصيدلة", "التمريض", "طب الأسنان", "إدارة الأعمال", "تكنولوجيا المعلومات"] },
      { level: "الماستر", duration: "1.5-3 سنة", specialties: ["الطب التخصصي", "إدارة الأعمال MBA", "الصحة العامة"] },
    ],
    pricing: [
      { label: "Foundation", rm: "12,000 – 15,000", eur: `${fmtEur(12000)} – ${fmtEur(15000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "15,000 – 55,000", eur: `${fmtEur(15000)} – ${fmtEur(55000)}`, note: "سنوياً (الطب أعلى)" },
      { label: "الماستر", rm: "25,000 – 60,000", eur: `${fmtEur(25000)} – ${fmtEur(60000)}`, note: "المجموع" },
    ],
    accentColor: "pink",
  },
  {
    id: "sunway",
    name: "Sunway University",
    nameAr: "جامعة صنواي",
    nameFull: "Sunway University",
    location: "بانغسار — كوالالمبور",
    established: "1987",
    badge: "Modern Campus",
    badgeColor: "bg-indigo-600",
    desc: "جامعة خاصة حديثة تقع في قلب مدينة صنواي المتكاملة. تتميز بشراكاتها مع جامعة لانكستر البريطانية وتقدم برامج مزدوجة معترفاً بها عالمياً.",
    campusImg: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Sunway_University.jpg/1280px-Sunway_University.jpg",
    logo: "https://upload.wikimedia.org/wikipedia/en/1/18/Sunway_University_Logo.svg",
    strengths: ["شراكة مع جامعة لانكستر البريطانية", "موقع مثالي داخل مدينة متكاملة", "برامج مزدوجة بشهادات بريطانية", "بيئة طلابية نابضة بالحياة"],
    programs: [
      { level: "Foundation", duration: "1 سنة", specialties: ["العلوم الطبيعية", "الأعمال والإدارة", "الفنون والتصميم"] },
      { level: "البكالوريوس", duration: "3-4 سنوات", specialties: ["إدارة الأعمال", "الهندسة", "علوم الحاسوب", "الطب النفسي والتمريض", "المحاسبة والمال", "التصميم الجرافيكي"] },
      { level: "الماستر", duration: "1-2 سنة", specialties: ["MBA", "هندسة البرمجيات", "علم النفس التطبيقي"] },
    ],
    pricing: [
      { label: "Foundation", rm: "14,000 – 17,000", eur: `${fmtEur(14000)} – ${fmtEur(17000)}`, note: "السنة الأولى" },
      { label: "البكالوريوس", rm: "18,000 – 36,000", eur: `${fmtEur(18000)} – ${fmtEur(36000)}`, note: "سنوياً" },
      { label: "الماستر", rm: "25,000 – 45,000", eur: `${fmtEur(25000)} – ${fmtEur(45000)}`, note: "المجموع" },
    ],
    accentColor: "indigo",
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
  red:     { border: "border-red-400",     badge: "bg-red-700",     text: "text-red-700",     bg: "bg-red-50" },
  pink:    { border: "border-pink-400",    badge: "bg-pink-600",    text: "text-pink-700",    bg: "bg-pink-50" },
  indigo:  { border: "border-indigo-400",  badge: "bg-indigo-600",  text: "text-indigo-700",  bg: "bg-indigo-50" },
};

export default function UniversitiesPage() {
  const { go } = useNavigate();

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
        <h1 className="text-4xl md:text-5xl font-bold mb-4">10 جامعات ماليزية معتمدة</h1>
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
        {UNIVERSITIES.map((uni, idx) => {
          const accent = accentMap[uni.accentColor] || accentMap.green;
          const isEven = idx % 2 === 0;
          return (
            <section key={uni.id} id={uni.id} className="scroll-mt-20">
              {/* Top card */}
              <div className={`rounded-3xl overflow-hidden border-2 ${accent.border} shadow-xl`}>
                {/* Campus photo */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={uni.campusImg}
                    alt={`${uni.name} campus`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1562774053-701939374585?w=1280&q=80";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Logo overlay */}
                  <div className="absolute top-4 right-4 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center p-1 overflow-hidden">
                    <img
                      src={uni.logo}
                      alt={`${uni.name} logo`}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const el = e.target as HTMLImageElement;
                        el.style.display = "none";
                        const parent = el.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-gray-800 font-black text-xs text-center leading-tight px-1">${uni.name}</span>`;
                        }
                      }}
                    />
                  </div>
                  {/* Badge */}
                  <div className={`absolute top-4 left-4 ${accent.badge} text-white text-xs font-bold px-3 py-1.5 rounded-full`}>
                    {uni.badge}
                  </div>
                  {/* Title overlay */}
                  <div className="absolute bottom-0 right-0 left-0 p-6">
                    <h2 className="text-3xl font-black text-white mb-1">{uni.nameAr}</h2>
                    <p className="text-white/80 text-sm font-medium">{uni.nameFull}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 bg-white">
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Left: Description + Location + Strengths */}
                    <div>
                      <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                        <MapPin size={14} />
                        <span>{uni.location}</span>
                        <span className="mx-2">•</span>
                        <GraduationCap size={14} />
                        <span>تأسست {uni.established}</span>
                      </div>
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
                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => go("apply", { type: "university" })}
                      className={`flex-1 ${accent.badge} hover:opacity-90 text-white px-6 py-3 rounded-full font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group`}
                    >
                      <Building2 size={16} />
                      <span>التقديم لـ {uni.name}</span>
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
            onClick={() => go("apply", { type: "university" })}
            className="bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-lg flex items-center justify-center gap-2 group"
          >
            <span>قدّم الآن</span>
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
