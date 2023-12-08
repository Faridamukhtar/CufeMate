import express from "express";
import posts from './routes/posts.js';

const port = 8080;

const app=express();

app.use('/', posts);
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  