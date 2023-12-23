import express from "express";
import {GetStudentApplicants, UpdateApplicantStatus, UpdateForm,deleteForm,AddMember} from "../database/ViewStudentClubs.js";

const router = express.Router();

router.get("/getApplicants/:form_id/", (req, res)=> GetStudentApplicants(req,res));

router.post("/UpdateApplicantStatus/", (req, res)=> UpdateApplicantStatus(req,res));

router.post("/SubmitFormChanges/", (req, res)=> UpdateForm(req,res));

router.get("/DeleteForm/:form_id/", (req, res)=> deleteForm(req,res));

router.post("/AddMember/", (req, res)=> AddMember(req,res));





export default router;



