import React from "react";
import API from "../api.js";

const getposts = async (author="", major="", course="", setPostsContent) =>
{
  console.log('ay 7aga');
    try 
    {
        const response = await fetch(`${API}/getposts/`, {
            method: "POST",
            header:{},
            body: {
              "author": `${author}`,
              "major": `${major}`,
              "course": `${course}`
            },
          });
        const data = await response.json();
        console.log(data);
        setPostsContent(data);
        return (data);
    }
    catch (error)
    {
        console.log(error)
    }
}

export default getposts;