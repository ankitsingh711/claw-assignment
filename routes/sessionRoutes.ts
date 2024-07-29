import { Router } from "express";
import { getSessions } from "../controllers/sessionController";
import { authorization } from "../middleware/authMiddleware";

const router = Router();

router.use(authorization);

router.get("/sessions", getSessions);

export default router;
