import { useState, useEffect, useRef, useCallback } from "react";
import {
  Search, X, ArrowLeft, Clock, Calendar, DollarSign,
  MapPin, GraduationCap, BookOpen, FileText, ChevronLeft
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

export default function GlobalSearchPage() {
  const { go } = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 280);
  const [results, setResults] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [modal, setModal] = useState<ModalCourse | null>(null);

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
        .order("university_id")
        .limit(50);
      setResults(data ?? []);
    } catch { setResults([]); } finally { setLoading(false); }
  }, []);

  useEffect(() => { doSearch(debouncedQuery); }, [debouncedQuery, doSearch]);

  const grouped = results.reduce<Record<number, Course[]>>((acc, c) => {
    (acc[c.university_id] ??= []).push(c);
    return acc;
  }, {});

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

        {/* Loading */}
        {loading && (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
            <div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" style={{ borderWidth: 3 }}></div>
            <p className="text-gray-500 text-sm">جارٍ البحث...</p>
          </div>
        )}

        {/* Empty state (before search) */}
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

        {/* No results */}
        {!loading && searched && results.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-10 text-center border border-gray-100">
            <BookOpen size={48} className="mx-auto text-gray-200 mb-3" />
            <h3 className="text-gray-700 font-bold text-lg mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500 text-sm">جرّب كلمة أخرى أو تأكد من الإملاء باللغة الإنجليزية</p>
          </div>
        )}

        {/* Results grouped by university */}
        {!loading && results.length > 0 && (
          <div className="space-y-4">
            <p className="text-xs text-gray-400 pt-2 pb-1 pr-1">
              {results.length} نتيجة في {Object.keys(grouped).length} جامعة
            </p>
            {Object.entries(grouped).map(([uniIdStr, courses]) => {
              const uniId = Number(uniIdStr);
              const meta = UNI_META[uniId];
              if (!meta) return null;
              return (
                <div key={uniId} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  {/* University header */}
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
                  {/* Course list */}
                  <div className="divide-y divide-gray-50">
                    {courses.map(course => (
                      <button
                        key={course.id}
                        onClick={() => setModal({ ...course, uniId })}
                        className="w-full text-right px-5 py-3.5 hover:bg-gray-50 transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 text-sm leading-snug truncate">{course.name}</p>
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                            {course.duration != null && (
                              <span className="flex items-center gap-1 text-xs text-gray-500">
                                <Clock size={11} />{course.duration} {Number(course.duration) === 1 ? "سنة" : "سنوات"}
                              </span>
                            )}
                            {course.price != null && course.price > 0 && (
                              <span className="flex items-center gap-1 text-xs text-green-700 font-medium">
                                <DollarSign size={11} />{course.price.toLocaleString()} RM / € {toEur(course.price)}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronLeft size={16} className="text-gray-300 group-hover:text-green-500 transition-colors flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
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
              {/* Modal header */}
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
                  <button
                    onClick={() => setModal(null)}
                    className="text-gray-400 hover:text-gray-700 transition-colors mt-0.5 flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Modal body */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                {/* Course name */}
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-1">التخصص</p>
                  <h2 className="text-xl font-bold text-gray-900 leading-snug">{modal.name}</h2>
                </div>

                {/* Details grid */}
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
                      <p className="text-gray-800 text-sm font-bold">{modal.price.toLocaleString()} RM</p>
                      <p className="text-gray-500 text-xs">≈ € {toEur(modal.price)} / year</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal footer — CTA buttons */}
              <div className="px-6 py-5 border-t border-gray-100 space-y-3">
                <button
                  onClick={() => { setModal(null); go("uni-apply", { university: meta.uniApplyKey }); }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <FileText size={18} />
                  <span>طلب خطاب القبول من {meta.nameAr.split(" ")[0] === "جامعة" ? meta.nameAr : "الجامعة"}</span>
                </button>
                <button
                  onClick={() => { setModal(null); go(meta.page as any); }}
                  className={`w-full bg-white border-2 ${meta.border} ${meta.color} py-3 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2 hover:opacity-80`}
                >
                  <BookOpen size={16} />
                  <span>استعرض جميع تخصصات الجامعة</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
