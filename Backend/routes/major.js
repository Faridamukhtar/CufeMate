import express from "express";
import { getMajorAuthors } from "../database/StudentPosts.js";

const router = express.Router();

router.get("/:major", (req, res)=> getMajorAuthors(req,res));


export default router;