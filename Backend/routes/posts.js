import express from "express";
import { viewPosts } from "../Controller";

const router = express.Router();

router.get("/", viewPosts);
export default router;

///////////////////////////////////// TO BE REMOVED /////////////////////////////////////////
const express = require('express');
const signupRoutes = require('./signup');
const loginRoutes = require('./login');

const app = express();
const PORT = process.env.PORT || 3000;

// Use the signup routes for requests related to signup
app.use('/', signupRoutes);

// Use the login routes for requests related to login
app.use('/', loginRoutes);

// Use the majors routes for requests related to majors
app.use('/', majorsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
///////////////////////////////////////////////////////////////////////////////////////////////

