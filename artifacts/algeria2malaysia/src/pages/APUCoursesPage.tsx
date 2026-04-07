import { useState, useEffect, useMemo } from "react";
import { ArrowLeft, Search, BookOpen, Clock, Calendar, DollarSign, AlertCircle, GraduationCap, ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";
import { supabase } from "../lib/supabase";

const APU_UNIVERSITY_ID = 2;
const PAGE_SIZE = 12;
const EUR_RATE = 5;

function toEur(rm: number) {
  return Math.round(rm / EUR_RATE).toLocaleString();
}

interface Course {
  id: number;
  name: string;
  duration: number | null;
  intake: string | null;
  price: number | null;
  universities: { name: string }[] | null;
}

const PRICE_RANGES = [
  { label: "الكل", min: 0, max: Infinity },
  { label: "RM 10,000 – 25,000 \u00A0·\u00A0 €2,000 – €5,000", min: 10000, max: 25000 },
  { label: "RM 25,000 – 40,000 \u00A0·\u00A0 €5,000 – €8,000", min: 25000, max: 40000 },
  { label: "RM +40,000 \u00A0·\u00A0 €8,000+", min: 40000, max: Infinity },
];

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
      <div className="flex gap-3">
        <div className="h-4 bg-gray-100 rounded w-1/4"></div>
        <div className="h-4 bg-gray-100 rounded w-1/4"></div>
        <div className="h-4 bg-gray-100 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export default function APUCoursesPage() {
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
      setLoading(true);
      setError(null);
      try {
        const { data, error: sbError } = await supabase
          .from("courses")
          .select("id, name, duration, intake, price, universities(name)")
          .eq("university_id", APU_UNIVERSITY_ID);

        if (sbError) throw new Error(sbError.message);
        setCourses(data ?? []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "حدث خطأ أثناء جلب البيانات");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const durations = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => {
      if (c.duration != null) set.add(String(c.duration));
    });
    return ["all", ...Array.from(set).sort((a, b) => Number(a) - Number(b))];
  }, [courses]);

  const filtered = useMemo(() => {
    const priceRange = PRICE_RANGES[priceRangeIdx];
    return courses.filter((c) => {
      const matchSearch = search.trim() === "" || c.name.toLowerCase().includes(search.toLowerCase());
      const matchDuration = durationFilter === "all" || String(c.duration) === durationFilter;
      const price = c.price ?? 0;
      const matchPrice = price >= priceRange.min && price < priceRange.max;
      return matchSearch && matchDuration && matchPrice;
    });
  }, [courses, search, durationFilter, priceRangeIdx]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));

  const paginated = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  function handleFilterChange(fn: () => void) {
    fn();
    setPage(1);
  }

  const pageNumbers = useMemo(() => {
    const delta = 2;
    const range: (number | "...")[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  }, [page, totalPages]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white pt-12 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => go("universities")}
            className="flex items-center gap-2 text-blue-200 hover:text-white transition-colors mb-6 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span>العودة إلى الجامعات</span>
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 p-2 shadow-lg">
              <img src="/logos/apu.png" alt="APU" className="max-w-full max-h-full object-contain" />
            </div>
            <div>
              <div className="inline-block bg-blue-500/40 border border-blue-400/40 rounded-full px-3 py-0.5 text-xs font-semibold text-blue-100 mb-1">
                جامعة خاصة · IT & Technology
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">جامعة آسيا باسيفيك للتكنولوجيا والابتكار (APU)</h1>
              <p className="text-blue-200 text-sm mt-0.5">Asia Pacific University of Technology & Innovation</p>
            </div>
          </div>

          {!loading && !error && (
            <div className="mt-4 inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium">
              <BookOpen size={15} />
              <span>
                {filtered.length === courses.length
                  ? `${courses.length.toLocaleString()} مادة دراسية`
                  : `${filtered.length.toLocaleString()} من ${courses.length.toLocaleString()} مادة دراسية`}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-5xl mx-auto px-4 -mt-6 mb-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="ابحث باسم المادة..."
                value={search}
                onChange={(e) => handleFilterChange(() => setSearch(e.target.value))}
                className="w-full border border-gray-200 rounded-xl py-2.5 pr-9 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            {/* Duration filter */}
            <div className="relative">
              <Clock size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={durationFilter}
                onChange={(e) => handleFilterChange(() => setDurationFilter(e.target.value))}
                className="w-full border border-gray-200 rounded-xl py-2.5 pr-9 pl-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition"
              >
                <option value="all">كل المدد الدراسية</option>
                {durations.filter((d) => d !== "all").map((d) => (
                  <option key={d} value={d}>
                    {d} {Number(d) === 1 ? "سنة" : "سنوات"}
                  </option>
                ))}
              </select>
            </div>

            {/* Price range filter */}
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                dir="ltr"
                value={priceRangeIdx}
                onChange={(e) => handleFilterChange(() => setPriceRangeIdx(Number(e.target.value)))}
                className="w-full border border-gray-200 rounded-xl py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition text-left"
              >
                {PRICE_RANGES.map((r, i) => (
                  <option key={i} value={i}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 pb-16">
        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <AlertCircle className="mx-auto text-red-500 mb-3" size={40} />
            <h3 className="text-red-700 font-bold text-lg mb-2">تعذّر جلب البيانات</h3>
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center">
            <BookOpen className="mx-auto text-gray-300 mb-3" size={48} />
            <h3 className="text-gray-700 font-bold text-lg mb-2">لا توجد نتائج</h3>
            <p className="text-gray-500 text-sm">جرّب تعديل معايير البحث أو الفلاتر</p>
          </div>
        )}

        {/* Course cards */}
        {!loading && !error && paginated.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {paginated.map((course) => (
                <div
                  key={course.id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">
                    {course.name}
                  </h3>
                  <p className="text-blue-700 text-sm font-medium mb-4">
                    {course.universities?.[0]?.name ?? "APU"}
                  </p>
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                    {course.duration != null && (
                      <span className="flex items-center gap-1.5">
                        <Clock size={14} className="text-blue-500 flex-shrink-0" />
                        {course.duration} {Number(course.duration) === 1 ? "سنة" : "سنوات"}
                      </span>
                    )}
                    {course.intake && (
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-blue-500 flex-shrink-0" />
                        {course.intake.trim()}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5">
                      <DollarSign size={14} className="text-blue-500 flex-shrink-0" />
                      {course.price == null || course.price === 0 ? (
                        <span className="text-gray-400 italic">السعر غير متوفر</span>
                      ) : (
                        <>
                          <span className="font-semibold text-green-700">{course.price.toLocaleString()} RM</span>
                          <span className="text-gray-400 text-xs">/ سنة · € {toEur(course.price)}</span>
                          <span className="text-gray-400 text-xs">· / year</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 flex-wrap">
                <button
                  onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                  السابق
                </button>

                {pageNumbers.map((num, i) =>
                  num === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-gray-400 select-none">…</span>
                  ) : (
                    <button
                      key={num}
                      onClick={() => { setPage(num); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all border ${
                        page === num
                          ? "bg-blue-600 text-white border-blue-600 shadow-md"
                          : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:border-blue-300"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}

                <button
                  onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  disabled={page === totalPages}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  التالي
                  <ChevronLeft size={16} />
                </button>
              </div>
            )}

            {/* Page info */}
            {totalPages > 1 && (
              <p className="text-center text-xs text-gray-400 mt-3">
                الصفحة {page} من {totalPages} · {filtered.length.toLocaleString()} مادة دراسية
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
