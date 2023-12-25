
export const getStudentClubForms = async (club_id=0) =>
{
    try 
    {
        const response = await fetch(`http://localhost:8080/api/viewstudentclubs/id/${club_id}/`);
        const data = await response.json();
        console.log("Clubs Fetched");
        console.log(data.result);
        return data.result;
    } 
    catch (error) 
    {
        console.log(error);
    }
}

export const getStudentClubs= async () =>
{
    try 
    {
        const response = await fetch(`http://localhost:8080/api/viewstudentclubs/getStudentClubs/`);
        const data = await response.json();
        console.log("Clubs Fetched");
        console.log(data.result);
        return data.result;
    } 
    catch (error) 
    {
        console.log(error);
    }
}

export const ApplicantStatus = async (form_id=" ", std_id= " ") =>
{
    try 
    {
        const response = await fetch(`http://localhost:8080/api/viewstudentclubs/appstatus/${form_id}/${std_id}`);
        const data = await response.json();
        console.log("Applicant Status:", data.result);
        console.log(data.result);
        return data.result;
    } 
    catch (error) 
    {
        console.log(error);
    }
}




export async function Apply_To_Club(form_id = "", std_id ="")
{
  try 
  {
    const response = await fetch("http://localhost:8080/api/viewstudentclubs/apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        std_id: std_id || "",
        form_id: form_id || ""
      }),
    });

    const data = await response.json();
    console.log("Applied to club");
    console.log(data);
    return data;
  } 
  catch (error) 
  {
    console.log(error);
  }
}

export async function Withdraw_Application(form_id = "", std_id ="")
{
  try 
  {
    const response = await fetch("http://localhost:8080/api/viewstudentclubs/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        std_id: std_id || "",
        form_id: form_id || ""
      }),
    });

    const data = await response.json();
    console.log("Withdrew Application");
    console.log(data);
  } 
  catch (error) 
  {
    console.log(error);
  }
}


export async function Rate_Club(rating, std_id, std_club_id)
{
  try 
  {
    const response = await fetch("http://localhost:8080/api/viewstudentclubs/rate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: rating || 0,
        std_id: std_id,
        std_club_id: parseInt(std_club_id)
      }),
    });

    const data = await response.json();
    console.log("Rated club");
    console.log(data);
    return data;
  } 
  catch (error) 
  {
    console.log(error);
  }
}


export const getRateStatus= async (std_id=0, std_club_id=0) =>
{
    try 
    {
        const response = await fetch(`http://localhost:8080/api/viewstudentclubs/ratestatus/${std_club_id}/${std_id}`);
        const data = await response.json();
        console.log("Applicant Status:", data.result);
        console.log(data.result);
        return data.result;
    } 
    catch (error) 
    {
        console.log(error);
    }
}

export const getStudentApplicants= async (form_id=0) =>
{
    try 
    {
        const response = await fetch(`http://localhost:8080/api/StudentClubs/getApplicants/${form_id}/`);
        const data = await response.json();
        console.log("Student Applicants Fetched");
        console.log(data.result);
        return data.result;
    } 
    catch (error) 
    {
        console.log(error);
    }
}

export const updateApplicantStatus= async (status=0, form_id, std_id) =>
{
  try 
  {
    const response = await fetch("http://localhost:8080/api/StudentClubs/UpdateApplicantStatus/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: status || 0,
        std_id: std_id || 0,
        form_id: form_id || 0
      }),
    });

    const data = await response.json();
    console.log("Rated club");
    console.log(data);
    return data;
  } 
  catch (error) 
  {
    console.log(error);
  }
}

export const SubmitFormChanges= async (form_id, std_club_id, Requirements, form_title) =>
{
  try 
  {
    const response = await fetch("http://localhost:8080/api/StudentClubs/SubmitFormChanges/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        form_id: form_id || 0,
        std_club_id: std_club_id || 0,
        Requirements: Requirements || "",
        form_title: form_title || ""
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } 
  catch (error) 
  {
    console.log(error);
  }
}

export const DeleteForm= async (form_id=0) =>
{
    try 
    {
        const response = await fetch(`http://localhost:8080/api/StudentClubs/DeleteForm/${form_id}/`);
        const data = await response.json();
        console.log("form deleted");
        console.log(data.result);
        return data.result;
    } 
    catch (error) 
    {
        console.log(error);
    }
}


export const AddMember= async (std_club_id, std_id) =>
{
  try 
  {
    const response = await fetch("http://localhost:8080/api/StudentClubs/addmember", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        std_id: std_id || 0,
        std_club_id: std_club_id || 0,
      }),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } 
    catch (error) 
    {
        console.log(error);
    }
}
