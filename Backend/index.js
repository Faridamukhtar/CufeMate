import express from 'express';
import posts from './routes/posts.js';
import bodyParser from "body-parser";
import cors from 'cors';
import { Update_Pass } from './database/UpdatePass.js';
import { Delete_acc } from './database/DeleteAcc.js';
import {Pass_router} from "./database/GetCurrentpass.js"
import { db } from './database/connection.js';

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


// Use async/await to wait for the database connection before starting the server
(async () => {
  try {
    await db(); // Call the db function to establish the database connection
    app.use('/', posts);
    app.use('/', Update_Pass);
    app.use('/', Pass_router);
    app.use ("/", Delete_acc)

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to establish database connection:', error);
  }
})();