import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { jobsTable, applicationsTable } from "@workspace/db/schema";
import { eq, desc, count } from "drizzle-orm";
import { CreateJobBody, GetJobParams, ApplyToJobParams, ApplyToJobBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await db
      .select({
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
        applicantCount: count(applicationsTable.id),
      })
      .from(jobsTable)
      .leftJoin(applicationsTable, eq(jobsTable.id, applicationsTable.jobId))
      .groupBy(jobsTable.id)
      .orderBy(desc(jobsTable.createdAt));

    res.json(jobs);
  } catch (err) {
    req.log.error({ err }, "Failed to list jobs");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch jobs" });
  }
});

router.post("/jobs", async (req, res) => {
  try {
    const parsed = CreateJobBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: "validation_error", message: parsed.error.message });
      return;
    }
    const [job] = await db.insert(jobsTable).values(parsed.data).returning();
    res.status(201).json({ ...job, applicantCount: 0 });
  } catch (err) {
    req.log.error({ err }, "Failed to create job");
    res.status(500).json({ error: "internal_error", message: "Failed to create job" });
  }
});

router.get("/jobs/:id", async (req, res) => {
  try {
    const parsed = GetJobParams.safeParse({ id: Number(req.params.id) });
    if (!parsed.success) {
      res.status(400).json({ error: "validation_error", message: "Invalid job ID" });
      return;
    }

    const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, parsed.data.id));
    if (!job) {
      res.status(404).json({ error: "not_found", message: "Job not found" });
      return;
    }

    const applications = await db
      .select()
      .from(applicationsTable)
      .where(eq(applicationsTable.jobId, parsed.data.id))
      .orderBy(desc(applicationsTable.createdAt));

    res.json({ ...job, applicantCount: applications.length, applications });
  } catch (err) {
    req.log.error({ err }, "Failed to get job");
    res.status(500).json({ error: "internal_error", message: "Failed to fetch job" });
  }
});

router.post("/jobs/:id/apply", async (req, res) => {
  try {
    const paramsParsed = ApplyToJobParams.safeParse({ id: Number(req.params.id) });
    if (!paramsParsed.success) {
      res.status(400).json({ error: "validation_error", message: "Invalid job ID" });
      return;
    }

    const [job] = await db.select().from(jobsTable).where(eq(jobsTable.id, paramsParsed.data.id));
    if (!job) {
      res.status(404).json({ error: "not_found", message: "Job not found" });
      return;
    }

    const bodyParsed = ApplyToJobBody.safeParse(req.body);
    if (!bodyParsed.success) {
      res.status(400).json({ error: "validation_error", message: bodyParsed.error.message });
      return;
    }

    const [application] = await db.insert(applicationsTable).values({
      jobId: paramsParsed.data.id,
      applicantName: bodyParsed.data.applicantName,
      email: bodyParsed.data.email,
      phone: bodyParsed.data.phone ?? null,
      skills: bodyParsed.data.skills,
      yearsOfExperience: bodyParsed.data.yearsOfExperience,
      coverLetter: bodyParsed.data.coverLetter ?? null,
      cvText: bodyParsed.data.cvText ?? null,
      status: "pending",
    }).returning();

    res.status(201).json(application);
  } catch (err) {
    req.log.error({ err }, "Failed to apply to job");
    res.status(500).json({ error: "internal_error", message: "Failed to submit application" });
  }
});

export default router;
