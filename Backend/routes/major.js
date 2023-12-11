import express from "express";
import { getMajorAuthors } from "../database/controller.js";

const router = express.Router();

router.get("/:major", (req, res)=> getMajorAuthors(req,res));


export default router;