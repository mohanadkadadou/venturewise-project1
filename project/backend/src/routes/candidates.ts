import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { candidatesTable } from "@workspace/db/schema";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

/**
 * GET /api/projects/:id/suggested-candidates
 * Returns up to 6 candidates that best match the project's business type and category
 * Matching is done via keyword overlap on skills + categories fields
 */
router.get("/projects/:id/suggested-candidates", async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    if (isNaN(projectId)) {
      res.status(400).json({ error: "validation_error", message: "Invalid project ID" });
      return;
    }

    // Load the project + its analysis to get businessType, category, description
    const projectResult = await db.execute(
      sql`SELECT p.id, p.business_type, p.description, p.target_audience, p.budget,
               c.name AS category_name
          FROM projects p
          LEFT JOIN categories c ON p.category_id = c.id
          WHERE p.id = ${projectId}
          LIMIT 1`
    );

    if (!projectResult.rows.length) {
      res.status(404).json({ error: "not_found", message: "Project not found" });
      return;
    }

    const project = projectResult.rows[0] as {
      business_type: string;
      description: string;
      target_audience: string;
      budget: string;
      category_name: string | null;
    };

    // Build a keyword set from the project context
    const keywords = [
      ...(project.business_type || "").toLowerCase().split(/[\s,]+/),
      ...(project.category_name || "").toLowerCase().split(/[\s,]+/),
      ...(project.description || "").toLowerCase().split(/[\s,]+/).slice(0, 30),
      ...(project.target_audience || "").toLowerCase().split(/[\s,]+/),
    ]
      .map(k => k.replace(/[^a-z]/g, ""))
      .filter(k => k.length > 3)
      .filter((k, i, arr) => arr.indexOf(k) === i);

    // Score candidates by keyword overlap
    const allCandidates = await db.select().from(candidatesTable);

    const scored = allCandidates.map(candidate => {
      const haystack = `${candidate.skills} ${candidate.categories} ${candidate.title} ${candidate.bio}`.toLowerCase();
      let score = 0;

      // Exact category match bonus
      const catKeywords = candidate.categories.toLowerCase().split(",").map(c => c.trim());
      const projCat = (project.category_name || "").toLowerCase().trim();
      if (catKeywords.includes(projCat)) score += 30;

      // Business type keyword match
      const bizType = (project.business_type || "").toLowerCase();
      if (candidate.categories.toLowerCase().includes(bizType) || candidate.title.toLowerCase().includes(bizType)) {
        score += 20;
      }

      // Keyword match scoring
      for (const kw of keywords) {
        if (kw.length < 4) continue;
        if (haystack.includes(kw)) score += 3;
      }

      // Budget-based rate filter: prefer candidates whose rate is within 20% of (budget/12)
      const monthlyBudgetForHires = parseFloat(project.budget) * 0.15;
      if (candidate.monthlyRate <= monthlyBudgetForHires) score += 10;
      if (candidate.monthlyRate <= monthlyBudgetForHires * 2) score += 5;

      return { ...candidate, matchScore: score };
    });

    // Sort by score descending, take top 6
    const top = scored
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);

    res.json(top);
  } catch (err) {
    req.log.error({ err }, "Failed to get suggested candidates");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch candidates" });
  }
});

/**
 * GET /api/candidates — list all candidates
 */
router.get("/candidates", async (req, res) => {
  try {
    const candidates = await db.select().from(candidatesTable);
    res.json(candidates);
  } catch (err) {
    req.log.error({ err }, "Failed to list candidates");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch candidates" });
  }
});

export default router;
