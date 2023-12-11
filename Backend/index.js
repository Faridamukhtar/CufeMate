import express from "express";
import posts from './routes/posts.js';
import courses from './routes/courses.js'
import major from './routes/major.js'
import bodyParser from "body-parser";
import cors from 'cors';

const port = 8080;
const app=express();

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

app.use('/api/posts/', posts);
app.use('/api/courses/', courses);
app.use('/api/major/', major);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  