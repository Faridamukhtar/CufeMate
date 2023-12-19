import React, {useState} from "react";


export const getStudentClubForms = async (club_id=" ") =>
{
    try 
    {
        const response = await fetch(`http://localhost:8080/api/viewstudentclubs/${club_id}/`);
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
        const response = await fetch(`http://localhost:8080/api/viewstudentclubs/${form_id}/${std_id}`);
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
        std_club_id: std_club_id
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
