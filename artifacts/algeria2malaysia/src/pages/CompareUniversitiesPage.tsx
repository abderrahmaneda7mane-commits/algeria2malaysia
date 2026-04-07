import { useState } from "react";
import {
  ArrowLeft, CheckCircle, MapPin, Calendar, DollarSign,
  Star, BookOpen, FileText, X, BarChart2, ChevronDown, ChevronUp
} from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

function fmtEur(rm: number) { return Math.round(rm / 5).toLocaleString(); }

const UNIVERSITIES = [
  {
    id: "apu", name: "APU", nameAr: "جامعة APU",
    nameFull: "Asia Pacific University",
    location: "كوالالمبور — Technology Park", established: "1993",
    type: "خاصة", badge: "IT & Technology", badgeColor: "bg-blue-600",
    logo: "/logos/apu.png", accent: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", btn: "bg-blue-600 hover:bg-blue-700" },
    strengths: ["رائدة في IT والأمن السيبراني والذكاء الاصطناعي", "130+ جنسية في الحرم", "شراكات مع IBM وMicrosoft وOracle"],
    levels: ["Foundation (1 سنة)", "البكالوريوس (3 سنوات)", "الماستر (1-2 سنة)"],
    pricing: [
      { label: "Foundation", rm: "15,000–17,500", eur: `${fmtEur(15000)}–${fmtEur(17500)}` },
      { label: "البكالوريوس", rm: "19,000–30,000", eur: `${fmtEur(19000)}–${fmtEur(30000)}` },
      { label: "الماستر", rm: "24,000–38,000", eur: `${fmtEur(24000)}–${fmtEur(38000)}` },
    ],
    uniKey: "APU",
  },
  {
    id: "taylors", name: "Taylor's", nameAr: "جامعة تايلور",
    nameFull: "Taylor's University",
    location: "سوبانج جايا — سيلانغور", established: "1969",
    type: "خاصة", badge: "Top Ranked", badgeColor: "bg-purple-600",
    logo: "/logos/taylors.png", accent: { text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200", btn: "bg-purple-600 hover:bg-purple-700" },
    strengths: ["الأعلى تصنيفاً خاصة (QS 2025)", "حرم مطل على بحيرة صناعية", "برامج مزدوجة مع جامعات UK وأستراليا"],
    levels: ["Foundation (1 سنة)", "البكالوريوس (3-4 سنوات)", "الماستر (1-2 سنة)"],
    pricing: [
      { label: "Foundation", rm: "15,000–19,000", eur: `${fmtEur(15000)}–${fmtEur(19000)}` },
      { label: "البكالوريوس", rm: "22,000–42,000", eur: `${fmtEur(22000)}–${fmtEur(42000)}` },
      { label: "الماستر", rm: "32,000–55,000", eur: `${fmtEur(32000)}–${fmtEur(55000)}` },
    ],
    uniKey: "Taylor's University",
  },
  {
    id: "mmu", name: "MMU", nameAr: "جامعة MMU",
    nameFull: "Multimedia University",
    location: "سايبر جايا وملاكا", established: "1996",
    type: "شبه حكومية", badge: "Technology", badgeColor: "bg-teal-600",
    logo: "/logos/mmu.png", accent: { text: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200", btn: "bg-teal-600 hover:bg-teal-700" },
    strengths: ["متخصصة في التكنولوجيا والهندسة الكهربائية", "حرم سايبر جايا عاصمة التقنية", "مرتبطة رسمياً بـ Telekom Malaysia"],
    levels: ["Foundation (1 سنة)", "البكالوريوس (3-4 سنوات)", "الماستر (1-2 سنة)"],
    pricing: [
      { label: "Foundation", rm: "11,000–14,000", eur: `${fmtEur(11000)}–${fmtEur(14000)}` },
      { label: "البكالوريوس", rm: "15,000–24,000", eur: `${fmtEur(15000)}–${fmtEur(24000)}` },
      { label: "الماستر", rm: "22,000–32,000", eur: `${fmtEur(22000)}–${fmtEur(32000)}` },
    ],
    uniKey: "MMU",
  },
  {
    id: "unikl", name: "UniKL", nameAr: "جامعة UniKL",
    nameFull: "Universiti Kuala Lumpur",
    location: "كوالالمبور (11 حرم)", established: "2002",
    type: "حكومية", badge: "Engineering", badgeColor: "bg-orange-600",
    logo: "/logos/unikl.png", accent: { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", btn: "bg-orange-600 hover:bg-orange-700" },
    strengths: ["11 حرم متخصص في 8 ولايات", "تدريب عملي مباشر مع الصناعة", "هندسة طيران ونفط وتصنيع"],
    levels: ["الدبلوم (2.5-3 سنوات)", "البكالوريوس (4 سنوات)", "الماستر (1.5-2 سنة)"],
    pricing: [
      { label: "الدبلوم", rm: "9,000–13,000", eur: `${fmtEur(9000)}–${fmtEur(13000)}` },
      { label: "البكالوريوس", rm: "11,000–17,000", eur: `${fmtEur(11000)}–${fmtEur(17000)}` },
      { label: "الماستر", rm: "16,000–24,000", eur: `${fmtEur(16000)}–${fmtEur(24000)}` },
    ],
    uniKey: "UniKL",
  },
  {
    id: "lincoln", name: "Lincoln", nameAr: "جامعة لينكولن",
    nameFull: "Lincoln University College",
    location: "بيتالينغ جايا — سيلانغور", established: "2002",
    type: "خاصة", badge: "Affordable", badgeColor: "bg-green-600",
    logo: "/logos/lincoln.png", accent: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200", btn: "bg-green-600 hover:bg-green-700" },
    strengths: ["رسوم تنافسية ومناسبة للعرب", "قبول مرن وإجراءات سريعة", "طب وصيدلة وهندسة وقانون"],
    levels: ["Foundation (1 سنة)", "البكالوريوس (3-4 سنوات)", "الماستر (1.5-2 سنة)"],
    pricing: [
      { label: "Foundation", rm: "7,500–11,000", eur: `${fmtEur(7500)}–${fmtEur(11000)}` },
      { label: "البكالوريوس", rm: "9,000–15,000", eur: `${fmtEur(9000)}–${fmtEur(15000)}` },
      { label: "الماستر", rm: "15,000–22,000", eur: `${fmtEur(15000)}–${fmtEur(22000)}` },
    ],
    uniKey: "Lincoln University",
  },
  {
    id: "utp", name: "UTP", nameAr: "جامعة UTP",
    nameFull: "Universiti Teknologi PETRONAS",
    location: "سيري إسكندر — بيراك", established: "1997",
    type: "حكومية", badge: "Top Engineering", badgeColor: "bg-yellow-600",
    logo: "/logos/utp.png", accent: { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-300", btn: "bg-yellow-600 hover:bg-yellow-700" },
    strengths: ["أفضل هندسة في آسيا (QS)", "مدعومة من بتروناس", "منح جزئية وكاملة متاحة"],
    levels: ["Foundation (1 سنة)", "البكالوريوس (4 سنوات)", "الماستر (1.5-2 سنة)"],
    pricing: [
      { label: "Foundation", rm: "9,000–12,000", eur: `${fmtEur(9000)}–${fmtEur(12000)}` },
      { label: "البكالوريوس", rm: "15,000–22,000", eur: `${fmtEur(15000)}–${fmtEur(22000)}` },
      { label: "الماستر", rm: "22,000–32,000", eur: `${fmtEur(22000)}–${fmtEur(32000)}` },
    ],
    uniKey: "UTP",
  },
  {
    id: "upm", name: "UPM", nameAr: "جامعة UPM",
    nameFull: "Universiti Putra Malaysia",
    location: "سيردانغ — سيلانغور", established: "1931",
    type: "حكومية", badge: "Research", badgeColor: "bg-emerald-600",
    logo: "/logos/upm.png", accent: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", btn: "bg-emerald-600 hover:bg-emerald-700" },
    strengths: ["أفضل 150 جامعة في آسيا (QS 2025)", "حرم أخضر 1200 هكتار", "رائدة في الزراعة والعلوم البيئية"],
    levels: ["البكالوريوس (4 سنوات)", "الماستر (1.5-2 سنة)", "الدكتوراه (3-5 سنوات)"],
    pricing: [
      { label: "البكالوريوس", rm: "8,000–16,000", eur: `${fmtEur(8000)}–${fmtEur(16000)}` },
      { label: "الماستر", rm: "12,000–20,000", eur: `${fmtEur(12000)}–${fmtEur(20000)}` },
      { label: "الدكتوراه", rm: "16,000–28,000", eur: `${fmtEur(16000)}–${fmtEur(28000)}` },
    ],
    uniKey: "UPM",
  },
  {
    id: "utm", name: "UTM", nameAr: "جامعة UTM",
    nameFull: "Universiti Teknologi Malaysia",
    location: "جوهور بهرو وكوالالمبور", established: "1904",
    type: "حكومية", badge: "Engineering", badgeColor: "bg-sky-600",
    logo: "/logos/utm.png", accent: { text: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200", btn: "bg-sky-600 hover:bg-sky-700" },
    strengths: ["أعرق جامعة هندسية منذ 1904", "حرمان: جوهور بهرو + كوالالمبور", "بحث علمي وشراكات صناعية دولية"],
    levels: ["البكالوريوس (4 سنوات)", "الماستر (1.5-2 سنة)", "الدكتوراه (3-5 سنوات)"],
    pricing: [
      { label: "البكالوريوس", rm: "12,000–20,000", eur: `${fmtEur(12000)}–${fmtEur(20000)}` },
      { label: "الماستر", rm: "15,000–25,000", eur: `${fmtEur(15000)}–${fmtEur(25000)}` },
      { label: "الدكتوراه", rm: "18,000–30,000", eur: `${fmtEur(18000)}–${fmtEur(30000)}` },
    ],
    uniKey: "UTM",
  },
  {
    id: "utem", name: "UTeM", nameAr: "جامعة UTeM",
    nameFull: "Universiti Teknikal Malaysia Melaka",
    location: "دوريان تونغال — ملاكا", established: "2000",
    type: "حكومية", badge: "Technical", badgeColor: "bg-rose-600",
    logo: "/logos/utem.png", accent: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", btn: "bg-rose-600 hover:bg-rose-700" },
    strengths: ["هندسة تقنية تطبيقية متخصصة", "رائدة في التصنيع والإلكترونيك", "رسوم تنافسية كجامعة حكومية"],
    levels: ["البكالوريوس (4 سنوات)", "الماستر (1.5-2 سنة)", "الدكتوراه (3-5 سنوات)"],
    pricing: [
      { label: "البكالوريوس", rm: "8,000–14,000", eur: `${fmtEur(8000)}–${fmtEur(14000)}` },
      { label: "الماستر", rm: "12,000–20,000", eur: `${fmtEur(12000)}–${fmtEur(20000)}` },
      { label: "الدكتوراه", rm: "15,000–24,000", eur: `${fmtEur(15000)}–${fmtEur(24000)}` },
    ],
    uniKey: "UTeM",
  },
  {
    id: "ucsi", name: "UCSI", nameAr: "جامعة UCSI",
    nameFull: "UCSI University",
    location: "شيراس — كوالالمبور", established: "1986",
    type: "خاصة", badge: "Medicine & Business", badgeColor: "bg-pink-600",
    logo: "/logos/ucsi.png", accent: { text: "text-pink-700", bg: "bg-pink-50", border: "border-pink-200", btn: "bg-pink-600 hover:bg-pink-700" },
    strengths: ["MBBS معتمد UK/USA", "مستشفى تعليمي خاص", "ضمن أفضل 600 جامعة (QS 2025)"],
    levels: ["Foundation (1 سنة)", "البكالوريوس (3-5 سنوات)", "الماستر (1.5-3 سنوات)"],
    pricing: [
      { label: "Foundation", rm: "13,000–16,000", eur: `${fmtEur(13000)}–${fmtEur(16000)}` },
      { label: "البكالوريوس", rm: "17,000–62,000", eur: `${fmtEur(17000)}–${fmtEur(62000)}` },
      { label: "الماستر", rm: "28,000–68,000", eur: `${fmtEur(28000)}–${fmtEur(68000)}` },
    ],
    uniKey: "UCSI University",
  },
  {
    id: "sunway", name: "Sunway", nameAr: "جامعة صنواي",
    nameFull: "Sunway University",
    location: "بانغار سيري بيتالينغ — كوالالمبور", established: "1987",
    type: "خاصة", badge: "Modern Campus", badgeColor: "bg-indigo-600",
    logo: "/logos/sunway.png", accent: { text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200", btn: "bg-indigo-600 hover:bg-indigo-700" },
    strengths: ["شراكة حصرية مع جامعة لانكستر (#127 عالمياً)", "درجات بريطانية معترف بها", "حرم حديث متكامل في مدينة صنواي"],
    levels: ["Foundation (1 سنة)", "البكالوريوس (3-4 سنوات)", "الماستر (1-2 سنة)"],
    pricing: [
      { label: "Foundation", rm: "15,000–18,500", eur: `${fmtEur(15000)}–${fmtEur(18500)}` },
      { label: "البكالوريوس", rm: "20,000–38,000", eur: `${fmtEur(20000)}–${fmtEur(38000)}` },
      { label: "الماستر", rm: "28,000–50,000", eur: `${fmtEur(28000)}–${fmtEur(50000)}` },
    ],
    uniKey: "Sunway University",
  },
  {
    id: "cityu", name: "City U", nameAr: "جامعة City University",
    nameFull: "City University Malaysia",
    location: "بيتالينغ جايا — سيلانغور", established: "1984",
    type: "خاصة", badge: "Engineering & Law", badgeColor: "bg-red-600",
    logo: "/logos/cityu.png", accent: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200", btn: "bg-red-600 hover:bg-red-700" },
    strengths: ["معتمدة من MQA", "تخصصات قانونية وهندسية وتقنية", "رسوم تنافسية قريب من كوالالمبور"],
    levels: ["Foundation (1 سنة)", "البكالوريوس (3-4 سنوات)", "الماستر (1-2 سنة)"],
    pricing: [
      { label: "Foundation", rm: "8,000–12,000", eur: `${fmtEur(8000)}–${fmtEur(12000)}` },
      { label: "البكالوريوس", rm: "12,000–20,000", eur: `${fmtEur(12000)}–${fmtEur(20000)}` },
      { label: "الماستر", rm: "15,000–26,000", eur: `${fmtEur(15000)}–${fmtEur(26000)}` },
    ],
    uniKey: "City University",
  },
];

const MAX_SELECT = 3;

const GOOGLE_FORM_UNIVERSITY = "https://docs.google.com/forms/d/e/1FAIpQLSc8aVYOjwvoI_5aOoum-9Ko4JD-Fa4Hlr99-FfNRFhSKVDOBQ/viewform";

export default function CompareUniversitiesPage() {
  const { go } = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [comparing, setComparing] = useState(false);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  function toggleSelect(id: string) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < MAX_SELECT ? [...prev, id] : prev
    );
  }

  const selectedUnis = UNIVERSITIES.filter(u => selected.includes(u.id));

  /* ─── Selection Screen ─── */
  if (!comparing) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 pt-10 pb-14 px-4">
          <div className="max-w-5xl mx-auto">
            <button onClick={() => go("universities")} className="flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-5 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              الجامعات
            </button>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <BarChart2 size={20} className="text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">قارن بين الجامعات</h1>
            </div>
            <p className="text-green-200 text-sm mt-1 mr-13">
              اختر من 2 إلى 3 جامعات لمقارنتها جنباً إلى جنب
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 -mt-5 pb-24">
          {/* Selection counter + CTA */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 mb-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                      selectedUnis[i]
                        ? `${selectedUnis[i].accent.bg} ${selectedUnis[i].accent.border}`
                        : "border-dashed border-gray-300 bg-gray-50"
                    }`}
                  >
                    {selectedUnis[i] ? (
                      <img src={selectedUnis[i].logo} alt="" className="w-5 h-5 object-contain" />
                    ) : (
                      <span className="text-gray-300 text-xs font-bold">{i + 1}</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {selected.length === 0
                  ? "لم تختر أي جامعة بعد"
                  : selected.length === 1
                  ? "اختر جامعة أخرى على الأقل"
                  : `${selected.length} جامعات مختارة`}
              </p>
            </div>
            <button
              onClick={() => setComparing(true)}
              disabled={selected.length < 2}
              className="bg-green-700 hover:bg-green-800 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2"
            >
              <BarChart2 size={16} />
              قارن الآن
            </button>
          </div>

          {/* University grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {UNIVERSITIES.map(uni => {
              const isSelected = selected.includes(uni.id);
              const isDisabled = !isSelected && selected.length >= MAX_SELECT;
              return (
                <button
                  key={uni.id}
                  onClick={() => !isDisabled && toggleSelect(uni.id)}
                  className={`relative p-4 rounded-2xl border-2 transition-all text-center group ${
                    isSelected
                      ? `${uni.accent.bg} ${uni.accent.border} shadow-md`
                      : isDisabled
                      ? "border-gray-100 bg-gray-50 opacity-40 cursor-not-allowed"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
                  }`}
                >
                  {isSelected && (
                    <div className={`absolute top-2 left-2 w-5 h-5 rounded-full ${uni.accent.btn.split(" ")[0]} flex items-center justify-center`}>
                      <CheckCircle size={13} className="text-white" />
                    </div>
                  )}
                  <div className="w-12 h-12 bg-white rounded-xl mx-auto mb-2 flex items-center justify-center shadow-sm p-1.5">
                    <img src={uni.logo} alt={uni.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <p className={`font-bold text-sm ${isSelected ? uni.accent.text : "text-gray-800"}`}>{uni.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5 leading-tight">{uni.established}</p>
                  <span className={`inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full font-medium text-white ${uni.badgeColor}`}>
                    {uni.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  /* ─── Comparison Table ─── */
  const rows: { key: string; label: string; icon: React.ReactNode; render: (u: typeof UNIVERSITIES[0]) => React.ReactNode }[] = [
    {
      key: "location", label: "الموقع", icon: <MapPin size={15} />,
      render: u => <span className="text-sm text-gray-700">{u.location}</span>,
    },
    {
      key: "established", label: "تأسست", icon: <Calendar size={15} />,
      render: u => <span className="text-sm font-semibold text-gray-800">{u.established}</span>,
    },
    {
      key: "type", label: "نوع الجامعة", icon: <BookOpen size={15} />,
      render: u => (
        <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full text-white ${u.type === "حكومية" ? "bg-green-600" : u.type === "شبه حكومية" ? "bg-teal-600" : "bg-blue-500"}`}>
          {u.type}
        </span>
      ),
    },
    {
      key: "strengths", label: "المميزات الرئيسية", icon: <Star size={15} />,
      render: u => (
        <ul className="space-y-1">
          {u.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-1.5 text-xs text-gray-700">
              <CheckCircle size={12} className={`${u.accent.text} flex-shrink-0 mt-0.5`} />
              {s}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "levels", label: "المستويات", icon: <BookOpen size={15} />,
      render: u => (
        <ul className="space-y-1">
          {u.levels.map((l, i) => (
            <li key={i} className="text-xs text-gray-700 flex items-center gap-1">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${u.accent.btn.split(" ")[0]}`} />
              {l}
            </li>
          ))}
        </ul>
      ),
    },
    {
      key: "pricing", label: "الرسوم السنوية", icon: <DollarSign size={15} />,
      render: u => (
        <div className="space-y-2">
          {u.pricing.map((p, i) => (
            <div key={i} className={`rounded-xl px-3 py-2 ${u.accent.bg} border ${u.accent.border}`}>
              <p className={`text-xs font-bold ${u.accent.text}`}>{p.label}</p>
              <p className="text-sm font-bold text-gray-900">{p.rm} RM</p>
              <p className="text-xs text-gray-500">≈ {p.eur} €</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 pt-10 pb-14 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setComparing(false)}
            className="flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-5 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            تغيير الاختيار
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <BarChart2 size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">مقارنة الجامعات</h1>
          </div>
          <p className="text-green-200 text-sm mt-1">
            {selectedUnis.map(u => u.name).join(" · ")}
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-2 sm:px-4 -mt-5 pb-16">
        {/* University header row */}
        <div className={`grid gap-2 mb-2`} style={{ gridTemplateColumns: `180px repeat(${selectedUnis.length}, 1fr)` }}>
          <div /> {/* empty top-left cell */}
          {selectedUnis.map(uni => (
            <div key={uni.id} className={`bg-white rounded-2xl shadow-lg border-2 ${uni.accent.border} p-4 text-center`}>
              <button
                onClick={() => { setSelected(prev => prev.filter(x => x !== uni.id)); setComparing(false); }}
                className="absolute-free float-right text-gray-300 hover:text-red-500 transition-colors"
              >
                <X size={14} />
              </button>
              <div className="w-14 h-14 bg-white rounded-2xl mx-auto mb-2 flex items-center justify-center shadow-sm p-1.5 border border-gray-100">
                <img src={uni.logo} alt={uni.name} className="max-w-full max-h-full object-contain" />
              </div>
              <p className={`font-bold text-sm ${uni.accent.text}`}>{uni.nameAr}</p>
              <p className="text-xs text-gray-400 mt-0.5">{uni.nameFull}</p>
            </div>
          ))}
        </div>

        {/* Comparison rows */}
        <div className="space-y-2">
          {rows.map(row => {
            const isExpanded = expandedRow === row.key;
            return (
              <div key={row.key} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Row header — collapsible on mobile */}
                <button
                  onClick={() => setExpandedRow(isExpanded ? null : row.key)}
                  className="w-full flex items-center justify-between px-4 py-3 md:cursor-default"
                >
                  <div className="flex items-center gap-2 text-gray-700 font-bold text-sm">
                    <span className="text-green-600">{row.icon}</span>
                    {row.label}
                  </div>
                  <span className="md:hidden text-gray-400">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </span>
                </button>

                {/* Row content */}
                <div
                  className={`grid gap-0 border-t border-gray-100 md:grid`}
                  style={{ gridTemplateColumns: `180px repeat(${selectedUnis.length}, 1fr)`, display: isExpanded || typeof window !== "undefined" ? undefined : "none" }}
                >
                  {/* Label column */}
                  <div className="hidden md:flex items-center px-4 py-4 bg-gray-50 border-r border-gray-100">
                    <div className="flex items-center gap-2 text-gray-600 font-semibold text-sm">
                      <span className="text-green-600">{row.icon}</span>
                      {row.label}
                    </div>
                  </div>
                  {/* Value columns */}
                  {selectedUnis.map((uni, i) => (
                    <div
                      key={uni.id}
                      className={`px-4 py-4 ${i < selectedUnis.length - 1 ? "border-l border-gray-100" : ""}`}
                    >
                      {row.render(uni)}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Apply buttons */}
        <div
          className="grid gap-2 mt-4"
          style={{ gridTemplateColumns: `180px repeat(${selectedUnis.length}, 1fr)` }}
        >
          <div className="hidden md:flex items-center px-4">
            <span className="text-sm font-bold text-gray-700">طلب القبول</span>
          </div>
          {selectedUnis.map(uni => (
            <div key={uni.id} className="flex flex-col gap-2">
              <a
                href={GOOGLE_FORM_UNIVERSITY}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 w-full ${uni.accent.btn} text-white py-3 rounded-2xl font-bold text-sm transition-all shadow-md`}
              >
                <FileText size={15} />
                <span>طلب القبول</span>
              </a>
              <button
                onClick={() => go("uni-apply", { university: uni.uniKey })}
                className={`flex items-center justify-center gap-1.5 w-full bg-white border-2 ${uni.accent.border} ${uni.accent.text} py-2.5 rounded-2xl font-semibold text-xs transition-all hover:opacity-80`}
              >
                خطاب القبول من {uni.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
