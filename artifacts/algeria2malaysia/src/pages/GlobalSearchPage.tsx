import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, X, ArrowLeft, Clock, Calendar, DollarSign,
  MapPin, GraduationCap, BookOpen, FileText, ChevronLeft,
  BarChart2, ArrowUpDown, TrendingDown
} from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { supabase } from "../lib/supabase";

const EUR_RATE = 5;
function toEur(rm: number) { return Math.round(rm / EUR_RATE).toLocaleString(); }

const UNI_META: Record<number, {
  nameAr: string; nameEn: string; location: string;
  logo: string; color: string; bg: string; border: string; page: string; uniApplyKey: string;
}> = {
  1: { nameAr: "جامعة بوترا ماليزيا (UPM)", nameEn: "Universiti Putra Malaysia", location: "سيردانغ، سيلانغور", logo: "/logos/upm.png", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200", page: "upm", uniApplyKey: "UPM" },
  2: { nameAr: "جامعة APU", nameEn: "Asia Pacific University", location: "كوالالمبور — Technology Park", logo: "/logos/apu.png", color: "text-blue-700", bg: "bg-blue-50", border: "border-blue-200", page: "apu", uniApplyKey: "APU" },
  3: { nameAr: "جامعة تايلور", nameEn: "Taylor's University", location: "سوبانج جايا، سيلانغور", logo: "/logos/taylors.png", color: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200", page: "taylors", uniApplyKey: "Taylor's University" },
  4: { nameAr: "جامعة الوسائط المتعددة (MMU)", nameEn: "Multimedia University", location: "سايبر جايا وملاكا", logo: "/logos/mmu.png", color: "text-teal-700", bg: "bg-teal-50", border: "border-teal-200", page: "mmu", uniApplyKey: "MMU" },
  5: { nameAr: "جامعة كوالالمبور (UniKL)", nameEn: "Universiti Kuala Lumpur", location: "كوالالمبور — 11 حرماً", logo: "/logos/unikl.png", color: "text-orange-700", bg: "bg-orange-50", border: "border-orange-200", page: "unikl", uniApplyKey: "UniKL" },
  6: { nameAr: "جامعة لينكولن كوليدج", nameEn: "Lincoln University College", location: "بيتالينغ جايا، سيلانغور", logo: "/logos/lincoln.png", color: "text-green-700", bg: "bg-green-50", border: "border-green-200", page: "lincoln", uniApplyKey: "Lincoln University" },
  7: { nameAr: "جامعة تكنولوجيا بتروناس (UTP)", nameEn: "Universiti Teknologi PETRONAS", location: "سري إسكندر، بيراك", logo: "/logos/utp.png", color: "text-yellow-700", bg: "bg-yellow-50", border: "border-yellow-200", page: "utp", uniApplyKey: "UTP" },
  8: { nameAr: "جامعة تكنولوجيا ماليزيا (UTM)", nameEn: "Universiti Teknologi Malaysia", location: "جوهر بهرو وكوالالمبور", logo: "/logos/utm.png", color: "text-sky-700", bg: "bg-sky-50", border: "border-sky-200", page: "utm", uniApplyKey: "UTM" },
  9: { nameAr: "جامعة تكنيكال ماليزيا ملاكا (UTeM)", nameEn: "Universiti Teknikal Malaysia Melaka", location: "دوريان تونغال، ملاكا", logo: "/logos/utem.png", color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200", page: "utem", uniApplyKey: "UTeM" },
  10: { nameAr: "جامعة UCSI", nameEn: "UCSI University", location: "كوالالمبور", logo: "/logos/ucsi.png", color: "text-pink-700", bg: "bg-pink-50", border: "border-pink-200", page: "ucsi", uniApplyKey: "UCSI University" },
  11: { nameAr: "جامعة سيتي ماليزيا", nameEn: "City University Malaysia", location: "بيتالينغ جايا، سيلانغور", logo: "/logos/cityu.png", color: "text-red-700", bg: "bg-red-50", border: "border-red-200", page: "cityu-courses", uniApplyKey: "City University" },
};

interface Course {
  id: number;
  name: string;
  duration: number | null;
  intake: string | null;
  price: number | null;
  university_id: number;
}

interface ModalCourse extends Course {
  uniId: number;
}

function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

/* Extract core keyword from full course name for comparison search */
function extractKeyword(name: string): string {
  const cleaned = name
    .replace(/^(bachelor of science in|bachelor of arts in|bachelor of|bsc \(hons\) in|bsc in|b\.sc in|master of science in|master of arts in|master of|msc in|diploma in|advanced diploma in|doctor of|phd in|foundation in|certificate in|programme in|programme of)/i, "")
    .trim();
  // Take first 2–3 significant words
  const words = cleaned.split(/\s+/).filter(w => w.length > 2);
  return words.slice(0, 3).join(" ");
}

export default function GlobalSearchPage() {
  const { go } = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 280);
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [modal, setModal] = useState<ModalCourse | null>(null);

  /* ── Price Compare state ── */
  const [compareLabel, setCompareLabel] = useState<string>("");
  const [compareResults, setCompareResults] = useState<Course[]>([]);
  const [compareLoading, setCompareLoading] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const doSearch = useCallback(async (term: string) => {
    if (!term.trim()) { setResults([]); setSearched(false); return; }
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await supabase
        .from("courses")
        .select("id, name, duration, intake, price, university_id")
        .ilike("name", `%${term.trim()}%`)
        .not("price", "is", null)
        .gt("price", 0)
        .order("price", { ascending: true })
        .limit(60);
      setResults(data ?? []);
    } catch { setResults([]); } finally { setLoading(false); }
  }, []);

  useEffect(() => { doSearch(debouncedQuery); }, [debouncedQuery, doSearch]);

  /* ── Open specialty price comparison ── */
  async function openPriceCompare(courseName: string) {
    const keyword = extractKeyword(courseName);
    setCompareLabel(keyword || courseName);
    setShowCompare(true);
    setModal(null);
    setCompareLoading(true);
    setCompareResults([]);
    try {
      const { data } = await supabase
        .from("courses")
        .select("id, name, duration, intake, price, university_id")
        .ilike("name", `%${keyword}%`)
        .not("price", "is", null)
        .gt("price", 0)
        .order("price", { ascending: true })
        .limit(40);
      setCompareResults(data ?? []);
    } catch { setCompareResults([]); }
    finally { setCompareLoading(false); }
  }

  const grouped = results.reduce<Record<number, Course[]>>((acc, c) => {
    (acc[c.university_id] ??= []).push(c);
    return acc;
  }, {});

  const sortedUniIds = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => {
      const minA = Math.min(...grouped[a].map(c => c.price ?? Infinity));
      const minB = Math.min(...grouped[b].map(c => c.price ?? Infinity));
      return minA - minB;
    });

  const minPrice = compareResults.length ? compareResults[0].price ?? 0 : 0;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 pt-10 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => go("home")}
            className="flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>الرئيسية</span>
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Search size={20} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">ابحث عن تخصصك</h1>
          </div>
          <p className="text-green-200 text-sm mb-6 mr-13">
            أكثر من 2,000 تخصص في 11 جامعة ماليزية معتمدة
          </p>

          {/* Search box */}
          <div className="relative">
            <Search size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="اكتب اسم التخصص بالإنجليزية... مثل: Engineering, Business, Law"
              className="w-full bg-white rounded-2xl py-4 pr-12 pl-12 text-base text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-green-400/40 placeholder:text-gray-400"
            />
            {query && (
              <button
                onClick={() => { setQuery(""); setResults([]); setSearched(false); inputRef.current?.focus(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 pb-16">

        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderWidth: 3 }}></div>
            <p className="text-gray-500 text-sm">جارٍ البحث...</p>
          </div>
        )}

        {!loading && !searched && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100">
            <GraduationCap size={52} className="mx-auto text-green-200 mb-4" />
            <h3 className="text-gray-700 font-bold text-lg mb-2">ابدأ البحث الآن</h3>
            <p className="text-gray-500 text-sm max-w-xs mx-auto">
              اكتب اسم التخصص الذي تبحث عنه وستظهر لك النتائج من جميع الجامعات فوراً
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {["Engineering", "Business", "Law", "Medicine", "IT", "Accounting", "Design"].map(s => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100">
            <BookOpen size={48} className="mx-auto text-gray-200 mb-3" />
            <h3 className="text-gray-700 font-bold text-lg mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500 text-sm">جرّب كلمة أخرى أو تأكد من الإملاء باللغة الإنجليزية</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs text-gray-400 pt-2 pb-1 pr-1">
              {results.length} نتيجة في {Object.keys(grouped).length} جامعة
            </p>
            {sortedUniIds.map((uniId) => {
              const courses = grouped[uniId];
              const meta = UNI_META[uniId];
              if (!meta) return null;
              return (
                <div key={uniId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className={`flex items-center gap-3 px-5 py-3 ${meta.bg} border-b ${meta.border}`}>
                    <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm p-1">
                      <img src={meta.logo} alt={meta.nameEn} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${meta.color}`}>{meta.nameAr}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        <MapPin size={11} /> {meta.location}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold ${meta.color} bg-white border ${meta.border} rounded-full px-2.5 py-0.5 flex-shrink-0`}>
                      {courses.length} تخصص
                    </span>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {courses.map(course => (
                      <div key={course.id} className="flex items-center gap-2 px-4 py-3 hover:bg-gray-50/60 transition-colors">
                        {/* Course info */}
                        <button
                          onClick={() => setModal({ ...course, uniId })}
                          className="flex-1 min-w-0 text-right"
                        >
                          <p className="font-semibold text-gray-900 text-sm leading-snug truncate">{course.name}</p>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                            {course.duration != null && (
                              <span className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={11} />{course.duration} {Number(course.duration) === 1 ? "سنة" : "سنوات"}
                              </span>
                            )}
                            {course.price != null && course.price > 0 && (
                              <span className="flex items-center gap-1 text-xs font-medium">
                                <DollarSign size={11} className="text-green-600" />
                                <span className="text-green-700">{course.price.toLocaleString()} RM</span>
                                <span className="text-gray-300">·</span>
                                <span className="text-indigo-600">€ {toEur(course.price)}</span>
                                <span className="text-gray-400">/ سنة</span>
                              </span>
                            )}
                          </div>
                        </button>
                        {/* Compare price button */}
                        <button
                          onClick={() => openPriceCompare(course.name)}
                          title="قارن سعر هذا التخصص عبر الجامعات"
                          className="flex-shrink-0 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 border border-blue-200 rounded-xl px-2.5 py-1.5 text-[11px] font-bold transition-colors"
                        >
                          <BarChart2 size={13} />
                          <span className="hidden sm:inline">قارن السعر</span>
                        </button>
                        <button
                          onClick={() => setModal({ ...course, uniId })}
                          className="flex-shrink-0 text-gray-300 hover:text-green-500 transition-colors"
                        >
                          <ChevronLeft size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ════ Detail Modal ════ */}
      {modal && (() => {
        const meta = UNI_META[modal.uniId];
        if (!meta) return null;
        return (
          <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={e => { if (e.target === e.currentTarget) setModal(null); }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModal(null)} />
            <div className="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[92vh] flex flex-col">
              <div className={`${meta.bg} px-6 py-5 border-b ${meta.border}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md p-1.5">
                      <img src={meta.logo} alt={meta.nameEn} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${meta.color}`}>{meta.nameAr}</p>
                      <p className="text-gray-500 text-xs">{meta.nameEn}</p>
                    </div>
                  </div>
                  <button onClick={() => setModal(null)} className="text-gray-400 hover:text-gray-700 transition-colors mt-0.5 flex-shrink-0">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1">التخصص</p>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug">{modal.name}</h2>
                </div>

                <div className={`grid grid-cols-2 gap-3`}>
                  <div className={`rounded-2xl p-4 ${meta.bg} border ${meta.border}`}>
                    <div className={`flex items-center gap-2 mb-1 ${meta.color}`}>
                      <MapPin size={15} />
                      <span className="text-xs font-semibold">الموقع</span>
                    </div>
                    <p className="text-gray-800 text-sm font-medium">{meta.location}</p>
                  </div>
                  {modal.duration != null && (
                    <div className={`rounded-2xl p-4 ${meta.bg} border ${meta.border}`}>
                      <div className={`flex items-center gap-2 mb-1 ${meta.color}`}>
                        <Clock size={15} />
                        <span className="text-xs font-semibold">مدة الدراسة</span>
                      </div>
                      <p className="text-gray-800 text-sm font-medium">
                        {modal.duration} {Number(modal.duration) === 1 ? "سنة" : "سنوات"}
                      </p>
                    </div>
                  )}
                  {modal.intake && (
                    <div className={`rounded-2xl p-4 ${meta.bg} border ${meta.border}`}>
                      <div className={`flex items-center gap-2 mb-1 ${meta.color}`}>
                        <Calendar size={15} />
                        <span className="text-xs font-semibold">مواعيد الالتحاق</span>
                      </div>
                      <p className="text-gray-800 text-sm font-medium">{modal.intake.trim()}</p>
                    </div>
                  )}
                  {modal.price != null && modal.price > 0 && (
                    <div className={`rounded-2xl p-4 ${meta.bg} border ${meta.border}`}>
                      <div className={`flex items-center gap-2 mb-1 ${meta.color}`}>
                        <DollarSign size={15} />
                        <span className="text-xs font-semibold">الرسوم السنوية</span>
                      </div>
                      <p className="text-gray-800 text-sm font-bold">{modal.price.toLocaleString()} <span className="font-normal text-gray-500">RM / سنة</span></p>
                      <p className="text-gray-500 text-xs">≈ € {toEur(modal.price)} / سنة</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="px-6 py-5 border-t border-gray-100 space-y-3">
                {/* Compare price button */}
                <button
                  onClick={() => openPriceCompare(modal.name)}
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <BarChart2 size={16} />
                  قارن سعر هذا التخصص عبر الجامعات
                </button>
                <button
                  onClick={() => { setModal(null); go("uni-apply", { university: meta.uniApplyKey }); }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <FileText size={18} />
                  طلب خطاب القبول
                </button>
                <button
                  onClick={() => { setModal(null); go(meta.page as any); }}
                  className={`w-full bg-white border-2 ${meta.border} ${meta.color} py-3 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:opacity-80`}
                >
                  <BookOpen size={16} />
                  استعرض جميع تخصصات الجامعة
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ════ Price Comparison Modal ════ */}
      {showCompare && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCompare(false)} />
          <div className="relative bg-white w-full sm:max-w-xl rounded-t-3xl sm:rounded-3xl shadow-2xl z-10 overflow-hidden max-h-[92vh] flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-5 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center border border-white/30">
                    <ArrowUpDown size={17} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white font-extrabold text-sm leading-tight">مقارنة الأسعار</p>
                    <p className="text-blue-200 text-xs mt-0.5 font-medium truncate max-w-48">"{compareLabel}"</p>
                  </div>
                </div>
                <button onClick={() => setShowCompare(false)} className="text-white/70 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Subheader */}
            <div className="bg-blue-50 border-b border-blue-100 px-5 py-2.5 flex items-center gap-2">
              <TrendingDown size={14} className="text-blue-600" />
              <p className="text-blue-700 text-xs font-semibold">مرتّبة من الأرخص إلى الأغلى</p>
              {!compareLoading && compareResults.length > 0 && (
                <span className="mr-auto text-xs text-blue-500 font-medium">{compareResults.length} نتيجة</span>
              )}
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              {compareLoading && (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" style={{ borderWidth: 3 }}></div>
                  <p className="text-gray-500 text-sm">جارٍ البحث عن الأسعار...</p>
                </div>
              )}

              {!compareLoading && compareResults.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6">
                  <BarChart2 size={40} className="text-gray-200" />
                  <p className="text-gray-600 font-semibold">لم يتم العثور على نتائج مشابهة</p>
                  <p className="text-gray-400 text-xs">جرّب البحث بكلمة أقصر أو أكثر عمومية</p>
                </div>
              )}

              {!compareLoading && compareResults.length > 0 && (
                <div className="divide-y divide-gray-100">
                  {compareResults.map((course, idx) => {
                    const meta = UNI_META[course.university_id];
                    if (!meta) return null;
                    const isCheapest = idx === 0;
                    const price = course.price ?? 0;
                    const diffPct = minPrice > 0 ? Math.round(((price - minPrice) / minPrice) * 100) : 0;

                    return (
                      <div
                        key={course.id}
                        className={`flex items-start gap-3 px-5 py-4 transition-colors ${isCheapest ? "bg-green-50" : "hover:bg-gray-50"}`}
                      >
                        {/* Rank */}
                        <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold mt-0.5 ${
                          isCheapest ? "bg-green-500 text-white shadow-sm" : "bg-gray-100 text-gray-500"
                        }`}>
                          {idx + 1}
                        </div>

                        {/* University logo */}
                        <div className={`flex-shrink-0 w-10 h-10 ${meta.bg} rounded-xl flex items-center justify-center border ${meta.border} p-1.5`}>
                          <img src={meta.logo} alt={meta.nameEn} className="max-w-full max-h-full object-contain" />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className={`text-xs font-bold truncate ${meta.color}`}>{meta.nameAr}</p>
                              <p className="text-gray-800 text-sm font-semibold leading-snug mt-0.5 line-clamp-2">{course.name}</p>
                              {course.duration != null && (
                                <p className="text-gray-400 text-xs mt-1 flex items-center gap-1">
                                  <Clock size={10} /> {course.duration} {Number(course.duration) === 1 ? "سنة" : "سنوات"}
                                </p>
                              )}
                            </div>
                            {/* Price */}
                            <div className="flex-shrink-0 text-left">
                              <p className={`text-sm font-extrabold ${isCheapest ? "text-green-600" : "text-gray-900"}`}>
                                {price.toLocaleString()} RM
                              </p>
                              <p className="text-xs text-gray-400">/ سنة · ≈ €{toEur(price)}</p>
                              {diffPct > 0 && (
                                <span className="text-[10px] text-orange-500 font-semibold">+{diffPct}%</span>
                              )}
                              {isCheapest && (
                                <span className="block text-[10px] text-green-600 font-bold">الأرخص ✓</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-5 py-4 border-t border-gray-100 bg-gray-50">
              <p className="text-xs text-gray-500 text-center mb-3">اختر الجامعة المناسبة واطلب خطاب القبول مباشرة</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {[...new Set(compareResults.map(c => c.university_id))]
                  .filter(id => UNI_META[id])
                  .slice(0, 5)
                  .map(uid => {
                    const m = UNI_META[uid];
                    return (
                      <button
                        key={uid}
                        onClick={() => { setShowCompare(false); go("uni-apply", { university: m.uniApplyKey }); }}
                        className={`flex-shrink-0 flex items-center gap-1.5 ${m.bg} border ${m.border} ${m.color} px-3 py-2 rounded-xl text-xs font-bold transition-all hover:opacity-80`}
                      >
                        <img src={m.logo} alt="" className="w-4 h-4 object-contain" />
                        خطاب القبول — {m.nameEn.split(" ")[0]}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
