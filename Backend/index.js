
import express from 'express';
import posts from './routes/posts.js';
import courses from './routes/courses.js'
import major from './routes/major.js'
import bodyParser from "body-parser";
import { login_router } from './database/login.js';
import { signup_router } from './database/signup.js';
import { major_router } from './database/majors.js';
import { db } from './database/connection.js';


const port = 8080;
const app = express();
app.use(cors({
  origin: 'http://localhost:3000'
}));
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);

// Use async/await to wait for the database connection before starting the server
(async () => {
  try {
    await db(); // Call the db function to establish the database connection
    app.use('/api/', posts);
    app.use('/', signup_router);
    app.use('/', login_router);
    app.use('/', major_router);
    app.use('/api/posts/', posts);
    app.use('/api/courses/', courses);
    app.use('/api/major/', major);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    
  } 
  catch (error) {
    console.error('Failed to establish database connection:', error);
  }
});