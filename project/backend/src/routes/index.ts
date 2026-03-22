import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import categoriesRouter from "./categories.js";
import locationsRouter from "./locations.js";
import projectsRouter from "./projects.js";
import jobsRouter from "./jobs.js";
import startupIdeasRouter from "./startupIdeas.js";
import adminRouter from "./admin.js";
import candidatesRouter from "./candidates.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(categoriesRouter);
router.use(locationsRouter);
router.use(projectsRouter);
router.use(jobsRouter);
router.use(startupIdeasRouter);
router.use(adminRouter);
router.use(candidatesRouter);

export default router;
