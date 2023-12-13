
import express from 'express';
import posts from './routes/posts.js';
import ViewStudentClubs from './routes/viewstudentclubs.js'
import courses from './routes/courses.js'
import major from './routes/major.js'
import bodyParser from "body-parser";
import cors from 'cors';
import { login_router } from './database/login.js';
import { signup_router } from './database/signup.js';
import { major_router } from './database/majors.js';
import { admin_router } from './database/Admin.js';
import { club_router } from './database/studentClub.js';
import { logo } from './database/logo.js';
import { dbInstance } from './database/connection.js';
import { requests_router } from './database/requests.js';
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
  app.use('/', requests_router);
  app.use('/', logo);
  app.use('/api/posts/', posts);
  app.use('/api/courses/', courses);
  app.use('/api/major/', major);
  app.use('/api/viewstudentclubs/', ViewStudentClubs);
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

