
import express from 'express';
import posts from './routes/posts.js';
import ViewStudentClubs from './routes/viewstudentclubs.js'
import courses from './routes/courses.js'
import major from './routes/major.js'
import bodyParser from "body-parser";
import cors from 'cors';
import { previous_complaints_router } from './database/PreviousComplaints.js';
import { write_complaint_router } from './database/WriteComplaint.js';
import { login_router } from './database/login.js';
import { signup_router } from './database/signup.js';
import { major_router } from './database/majors.js';
import { admin_router } from './database/Admin.js';
import { club_router } from './database/studentClub.js';
import { logo } from './database/logo.js';

const port = 8080;
const app = express();
app.use(cors({ origin: ["http://localhost:3000"]}));

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

    app.use('/api/', posts);
    app.use('/', signup_router);
    app.use('/', login_router);
    app.use('/', major_router);
    app.use('/', admin_router);
    app.use('/', club_router);
    app.use('/', logo);
    app.use('/api/posts/', posts);
    app.use('/api/courses/', courses);
    app.use('/api/major/', major);
    app.use('/api/viewstudentclubs/', ViewStudentClubs);
    app.use('/', previous_complaints_router);
    app.use('/', write_complaint_router);
    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });


