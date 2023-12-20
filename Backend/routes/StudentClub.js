import express from "express";
import {GetStudentApplicants, UpdateApplicantStatus, UpdateForm,deleteForm } from "../database/ViewStudentClubs.js";

const router = express.Router();

router.get("/getApplicants/:form_id/", (req, res)=> GetStudentApplicants(req,res));

router.post("/UpdateApplicantStatus/", (req, res)=> UpdateApplicantStatus(req,res));

router.post("/SubmitFormChanges/", (req, res)=> UpdateForm(req,res));

router.get("/DeleteForm/:form_id/", (req, res)=> deleteForm(req,res));



export default router;



