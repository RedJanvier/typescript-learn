import { Router } from "express";

import controllers from "../controllers";

const router = Router();

router.route("/").get(controllers.listUsers).post(controllers.createUser);
router.route("/confirm/:token").get(controllers.verify);

export default router;
