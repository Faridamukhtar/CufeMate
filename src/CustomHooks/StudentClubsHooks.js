
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