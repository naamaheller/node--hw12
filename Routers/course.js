import { Router } from "express";
import {add,getAllCourse,getById,deleteById,update} from "../controllers/course.js";

const router=Router();
router.get("/",getAllCourse);
router.get("/:id",getById);
router.delete("/:id",deleteById);
router.post("/",add);
router.put("/",update);

export default router;