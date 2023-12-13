import express from "express";
import { getStudentClubForms } from "../database/ViewStudentClubs.js";

const router = express.Router();

router.get("/", (req, res)=> getStudentClubForms(req,res));

export default router;