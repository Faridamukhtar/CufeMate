import express from "express";
import { getStudentClubForms, Apply_To_Club, Withdraw_Application, ApplicantStatus, Rate_Club, RateStatus } from "../database/ViewStudentClubs.js";

const router = express.Router();

router.get("/:club_id/", (req, res)=> getStudentClubForms(req,res));

router.post("/apply", (req, res)=> Apply_To_Club(req,res));

router.post("/withdraw", (req, res)=> Withdraw_Application(req,res));

router.get("/:form_id/:std_id/", (req, res)=> ApplicantStatus(req,res));

router.post("/rate", (req, res)=> Rate_Club(req,res));

router.get("/ratestatus/:std_club_id/:std_id/", (req, res)=> RateStatus(req,res));




export default router;
