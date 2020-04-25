import { Router } from "express";

import userRoutes from "./users";
import controllers from "../controllers";

const router = Router();

router.use("/users", userRoutes);
router.route("/").get(controllers.test);
router.route("/bills/:id").get(controllers.listBill);
router.route("/bills").get(controllers.listBills).post(controllers.createBill);

export default router;
