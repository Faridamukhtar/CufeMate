import { db } from "./connection";

export const getPosts=()=>
{
    const CurrentQuery = "SELECT * FROM post";
    db.query(CurrentQuery, [post_id, content, post_date], );
}