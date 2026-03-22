import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { projectsTable, analysesTable, categoriesTable, locationsTable } from "@workspace/db/schema";
import { eq, desc } from "drizzle-orm";
import { runAnalysis } from "../services/analysisEngine.js";
import { CreateProjectBody, GetProjectParams, DeleteProjectParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/projects", async (req, res) => {
  try {
    const projects = await db
      .select({
        id: projectsTable.id,
        businessName: projectsTable.businessName,
        businessType: projectsTable.businessType,
        description: projectsTable.description,
        budget: projectsTable.budget,
        targetAudience: projectsTable.targetAudience,
        productsOrServices: projectsTable.productsOrServices,
        categoryId: projectsTable.categoryId,
        locationId: projectsTable.locationId,
        createdAt: projectsTable.createdAt,
        category: {
          id: categoriesTable.id,
          name: categoriesTable.name,
          description: categoriesTable.description,
          icon: categoriesTable.icon,
        },
        location: {
          id: locationsTable.id,
          city: locationsTable.city,
          country: locationsTable.country,
          region: locationsTable.region,
          sizeCategory: locationsTable.sizeCategory,
        },
      })
      .from(projectsTable)
      .leftJoin(categoriesTable, eq(projectsTable.categoryId, categoriesTable.id))
      .leftJoin(locationsTable, eq(projectsTable.locationId, locationsTable.id))
      .orderBy(desc(projectsTable.createdAt));

    res.json(projects);
  } catch (err) {
    req.log.error({ err }, "Failed to list projects");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch projects" });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const parsed = CreateProjectBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "validation_error", message: parsed.error.message });
      return;
    }
    const body = parsed.data;

    const [category] = await db.select().from(categoriesTable).where(eq(categoriesTable.id, body.categoryId));
    const [location] = await db.select().from(locationsTable).where(eq(locationsTable.id, body.locationId));

    if (!category) {
      res.status(400).json({ error: "not_found", message: "Category not found" });
      return;
    }
    if (!location) {
      res.status(400).json({ error: "not_found", message: "Location not found" });
      return;
    }

    const productsOrServices = body.productsOrServices || "";

    const [project] = await db.insert(projectsTable).values({
      businessName: body.businessName,
      businessType: body.businessType,
      description: body.description,
      budget: String(body.budget),
      targetAudience: body.targetAudience,
      productsOrServices,
      categoryId: body.categoryId,
      locationId: body.locationId,
    }).returning();

    const analysisInput = {
      businessType: body.businessType,
      description: body.description,
      budget: body.budget,
      targetAudience: body.targetAudience,
      productsOrServices,
      categoryName: category.name,
      locationSizeCategory: location.sizeCategory,
      city: location.city,
      country: location.country,
    };

    const analysisResult = runAnalysis(analysisInput);

    const [analysis] = await db.insert(analysesTable).values({
      projectId: project.id,
      successScore: analysisResult.successScore,
      riskLevel: analysisResult.riskLevel,
      marketDemand: analysisResult.marketDemand,
      competitionLevel: analysisResult.competitionLevel,
      estimatedRevenueMin: analysisResult.estimatedRevenueMin,
      estimatedRevenueMax: analysisResult.estimatedRevenueMax,
      explanation: analysisResult.explanation,
      marketAnalysis: analysisResult.marketAnalysis,
      pricingStrategy: analysisResult.pricingStrategy,
      marketingPlan: analysisResult.marketingPlan,
      brandingSuggestions: analysisResult.brandingSuggestions,
      hiringNeeds: analysisResult.hiringNeeds,
      competitors: analysisResult.competitors,
      bestLocations: analysisResult.bestLocations,
    }).returning();

    res.status(201).json({
      ...project,
      budget: Number(project.budget),
      category,
      location,
      analysis: { ...analysis },
    });
  } catch (err) {
    req.log.error({ err }, "Failed to create project");
    res.status(500).json({ error: "internal_error", message: "Failed to create project" });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const parsed = GetProjectParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "validation_error", message: "Invalid project ID" });
      return;
    }

    const [row] = await db
      .select({
        id: projectsTable.id,
        businessName: projectsTable.businessName,
        businessType: projectsTable.businessType,
        description: projectsTable.description,
        budget: projectsTable.budget,
        targetAudience: projectsTable.targetAudience,
        productsOrServices: projectsTable.productsOrServices,
        categoryId: projectsTable.categoryId,
        locationId: projectsTable.locationId,
        createdAt: projectsTable.createdAt,
        category: {
          id: categoriesTable.id,
          name: categoriesTable.name,
          description: categoriesTable.description,
          icon: categoriesTable.icon,
        },
        location: {
          id: locationsTable.id,
          city: locationsTable.city,
          country: locationsTable.country,
          region: locationsTable.region,
          sizeCategory: locationsTable.sizeCategory,
        },
      })
      .from(projectsTable)
      .leftJoin(categoriesTable, eq(projectsTable.categoryId, categoriesTable.id))
      .leftJoin(locationsTable, eq(projectsTable.locationId, locationsTable.id))
      .where(eq(projectsTable.id, parsed.data.id));

    if (!row) {
      res.status(404).json({ error: "not_found", message: "Project not found" });
      return;
    }

    const [analysis] = await db
      .select()
      .from(analysesTable)
      .where(eq(analysesTable.projectId, parsed.data.id));

    res.json({
      ...row,
      budget: Number(row.budget),
      analysis: analysis || null,
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get project");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch project" });
  }
});

router.delete("/projects/:id", async (req, res) => {
  try {
    const parsed = DeleteProjectParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "validation_error", message: "Invalid project ID" });
      return;
    }

    const deleted = await db
      .delete(projectsTable)
      .where(eq(projectsTable.id, parsed.data.id))
      .returning();

    if (deleted.length === 0) {
      res.status(404).json({ error: "not_found", message: "Project not found" });
      return;
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    req.log.error({ err }, "Failed to delete project");
    res.status(500).json({ error: "internal_error", message: "Failed to delete project" });
  }
});

export default router;
