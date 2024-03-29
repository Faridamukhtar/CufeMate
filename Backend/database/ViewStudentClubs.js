import {dbInstance} from "./connection.js";


export const getallclubs = async (req, res)=>
{
    let Query = 
    `
    SELECT DISTINCT std_club_id, std_club_name 
    FROM student_club
    `
    ;


    console.log(Query);
    try {
      const result = await dbInstance.query(Query);
      res.status(200).json({ success: true, message: 'Getting Student Club Data', result: result.rows});
    } 
    
    catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


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

    if (club_id!=0)
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

  try {
    const result = await dbInstance.query('SELECT get_application_status($1, $2) AS status', [form_id, std_id]);
    console.log(result.rows[0].status)
    res.status(200).json({ success: true, message: `Application Status Fetched`, result: result.rows[0].status});
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

  try {
    const result = await dbInstance.query('SELECT get_rating($1, $2) AS rating', [std_club_id, std_id]);
    console.log(result.rows[0].rating)
    res.status(200).json({ success: true, message: `Rate fetched`, result: result.rows[0].rating});
  } 
  
  catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}


export const GetStudentApplicants = async (req, res) =>
{
  const form_id = req.params.form_id
  let Query =
  `
    SELECT fname, lname, major_id, a.std_id, class, stat
    FROM applied a 
    INNER JOIN student s 
      on s.std_id = a.std_id AND a.form_id = ${form_id}
  `

  console.log(Query);
  try {
    const result = await dbInstance.query(Query);
    res.status(200).json({ success: true, message: `Applicants fetched`, result: result.rows});
  } 
  
  catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}


export const UpdateApplicantStatus = async (req, res) =>
{
  const {status, std_id, form_id} = req.body;
  let Query =
  `
    UPDATE applied
    SET stat = ${status} 
    WHERE std_id=${std_id} AND form_id = ${form_id} 
  `

  console.log(Query);
  try {
    const result = await dbInstance.query(Query);
    res.status(200).json({ success: true, message: `Status Updated`, result: result.rows});
  } 
  
  catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}

export const UpdateForm = async (req, res) =>
{
  const {form_id, std_club_id, Requirements, form_title} = req.body
  let Query

  if (form_id==0)
  {
    Query=
    `
    INSERT INTO form (posted_by, form_title, form_date, requirements)
    VALUES (${std_club_id}, '${form_title}', CURRENT_DATE, '${Requirements}')  
    `
  }
  else
  {
    Query=
    `
    UPDATE form
    SET requirements='${Requirements}' ,
    form_title = '${form_title}'
    WHERE form_id = ${form_id}
    `

  }
  
    console.log(Query);
    try {
      const result = await dbInstance.query(Query);
      res.status(200).json({ success: true, message: `Updated/Created Form`, result: result.rows});
    } 
    
    catch (err) {
        console.error('Error:', err.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' })
    }
  }

export const deleteForm = async (req, res) =>
{
  const form_id = req.params.form_id
  let Query =
  `
    DELETE
    FROM form f 
    WHERE f.form_id = ${form_id}
  `

  console.log(Query);
  try {
    const result = await dbInstance.query(Query);
    res.status(200).json({ success: true, message: `Applicants fetched`, result: result.rows});
  } 
  
  catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }

}


export const AddMember = async (req, res) =>
{

  const {std_id, std_club_id} = req.body
  if (std_club_id>0 && std_id>0)
  {
    let Query =
    `
    INSERT INTO ismember
    VALUES (${std_id}, ${std_club_id}, date_part('year', CURRENT_DATE));
    `

    console.log(Query);
    try {
      const result = await dbInstance.query(Query);
      res.status(200).json({ success: true, message: `Member Added: ${std_id} to std club: ${std_club_id}`, result: result.rows});
    } 
    
    catch (err) {
      console.error('Error:', err.message);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }

  }

}
