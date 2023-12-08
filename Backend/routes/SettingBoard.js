import express from "express";
import { updateStudentPassword } from "../Controller";

const router = express.Router();

router.get("/", updateStudentPassword);

export default router;