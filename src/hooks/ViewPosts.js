import React from "react";
import API from "../Components/api";

const viewPosts = async (author="", major="", course="") =>
{
    const result = fetch(`${API}/getposts/`, {
        method: "POST",
        header:{},
        body: {
          "author": `${author}`,
          "major": `${major}`,
          "course": `${course}`
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setJoke(data[0].joke);
          console.log(data);
        })
        .catch((error) => console.log(error));
    }, []);
}