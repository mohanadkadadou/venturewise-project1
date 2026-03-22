import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import {
  projectsTable,
  jobsTable,
  applicationsTable,
  startupIdeasTable,
  analysesTable,
  categoriesTable,
  locationsTable,
} from "@workspace/db/schema";
import { eq, desc, avg } from "drizzle-orm";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.get("/admin/stats", async (req, res) => {
  try {
    const [[{ count: totalProjects }], [{ count: totalJobs }], [{ count: totalApplications }], [{ count: totalStartupIdeas }]] =
      await Promise.all([
        db.select({ count: sql<number>`count(*)::int` }).from(projectsTable),
        db.select({ count: sql<number>`count(*)::int` }).from(jobsTable),
        db.select({ count: sql<number>`count(*)::int` }).from(applicationsTable),
        db.select({ count: sql<number>`count(*)::int` }).from(startupIdeasTable),
      ]);

    const [avgRow] = await db
      .select({ avg: avg(analysesTable.successScore) })
      .from(analysesTable);

    const recentProjects = await db
      .select({
        id: projectsTable.id,
        businessName: projectsTable.businessName,
        businessType: projectsTable.businessType,
        description: projectsTable.description,
        budget: projectsTable.budget,
        targetAudience: projectsTable.targetAudience,
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
      .orderBy(desc(projectsTable.createdAt))
      .limit(5);

    res.json({
      totalProjects: totalProjects ?? 0,
      totalJobs: totalJobs ?? 0,
      totalApplications: totalApplications ?? 0,
      totalStartupIdeas: totalStartupIdeas ?? 0,
      avgSuccessScore: avgRow?.avg ? parseFloat(String(avgRow.avg)) : 0,
      recentProjects: recentProjects.map(p => ({ ...p, budget: Number(p.budget) })),
    });
  } catch (err) {
    req.log.error({ err }, "Failed to get admin stats");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch admin stats" });
  }
});

router.get("/admin/applications", async (req, res) => {
  try {
    const applications = await db
      .select({
        id: applicationsTable.id,
        jobId: applicationsTable.jobId,
        applicantName: applicationsTable.applicantName,
        email: applicationsTable.email,
        phone: applicationsTable.phone,
        skills: applicationsTable.skills,
        yearsOfExperience: applicationsTable.yearsOfExperience,
        coverLetter: applicationsTable.coverLetter,
        cvText: applicationsTable.cvText,
        status: applicationsTable.status,
        createdAt: applicationsTable.createdAt,
        job: {
          id: jobsTable.id,
          title: jobsTable.title,
          company: jobsTable.company,
          description: jobsTable.description,
          requiredSkills: jobsTable.requiredSkills,
          salaryMin: jobsTable.salaryMin,
          salaryMax: jobsTable.salaryMax,
          jobType: jobsTable.jobType,
          location: jobsTable.location,
          experienceLevel: jobsTable.experienceLevel,
          isActive: jobsTable.isActive,
          createdAt: jobsTable.createdAt,
        },
      })
      .from(applicationsTable)
      .leftJoin(jobsTable, eq(applicationsTable.jobId, jobsTable.id))
      .orderBy(desc(applicationsTable.createdAt));

    res.json(applications);
  } catch (err) {
    req.log.error({ err }, "Failed to list applications");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch applications" });
  }
});

export default router;
