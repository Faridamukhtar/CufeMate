import express from "express";
import { getPosts } from "../database/StudentPosts.js";

const router = express.Router();

router.post("/", (req, res)=> getPosts(req,res));

export default router;
