import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { startupIdeasTable } from "@workspace/db/schema";
import { desc } from "drizzle-orm";
import { CreateStartupIdeaBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/startup-ideas", async (req, res) => {
  try {
    const ideas = await db
      .select()
      .from(startupIdeasTable)
      .orderBy(desc(startupIdeasTable.isFeatured), desc(startupIdeasTable.createdAt));

    const mapped = ideas.map(idea => ({
      ...idea,
      expectedReturn: Number(idea.expectedReturn),
    }));

    res.json(mapped);
  } catch (err) {
    req.log.error({ err }, "Failed to list startup ideas");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch startup ideas" });
  }
});

router.post("/startup-ideas", async (req, res) => {
  try {
    const parsed = CreateStartupIdeaBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "validation_error", message: parsed.error.message });
      return;
    }

    const [idea] = await db.insert(startupIdeasTable).values({
      ...parsed.data,
      expectedReturn: String(parsed.data.expectedReturn),
    }).returning();

    res.status(201).json({ ...idea, expectedReturn: Number(idea.expectedReturn) });
  } catch (err) {
    req.log.error({ err }, "Failed to create startup idea");
    res.status(500).json({ error: "internal_error", message: "Failed to create startup idea" });
  }
});

export default router;
