import { GraduationCap, Globe, DollarSign, Shield, Star, CheckCircle, ArrowLeft, Building2, BookOpen, Users, Award } from "lucide-react";
import { useNavigate } from "../hooks/useNavigate";

export default function HomePage() {
  const { go } = useNavigate();

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-700 pt-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white py-20">
          <div className="flex justify-center mb-6">
            <img
              src="/logo.jpeg"
              alt="Algeria2Malaysia"
              className="w-28 h-28 rounded-full border-4 border-white/30 shadow-2xl object-cover"
            />
          </div>

          <div className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2 text-sm font-medium mb-6">
            🇩🇿 من الجزائر إلى ماليزيا 🇲🇾
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            ابدأ مستقبلك الأكاديمي
            <span className="block text-green-300 mt-2">في قلب ماليزيا</span>
          </h1>

          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            نساعد الطلاب الجزائريين على الدراسة في أفضل المعاهد والجامعات الماليزية.
            خطوة واحدة تفصلك عن مستقبل أفضل.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => go("apply")}
              className="bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
            >
              <span>ابدأ طلبك الآن</span>
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            </button>
            <a
              href="#why"
              className="border-2 border-white/50 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all"
            >
              اعرف أكثر
            </a>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { num: "3+", label: "معاهد معتمدة" },
              { num: "100%", label: "شفافية في الأسعار" },
              { num: "24h", label: "رد سريع" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.num}</div>
                <div className="text-xs text-green-200 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-white/60 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Why Malaysia Section */}
      <section id="why" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">لماذا ماليزيا؟</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">أفضل وجهة دراسية بتكلفة معقولة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">ماليزيا تجمع بين الجودة الأكاديمية والتكلفة المناسبة في بيئة إسلامية آمنة</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <DollarSign className="text-green-600" size={28} />,
                title: "أسعار في المتناول",
                desc: "تكاليف الدراسة والمعيشة أقل بكثير مقارنة بأوروبا وأمريكا مع نفس مستوى الجودة",
              },
              {
                icon: <Globe className="text-green-600" size={28} />,
                title: "التعليم باللغة الإنجليزية",
                desc: "جميع البرامج تدرس باللغة الإنجليزية مع شهادات معترف بها دولياً",
              },
              {
                icon: <Shield className="text-green-600" size={28} />,
                title: "بيئة إسلامية آمنة",
                desc: "ماليزيا دولة إسلامية تتميز بالأمان والاستقرار وتوفر بيئة مريحة للطلاب العرب",
              },
              {
                icon: <Award className="text-green-600" size={28} />,
                title: "جامعات معترف بها دولياً",
                desc: "شهادات من جامعات معترف بها في الجزائر وأوروبا وكل أنحاء العالم",
              },
              {
                icon: <Users className="text-green-600" size={28} />,
                title: "مجتمع عربي كبير",
                desc: "مجتمع طلابي عربي جزائري نشط يساعدك على الاندماج بسرعة ودون عزلة",
              },
              {
                icon: <GraduationCap className="text-green-600" size={28} />,
                title: "مسارات متعددة",
                desc: "من تحسين الإنجليزي إلى البكالوريوس والماستر في مختلف التخصصات",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-green-200 transition-all group"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">خدماتنا</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ماذا نقدم لك؟</h2>
            <p className="text-gray-600 max-w-xl mx-auto">نرافقك في كل خطوة من بداية التقديم حتى وصولك إلى ماليزيا</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div
              onClick={() => go("apply", { type: "institute" })}
              className="relative overflow-hidden bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-8 text-white cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 group"
            >
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-10 -translate-y-10"></div>
              <BookOpen className="mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-3">معاهد اللغة الإنجليزية</h3>
              <p className="text-green-100 leading-relaxed mb-6">
                IELTS • إنجليزي عام • مسار الجامعة
                <br />
                معاهد معتمدة في كوالالمبور بأسعار شفافة
              </p>
              <div className="flex items-center gap-2 text-green-300 font-semibold group-hover:gap-4 transition-all">
                <span>اختر معهدك</span>
                <ArrowLeft size={18} />
              </div>
            </div>

            <div
              onClick={() => go("apply", { type: "university" })}
              className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 text-white cursor-pointer hover:shadow-2xl transition-all hover:-translate-y-1 group"
            >
              <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 rounded-full -translate-x-10 -translate-y-10"></div>
              <Building2 className="mb-4" size={40} />
              <h3 className="text-2xl font-bold mb-3">القبول الجامعي</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                بكالوريوس • ماستر • دكتوراه
                <br />
                جامعات معترف بها مع تسهيل إجراءات التأشيرة
              </p>
              <div className="flex items-center gap-2 text-gray-400 font-semibold group-hover:gap-4 transition-all">
                <span>ابدأ طلبك</span>
                <ArrowLeft size={18} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Institutes Preview */}
      <section id="institutes" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-semibold mb-4">شركاؤنا</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">معاهدنا المعتمدة</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Stratford International",
                nameAr: "معهد ستراتفورد",
                badge: "إنجليزي مكثف",
                color: "bg-teal-600",
                desc: "برامج مكثفة 4-6 ساعات/يوم في موقع متميز بـ KLCC",
                from: "2,500 RM",
              },
              {
                name: "Big Ben Education",
                nameAr: "مجموعة بيغ بن",
                badge: "IELTS & IEP",
                color: "bg-red-800",
                desc: "المعهد الوحيد في ماليزيا المعتمد من Pearson. IELTS وبرامج أكاديمية متكاملة",
                from: "2,618 RM",
              },
              {
                name: "Erican Language Centre",
                nameAr: "مركز إيريكان",
                badge: "Cambridge & IELTS",
                color: "bg-orange-600",
                desc: "مركز معتمد لامتحانات Cambridge وIDP IELTS. 400,000+ متعلم",
                from: "2,000 RM",
              },
            ].map((inst) => (
              <div key={inst.name} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all hover:border-green-200 group">
                <div className={`${inst.color} h-3`}></div>
                <div className="p-6">
                  <div className={`inline-block ${inst.color} text-white text-xs font-semibold px-3 py-1 rounded-full mb-3`}>
                    {inst.badge}
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{inst.nameAr}</h3>
                  <p className="text-gray-500 text-xs mb-3">{inst.name}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{inst.desc}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-green-700 font-bold text-sm">تبدأ من {inst.from}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-green-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-block bg-green-200 text-green-800 rounded-full px-4 py-1 text-sm font-semibold mb-4">كيف يعمل النظام؟</div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">4 خطوات فقط</h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-8 right-12 left-12 h-0.5 bg-green-200"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { step: "01", title: "اختر نوع الدراسة", desc: "معهد لغة أو جامعة" },
                { step: "02", title: "أجب على الأسئلة", desc: "ميزانيتك وهدفك وتفاصيلك" },
                { step: "03", title: "احصل على التوصية", desc: "نقترح لك أنسب خيار تلقائياً" },
                { step: "04", title: "نتواصل معك", desc: "فريقنا يتابعك عبر واتساب" },
              ].map((item) => (
                <div key={item.step} className="text-center relative">
                  <div className="w-16 h-16 bg-green-700 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 shadow-md">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Apply Section */}
      <section id="apply" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl">
            <GraduationCap size={52} className="mx-auto mb-5 text-green-300" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">هل أنت جاد في الدراسة بماليزيا؟</h2>
            <p className="text-green-100 text-lg mb-8 leading-relaxed">
              خصصنا هذا النظام للطلاب الجادين فقط. اختر مسارك الآن وسيتواصل معك فريقنا خلال 24 ساعة.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => go("apply", { type: "institute" })}
                className="bg-white text-green-800 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-all shadow-lg flex items-center justify-center gap-2 group"
              >
                <BookOpen size={20} />
                <span>معهد اللغة</span>
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => go("apply", { type: "university" })}
                className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
              >
                <Building2 size={20} />
                <span>القبول الجامعي</span>
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: <CheckCircle className="text-green-600 mx-auto mb-3" size={32} />, title: "خبرة موثوقة", desc: "متخصصون في توجيه الطلاب الجزائريين نحو ماليزيا" },
              { icon: <Star className="text-green-600 mx-auto mb-3" size={32} />, title: "شركاء رسميون", desc: "شراكات مباشرة مع معاهد وجامعات ماليزية معترف بها" },
              { icon: <Shield className="text-green-600 mx-auto mb-3" size={32} />, title: "أسعار شفافة", desc: "لا رسوم مخفية، كل التكاليف واضحة من البداية" },
            ].map((item) => (
              <div key={item.title} className="p-6">
                {item.icon}
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">تواصل معنا مباشرة</h2>
          <p className="text-gray-600 mb-6">فريقنا جاهز للإجابة على استفساراتك</p>
          <a
            href="https://wa.me/601112200603"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span>تواصل عبر واتساب</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <img src="/logo.jpeg" alt="Algeria2Malaysia" className="w-14 h-14 rounded-full border-2 border-white/20 object-cover" />
          </div>
          <div className="text-xl font-bold mb-1">Algeria2Malaysia</div>
          <div className="text-green-300 text-sm mb-4">من الجزائر إلى ماليزيا — مستقبلك يبدأ هنا</div>
          <div className="border-t border-green-700 pt-4 text-green-400 text-xs">
            © 2025 Algeria2Malaysia. جميع الحقوق محفوظة.
          </div>
        </div>
      </footer>
    </div>
  );
}
