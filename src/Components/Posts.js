import React, {useState, useEffect} from "react";
import './Posts.css';
import {getposts,fetchStudentCourses, fetchMajorAuthors, Like, Unlike, DidLike, NoLikes} from "../CustomHooks/PostsHooks.js";
import {LikeSVG} from "../svg/SvgFiles.js"

function HandleLikes(props)
{
    const [liked, setliked]=useState(false);
    const [Likes,setLikeCounts]=useState(0);

    useEffect(()=>
    {
        const onMount = async()=>
        {
            const didLike=await DidLike(props.post_id, props.std_id);
            const Likes=await NoLikes(props.post_id);
            if (didLike?.length>0 && didLike[0]!==undefined)
            {
                console.log('IDDDD', props.post_id);
                setliked(true);
            }
            else
            {
                setliked(false);
            }

            if (Likes!==null)
            {
                console.log(Likes, Likes[0].count)
                setLikeCounts(parseInt(Likes[0].count));
            }

        }

        onMount();

    },[])


    const handleLiked=()=>
    {
        const like = async () => {
            console.log('liked');
            setLikeCounts((prev) => {
                if (liked) {
                    Unlike(props.post_id, props.std_id);
                    setliked(false);
                    return prev - 1;
                } else {
                    Like(props.post_id, props.std_id);
                    setliked(true);
                    return prev + 1;
                }
            });
        };
    
        like();
    }

    return (
        <>
        <div className="like" onClick={handleLiked}>
            <LikeSVG/>
            &nbsp;&nbsp;{Likes} likes
        </div>
        </>
    )
}


function Post(props)
{
    return(
        <div className="Post">
            <div className="PostHeader">
                <div className="TitlePost">
                    <h2>
                        {props.Course && props.Course!=="" ? props.Course : props.Major} Announcement
                    </h2>                
                </div>
                <div className="CategoriesPost">
                    <div className="Course">
                        <h6>
                        {props.Course && props.Course!=="" ? props.Course : props.Major}
                        </h6> 
                    </div>
                    <div className="Author">
                        <h6>
                            {props.FAuthor} {props.LAuthor}
                        </h6> 
                    </div>
                </div>
            </div>
            <div class='ContentPost'>
                <h5>
                    {props.Content} 
                </h5>   
            </div>
            <HandleLikes post_id={props.post_id} std_id={props.std_id}/>
        </div>
    );
}



function WriteType(props)
{
    if (props.Type=='student')
    {
        return (
            <button className="WritePost">
                <h5>
                Request To Write Post
                </h5>
            </button>
        )
    }
    /*else
    {
        return (
            <button className="WritePost">
                <h5>
                Write Post
                </h5>            
            </button>
        )
    }*/
}


function CourseOptions(props)
{
    if (props.options)
    {
        const OptionsSelection = props.options.map((option)=>
        {
                return(<option value={option.course_name}>
                    {option.course_name}
                </option>);
        });
        return (
            <>
            <option value="">
                All Courses
            </option>
            {OptionsSelection}
            </>
            );

    }
    else{ 
        return (
            <>
            No Options Available
            </>);
    }

}

function AuthorOptions(props)
{
    if (props.options)
    {
        const OptionsSelection = props.options.map((option)=>
        {
                return(<option value={option.fname}>
                    {option.fname} {option.lname}
                </option>)
        });

        return(
            <>
                <option value="">
                    All Authors
                </option>
                {OptionsSelection}
            </>
        );
    }
    else{ 
        return (
            <>
            No Options Available
            </>);
    }

}

function DisplayPosts(props)
{
    if (props?.postArray[0]?.post_id>0)
    {
        const listItems = props.postArray.map((post) => <li key={post.post_id}><Post post_id={post.post_id} Major={post.major_id} Content={post.content} Course={post.course_name} FAuthor={post.fname} LAuthor={post.lname} std_id={props.std_id}/></li>);
        return listItems;
    }
    else
    {
        return " ";
    }

}

//Fetch Posts
function PostSection(props)
{
    const [postsContent, setPostsContent]=useState([{fname:"",lname:"",post_date:"",content:"",post_id:0,course_name:"", major_id:""}]);
    const [StudentCourses, setStudentCourses]=useState([{course_name:"", course_id:""}]);
    const [Authors, setAuthors]=useState([{fname:"", lname:"", std_id:""}]);
    const [ChosenAuthor, setChosenAuthor] = useState('');
    const [ChosenCourse, setChosenCourse] = useState('');

    const std_major = props.studentData.major_id;
    const std_id = props.studentData.std_id;
    
    useEffect(()=>
    {
        const FilterByCourseandAuthor = async (Course,Author) =>
        { 
            const data = await getposts(`${Author}`, `${std_major}` , `${Course}`, `${std_id}`);
            setPostsContent(data);
        }

        FilterByCourseandAuthor(ChosenCourse, ChosenAuthor);
        
    },[ChosenCourse,ChosenAuthor]);

    useEffect(()=>
    {
        fetchStudentCourses(std_id).then((courses)=>
        {
            console.log('courses', courses);
            setStudentCourses(courses);
        })

        fetchMajorAuthors(std_major).then((authors)=>
        {
            console.log('authors', authors);
            setAuthors(authors);
        })

    },[]);

    function Filters(props)
    {   
        return (
        <div className="Filters">
            <select className="FilterPost"
            defaultValue=""
            value={ChosenCourse}
            onChange={(e)=>setChosenCourse(e.target.value)}>
                <CourseOptions options={props.courses}/>
            </select>
            <select className="FilterPost" 
            defaultValue=""
            value={ChosenAuthor}
            onChange={(e)=>setChosenAuthor(e.target.value)}>
                <AuthorOptions options={props.authors}/>
            </select>
        </div>
        );
    }

    return (
        <div className="PostsWrapper">
            <div className="LatestPostsTitle">
                <h3>
                    Latest Posts
                </h3>
                <WriteType Type={props.studentType}/>
            </div>
            <hr className="LineUnderPost"/>
            <div className="filters">
                <Filters courses={StudentCourses} authors={Authors}/>
            </div>
            <div className="Posts">
                <ul><DisplayPosts std_id={std_id} postArray={postsContent}/></ul>
            </div>
        </div>
    );
}

export default PostSection;