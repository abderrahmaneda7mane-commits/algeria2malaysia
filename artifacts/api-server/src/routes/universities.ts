import { Router } from "express";
import { db } from "@workspace/db";
import { universitiesTable, programsTable } from "@workspace/db/schema";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/universities", async (_req, res) => {
  try {
    const data = await db.select().from(universitiesTable);
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

router.get("/programs", async (req, res) => {
  try {
    const uniSlug = req.query["university"] as string | undefined;

    if (uniSlug) {
      const [uni] = await db
        .select()
        .from(universitiesTable)
        .where(eq(universitiesTable.slug, uniSlug.toLowerCase()));

      if (!uni) {
        res.status(404).json({ success: false, error: "University not found" });
        return;
      }

      const programs = await db
        .select()
        .from(programsTable)
        .where(eq(programsTable.universityId, uni.id));

      res.json({ success: true, university: uni, data: programs });
      return;
    }

    const programs = await db
      .select({
        id: programsTable.id,
        universityId: programsTable.universityId,
        name: programsTable.name,
        nameAr: programsTable.nameAr,
        level: programsTable.level,
        duration: programsTable.duration,
        intake: programsTable.intake,
        feeMyr: programsTable.feeMyr,
        feeEur: programsTable.feeEur,
        lastUpdated: programsTable.lastUpdated,
        universityName: universitiesTable.name,
        universitySlug: universitiesTable.slug,
        universityNameAr: universitiesTable.nameAr,
      })
      .from(programsTable)
      .innerJoin(universitiesTable, eq(programsTable.universityId, universitiesTable.id));

    res.json({ success: true, data: programs });
  } catch (err) {
    res.status(500).json({ success: false, error: String(err) });
  }
});

export default router;
