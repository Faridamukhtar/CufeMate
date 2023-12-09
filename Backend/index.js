import express from "express";
import posts from './routes/posts.js';
import {login_router} from "./database/login.js"
import {signup_router} from "./database/signup.js"
import {major_router} from "./database/majors.js"

const port = 8080;

const app=express();

app.use('/', posts);

// Use the signup routes for requests related to signup
app.use('/', signup_router);

// Use the login routes for requests related to login
app.use('/', login_router);

// Use the majors routes for requests related to majors
app.use('/', major_router);
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });