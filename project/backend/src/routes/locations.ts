import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { locationsTable } from "@workspace/db/schema";
import { asc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/locations", async (req, res) => {
  try {
    const locations = await db.select().from(locationsTable).orderBy(asc(locationsTable.city));
    res.json(locations);
  } catch (err) {
    req.log.error({ err }, "Failed to list locations");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch locations" });
  }
});

export default router;
