import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const roasts = pgTable("roasts", {
  id: serial("id").primaryKey(),
  code: text("code").notNull(),
  language: text("language").notNull(),
  roastMode: text("roast_mode").notNull(),
  persona: text("persona").notNull(),
  roastLines: jsonb("roast_lines").notNull(),
  ipAddress: text("ip_address").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isPublic: boolean("is_public").default(true),
});

export const usageTracking = pgTable("usage_tracking", {
  id: serial("id").primaryKey(),
  ipAddress: text("ip_address").notNull(),
  roastCount: integer("roast_count").default(0).notNull(),
  lastReset: timestamp("last_reset").defaultNow().notNull(),
});

export const insertRoastSchema = createInsertSchema(roasts).pick({
  code: true,
  language: true,
  roastMode: true,
  persona: true,
  roastLines: true,
  ipAddress: true,
  isPublic: true,
});

export const insertUsageSchema = createInsertSchema(usageTracking).pick({
  ipAddress: true,
  roastCount: true,
});

export const roastRequestSchema = z.object({
  code: z.string().min(1, "Code is required").max(10000, "Code too long"),
  language: z.string().min(1, "Language is required"),
  roastMode: z.enum(["mild", "brutal", "dadJoke"]),
  persona: z.enum(["linus", "hrSafe", "genZ", "boomer"]),
});

export const githubRoastRequestSchema = z.object({
  repoUrl: z.string().url("Valid GitHub URL required"),
  roastMode: z.enum(["mild", "brutal", "dadJoke"]).default("mild"),
  persona: z.enum(["linus", "hrSafe", "genZ", "boomer"]).default("hrSafe"),
});

export type InsertRoast = z.infer<typeof insertRoastSchema>;
export type Roast = typeof roasts.$inferSelect;
export type InsertUsage = z.infer<typeof insertUsageSchema>;
export type UsageTracking = typeof usageTracking.$inferSelect;
export type RoastRequest = z.infer<typeof roastRequestSchema>;
export type GithubRoastRequest = z.infer<typeof githubRoastRequestSchema>;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
