import express from "express";
import { getStudentClubForms, Apply_To_Club, Withdraw_Application, ApplicantStatus } from "../database/ViewStudentClubs.js";

const router = express.Router();

router.get("/:club_id/", (req, res)=> getStudentClubForms(req,res));

router.post("/apply", (req, res)=> Apply_To_Club(req,res));

router.post("/withdraw", (req, res)=> Withdraw_Application(req,res));

router.get("/:form_id/:std_id/", (req, res)=> ApplicantStatus(req,res));



export default router;
