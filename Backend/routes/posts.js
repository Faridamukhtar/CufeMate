import express from "express";
import { getPosts, like, unlike,getLikesNo, getDidLike } from "../database/StudentPosts.js";

const router = express.Router();


router.post("/", (req, res)=> getPosts(req,res));
router.get("/unlike/:post_id/:std_id/", (req, res)=> unlike(req,res));
router.get("/like/:post_id/:std_id/", (req, res)=> like(req,res));
router.get("/likesno/:post_id/", (req, res)=> getLikesNo(req,res));
router.get("/didlike/:post_id/:std_id/", (req, res)=> getDidLike(req,res));




export default router;
