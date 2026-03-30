export const WHATSAPP_NUMBER = "601112200603";

export const WHATSAPP_URL = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Exchange rate: 1 EUR ≈ 5 MYR (approximate)
export const EUR_RATE = 5;
export const toEur = (rm: number) => Math.round(rm / EUR_RATE);
export const fmtPrice = (rm: number) => `${rm.toLocaleString()} RM (≈ ${toEur(rm).toLocaleString()} €)`;

export type Goal = "ielts" | "general" | "pathway";
export type RoomType = "studio" | "master" | "medium" | "small";

export interface InstituteProgram {
  name: string;
  duration: string;
  price: number;
  specialOffer?: number;
}

export interface Institute {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  goals: Goal[];
  minBudget: number;
  maxBudget: number;
  color: string;
  programs: InstituteProgram[];
  intakes: string[];
  address: string;
}

export const INSTITUTES: Institute[] = [
  {
    id: "stratford",
    name: "Stratford International Language Centre",
    nameAr: "معهد ستراتفورد الدولي للغات",
    description: "برنامج إنجليزي مكثف بمعدل 4-6 ساعات يومياً، 5 أيام في الأسبوع. موقع متميز في قلب كوالالمبور - G Tower, KLCC.",
    goals: ["general", "pathway"],
    minBudget: 2500,
    maxBudget: 20000,
    color: "#009688",
    programs: [
      // Intensive English Program (4h/day)
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "شهر واحد", price: 2500 },
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "شهرين", price: 4500 },
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "3 أشهر", price: 5900 },
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "4 أشهر", price: 7500 },
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "5 أشهر", price: 9000 },
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "6 أشهر", price: 10200 },
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "7 أشهر", price: 11600 },
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "8 أشهر", price: 12800 },
      { name: "برنامج مكثف 4 ساعات/يوم", duration: "12 شهراً", price: 16700 },
      // Intensive Plus (6h/day)
      { name: "برنامج مكثف بلس 6 ساعات/يوم", duration: "شهر واحد", price: 3000 },
      { name: "برنامج مكثف بلس 6 ساعات/يوم", duration: "شهرين", price: 5400 },
      { name: "برنامج مكثف بلس 6 ساعات/يوم", duration: "3 أشهر", price: 7450 },
      { name: "برنامج مكثف بلس 6 ساعات/يوم", duration: "4 أشهر", price: 8900 },
      { name: "برنامج مكثف بلس 6 ساعات/يوم", duration: "6 أشهر", price: 12350 },
      { name: "برنامج مكثف بلس 6 ساعات/يوم", duration: "12 شهراً", price: 19950 },
      // English for Communication
      { name: "إنجليزي للتواصل (2 ساعات/يوم)", duration: "شهر واحد", price: 950 },
      { name: "إنجليزي للتواصل (2 ساعات/يوم)", duration: "شهرين", price: 1800 },
      { name: "إنجليزي للتواصل (2 ساعات/يوم)", duration: "3 أشهر", price: 2650 },
      { name: "إنجليزي للتواصل (2 ساعات/يوم)", duration: "6 أشهر", price: 4750 },
      { name: "إنجليزي للتواصل (2 ساعات/يوم)", duration: "12 شهراً", price: 8000 },
    ],
    intakes: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    address: "Suite 17-01, 17-03, 17-06, Level 17, G Tower, 199 Jalan Tun Razak, 50400 Kuala Lumpur",
  },
  {
    id: "bigben",
    name: "Big Ben Education Group",
    nameAr: "مجموعة بيغ بن التعليمية",
    description: "المدرسة الوحيدة في ماليزيا المعتمدة رسمياً من Pearson. IEP مكثف وتحضير IELTS وبرامج خاصة VIP مع تقدم قابل للقياس كل 8 أسابيع.",
    goals: ["ielts", "general", "pathway"],
    minBudget: 2618,
    maxBudget: 30000,
    color: "#8B0000",
    programs: [
      // IEP - Immersive English Program
      { name: "برنامج إنجليزي مكثف IEP", duration: "شهر واحد", price: 2880, specialOffer: 2618 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "شهرين", price: 4960, specialOffer: 4712 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "3 أشهر", price: 7420, specialOffer: 6676 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "4 أشهر", price: 9855, specialOffer: 8378 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "5 أشهر", price: 12320, specialOffer: 10472 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "6 أشهر", price: 14786, specialOffer: 12566 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "7 أشهر", price: 17785, specialOffer: 14661 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "8 أشهر", price: 19635, specialOffer: 15708 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "9 أشهر", price: 22090, specialOffer: 17672 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "10 أشهر", price: 24435, specialOffer: 18326 },
      { name: "برنامج إنجليزي مكثف IEP", duration: "12 شهراً", price: 29320, specialOffer: 21991 },
      // IELTS Preparation
      { name: "تحضير IELTS", duration: "شهر واحد", price: 2000 },
      { name: "تحضير IELTS", duration: "شهرين", price: 3700 },
      // Private Class VIP (Physical)
      { name: "دروس خاصة VIP (حضوري) — 1-20 ساعة", duration: "بالساعة", price: 200 },
      { name: "دروس خاصة VIP (حضوري) — 21-40 ساعة", duration: "بالساعة", price: 180 },
      { name: "دروس خاصة VIP (حضوري) — 41-80 ساعة", duration: "بالساعة", price: 170 },
      // Little Scholar
      { name: "برنامج الطالب الصغير", duration: "شهر واحد", price: 2500 },
      { name: "برنامج الطالب الصغير", duration: "شهرين", price: 5000 },
      { name: "برنامج الطالب الصغير", duration: "3 أشهر", price: 7500 },
      { name: "برنامج الطالب الصغير", duration: "4 أشهر", price: 10000 },
    ],
    intakes: ["يناير", "مارس", "مايو", "يوليو", "سبتمبر", "نوفمبر"],
    address: "Kuala Lumpur, Malaysia",
  },
  {
    id: "erican",
    name: "Erican Language Centre",
    nameAr: "مركز إيريكان للغات",
    description: "مركز معتمد لامتحانات Cambridge وIDP IELTS. أكثر من 400,000 متعلم و34 عاماً من التميز في ماليزيا.",
    goals: ["ielts", "general", "pathway"],
    minBudget: 2000,
    maxBudget: 42000,
    color: "#FF6B00",
    programs: [
      { name: "برنامج إيريكان الدولي", duration: "شهر واحد", price: 2000 },
      { name: "برنامج إيريكان الدولي", duration: "شهرين", price: 3500 },
      { name: "برنامج إيريكان الدولي", duration: "3 أشهر", price: 7700 },
      { name: "برنامج إيريكان الدولي", duration: "4 أشهر", price: 11000 },
      { name: "برنامج إيريكان الدولي", duration: "6 أشهر", price: 21500 },
      { name: "برنامج إيريكان الدولي", duration: "9 أشهر", price: 32000 },
      { name: "برنامج إيريكان الدولي", duration: "12 شهراً", price: 42000 },
      // Special discounts
      { name: "برنامج إيريكان الدولي — خصم خاص", duration: "شهر واحد", price: 2800, specialOffer: 2000 },
      { name: "برنامج إيريكان الدولي — خصم خاص", duration: "شهرين", price: 5250, specialOffer: 3500 },
      { name: "برنامج إيريكان الدولي — خصم خاص", duration: "4 أشهر", price: 15000, specialOffer: 11000 },
      { name: "برنامج إيريكان الدولي — خصم خاص", duration: "6 أشهر", price: 21500, specialOffer: 15000 },
      { name: "برنامج إيريكان الدولي — خصم خاص", duration: "9 أشهر", price: 32000, specialOffer: 25400 },
      { name: "برنامج إيريكان الدولي — خصم خاص", duration: "12 شهراً", price: 42000, specialOffer: 29400 },
    ],
    intakes: ["يناير", "أبريل", "يوليو", "أكتوبر"],
    address: "KLCC Area, Kuala Lumpur, Malaysia",
  },
];

export const ACCOMMODATION_OPTIONS: {
  id: RoomType;
  label: string;
  priceRangeRm: string;
  priceRangeEur: string;
  min: number;
  max: number;
  description: string;
}[] = [
  {
    id: "studio",
    label: "استوديو",
    priceRangeRm: "1,500 – 2,500 RM",
    priceRangeEur: "300 – 500 €",
    min: 1500,
    max: 2500,
    description: "غرفة مستقلة بالكامل مع مطبخ وحمام خاص",
  },
  {
    id: "master",
    label: "غرفة ماستر",
    priceRangeRm: "1,000 – 1,500 RM",
    priceRangeEur: "200 – 300 €",
    min: 1000,
    max: 1500,
    description: "غرفة كبيرة مع حمام خاص داخل شقة مشتركة",
  },
  {
    id: "medium",
    label: "غرفة متوسطة",
    priceRangeRm: "800 – 1,100 RM",
    priceRangeEur: "160 – 220 €",
    min: 800,
    max: 1100,
    description: "غرفة متوسطة الحجم مع حمام مشترك",
  },
  {
    id: "small",
    label: "غرفة صغيرة",
    priceRangeRm: "750 – 900 RM",
    priceRangeEur: "150 – 180 €",
    min: 750,
    max: 900,
    description: "غرفة صغيرة اقتصادية مع مرافق مشتركة",
  },
];

// ✅ REAL Google Forms Links
export const GOOGLE_FORM_LINKS = {
  institute: "https://docs.google.com/forms/d/e/1FAIpQLSf6Xx2DET7SCulFT3EuvLW_8wuEA9aE9EkOy06i9lGC09T81w/viewform?usp=publish-editor",
  university: "https://docs.google.com/forms/d/e/1FAIpQLSc8aVYOjwvoI_5aOoum-9Ko4JD-Fa4Hlr99-FfNRFhSKVDOBQ/viewform?usp=header",
};

export const suggestInstitutes = (budget: number, goal: Goal): Institute[] => {
  return INSTITUTES.filter(
    (inst) => inst.goals.includes(goal) && inst.minBudget <= budget
  );
};
