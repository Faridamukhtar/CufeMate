import express from "express";
import { viewPosts } from "../Controller";

const router = express.Router();

router.get("/", viewPosts);

export default router;