import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const universitiesTable = pgTable("universities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  nameAr: text("name_ar").notNull(),
  slug: text("slug").notNull().unique(),
  location: text("location").notNull(),
  established: text("established"),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const programsTable = pgTable("programs", {
  id: serial("id").primaryKey(),
  universityId: integer("university_id")
    .notNull()
    .references(() => universitiesTable.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  nameAr: text("name_ar").notNull(),
  level: text("level").notNull(),
  duration: text("duration").notNull(),
  intake: text("intake").notNull(),
  description: text("description"),
  originalFee: integer("original_fee").notNull(),
  originalCurrency: text("original_currency").notNull().default("MYR"),
  feeMyr: integer("fee_myr").notNull(),
  feeEur: integer("fee_eur").notNull(),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertUniversitySchema = createInsertSchema(universitiesTable).omit({ id: true, createdAt: true });
export const insertProgramSchema = createInsertSchema(programsTable).omit({ id: true, lastUpdated: true });

export type University = typeof universitiesTable.$inferSelect;
export type InsertUniversity = z.infer<typeof insertUniversitySchema>;
export type Program = typeof programsTable.$inferSelect;
export type InsertProgram = z.infer<typeof insertProgramSchema>;
