import express from "express";
import {GetStudentApplicants, UpdateApplicantStatus} from "../database/ViewStudentClubs.js";

const router = express.Router();

router.get("/getApplicants/:form_id/", (req, res)=> GetStudentApplicants(req,res));

router.post("/UpdateApplicantStatus/", (req, res)=> UpdateApplicantStatus(req,res));


export default router;



