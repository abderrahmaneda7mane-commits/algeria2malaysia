import { useState, useEffect } from "react";
import { ArrowLeft, Search, GraduationCap, Clock, Calendar, DollarSign, ChevronDown } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

const API_BASE = import.meta.env.VITE_API_URL ?? "";

type Program = {
  id: number;
  name: string;
  nameAr: string;
  level: string;
  duration: string;
  intake: string;
  description: string | null;
  feeMyr: number;
  feeEur: number;
  universityName: string;
  universityNameAr: string;
  lastUpdated: string;
};

const LEVEL_COLORS: Record<string, string> = {
  "البكالوريوس": "bg-blue-100 text-blue-700",
  "الماستر": "bg-purple-100 text-purple-700",
  "الدكتوراه": "bg-rose-100 text-rose-700",
  "التأهيلي": "bg-amber-100 text-amber-700",
};

const LEVELS = ["الكل", "البكالوريوس", "الماستر", "الدكتوراه", "التأهيلي"];

export default function ProgramsPage() {
  const { go } = useNavigate();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("الكل");
  const [sortBy, setSortBy] = useState<"fee-asc" | "fee-desc" | "name">("name");
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/programs?university=upm`)
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setPrograms(json.data as Program[]);
        } else {
          setError("تعذّر تحميل البيانات");
        }
      })
      .catch(() => setError("تعذّر الاتصال بالخادم"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = programs
    .filter((p) => {
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.nameAr.toLowerCase().includes(q) ||
        p.name.toLowerCase().includes(q);
      const matchLevel = levelFilter === "الكل" || p.level === levelFilter;
      return matchSearch && matchLevel;
    })
    .sort((a, b) => {
      if (sortBy === "fee-asc") return a.feeMyr - b.feeMyr;
      if (sortBy === "fee-desc") return b.feeMyr - a.feeMyr;
      return a.nameAr.localeCompare(b.nameAr, "ar");
    });

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 to-green-700 text-white py-16 px-4 text-center">
        <button
          onClick={() => go("home")}
          className="inline-flex items-center gap-2 text-green-300 hover:text-white text-sm mb-6 transition-colors"
        >
          <ArrowLeft size={16} className="rotate-180" />
          العودة للرئيسية
        </button>
        <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1 text-sm font-medium mb-4">
          🎓 برامج الجامعات
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">برامج جامعة بوترا ماليزيا (UPM)</h1>
        <p className="text-green-100 max-w-xl mx-auto">
          تصفّح جميع البرامج الدراسية مع الرسوم الحقيقية بالرينغت والأورو
        </p>
        {programs.length > 0 && (
          <div className="mt-4 text-green-200 text-sm">
            آخر تحديث: {new Date(programs[0].lastUpdated).toLocaleDateString("ar-DZ")}
          </div>
        )}
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={16} className="absolute top-3 right-3 text-gray-400" />
            <input
              type="text"
              placeholder="ابحث عن تخصص..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pr-9 pl-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {/* Level Filter */}
          <div className="flex gap-2 flex-wrap">
            {LEVELS.map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  levelFilter === l
                    ? "bg-green-700 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-800"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="appearance-none pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-green-400 cursor-pointer"
            >
              <option value="name">ترتيب: الاسم</option>
              <option value="fee-asc">السعر: الأقل أولاً</option>
              <option value="fee-desc">السعر: الأعلى أولاً</option>
            </select>
            <ChevronDown size={14} className="absolute left-2.5 top-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Results Count */}
        {!loading && !error && (
          <p className="text-sm text-gray-500 mb-4">
            عرض <span className="font-bold text-gray-800">{filtered.length}</span> برنامج
            {levelFilter !== "الكل" && <span> في مرحلة {levelFilter}</span>}
          </p>
        )}

        {/* States */}
        {loading && (
          <div className="flex items-center justify-center py-20 gap-3 text-gray-400">
            <div className="w-6 h-6 border-2 border-green-400 border-t-transparent rounded-full animate-spin" />
            <span>جاري تحميل البرامج...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <p className="text-red-600 font-semibold">{error}</p>
            <p className="text-red-400 text-sm mt-1">تأكد من تشغيل الخادم وإعادة المحاولة</p>
          </div>
        )}

        {/* Programs Grid */}
        {!loading && !error && (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-400">
                <GraduationCap size={48} className="mx-auto mb-3 opacity-30" />
                <p>لم يتم العثور على برامج تطابق البحث</p>
              </div>
            ) : (
              filtered.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all"
                >
                  <button
                    className="w-full text-right p-5 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer"
                    onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                  >
                    {/* Badge */}
                    <span className={`self-start px-2.5 py-1 rounded-lg text-xs font-bold ${LEVEL_COLORS[p.level] ?? "bg-gray-100 text-gray-600"}`}>
                      {p.level}
                    </span>

                    {/* Name */}
                    <div className="flex-1">
                      <p className="font-bold text-gray-900 text-base">{p.nameAr}</p>
                      <p className="text-gray-400 text-xs mt-0.5">{p.name}</p>
                    </div>

                    {/* Fees */}
                    <div className="flex gap-3 flex-shrink-0">
                      {p.feeMyr === 0 ? (
                        <div className="text-center">
                          <p className="text-xs text-gray-400">الرسوم</p>
                          <p className="font-bold text-amber-600 text-xs bg-amber-50 px-2 py-1 rounded-lg">تواصل للاستفسار</p>
                        </div>
                      ) : (
                        <>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">سنوياً (RM)</p>
                            <p className="font-bold text-green-700 text-sm">{p.feeMyr.toLocaleString()}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400">سنوياً (€)</p>
                            <p className="font-bold text-blue-600 text-sm">€{p.feeEur.toLocaleString()}</p>
                          </div>
                        </>
                      )}
                    </div>

                    <ChevronDown
                      size={16}
                      className={`flex-shrink-0 text-gray-400 transition-transform ${expanded === p.id ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Expanded Details */}
                  {expanded === p.id && (
                    <div className="px-5 pb-5 border-t border-gray-50 bg-gray-50/50">
                      <div className="grid sm:grid-cols-3 gap-3 mt-4 mb-3">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock size={14} className="text-green-600 flex-shrink-0" />
                          <span><strong>المدة:</strong> {p.duration}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar size={14} className="text-green-600 flex-shrink-0" />
                          <span><strong>القبول:</strong> {p.intake}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <DollarSign size={14} className="text-green-600 flex-shrink-0" />
                          <span><strong>العملة الأصلية:</strong> رينغت ماليزي</span>
                        </div>
                      </div>
                      {p.description && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">{p.description}</p>
                      )}
                      {p.feeMyr === 0 && (
                        <p className="text-amber-700 text-sm bg-amber-50 rounded-xl px-4 py-2 mb-3 border border-amber-100">
                          💡 هذا البرنامج بحثي — الرسوم تُحدَّد حسب الجامعة وقد تختلف بحسب الجنسية والمنحة. تواصل معنا للاستفسار.
                        </p>
                      )}
                      <button
                        onClick={() => go("uni-apply", { university: "UPM — Universiti Putra Malaysia" })}
                        className="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all"
                      >
                        📄 طلب Offer Letter لـ {p.nameAr}
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Disclaimer */}
        {!loading && !error && filtered.length > 0 && (
          <p className="text-xs text-gray-400 text-center mt-6">
            * الرسوم الدراسية المذكورة تقديرية للطلاب الدوليين — يُحدَّث كل 24 ساعة
          </p>
        )}
      </div>
    </div>
  );
}
