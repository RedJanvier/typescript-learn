import { Router } from "express";

import userRoutes from "./users";
import controllers from "../controllers";

const router = Router();

router.route("/").get(controllers.test);
router.route("/bills").get(controllers.listBills).post(controllers.createBill);
router.use("/users", userRoutes);

export default router;
