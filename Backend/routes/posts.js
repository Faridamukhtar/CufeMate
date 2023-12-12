import express from "express";
import { getPosts } from "../database/controller.js";

const router = express.Router();

router.post("/getposts/", (req, res)=> getPosts(req,res));
export default router;

