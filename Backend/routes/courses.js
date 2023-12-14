import express from "express";
import { getCourses, getStudentCourses } from "../database/StudentPosts.js";

const router = express.Router();

router.get("/", (req, res)=> getCourses(req,res));

router.get("/:student", (req, res)=> getStudentCourses(req,res));


export default router;