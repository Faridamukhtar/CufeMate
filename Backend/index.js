
import { dbInstance } from './database/connection.js';

import express from 'express';
import posts from './routes/posts.js';
import ViewStudentClubs from './routes/viewstudentclubs.js'
import courses from './routes/courses.js'
import major from './routes/major.js'
import bodyParser from "body-parser";
import cors from 'cors';
import StudentClub from './routes/StudentClub.js'
import { Update_Pass } from './database/UpdatePass.js';
import { ChangeClubPass_router } from './database/PassStudentClub.js';
import { UpdateClubPass_router } from './database/StudentClubUpdatePass.js';
import { ChangeAdminPass_router } from './database/GetAdminpass.js';
import { UpdateAdminPass_router } from './database/ChangeAdminpass.js';
import { Update_About } from './database/UpdateAbout.js';
import {Pass_router} from "./database/GetCurrentpass.js"
import { previous_complaints_router } from './database/PreviousComplaints.js';
import { write_complaint_router } from './database/WriteComplaint.js';
import { login_router } from './database/login.js';
import { signup_router } from './database/signup.js';
import { major_router } from './database/majors.js';
import { admin_router } from './database/Admin.js';
import { club_router } from './database/studentClub.js';
import { reps_contacts_router } from './database/Contacts.js';

import { Getrepreqstatus } from './database/GetStatusOfRepReq.js';
import { NewRepReq } from './database/MakeRepReq.js';
import { GetClubMembers } from './database/GetAllClubmembers.js';
import { GetClubMembersperyear } from './database/GetMembersPeryear.js';
import { RemoveMember } from './database/RemoveClubMember.js';
import { logo } from './database/logo.js';
import { stats_router } from './database/stats.js';
import { requests_router } from './database/requests.js';
import { Updatelogo_router } from './database/UpdateLogo.js';
import { GetAllSub } from './database/GetSubjectsPerDep.js';
import { Subjectbystudent } from './database/GetSubjectsTakenBystudent.js';
import { EnrollSub } from './database/Enrollsub.js';


import {reps_view_complaints_router} from './database/RepsViewComplaints.js';
import { mark_read_router } from './database/MarkRead.js';
import { write_post_major_router} from './database/WriteTextPostMajor.js';
import { write_post_course_router} from './database/WriteTextPostCourse.js';
import { choose_course_router } from './database/ChooseCourse.js';
import { previous_posts_router } from './database/viewPreviousPost.js';
import { req_write_post_major_router } from './database/ReqWriteTextPostMajor.js';
import { req_write_post_course_router } from './database/ReqWriteTextPostCourse.js';
import { post_requests_router } from './database/ViewPostReq.js';
import { mark_accept_router } from './database/MarkAccept.js';
import { mark_reject_router } from './database/MarkReject.js';

import { forgotPass } from './database/ForgotPass.js';

const port = 8080;
const app = express();
app.use(cors({ origin: ["http://localhost:3000"]}));

app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
   
    app.use('/', Update_Pass);
    app.use('/', Pass_router);
    app.use ("/", ChangeClubPass_router)
    app.use ("/", UpdateClubPass_router)
    app.use ("/", ChangeAdminPass_router)
    app.use ("/", UpdateAdminPass_router)
    app.use ("/", Update_About)
    app.use('/api/', posts);
//////////////////// AMIRA ROUTERS /////////////////
    app.use('/', signup_router);
    app.use('/', login_router);
    app.use('/', forgotPass);
    app.use('/', major_router);
    app.use('/', admin_router);
    app.use('/', club_router);
    app.use('/', logo);
    app.use('/', GetAllSub);
    app.use('/', Subjectbystudent);
    app.use('/', EnrollSub);


    app.use('/', reps_contacts_router );

    app.use('/', requests_router);
    app.use('/', stats_router);
////////////////////////////////////////////////////
    app.use('/', Getrepreqstatus);
    app.use('/', NewRepReq);

    app.use('/', GetClubMembers);
    app.use('/', GetClubMembersperyear);

    app.use('/api/posts/', posts);
    app.use('/api/courses/', courses);
    app.use('/api/major/', major);
    app.use('/api/viewstudentclubs/', ViewStudentClubs);
    app.use('/api/StudentClubs/', StudentClub);
    app.use('/', previous_complaints_router);
    app.use('/', write_complaint_router);

    app.use('/', reps_view_complaints_router);
    app.use('/', mark_read_router);
    app.use('/', previous_posts_router );
    app.use('/', choose_course_router );
    app.use('/', write_post_major_router );
    app.use('/', write_post_course_router );
    app.use('/', req_write_post_major_router);
    app.use('/', req_write_post_course_router);
    app.use('/' , post_requests_router);
    app.use('/',  mark_accept_router);
    app.use('/', mark_reject_router);

    app.use('/',RemoveMember)
    app.use('/', Updatelogo_router);

    
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });


