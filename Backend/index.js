import express from "express";
//import posts from './routes/posts.js';
import bodyParser from "body-parser";
import cors from 'cors';
import { previous_complaints_router } from './database/PreviousComplaints.js';
import { write_complaint_router } from './database/WriteComplaint.js';

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


app.use('/', previous_complaints_router);
app.use('/', write_complaint_router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  