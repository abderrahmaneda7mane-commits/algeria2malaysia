import { useState, useEffect, useRef } from "react";
import { ArrowLeft, CheckCircle, User, Phone, Mail, GraduationCap, FileText, Globe, Upload, BookOpen } from "lucide-react";
import { useNavigate, getNavState } from "../hooks/useNavigate";

const WA_NUMBER = "601112200603";

const UNIVERSITIES = [
  "APU — Asia Pacific University",
  "Taylor's University",
  "MMU — Multimedia University",
  "UniKL — Universiti Kuala Lumpur",
  "Lincoln University College",
  "UTP — Universiti Teknologi PETRONAS",
  "UPM — Universiti Putra Malaysia",
  "UTM — Universiti Teknologi Malaysia",
  "UTeM — Universiti Teknikal Malaysia Melaka",
  "UCSI University",
  "Sunway University",
  "City University Malaysia",
  "Not decided yet",
];

const UNI_NAME_MAP: Record<string, string> = {
  "APU": "APU — Asia Pacific University",
  "Taylor's University": "Taylor's University",
  "MMU": "MMU — Multimedia University",
  "UniKL": "UniKL — Universiti Kuala Lumpur",
  "Lincoln University": "Lincoln University College",
  "UTP": "UTP — Universiti Teknologi PETRONAS",
  "UPM": "UPM — Universiti Putra Malaysia",
  "UTM": "UTM — Universiti Teknologi Malaysia",
  "UTeM": "UTeM — Universiti Teknikal Malaysia Melaka",
  "UCSI University": "UCSI University",
  "Sunway University": "Sunway University",
  "City University": "City University Malaysia",
};

const HOW_OPTIONS = [
  "Instagram",
  "TikTok",
  "Facebook",
  "WhatsApp Group",
  "Friend / Referral",
  "Google Search",
  "YouTube",
  "Other",
];

const LEVELS = [
  "Foundation",
  "Diploma",
  "Bachelor / Licence",
  "Master",
  "PhD / Doctorate",
];

interface FileEntry { name: string; file: File }

interface FormData {
  fullName: string;
  passportNumber: string;
  phone: string;
  email: string;
  university: string;
  howHeard: string;
  programme: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  levelOfStudy: string;
}

const empty: FormData = {
  fullName: "",
  passportNumber: "",
  phone: "",
  email: "",
  university: "",
  howHeard: "",
  programme: "",
  parentName: "",
  parentPhone: "",
  parentEmail: "",
  levelOfStudy: "",
};

interface DocField {
  key: string;
  label: string;
  labelAr: string;
  note?: string;
  required?: boolean;
}

const DOC_FIELDS: DocField[] = [
  { key: "highschool", label: "High School Certificate", labelAr: "نسخة شهادة الثانوية العامة الأصلية", required: true },
  { key: "bachelor", label: "Bachelor Certificate + Transcripts", labelAr: "شهادة البكالوريوس مع كشف الدرجات", note: "(للماستر والدكتوراه فقط)" },
  { key: "master", label: "Master Certificate + Transcripts", labelAr: "شهادة الماستر مع كشف الدرجات", note: "(للدكتوراه فقط)" },
  { key: "photo", label: "Photo — White Background", labelAr: "صورة شخصية خلفية بيضاء", required: true },
  { key: "passport", label: "Passport Copy", labelAr: "نسخة جواز السفر (كامل الصفحات)", required: true },
  { key: "ielts", label: "IELTS / TOEFL Certificate", labelAr: "شهادة آيلتس أو توفل (إن وجدت)" },
];

export default function UniApplyPage() {
  const { go } = useNavigate();
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<FormData & { howHeard: string }>>({});
  const [submitted, setSubmitted] = useState(false);
  const [docs, setDocs] = useState<Record<string, FileEntry[]>>({});
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    const { state } = getNavState();
    if (state.university) {
      const mapped = UNI_NAME_MAP[state.university];
      if (mapped) setForm((f) => ({ ...f, university: mapped }));
    }
  }, []);

  function set(k: keyof FormData, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  }

  function handleFiles(key: string, files: FileList | null) {
    if (!files) return;
    const entries: FileEntry[] = Array.from(files).map((f) => ({ name: f.name, file: f }));
    setDocs((d) => ({ ...d, [key]: entries }));
  }

  function removeFile(key: string, idx: number) {
    setDocs((d) => ({ ...d, [key]: (d[key] || []).filter((_, i) => i !== idx) }));
  }

  function validate() {
    const e: Partial<FormData & { howHeard: string }> = {};
    if (!form.fullName.trim()) e.fullName = "Full Name is required";
    if (!form.passportNumber.trim()) e.passportNumber = "Passport Number is required";
    if (!form.phone.trim()) e.phone = "Phone Number is required";
    if (!form.email.trim()) e.email = "Email is required";
    if (!form.programme.trim()) e.programme = "Programme is required";
    if (!form.howHeard) e.howHeard = "Please select how you heard about us";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      const firstErr = document.querySelector("[data-error='true']");
      firstErr?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    const docLines = DOC_FIELDS.map((d) => {
      const files = docs[d.key] || [];
      if (files.length === 0) return `• ${d.label}: ❌ Not attached`;
      return `• ${d.label}: ✅ ${files.map((f) => f.name).join(", ")}`;
    });

    const msg = [
      "🎓 *Online Application — Offer Letter Request*",
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "👤 *Personal Information*",
      `• Full Name: ${form.fullName}`,
      `• Passport Number: ${form.passportNumber}`,
      `• Phone: ${form.phone}`,
      `• Email: ${form.email}`,
      "",
      "🎓 *Academic Information*",
      `• Level of Study: ${form.levelOfStudy || "Not specified"}`,
      `• Programme: ${form.programme}`,
      `• University: ${form.university || "Not decided"}`,
      "",
      "👨‍👩‍👦 *Parent Information*",
      form.parentName ? `• Parent's Name: ${form.parentName}` : "• Parent's Name: —",
      form.parentPhone ? `• Parent's Phone: ${form.parentPhone}` : "• Parent's Phone: —",
      form.parentEmail ? `• Parent's Email: ${form.parentEmail}` : "• Parent's Email: —",
      "",
      `📢 *How did you hear about us:* ${form.howHeard}`,
      "",
      "📎 *Documents*",
      ...docLines,
      "",
      "━━━━━━━━━━━━━━━━━━━━",
      "_مرحبًا، لقد قمت بتعبئة نموذج التقديم، يرجى مساعدتي في استخراج الـ Offer Letter._",
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inputCls = (field: keyof FormData) =>
    `w-full border ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"} rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition placeholder-gray-400`;

  const selectCls = (field: keyof (FormData & { howHeard: string })) =>
    `w-full border ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"} rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-20" dir="rtl">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">تم إرسال طلبك! 🎉</h2>
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-green-100 text-right">
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              شكراً لك <strong className="text-green-700">{form.fullName}</strong>، استلمنا معلوماتك كاملة.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <p className="text-green-800 font-semibold text-sm leading-relaxed">
                📋 سيقوم فريق Algeria2Malaysia بمراجعة طلبك والتواصل معك قريباً لاستكمال إجراءات الحصول على <strong>خطاب القبول (Offer Letter)</strong>.
              </p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-right">
              <p className="text-amber-800 text-sm font-medium">
                📎 إذا لم تتمكن من إرفاق وثائقك في النموذج، يرجى إرسالها مباشرة عبر واتساب.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => go("home")}
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-full font-bold text-base transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} className="rotate-180" />
              العودة للصفحة الرئيسية
            </button>
            <button
              onClick={() => go("universities")}
              className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-4 rounded-full font-bold text-base transition-all flex items-center justify-center gap-2"
            >
              <GraduationCap size={18} />
              تصفح الجامعات والأسعار
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-14 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <button
            onClick={() => go("home")}
            className="inline-flex items-center gap-2 text-green-300 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} className="rotate-180" />
            العودة للرئيسية
          </button>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
            <FileText size={32} className="text-white" />
          </div>
          <div className="inline-block bg-amber-400/20 border border-amber-300/40 text-amber-200 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            📄 Online Application — Offer Letter
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-3 leading-tight">
            طلب خطاب القبول
            <span className="block text-green-300 text-2xl mt-1">Offer Letter Request</span>
          </h1>
          <div className="inline-block bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-sm text-green-100 font-medium mt-2">
            ⚠️ يرجى كتابة جميع المعلومات باللغة الإنجليزية
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Personal Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-green-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Personal Information</h3>
                <p className="text-xs text-gray-500">المعلومات الشخصية الأساسية</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                  <span className="text-gray-400 font-normal text-xs mr-2">اسمك الكامل</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ahmed Mohamed Benali"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  className={inputCls("fullName")}
                  dir="ltr"
                  data-error={!!errors.fullName}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Passport Number <span className="text-red-500">*</span>
                  <span className="text-gray-400 font-normal text-xs mr-2">رقم الجواز</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. AB1234567"
                  value={form.passportNumber}
                  onChange={(e) => set("passportNumber", e.target.value)}
                  className={inputCls("passportNumber")}
                  dir="ltr"
                  data-error={!!errors.passportNumber}
                />
                {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Phone size={13} />
                      Phone Number <span className="text-red-500">*</span>
                    </span>
                    <span className="text-gray-400 font-normal text-xs">يرجى كتابة الرقم مع المفتاح الدولي</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+213 6XX XXX XXX"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={inputCls("phone")}
                    dir="ltr"
                    data-error={!!errors.phone}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Mail size={13} />
                      Email <span className="text-red-500">*</span>
                    </span>
                    <span className="text-gray-400 font-normal text-xs">إيميلك الشخصي</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls("email")}
                    dir="ltr"
                    data-error={!!errors.email}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

            </div>
          </div>

          {/* Academic Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <GraduationCap size={20} className="text-purple-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Academic Information</h3>
                <p className="text-xs text-gray-500">المعلومات الأكاديمية</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Level of Study
                  <span className="text-gray-400 font-normal text-xs mr-2">المستوى الدراسي</span>
                </label>
                <select
                  value={form.levelOfStudy}
                  onChange={(e) => set("levelOfStudy", e.target.value)}
                  className={selectCls("levelOfStudy")}
                >
                  <option value="">Select level...</option>
                  {LEVELS.map((l) => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Programme <span className="text-red-500">*</span>
                  <span className="text-gray-400 font-normal text-xs mr-2">اسم التخصص</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer Science, Civil Engineering, Business Administration..."
                  value={form.programme}
                  onChange={(e) => set("programme", e.target.value)}
                  className={inputCls("programme")}
                  dir="ltr"
                  data-error={!!errors.programme}
                />
                {errors.programme && <p className="text-red-500 text-xs mt-1">{errors.programme}</p>}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  University
                  <span className="text-gray-400 font-normal text-xs mr-2">اختر اسم الجامعة</span>
                </label>
                <select
                  value={form.university}
                  onChange={(e) => set("university", e.target.value)}
                  className={selectCls("university")}
                >
                  <option value="">Select university...</option>
                  {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <BookOpen size={20} className="text-blue-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Parent's Information <span className="text-gray-400 text-sm font-normal">(Optional)</span></h3>
                <p className="text-xs text-gray-500">معلومات الوالدين — اختياري</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Parent's Name
                  <span className="text-gray-400 font-normal text-xs mr-2">اسم الوالد أو الوالدة</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Mohamed Benali"
                  value={form.parentName}
                  onChange={(e) => set("parentName", e.target.value)}
                  className={inputCls("parentName")}
                  dir="ltr"
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Parent's Phone
                    <span className="block text-gray-400 font-normal text-xs">مع المفتاح الدولي</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+213 6XX XXX XXX"
                    value={form.parentPhone}
                    onChange={(e) => set("parentPhone", e.target.value)}
                    className={inputCls("parentPhone")}
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Parent's Email
                    <span className="block text-gray-400 font-normal text-xs">الإيميل</span>
                  </label>
                  <input
                    type="email"
                    placeholder="parent@email.com"
                    value={form.parentEmail}
                    onChange={(e) => set("parentEmail", e.target.value)}
                    className={inputCls("parentEmail")}
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* How did you hear about us */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe size={20} className="text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  How did you hear about us? <span className="text-red-500">*</span>
                </h3>
                <p className="text-xs text-gray-500">كيف وصلت إلينا؟</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2" data-error={!!errors.howHeard}>
              {HOW_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => { setForm((f) => ({ ...f, howHeard: opt })); setErrors((e) => ({ ...e, howHeard: "" })); }}
                  className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                    form.howHeard === opt
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-gray-200 text-gray-600 hover:border-green-300"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {errors.howHeard && <p className="text-red-500 text-xs mt-2">{errors.howHeard}</p>}
          </div>

          {/* Documents Upload */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Upload size={20} className="text-rose-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Documents / الوثائق</h3>
                <p className="text-xs text-gray-500">أرفق وثائقك — يمكن إرسالها لاحقاً عبر واتساب</p>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800 mb-5">
              💡 إذا لم تتمكن من الإرفاق الآن، يمكنك إرسال الوثائق مباشرة عبر واتساب بعد إرسال الطلب.
            </div>
            <div className="space-y-4">
              {DOC_FIELDS.map((doc) => (
                <div key={doc.key} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {doc.label}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                        {doc.note && <span className="text-gray-400 font-normal text-xs ml-2">{doc.note}</span>}
                      </p>
                      <p className="text-xs text-gray-500">{doc.labelAr}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileRefs.current[doc.key]?.click()}
                      className="flex items-center gap-2 text-xs font-semibold text-green-700 border-2 border-green-300 hover:bg-green-50 px-3 py-1.5 rounded-full transition-all whitespace-nowrap"
                    >
                      <Upload size={13} />
                      Drop files here
                    </button>
                  </div>
                  <input
                    ref={(el) => { fileRefs.current[doc.key] = el; }}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFiles(doc.key, e.target.files)}
                    accept=".pdf,.jpg,.jpeg,.png,.heic"
                  />
                  {(docs[doc.key] || []).length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {(docs[doc.key] || []).map((f, i) => (
                        <span key={i} className="flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-800 text-xs px-3 py-1 rounded-full">
                          <CheckCircle size={11} />
                          {f.name}
                          <button
                            type="button"
                            onClick={() => removeFile(doc.key, i)}
                            className="text-green-500 hover:text-red-500 ml-1 font-bold"
                          >×</button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-2xl p-6 text-white text-center shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle size={20} className="text-green-300" />
              <span className="text-green-200 text-sm">استشارة مجانية 100% — بدون أي رسوم</span>
            </div>
            <p className="text-green-200 text-xs mb-4">
              بعد الإرسال سيفتح واتساب تلقائياً مع رسالة جاهزة تحتوي على جميع بياناتك
            </p>
            <button
              type="submit"
              className="w-full bg-white text-green-800 py-4 rounded-xl font-black text-lg hover:bg-green-50 transition-all shadow-lg flex items-center justify-center gap-3 group"
            >
              <FileText size={22} />
              <span>إرسال الطلب — Send Application</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
