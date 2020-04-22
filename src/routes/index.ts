import { Router } from "express";

import userRoutes from "./users";
import controllers from "../controllers";

const router = Router();

router.route("/").get(controllers.getBills);
router.use("/users", userRoutes);

export default router;
