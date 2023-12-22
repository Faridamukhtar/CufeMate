
export async function getposts(author = "", major = "", course = "", std_id ="")
{
  try 
  {
    const response = await fetch("http://localhost:8080/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author || "",
        major: major || "",
        course: course || "",
        std_id: std_id || "",
      }),
    });

    const data = await response.json();
    console.log("Posts Fetched");
    console.log(data.result);
    return data.result;
  } 
  catch (error) 
  {
    console.log(error);
  }
}

export async function fetchCourses()
{
    try {
      const response = await fetch('http://localhost:8080/api/courses'); 
      const CoursesData = await response.json();
      console.log(CoursesData);
      return CoursesData.rows;
    } 
    
    catch (error) 
    {
      console.error('Error fetching courses:', error);
    }
};

export async function fetchStudentCourses(student_id)
{
    try {
      const response = await fetch(`http://localhost:8080/api/courses/${encodeURIComponent(student_id)}`); 
      const CoursesData = await response.json();
      console.log(CoursesData);
      return CoursesData.result;
    } 
    
    catch (error) 
    {
      console.error('Error fetching courses:', error);
    }
};

export async function fetchMajorAuthors(major_id)
{
  try {
    const response = await fetch(`http://localhost:8080/api/major/${encodeURIComponent(major_id)}`); 
    const MajorData = await response.json();
    console.log(MajorData);
    return MajorData.result;
  } 
  
  catch (error) 
  {
    console.error('Error fetching courses:', error);
  }
}

export async function Like(post_id, std_id)
{
  try {
    const response = await fetch(`http://localhost:8080/api/posts/like/${post_id}/${std_id}`); 
    const LikePost = await response.json();
    console.log(LikePost, 'Post Liked');
    return LikePost;
  } 
  
  catch (error) 
  {
    console.error('Error Liking Post:', error);
  }
}

export async function Unlike(post_id, std_id)
{
  try {
    const response = await fetch(`http://localhost:8080/api/posts/unlike/${post_id}/${std_id}`); 
    const UnLikePost = await response.json();
    console.log(UnLikePost, 'Post UnLiked');
    return UnLikePost;
  } 
  
  catch (error) 
  {
    console.error('Error Unliking Post:', error);
  }
}

export async function DidLike(post_id, std_id)
{
  try {
    const response = await fetch(`http://localhost:8080/api/posts/didlike/${post_id}/${std_id}`); 
    const liked = await response.json();
    console.log(liked, 'Did Like?');
    return liked.result;
  } 
  
  catch (error) 
  {
    console.error('Error Fetching Did Like Post:', error);
  }
}

export async function NoLikes(post_id)
{
  try {
    const response = await fetch(`http://localhost:8080/api/posts/likesno/${post_id}`); 
    const NoLikes = await response.json();
    console.log(NoLikes, 'No of likes');
    return NoLikes.result;
  } 
  
  catch (error) 
  {
    console.error('Error Fetching No. of likes:', error);
  }
}