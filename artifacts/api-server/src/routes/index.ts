import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import universitiesRouter from "./universities.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(universitiesRouter);

export default router;
