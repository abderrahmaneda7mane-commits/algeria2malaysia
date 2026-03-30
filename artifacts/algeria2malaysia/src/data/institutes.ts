export const WHATSAPP_NUMBER = "601112200603";

export const WHATSAPP_URL = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

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
    description: "برنامج إنجليزي مكثف بمعدل 4-6 ساعات يومياً، 5 أيام في الأسبوع. موقع متميز في قلب كوالالمبور.",
    goals: ["general", "pathway"],
    minBudget: 2500,
    maxBudget: 20000,
    color: "#009688",
    programs: [
      { name: "برنامج إنجليزي مكثف (4 ساعات)", duration: "شهر واحد", price: 2500 },
      { name: "برنامج إنجليزي مكثف (4 ساعات)", duration: "شهرين", price: 4500 },
      { name: "برنامج إنجليزي مكثف (4 ساعات)", duration: "3 أشهر", price: 5900 },
      { name: "برنامج إنجليزي مكثف (4 ساعات)", duration: "4 أشهر", price: 7500 },
      { name: "برنامج إنجليزي مكثف (4 ساعات)", duration: "5 أشهر", price: 9000 },
      { name: "برنامج إنجليزي مكثف (4 ساعات)", duration: "6 أشهر", price: 10200 },
      { name: "برنامج إنجليزي بلس (6 ساعات)", duration: "شهر واحد", price: 3000 },
      { name: "برنامج إنجليزي بلس (6 ساعات)", duration: "شهرين", price: 5400 },
      { name: "برنامج إنجليزي بلس (6 ساعات)", duration: "3 أشهر", price: 7450 },
      { name: "برنامج إنجليزي بلس (6 ساعات)", duration: "6 أشهر", price: 12350 },
      { name: "إنجليزي للتواصل", duration: "شهر واحد", price: 950 },
      { name: "إنجليزي للتواصل", duration: "شهرين", price: 1800 },
      { name: "إنجليزي للتواصل", duration: "3 أشهر", price: 2650 },
    ],
    intakes: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
    address: "Suite 17-01, Level 17, G Tower, 199, Jalan Tun Razak, 50400 Kuala Lumpur",
  },
  {
    id: "bigben",
    name: "Big Ben Education Group",
    nameAr: "مجموعة بيغ بن التعليمية",
    description: "المدرسة الوحيدة في ماليزيا المعتمدة رسمياً من Pearson. تقدم برامج متكاملة من IELTS إلى الإنجليزي الأكاديمي مع تقدم قابل للقياس كل 8 أسابيع.",
    goals: ["ielts", "general", "pathway"],
    minBudget: 2618,
    maxBudget: 30000,
    color: "#8B0000",
    programs: [
      { name: "برنامج إنجليزي مكثف (IEP)", duration: "شهر واحد", price: 2880, specialOffer: 2618 },
      { name: "برنامج إنجليزي مكثف (IEP)", duration: "شهرين", price: 4960, specialOffer: 4712 },
      { name: "برنامج إنجليزي مكثف (IEP)", duration: "3 أشهر", price: 7420, specialOffer: 6676 },
      { name: "برنامج إنجليزي مكثف (IEP)", duration: "6 أشهر", price: 14786, specialOffer: 12566 },
      { name: "برنامج إنجليزي مكثف (IEP)", duration: "12 شهراً", price: 29320, specialOffer: 21991 },
      { name: "تحضير IELTS", duration: "شهر واحد", price: 2000 },
      { name: "تحضير IELTS", duration: "شهرين", price: 3700 },
    ],
    intakes: ["يناير", "مارس", "مايو", "يوليو", "سبتمبر", "نوفمبر"],
    address: "Kuala Lumpur, Malaysia",
  },
  {
    id: "erican",
    name: "Erican Language Centre",
    nameAr: "مركز إيريكان للغات",
    description: "مركز معتمد لامتحانات كامبريدج و IDP IELTS. أكثر من 400,000 متعلم و34 عاماً من التميز. مناهج Cambridge وPearson المعتمدة دولياً.",
    goals: ["ielts", "general", "pathway"],
    minBudget: 2000,
    maxBudget: 42000,
    color: "#FF6B00",
    programs: [
      { name: "برنامج إيريكان الدولي", duration: "شهر واحد", price: 2000 },
      { name: "برنامج إيريكان الدولي", duration: "شهرين", price: 3500 },
      { name: "برنامج إيريكان الدولي", duration: "4 أشهر", price: 11000 },
      { name: "برنامج إيريكان الدولي", duration: "6 أشهر", price: 21500 },
      { name: "برنامج إيريكان الدولي", duration: "9 أشهر", price: 32000 },
      { name: "برنامج إيريكان الدولي", duration: "12 شهراً", price: 42000 },
    ],
    intakes: ["يناير", "أبريل", "يوليو", "أكتوبر"],
    address: "KLCC, Kuala Lumpur, Malaysia",
  },
];

export const ACCOMMODATION_OPTIONS: { id: RoomType; label: string; priceRange: string; min: number; max: number; description: string }[] = [
  {
    id: "studio",
    label: "استوديو",
    priceRange: "1500 – 2500 RM",
    min: 1500,
    max: 2500,
    description: "غرفة مستقلة بالكامل مع مطبخ وحمام خاص",
  },
  {
    id: "master",
    label: "غرفة ماستر",
    priceRange: "1000 – 1500 RM",
    min: 1000,
    max: 1500,
    description: "غرفة كبيرة مع حمام خاص داخل شقة مشتركة",
  },
  {
    id: "medium",
    label: "غرفة متوسطة",
    priceRange: "800 – 1100 RM",
    min: 800,
    max: 1100,
    description: "غرفة متوسطة الحجم مع حمام مشترك",
  },
  {
    id: "small",
    label: "غرفة صغيرة",
    priceRange: "750 – 900 RM",
    min: 750,
    max: 900,
    description: "غرفة صغيرة اقتصادية مع مرافق مشتركة",
  },
];

export const GOOGLE_FORM_LINKS = {
  institute: "https://docs.google.com/forms/d/e/YOUR_INSTITUTE_FORM_ID/viewform",
  university: "https://docs.google.com/forms/d/e/YOUR_UNIVERSITY_FORM_ID/viewform",
};

export const suggestInstitutes = (budget: number, goal: Goal): Institute[] => {
  return INSTITUTES.filter(
    (inst) => inst.goals.includes(goal) && inst.minBudget <= budget
  );
};
