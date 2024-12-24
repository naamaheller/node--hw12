import { Router } from "express";
import {
    addCstudent,
    getAllCstudent,
    getCstudentById,
    getCstudentByUserId,
    returnCstudent,
    updateCstudentById,
  } from "../controllers/cstudent.js";
  
const router=Router();
router.get("/",getAllCstudent)
router.get("/:id",getCstudentById)
router.get("/ByUserId/:userid",getCstudentByUserId)
router.put("/:id",returnCstudent)
router.put("/putenddate/:id",updateCstudentById)
router.post("/",addCstudent)

export default router;