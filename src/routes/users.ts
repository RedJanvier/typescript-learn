import { Router } from "express";

import controllers from "../controllers";

const router = Router();

router.route("/login").post(controllers.login);
router.route("/confirm/:token").get(controllers.verify);
router.route("/").get(controllers.listUsers).post(controllers.createUser);

export default router;
