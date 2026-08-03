import { Router } from "express";
import {
  getAllMentors,
  addMentor,
  deleteMentor,
  updateMentor,
} from "../../controllers/admin/mentors.controller.js";
import { isAuth } from "../../middleware/auth.middlware.js";
import { authorizeRole } from "../../middleware/check_roles.middleware.js";

const router = Router();

//router.use(isAuth, authorizeRole("admin"));

router.get("/", getAllMentors);
router.post("/", addMentor);
router.put("/:id", updateMentor);
router.delete("/:id", deleteMentor);

export default router;
