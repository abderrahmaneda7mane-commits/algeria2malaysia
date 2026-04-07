import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Search, BookOpen, Clock, Calendar, DollarSign, AlertCircle, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { supabase } from "../lib/supabase";

const LINCOLN_UNIVERSITY_ID = 6;
const PAGE_SIZE = 12;
const EUR_RATE = 5;
function toEur(rm: number) { return Math.round(rm / EUR_RATE).toLocaleString(); }
interface Course { id: number; name: string; duration: number | null; intake: string | null; price: number | null; universities: { name: string }[] | null; }
const PRICE_RANGES = [
  { label: "الكل", min: 0, max: Infinity },
  { label: "RM 5,000 – 15,000 · €1,000 – €3,000", min: 5000, max: 15000 },
  { label: "RM 15,000 – 30,000 · €3,000 – €6,000", min: 15000, max: 30000 },
  { label: "RM +30,000 · €6,000+", min: 30000, max: Infinity },
];
function SkeletonCard() {
  return <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse"><div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div><div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div><div className="flex gap-3"><div className="h-4 bg-gray-100 rounded w-1/4"></div><div className="h-4 bg-gray-100 rounded w-1/4"></div></div></div>;
}
export default function LincolnCoursesPage() {
  const { go } = useNavigate();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [durationFilter, setDurationFilter] = useState<string>("all");
  const [priceRangeIdx, setPriceRangeIdx] = useState<number>(0);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function fetchCourses() {
      setLoading(true); setError(null);
      try {
        const { data, error: sbError } = await supabase.from("courses").select("id, name, duration, intake, price, universities(name)").eq("university_id", LINCOLN_UNIVERSITY_ID);
        if (sbError) throw new Error(sbError.message);
        setCourses(data ?? []);
      } catch (err: unknown) { setError(err instanceof Error ? err.message : "حدث خطأ"); } finally { setLoading(false); }
    }
    fetchCourses();
  }, []);
  const durations = useMemo(() => { const s = new Set<string>(); courses.forEach(c => { if (c.duration != null) s.add(String(c.duration)); }); return ["all", ...Array.from(s).sort((a, b) => Number(a) - Number(b))]; }, [courses]);
  const filtered = useMemo(() => { const pr = PRICE_RANGES[priceRangeIdx]; return courses.filter(c => { const ms = search.trim() === "" || c.name.toLowerCase().includes(search.toLowerCase()); const md = durationFilter === "all" || String(c.duration) === durationFilter; const p = c.price ?? 0; return ms && md && p >= pr.min && p < pr.max; }); }, [courses, search, durationFilter, priceRangeIdx]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = useMemo(() => { const s = (page - 1) * PAGE_SIZE; return filtered.slice(s, s + PAGE_SIZE); }, [filtered, page]);
  function handleFilterChange(fn: () => void) { fn(); setPage(1); }
  const pageNumbers = useMemo(() => { const delta = 2; const range: (number | "...")[] = []; for (let i = 1; i <= totalPages; i++) { if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) { range.push(i); } else if (range[range.length - 1] !== "...") { range.push("..."); } } return range; }, [page, totalPages]);
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white pt-12 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <button onClick={() => go("universities")} className="flex items-center gap-2 text-green-200 hover:text-white transition-colors mb-6 group"><ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /><span>العودة إلى الجامعات</span></button>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 p-2 shadow-lg"><img src="/logos/lincoln.png" alt="Lincoln" className="max-w-full max-h-full object-contain" /></div>
            <div>
              <div className="inline-block bg-green-500/40 border border-green-400/40 rounded-full px-3 py-0.5 text-xs font-semibold text-green-100 mb-1">جامعة خاصة · Affordable</div>
              <h1 className="text-2xl md:text-3xl font-bold">جامعة لينكولن كوليدج</h1>
              <p className="text-green-200 text-sm mt-0.5">Lincoln University College — Petaling Jaya</p>
            </div>
          </div>
          {!loading && !error && (<div className="mt-4 inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium"><BookOpen size={15} /><span>{filtered.length === courses.length ? `${courses.length.toLocaleString()} مادة دراسية` : `${filtered.length.toLocaleString()} من ${courses.length.toLocaleString()} مادة دراسية`}</span></div>)}
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 -mt-6 mb-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative"><Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /><input type="text" placeholder="ابحث باسم المادة..." value={search} onChange={e => handleFilterChange(() => setSearch(e.target.value))} className="w-full border border-gray-200 rounded-xl py-2.5 pr-9 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition" /></div>
            <div className="relative"><Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /><select value={durationFilter} onChange={e => handleFilterChange(() => setDurationFilter(e.target.value))} className="w-full border border-gray-200 rounded-xl py-2.5 pr-9 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white transition"><option value="all">كل المدد الدراسية</option>{durations.filter(d => d !== "all").map(d => <option key={d} value={d}>{d} {Number(d) === 1 ? "سنة" : "سنوات"}</option>)}</select></div>
            <div className="relative"><DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" /><select dir="ltr" value={priceRangeIdx} onChange={e => handleFilterChange(() => setPriceRangeIdx(Number(e.target.value)))} className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white transition text-left">{PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}</select></div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 pb-16">
        {loading && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{Array.from({ length: PAGE_SIZE }).map((_, i) => <SkeletonCard key={i} />)}</div>}
        {!loading && error && <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"><AlertCircle className="mx-auto text-red-500 mb-3" size={40} /><h3 className="text-red-700 font-bold text-lg mb-2">تعذّر جلب البيانات</h3><p className="text-red-600 text-sm">{error}</p></div>}
        {!loading && !error && filtered.length === 0 && <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center"><BookOpen className="mx-auto text-gray-300 mb-3" size={48} /><h3 className="text-gray-700 font-bold text-lg mb-2">لا توجد نتائج</h3><p className="text-gray-500 text-sm">جرّب تعديل معايير البحث أو الفلاتر</p></div>}
        {!loading && !error && paginated.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {paginated.map(course => (
                <div key={course.id} className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-green-200 transition-all">
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{course.name}</h3>
                  <p className="text-green-700 text-sm font-medium mb-4">{course.universities?.[0]?.name ?? "Lincoln University College"}</p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                    {course.duration != null && <span className="flex items-center gap-1.5"><Clock size={14} className="text-green-500 flex-shrink-0" />{course.duration} {Number(course.duration) === 1 ? "سنة" : "سنوات"}</span>}
                    {course.intake && <span className="flex items-center gap-1.5"><Calendar size={14} className="text-green-500 flex-shrink-0" />{course.intake.trim()}</span>}
                    <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-green-500 flex-shrink-0" />{course.price == null || course.price === 0 ? <span className="text-gray-400 italic">السعر غير متوفر</span> : <><span className="font-semibold text-green-700">{course.price.toLocaleString()} RM</span><span className="text-gray-400 text-xs">/ € {toEur(course.price)}</span><span className="text-gray-400 text-xs">· / year</span></>}</span>
                  </div>
                </div>
              ))}
            </div>
            {totalPages > 1 && (<div className="flex items-center justify-center gap-2 flex-wrap"><button onClick={() => { setPage(p => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={page === 1} className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"><ChevronRight size={16} />السابق</button>{pageNumbers.map((num, i) => num === "..." ? <span key={`e-${i}`} className="px-2 text-gray-400">…</span> : <button key={num} onClick={() => { setPage(num); window.scrollTo({ top: 0, behavior: "smooth" }); }} className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all border ${page === num ? "bg-green-600 text-white border-green-600 shadow-md" : "bg-white text-gray-700 border-gray-200 hover:bg-green-50 hover:border-green-300"}`}>{num}</button>)}<button onClick={() => { setPage(p => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }} disabled={page === totalPages} className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-green-50 hover:border-green-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all">التالي<ChevronLeft size={16} /></button></div>)}
            {totalPages > 1 && <p className="text-center text-xs text-gray-400 mt-3">الصفحة {page} من {totalPages} · {filtered.length.toLocaleString()} مادة دراسية</p>}
          </>
        )}
      </div>
    </div>
  );
}
