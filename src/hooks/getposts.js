import React from "react";

const getposts = async (author = "", major = "", course = "") => {
  try {
    const response = await fetch("http://localhost:8080/api/getPosts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: author || "",
        major: major || "",
        course: course || "",
      }),
    });

    const data = await response.json();
    console.log("ay 7aga");
    console.log(data.result);
    return data.result;
  } catch (error) {
    console.log(error);
  }
};

export default getposts;