import express from "express";
import { getPosts } from "../database/controller.js";

const router = express.Router();

router.use("/getposts", getPosts);

export default router;