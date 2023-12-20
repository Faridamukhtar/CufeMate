import {dbInstance} from "./connection.js";

export const getStudentClubForms = async (req, res)=>
{
    const club_id= req.params?.club_id;
    let Query = `
    SELECT std_club_id, std_club_name, email, about, logo, form_id, form_title, requirements, form_date
    FROM student_club sc
    INNER JOIN form f
        on sc.std_club_id = f.posted_by 
    `
    ;

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

export const Apply_To_Club = async (req, res) =>
{
  const {std_id, form_id} = req.body
  let Query =
  `
  INSERT INTO Applied (std_id, form_id, yr, stat)
  VALUES (${std_id}, ${form_id}, date_part('year', CURRENT_DATE), 0)  
  `

  console.log(Query);
  try {
    const result = await dbInstance.query(Query);
    res.status(200).json({ success: true, message: `Applied to club - student id: ${std_id}`, result: result.rows});
  } 
  
  catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}


export const Withdraw_Application = async (req, res) =>
{
    const {std_id, form_id} = req.body
    let Query =
    `
    DELETE FROM Applied
    WHERE Applied.std_id= ${std_id} AND Applied.form_id= ${form_id}
    `;

    console.log(Query);
    try {
      const result = await dbInstance.query(Query);
      res.status(200).json({ success: true, message: `Withdrew from club - student: ${std_id}`, result: result.rows});
    } 
    
    catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }


}


export const ApplicantStatus = async (req, res) =>
{
  const {std_id, form_id} = req.params
  let Query =
  `
    SELECT stat
    from applied
    WHERE form_id = ${form_id} AND std_id = ${std_id}
  `

  console.log(Query);
  try {
    const result = await dbInstance.query(Query);
    res.status(200).json({ success: true, message: `Application Status Fetched`, result: result.rows});
  } 
  
  catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}

export const Rate_Club = async (req, res) =>
{
  const {std_id, std_club_id, rating} = req.body
  if (rating>0 && rating<=5)
  {
    let Query =
    `
    INSERT INTO rate (std_id, std_club_id, yr, rating)
    VALUES (${std_id}, ${std_club_id}, date_part('year', CURRENT_DATE), ${rating})  
    `
  
    console.log(Query);
    try {
      const result = await dbInstance.query(Query);
      res.status(200).json({ success: true, message: `Rated club - student id: ${std_id} - Rating: ${rating}`, result: result.rows});
    } 
    
    catch (err) {
      try {
        Query =
        `
        UPDATE rate
        SET rating =  ${rating} 
        WHERE  std_id=${std_id} AND std_club_id= ${std_club_id}
        `
        const result = await dbInstance.query(Query);
        res.status(200).json({ success: true, message: `Rated club - student id: ${std_id} - Rating: ${rating}`, result: result.rows});
      } 
      catch
      {
        console.error('Error:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
    }
  }
}

export const RateStatus = async (req, res) =>
{
  const {std_id, std_club_id} = req.params
  let Query =
  `
    SELECT rating
    from rate
    WHERE std_club_id = ${std_club_id} AND std_id = ${std_id}
  `

  console.log(Query);
  try {
    const result = await dbInstance.query(Query);
    res.status(200).json({ success: true, message: `Rate fetched`, result: result.rows});
  } 
  
  catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}