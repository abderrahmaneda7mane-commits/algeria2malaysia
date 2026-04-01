import { useState } from "react";
import { ArrowLeft, CheckCircle, User, Phone, Mail, BookOpen, Star, DollarSign, MessageSquare, GraduationCap, FileText } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

const WA_NUMBER = "601112200603";

const UNIVERSITIES = [
  "APU — جامعة آسيا باسيفيك للتكنولوجيا والابتكار",
  "Taylor's University — جامعة تايلور",
  "MMU — جامعة الوسائط المتعددة",
  "UniKL — جامعة كوالالمبور",
  "Lincoln University — جامعة لينكولن",
  "UTP — جامعة تكنولوجيا بتروناس",
  "UPM — جامعة بوترا ماليزيا",
  "UM — جامعة مالايا",
  "UCSI University",
  "Sunway University — جامعة صنواي",
  "لم أحدد بعد — أحتاج مساعدة في الاختيار",
];

const FIELDS = [
  "هندسة (ميكانيك / كهرباء / مدني / بترول)",
  "علوم الحاسوب وتكنولوجيا المعلومات",
  "الذكاء الاصطناعي وعلم البيانات",
  "الأمن السيبراني",
  "إدارة الأعمال والتسويق",
  "المحاسبة والمالية",
  "الطب والجراحة (MBBS)",
  "الصيدلة وعلوم الصحة",
  "القانون",
  "التصميم والفنون",
  "الضيافة والسياحة",
  "أخرى",
];

const BUDGETS = [
  "أقل من 3,000 يورو / سنة",
  "3,000 – 5,000 يورو / سنة",
  "5,000 – 8,000 يورو / سنة",
  "8,000 – 12,000 يورو / سنة",
  "أكثر من 12,000 يورو / سنة",
];

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  bacYear: string;
  bacGrade: string;
  bacSpecialty: string;
  field: string;
  university: string;
  budget: string;
  hasDocuments: string;
  notes: string;
}

const empty: FormData = {
  fullName: "",
  phone: "",
  email: "",
  bacYear: "",
  bacGrade: "",
  bacSpecialty: "",
  field: "",
  university: "",
  budget: "",
  hasDocuments: "",
  notes: "",
};

export default function UniApplyPage() {
  const { go } = useNavigate();
  const [form, setForm] = useState<FormData>(empty);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  function set(k: keyof FormData, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  }

  function validate() {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = "الاسم مطلوب";
    if (!form.phone.trim()) e.phone = "رقم الهاتف مطلوب";
    if (!form.bacGrade.trim()) e.bacGrade = "المعدل مطلوب";
    if (!form.field) e.field = "التخصص مطلوب";
    if (!form.budget) e.budget = "الميزانية مطلوبة";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const msg = [
      "🎓 *طلب Offer Letter — جامعة في ماليزيا*",
      "",
      `👤 الاسم: ${form.fullName}`,
      `📞 الهاتف: ${form.phone}`,
      form.email ? `📧 البريد: ${form.email}` : "",
      "",
      `📋 *معلومات البكالوريا:*`,
      `• سنة البكالوريا: ${form.bacYear || "غير محدد"}`,
      `• معدل البكالوريا: ${form.bacGrade}`,
      `• شعبة البكالوريا: ${form.bacSpecialty || "غير محدد"}`,
      "",
      `🎯 *التخصص المرغوب:* ${form.field}`,
      `🏫 *الجامعة المفضلة:* ${form.university || "لم يحدد"}`,
      `💰 *الميزانية:* ${form.budget}`,
      `📂 *مستندات جاهزة:* ${form.hasDocuments || "لم يحدد"}`,
      form.notes ? `📝 ملاحظات: ${form.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const inputCls = (field: keyof FormData) =>
    `w-full border ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"} rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition placeholder-gray-400`;

  const selectCls = (field: keyof FormData) =>
    `w-full border ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-white"} rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition`;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white flex items-center justify-center px-4 py-20" dir="rtl">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CheckCircle size={48} className="text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">تم إرسال طلبك بنجاح! 🎉</h2>
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-green-100 text-right">
            <p className="text-gray-700 leading-relaxed text-base mb-4">
              شكراً لك <strong className="text-green-700">{form.fullName}</strong>، استلمنا معلوماتك كاملة.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <p className="text-green-800 font-semibold text-sm leading-relaxed">
                📋 سيقوم فريق Algeria2Malaysia بمراجعة معلوماتك ومعدل باكالوريوسك، وسيتواصل معك قريباً لإعلامك بأفضل الجامعات والأسعار المناسبة لوضعك، والبدء في إجراءات الحصول على <strong>خطاب القبول (Offer Letter)</strong>.
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 rounded-xl p-3">
              <Phone size={14} className="text-green-600 flex-shrink-0" />
              <span>تحقق من واتساب — أرسلنا لك رسالة تلقائية تحتوي على بياناتك</span>
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
      <div className="bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white py-16 px-4 text-center relative overflow-hidden">
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
            📄 طلب Offer Letter من جامعة ماليزية
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-4 leading-tight">
            احصل على خطاب القبول<br />
            <span className="text-green-300">من أفضل جامعة تناسبك</span>
          </h1>
          <p className="text-green-100 text-base leading-relaxed">
            أدخل معلوماتك ومعدل باكالوريوسك — سيقوم فريقنا بمراجعة وضعك وإيجاد أفضل جامعة وأفضل سعر مناسب لك، ثم يتواصل معك قريباً.
          </p>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-lg mx-auto">
            {[
              { icon: "🆓", text: "مجاني 100%" },
              { icon: "⚡", text: "رد خلال 24 ساعة" },
              { icon: "🎯", text: "أفضل سعر مضمون" },
            ].map((b) => (
              <div key={b.text} className="bg-white/10 backdrop-blur-sm rounded-xl py-3 px-2 text-center border border-white/20">
                <div className="text-xl mb-1">{b.icon}</div>
                <div className="text-white text-xs font-semibold">{b.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 py-10">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">

          {/* Personal Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <User size={20} className="text-green-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">المعلومات الشخصية</h3>
                <p className="text-xs text-gray-500">بياناتك الأساسية للتواصل</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  الاسم الكامل <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: أحمد بن محمد"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  className={inputCls("fullName")}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1"><Phone size={13} /> رقم الواتساب <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="tel"
                    placeholder="مثال: 213661234567+"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={inputCls("phone")}
                    dir="ltr"
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1"><Mail size={13} /> البريد الإلكتروني</span>
                  </label>
                  <input
                    type="email"
                    placeholder="example@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls("email")}
                    dir="ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bac Info */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <BookOpen size={20} className="text-blue-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">شهادة البكالوريا</h3>
                <p className="text-xs text-gray-500">معلومات شهادتك الثانوية</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">سنة الحصول على الباك</label>
                  <select
                    value={form.bacYear}
                    onChange={(e) => set("bacYear", e.target.value)}
                    className={selectCls("bacYear")}
                  >
                    <option value="">اختر السنة</option>
                    {[2024, 2023, 2022, 2021, 2020, 2019, 2018].map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ))}
                    <option value="2025">2025 (متوقع)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    <span className="flex items-center gap-1"><Star size={13} className="text-amber-500" /> معدل الباك <span className="text-red-500">*</span></span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: 13.5 / 20  أو  جيد جداً"
                    value={form.bacGrade}
                    onChange={(e) => set("bacGrade", e.target.value)}
                    className={inputCls("bacGrade")}
                  />
                  {errors.bacGrade && <p className="text-red-500 text-xs mt-1">{errors.bacGrade}</p>}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">شعبة البكالوريا</label>
                <select
                  value={form.bacSpecialty}
                  onChange={(e) => set("bacSpecialty", e.target.value)}
                  className={selectCls("bacSpecialty")}
                >
                  <option value="">اختر الشعبة</option>
                  <option value="علوم تجريبية">علوم تجريبية</option>
                  <option value="رياضيات">رياضيات</option>
                  <option value="تقني رياضي">تقني رياضي</option>
                  <option value="تسيير واقتصاد">تسيير واقتصاد</option>
                  <option value="آداب وفلسفة">آداب وفلسفة</option>
                  <option value="لغات أجنبية">لغات أجنبية</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>
            </div>
          </div>

          {/* Academic Preferences */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <GraduationCap size={20} className="text-purple-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">التفضيلات الأكاديمية</h3>
                <p className="text-xs text-gray-500">ما الذي تريد دراسته؟</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  التخصص المرغوب <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.field}
                  onChange={(e) => set("field", e.target.value)}
                  className={selectCls("field")}
                >
                  <option value="">اختر تخصصك</option>
                  {FIELDS.map((f) => <option key={f} value={f}>{f}</option>)}
                </select>
                {errors.field && <p className="text-red-500 text-xs mt-1">{errors.field}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">الجامعة المفضلة (اختياري)</label>
                <select
                  value={form.university}
                  onChange={(e) => set("university", e.target.value)}
                  className={selectCls("university")}
                >
                  <option value="">اختر جامعة أو اترك الأمر لنا</option>
                  {UNIVERSITIES.map((u) => <option key={u} value={u}>{u}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Budget & Docs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <DollarSign size={20} className="text-amber-700" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">الميزانية والوثائق</h3>
                <p className="text-xs text-gray-500">لنجد لك أفضل سعر مناسب</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  الميزانية السنوية المتاحة <span className="text-red-500">*</span>
                </label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {BUDGETS.map((b) => (
                    <label
                      key={b}
                      className={`flex items-center gap-3 border-2 rounded-xl px-4 py-3 cursor-pointer transition-all text-sm ${
                        form.budget === b
                          ? "border-green-500 bg-green-50 text-green-800 font-semibold"
                          : "border-gray-200 hover:border-green-300 text-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        name="budget"
                        value={b}
                        checked={form.budget === b}
                        onChange={() => set("budget", b)}
                        className="accent-green-600"
                      />
                      {b}
                    </label>
                  ))}
                </div>
                {errors.budget && <p className="text-red-500 text-xs mt-1">{errors.budget}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">هل لديك وثائق جاهزة؟</label>
                <div className="flex flex-wrap gap-2">
                  {["نعم، جاهزة بالكامل", "جاهزة جزئياً", "لا، أحتاج مساعدة"].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("hasDocuments", opt)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                        form.hasDocuments === opt
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-gray-200 text-gray-600 hover:border-green-300"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <MessageSquare size={20} className="text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">ملاحظات إضافية</h3>
                <p className="text-xs text-gray-500">أي معلومات تريد إضافتها</p>
              </div>
            </div>
            <textarea
              rows={3}
              placeholder="مثال: أسكن في ولاية وهران، لدي أخ يدرس في ماليزيا، أريد Foundation أولاً، ..."
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition resize-none placeholder-gray-400"
            />
          </div>

          {/* Submit */}
          <div className="bg-gradient-to-br from-green-700 to-green-800 rounded-2xl p-6 text-white text-center shadow-xl">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle size={20} className="text-green-300" />
              <span className="text-green-200 text-sm">استشارة مجانية 100% — بدون أي رسوم</span>
            </div>
            <button
              type="submit"
              className="w-full bg-white text-green-800 py-4 rounded-xl font-black text-lg hover:bg-green-50 transition-all shadow-lg flex items-center justify-center gap-3 group mt-3"
            >
              <FileText size={22} />
              <span>أرسل طلبي واحصل على Offer Letter</span>
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <p className="text-green-300 text-xs mt-3">
              سيتواصل معك فريقنا خلال 24 ساعة عبر الواتساب
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
