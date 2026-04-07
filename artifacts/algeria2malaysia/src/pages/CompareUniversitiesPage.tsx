import { useState } from "react";
import {
  ArrowLeft, CheckCircle, MapPin, Calendar, DollarSign,
  Star, BookOpen, FileText, X, BarChart2, Building2
} from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

function fmtEur(rm: number) { return Math.round(rm / 5).toLocaleString(); }

const UNIVERSITIES = [
  {
    id: "apu", name: "APU", nameAr: "جامعة APU",
    nameFull: "Asia Pacific University",
    location: "كوالالمبور — Technology Park", established: "1993",
    type: "خاصة", badge: "IT & Tech", badgeColor: "bg-blue-600",
    logo: "/logos/apu.png",
    accent: { text: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", solid: "bg-blue-600", hover: "hover:bg-blue-700" },
    strengths: ["رائدة في IT والأمن السيبراني والذكاء الاصطناعي", "130+ جنسية في الحرم الجامعي", "شراكات مع IBM وMicrosoft وOracle"],
    levels: ["Foundation — 1 سنة", "البكالوريوس — 3 سنوات", "الماستر — 1-2 سنة"],
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
    logo: "/logos/taylors.png",
    accent: { text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200", solid: "bg-purple-600", hover: "hover:bg-purple-700" },
    strengths: ["الأعلى تصنيفاً بين الخاصة (QS 2025)", "حرم مطل على بحيرة صناعية", "برامج مزدوجة مع UK وأستراليا"],
    levels: ["Foundation — 1 سنة", "البكالوريوس — 3-4 سنوات", "الماستر — 1-2 سنة"],
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
    logo: "/logos/mmu.png",
    accent: { text: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200", solid: "bg-teal-600", hover: "hover:bg-teal-700" },
    strengths: ["متخصصة في التكنولوجيا والهندسة الكهربائية", "حرم سايبر جايا عاصمة التقنية", "مرتبطة رسمياً بـ Telekom Malaysia"],
    levels: ["Foundation — 1 سنة", "البكالوريوس — 3-4 سنوات", "الماستر — 1-2 سنة"],
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
    logo: "/logos/unikl.png",
    accent: { text: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", solid: "bg-orange-600", hover: "hover:bg-orange-700" },
    strengths: ["11 حرم متخصص في 8 ولايات", "تدريب عملي مع الصناعة الوطنية", "هندسة طيران ونفط وتصنيع"],
    levels: ["الدبلوم — 2.5-3 سنوات", "البكالوريوس — 4 سنوات", "الماستر — 1.5-2 سنة"],
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
    logo: "/logos/lincoln.png",
    accent: { text: "text-green-700", bg: "bg-green-50", border: "border-green-200", solid: "bg-green-600", hover: "hover:bg-green-700" },
    strengths: ["رسوم تنافسية للطلاب العرب", "قبول مرن وإجراءات سريعة", "طب وصيدلة وهندسة وقانون"],
    levels: ["Foundation — 1 سنة", "البكالوريوس — 3-4 سنوات", "الماستر — 1.5-2 سنة"],
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
    logo: "/logos/utp.png",
    accent: { text: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-300", solid: "bg-yellow-600", hover: "hover:bg-yellow-700" },
    strengths: ["أفضل هندسة في آسيا (QS)", "مدعومة من بتروناس", "منح جزئية وكاملة متاحة"],
    levels: ["Foundation — 1 سنة", "البكالوريوس — 4 سنوات", "الماستر — 1.5-2 سنة"],
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
    logo: "/logos/upm.png",
    accent: { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", solid: "bg-emerald-600", hover: "hover:bg-emerald-700" },
    strengths: ["أفضل 150 جامعة في آسيا (QS 2025)", "حرم أخضر 1200 هكتار", "رائدة في الزراعة والعلوم البيئية"],
    levels: ["البكالوريوس — 4 سنوات", "الماستر — 1.5-2 سنة", "الدكتوراه — 3-5 سنوات"],
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
    logo: "/logos/utm.png",
    accent: { text: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200", solid: "bg-sky-600", hover: "hover:bg-sky-700" },
    strengths: ["أعرق جامعة هندسية منذ 1904", "حرمان: جوهور بهرو + كوالالمبور", "شراكات صناعية دولية"],
    levels: ["البكالوريوس — 4 سنوات", "الماستر — 1.5-2 سنة", "الدكتوراه — 3-5 سنوات"],
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
    logo: "/logos/utem.png",
    accent: { text: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", solid: "bg-rose-600", hover: "hover:bg-rose-700" },
    strengths: ["هندسة تقنية تطبيقية متخصصة", "رائدة في التصنيع والإلكترونيك", "رسوم تنافسية كجامعة حكومية"],
    levels: ["البكالوريوس — 4 سنوات", "الماستر — 1.5-2 سنة", "الدكتوراه — 3-5 سنوات"],
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
    type: "خاصة", badge: "Medicine", badgeColor: "bg-pink-600",
    logo: "/logos/ucsi.png",
    accent: { text: "text-pink-700", bg: "bg-pink-50", border: "border-pink-200", solid: "bg-pink-600", hover: "hover:bg-pink-700" },
    strengths: ["MBBS معتمد UK/USA", "مستشفى تعليمي خاص تابع للجامعة", "ضمن أفضل 600 جامعة (QS 2025)"],
    levels: ["Foundation — 1 سنة", "البكالوريوس — 3-5 سنوات", "الماستر — 1.5-3 سنوات"],
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
    type: "خاصة", badge: "Modern", badgeColor: "bg-indigo-600",
    logo: "/logos/sunway.png",
    accent: { text: "text-indigo-700", bg: "bg-indigo-50", border: "border-indigo-200", solid: "bg-indigo-600", hover: "hover:bg-indigo-700" },
    strengths: ["شراكة حصرية مع لانكستر (#127 عالمياً)", "درجات بريطانية معترف بها دولياً", "حرم حديث متكامل في مدينة صنواي"],
    levels: ["Foundation — 1 سنة", "البكالوريوس — 3-4 سنوات", "الماستر — 1-2 سنة"],
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
    type: "خاصة", badge: "Eng & Law", badgeColor: "bg-red-600",
    logo: "/logos/cityu.png",
    accent: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200", solid: "bg-red-600", hover: "hover:bg-red-700" },
    strengths: ["معتمدة من MQA", "تخصصات قانونية وهندسية وتقنية", "رسوم تنافسية قريب من كوالالمبور"],
    levels: ["Foundation — 1 سنة", "البكالوريوس — 3-4 سنوات", "الماستر — 1-2 سنة"],
    pricing: [
      { label: "Foundation", rm: "8,000–12,000", eur: `${fmtEur(8000)}–${fmtEur(12000)}` },
      { label: "البكالوريوس", rm: "12,000–20,000", eur: `${fmtEur(12000)}–${fmtEur(20000)}` },
      { label: "الماستر", rm: "15,000–26,000", eur: `${fmtEur(15000)}–${fmtEur(26000)}` },
    ],
    uniKey: "City University",
  },
];

const MAX_SELECT = 3;

type Uni = typeof UNIVERSITIES[0];

export default function CompareUniversitiesPage() {
  const { go } = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [comparing, setComparing] = useState(false);

  function toggleSelect(id: string) {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < MAX_SELECT ? [...prev, id] : prev
    );
  }

  const selectedUnis = UNIVERSITIES.filter(u => selected.includes(u.id));
  const cols = selectedUnis.length;

  /* ════════════════════ SELECTION SCREEN ════════════════════ */
  if (!comparing) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
        {/* ── Hero Header ── */}
        <div className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 pt-12 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => go("universities")}
              className="inline-flex items-center gap-2 text-green-300/80 hover:text-white text-sm mb-8 transition-colors group"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
              العودة إلى الجامعات
            </button>
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20">
                <BarChart2 size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-extrabold text-white leading-tight">قارن بين الجامعات</h1>
                <p className="text-green-300 text-sm mt-0.5">اختر من 2 إلى 3 جامعات لمقارنتها</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 -mt-10 pb-28">
          {/* ── Selection bar ── */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-5 mb-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {[0, 1, 2].map(i => {
                  const u = selectedUnis[i];
                  return (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-200 ${
                        u
                          ? `${u.accent.bg} ${u.accent.border} shadow-sm`
                          : "border-dashed border-gray-200 bg-gray-50"
                      }`}
                    >
                      {u ? (
                        <img src={u.logo} alt={u.name} className="w-7 h-7 object-contain" />
                      ) : (
                        <span className="text-gray-300 text-xs font-bold">{i + 1}</span>
                      )}
                    </div>
                  );
                })}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {selected.length === 0
                    ? "اختر جامعتين على الأقل"
                    : selected.length === 1
                    ? "اختر جامعة أخرى للمقارنة"
                    : `${selected.length} جامعات مختارة`}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">الحد الأقصى 3 جامعات</p>
              </div>
            </div>
            <button
              onClick={() => setComparing(true)}
              disabled={selected.length < 2}
              className="bg-green-700 hover:bg-green-800 active:scale-95 disabled:opacity-35 disabled:cursor-not-allowed text-white px-6 py-3 rounded-2xl font-bold text-sm transition-all shadow-md shadow-green-900/20 flex items-center gap-2 whitespace-nowrap"
            >
              <BarChart2 size={16} />
              قارن الآن
            </button>
          </div>

          {/* ── University cards ── */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {UNIVERSITIES.map(uni => {
              const isSelected = selected.includes(uni.id);
              const isDisabled = !isSelected && selected.length >= MAX_SELECT;
              return (
                <button
                  key={uni.id}
                  onClick={() => !isDisabled && toggleSelect(uni.id)}
                  className={`relative rounded-3xl border-2 p-3.5 text-center transition-all duration-200 group ${
                    isSelected
                      ? `${uni.accent.bg} ${uni.accent.border} shadow-lg scale-[1.02]`
                      : isDisabled
                      ? "border-gray-100 bg-gray-50 opacity-30 cursor-not-allowed"
                      : "border-gray-100 bg-white hover:border-gray-300 hover:shadow-md hover:scale-[1.01]"
                  }`}
                >
                  {isSelected && (
                    <span className={`absolute top-2.5 left-2.5 w-5 h-5 rounded-full ${uni.accent.solid} flex items-center justify-center shadow`}>
                      <CheckCircle size={12} className="text-white" strokeWidth={3} />
                    </span>
                  )}
                  <div className="w-11 h-11 bg-white rounded-xl mx-auto mb-2.5 flex items-center justify-center shadow-sm p-1.5 border border-gray-100">
                    <img src={uni.logo} alt={uni.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <p className={`font-extrabold text-sm leading-tight ${isSelected ? uni.accent.text : "text-gray-800"}`}>{uni.name}</p>
                  <p className="text-[11px] text-gray-400 mt-0.5">{uni.established}</p>
                  <span className={`inline-block mt-2 text-[10px] px-2.5 py-0.5 rounded-full font-semibold text-white ${uni.badgeColor}`}>
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

  /* ════════════════════ COMPARISON TABLE ════════════════════ */
  const ROWS: { icon: React.ReactNode; label: string; render: (u: Uni) => React.ReactNode; alt?: boolean }[] = [
    {
      icon: <MapPin size={15} />, label: "الموقع", alt: false,
      render: u => (
        <div className="flex items-start gap-2">
          <MapPin size={13} className={`${u.accent.text} flex-shrink-0 mt-0.5`} />
          <span className="text-sm text-gray-700 leading-snug">{u.location}</span>
        </div>
      ),
    },
    {
      icon: <Calendar size={15} />, label: "تأسست", alt: true,
      render: u => (
        <div className="flex items-center gap-2">
          <span className={`text-xl font-extrabold ${u.accent.text}`}>{u.established}</span>
        </div>
      ),
    },
    {
      icon: <Building2 size={15} />, label: "نوع الجامعة", alt: false,
      render: u => (
        <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-xl text-white shadow-sm ${
          u.type === "حكومية" ? "bg-green-600" : u.type === "شبه حكومية" ? "bg-teal-600" : "bg-slate-500"
        }`}>
          {u.type}
        </span>
      ),
    },
    {
      icon: <Star size={15} />, label: "أبرز المميزات", alt: true,
      render: u => (
        <ul className="space-y-2">
          {u.strengths.map((s, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-gray-700 leading-snug">
              <span className={`w-4 h-4 rounded-full ${u.accent.solid} flex-shrink-0 flex items-center justify-center mt-0.5`}>
                <CheckCircle size={10} className="text-white" strokeWidth={3} />
              </span>
              {s}
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: <BookOpen size={15} />, label: "المستويات الدراسية", alt: false,
      render: u => (
        <ul className="space-y-1.5">
          {u.levels.map((l, i) => (
            <li key={i} className={`text-xs px-3 py-1.5 rounded-xl font-medium ${u.accent.bg} ${u.accent.text}`}>
              {l}
            </li>
          ))}
        </ul>
      ),
    },
    {
      icon: <DollarSign size={15} />, label: "الرسوم الدراسية", alt: true,
      render: u => (
        <div className="space-y-2">
          {u.pricing.map((p, i) => (
            <div key={i} className={`rounded-2xl px-3.5 py-2.5 border ${u.accent.border} ${u.accent.bg}`}>
              <p className={`text-[11px] font-bold uppercase tracking-wide ${u.accent.text} mb-0.5`}>{p.label}</p>
              <p className="text-sm font-extrabold text-gray-900">{p.rm} <span className="text-xs font-semibold text-gray-400">RM</span></p>
              <p className="text-xs text-gray-400">≈ {p.eur} €</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" dir="rtl">
      {/* ── Header ── */}
      <div className="bg-gradient-to-br from-green-950 via-green-900 to-green-800 pt-10 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setComparing(false)}
            className="inline-flex items-center gap-2 text-green-300/80 hover:text-white text-sm mb-6 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            تغيير الاختيار
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/15 backdrop-blur rounded-2xl flex items-center justify-center border border-white/20 flex-shrink-0">
              <BarChart2 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-white">مقارنة الجامعات</h1>
              <p className="text-green-300 text-xs mt-0.5">{selectedUnis.map(u => u.name).join(" · ")}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-3 sm:px-4 -mt-8 pb-24">

        {/* ── University header cards — sticky on mobile ── */}
        <div className={`grid gap-2 mb-4`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
          {selectedUnis.map(uni => (
            <div key={uni.id} className={`relative bg-white rounded-2xl shadow-lg border-2 ${uni.accent.border} p-3 text-center`}>
              <button
                onClick={() => { setSelected(prev => prev.filter(x => x !== uni.id)); if (selected.length <= 2) setComparing(false); }}
                className="absolute top-2 left-2 w-5 h-5 rounded-full bg-gray-100 hover:bg-red-100 flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors"
              >
                <X size={10} strokeWidth={2.5} />
              </button>
              <div className={`w-12 h-12 sm:w-14 sm:h-14 ${uni.accent.bg} rounded-xl mx-auto mb-2 flex items-center justify-center border ${uni.accent.border} p-1.5`}>
                <img src={uni.logo} alt={uni.name} className="max-w-full max-h-full object-contain" />
              </div>
              <p className={`font-extrabold text-xs leading-tight ${uni.accent.text}`}>{uni.nameAr}</p>
              <span className={`inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-semibold text-white ${uni.badgeColor}`}>
                {uni.badge}
              </span>
            </div>
          ))}
        </div>

        {/* ── Comparison rows ── */}
        <div className="space-y-2">
          {ROWS.map((row, ri) => (
            <div
              key={ri}
              className={`rounded-2xl overflow-hidden shadow-sm border border-gray-100 ${row.alt ? "bg-gray-50" : "bg-white"}`}
            >
              {/* Row label — full width on all screens */}
              <div className="flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 bg-white">
                <span className="w-7 h-7 rounded-xl bg-green-50 border border-green-100 flex items-center justify-center text-green-700 flex-shrink-0">
                  {row.icon}
                </span>
                <span className="text-sm font-bold text-gray-700">{row.label}</span>
              </div>
              {/* Values grid — columns = number of selected unis */}
              <div
                className="grid"
                style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
              >
                {selectedUnis.map((uni, i) => (
                  <div
                    key={uni.id}
                    className={`px-3 py-4 sm:px-4 ${i < cols - 1 ? "border-l border-gray-100" : ""}`}
                  >
                    {row.render(uni)}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Apply buttons ── */}
        <div className="mt-4 space-y-2">
          <p className="text-xs font-bold text-gray-500 text-center mb-3">اطلب خطاب القبول من الجامعة التي تناسبك</p>
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
            {selectedUnis.map(uni => (
              <button
                key={uni.id}
                onClick={() => go("uni-apply", { university: uni.uniKey })}
                className={`w-full ${uni.accent.solid} ${uni.accent.hover} active:scale-95 text-white py-4 rounded-2xl font-extrabold text-xs sm:text-sm transition-all shadow-lg flex flex-col items-center justify-center gap-1 border-b-4 border-black/10`}
              >
                <FileText size={16} />
                <span>خطاب القبول</span>
                <span className="font-bold opacity-80">{uni.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
