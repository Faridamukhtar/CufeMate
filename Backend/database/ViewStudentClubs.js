import {dbInstance} from "./connection.js";

export const getStudentClubForms = async (req, res)=>
{
    const club_id= req.params?.club_id;
    let Query = `
    SELECT std_club_id, std_club_name, email, about, logo,form_id, form_title, requirements, form_date
    FROM student_club sc
    INNER JOIN form f
        on sc.std_club_id = f.posted_by 
    `;

    if (club_id!==" ")
    {
      Query += `
      AND sc.std_club_id= ${club_id}
      `
    }


    console.log(Query);
    try {
      const result = await dbInstance.query(Query);
      res.status(200).json({ success: true, message: 'Getting Student Club Forms and Data', result: result.rows});
    } 
    
    catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}