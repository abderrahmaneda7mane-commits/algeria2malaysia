import { db } from "@workspace/db";
import { universitiesTable, programsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";
import { myrToEur, refreshRates } from "../lib/currency.js";
import { logger } from "../lib/logger.js";

const UPM_DATA = {
  name: "UPM",
  nameAr: "جامعة بوترا ماليزيا",
  slug: "upm",
  location: "سيردانغ — سيلانغور",
  established: "1971",
  description:
    "جامعة بحثية حكومية رائدة في ماليزيا، تتميز بحرمها الأخضر الواسع والتخصصات الزراعية والبيئية والتقنية. ضمن أفضل 200 جامعة بحثية في آسيا.",
};

const PROGRAMS = [
  {
    name: "Bachelor of Computer Science",
    nameAr: "بكالوريوس علوم الحاسوب",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "برنامج شامل يغطي البرمجة، قواعد البيانات، الذكاء الاصطناعي، والشبكات.",
    originalFee: 14200,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Software Engineering",
    nameAr: "بكالوريوس هندسة البرمجيات",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "هندسة وتصميم الأنظمة البرمجية بمعايير دولية.",
    originalFee: 14200,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Computer Systems & Networking",
    nameAr: "بكالوريوس أنظمة الحاسوب والشبكات",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "متخصص في البنية التحتية للشبكات والأنظمة الموزعة.",
    originalFee: 13600,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Civil Engineering",
    nameAr: "بكالوريوس الهندسة المدنية",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "هندسة البنية التحتية، الطرق، الجسور، والمياه.",
    originalFee: 15000,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Mechanical Engineering",
    nameAr: "بكالوريوس الهندسة الميكانيكية",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "تصميم وتحليل الأنظمة الميكانيكية والحرارية.",
    originalFee: 15000,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Electrical & Electronic Engineering",
    nameAr: "بكالوريوس الهندسة الكهربائية والإلكترونية",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "أنظمة الطاقة، الإلكترونيات، والاتصالات.",
    originalFee: 15000,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Chemical Engineering",
    nameAr: "بكالوريوس الهندسة الكيميائية",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "عمليات صناعية، بتروكيماويات، وتكنولوجيا الغذاء.",
    originalFee: 15000,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Agriculture Science",
    nameAr: "بكالوريوس علم الزراعة",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "إنتاج المحاصيل، علم التربة، والزراعة المستدامة.",
    originalFee: 10800,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Agribusiness",
    nameAr: "بكالوريوس الأعمال الزراعية",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "إدارة الأعمال مع تطبيقات في القطاع الزراعي.",
    originalFee: 10800,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Biotechnology",
    nameAr: "بكالوريوس التكنولوجيا الحيوية",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "علم الجينات، الميكروبيولوجيا، والتطبيقات الصناعية للأحياء.",
    originalFee: 11200,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Business Administration",
    nameAr: "بكالوريوس إدارة الأعمال",
    level: "البكالوريوس",
    duration: "3 سنوات",
    intake: "سبتمبر / مارس",
    description: "مبادئ الإدارة، التسويق، التمويل، والموارد البشرية.",
    originalFee: 12500,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Accounting",
    nameAr: "بكالوريوس المحاسبة",
    level: "البكالوريوس",
    duration: "3 سنوات",
    intake: "سبتمبر / مارس",
    description: "محاسبة مالية، تدقيق، وضريبة وفق المعايير الدولية.",
    originalFee: 12500,
    originalCurrency: "MYR",
  },
  {
    name: "Bachelor of Environmental Science",
    nameAr: "بكالوريوس علوم البيئة",
    level: "البكالوريوس",
    duration: "4 سنوات",
    intake: "سبتمبر / مارس",
    description: "دراسة النظم البيئية، التلوث، وحماية الطبيعة.",
    originalFee: 11200,
    originalCurrency: "MYR",
  },
  {
    name: "MBBS — Doctor of Medicine",
    nameAr: "بكالوريوس الطب والجراحة (MBBS)",
    level: "البكالوريوس",
    duration: "5 سنوات",
    intake: "سبتمبر",
    description: "برنامج الطب المعتمد دولياً — أحد أعرق برامج الطب في ماليزيا.",
    originalFee: 20000,
    originalCurrency: "MYR",
  },
  {
    name: "Doctor of Veterinary Medicine",
    nameAr: "دكتوراه الطب البيطري",
    level: "البكالوريوس",
    duration: "5 سنوات",
    intake: "سبتمبر",
    description: "رعاية الحيوانات، الأوبئة الحيوانية، والصحة الغذائية.",
    originalFee: 18000,
    originalCurrency: "MYR",
  },
  {
    name: "Master of Computer Science",
    nameAr: "ماستر علوم الحاسوب",
    level: "الماستر",
    duration: "1.5 – 2 سنة",
    intake: "سبتمبر / مارس",
    description: "بحث وتطوير في مجالات الذكاء الاصطناعي، علم البيانات، والأمن السيبراني.",
    originalFee: 16000,
    originalCurrency: "MYR",
  },
  {
    name: "Master of Electrical Engineering",
    nameAr: "ماستر الهندسة الكهربائية",
    level: "الماستر",
    duration: "1.5 – 2 سنة",
    intake: "سبتمبر / مارس",
    description: "أبحاث متقدمة في الطاقة المتجددة والأنظمة الذكية.",
    originalFee: 18000,
    originalCurrency: "MYR",
  },
  {
    name: "Master of Business Administration (MBA)",
    nameAr: "ماستر إدارة الأعمال (MBA)",
    level: "الماستر",
    duration: "1.5 – 2 سنة",
    intake: "سبتمبر / مارس",
    description: "تطوير مهارات القيادة، الاستراتيجية، والتفكير الإداري.",
    originalFee: 22000,
    originalCurrency: "MYR",
  },
  {
    name: "Master of Agriculture Science",
    nameAr: "ماستر علوم الزراعة",
    level: "الماستر",
    duration: "1.5 – 2 سنة",
    intake: "سبتمبر / مارس",
    description: "أبحاث متخصصة في إنتاج المحاصيل وعلم التربة.",
    originalFee: 14000,
    originalCurrency: "MYR",
  },
  {
    name: "Master of Environmental Science",
    nameAr: "ماستر علوم البيئة",
    level: "الماستر",
    duration: "1.5 – 2 سنة",
    intake: "سبتمبر / مارس",
    description: "أبحاث في التنوع البيولوجي وإدارة الموارد الطبيعية.",
    originalFee: 14000,
    originalCurrency: "MYR",
  },
  {
    name: "PhD in Computer Science",
    nameAr: "دكتوراه في علوم الحاسوب",
    level: "الدكتوراه",
    duration: "3 – 5 سنوات",
    intake: "سبتمبر / مارس",
    description: "بحث أصيل في مجالات الحوسبة المتقدمة.",
    originalFee: 22000,
    originalCurrency: "MYR",
  },
  {
    name: "PhD in Engineering",
    nameAr: "دكتوراه في الهندسة",
    level: "الدكتوراه",
    duration: "3 – 5 سنوات",
    intake: "سبتمبر / مارس",
    description: "بحث هندسي متخصص في تخصصات مدنية، ميكانيكية، أو كهربائية.",
    originalFee: 24000,
    originalCurrency: "MYR",
  },
  {
    name: "PhD in Agriculture Science",
    nameAr: "دكتوراه في علوم الزراعة",
    level: "الدكتوراه",
    duration: "3 – 5 سنوات",
    intake: "سبتمبر / مارس",
    description: "أبحاث علمية مستدامة في قطاع الزراعة والبيئة.",
    originalFee: 20000,
    originalCurrency: "MYR",
  },
];

export async function seedUPM(): Promise<void> {
  await refreshRates();

  const existing = await db
    .select()
    .from(universitiesTable)
    .where(eq(universitiesTable.slug, "upm"));

  let upmId: number;

  if (existing.length > 0) {
    upmId = existing[0].id;
    await db
      .update(universitiesTable)
      .set({ ...UPM_DATA })
      .where(eq(universitiesTable.id, upmId));
    logger.info("UPM: university record updated");
  } else {
    const [inserted] = await db
      .insert(universitiesTable)
      .values(UPM_DATA)
      .returning({ id: universitiesTable.id });
    upmId = inserted.id;
    logger.info("UPM: university record created");
  }

  await db.delete(programsTable).where(eq(programsTable.universityId, upmId));

  const toInsert = PROGRAMS.map((p) => ({
    ...p,
    universityId: upmId,
    feeMyr: p.originalFee,
    feeEur: myrToEur(p.originalFee),
  }));

  await db.insert(programsTable).values(toInsert);
  logger.info(`UPM: seeded ${toInsert.length} programs`);
}
