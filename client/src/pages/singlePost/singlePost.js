import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./singlePost.css";
import Cookies from 'js-cookie';

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const get_Post = async () => {
      const res = await axios.get("/api/posts/" + path + "/");
      setPost(res.data);
      console.log(res.data)
    };
    get_Post();
  }, [path]);

  const handleDelete = async () => {
    try {
      console.log(Cookies.get('username'))
      console.log(post.username)
      if ((Cookies.get('username') == post.username)){
        await axios.delete(`/api/posts/${post._id}`);
        window.location.replace("/");
      }
    } catch (err) {}
  };


  const handleUpdate = async () => {

    console.log(desc)
    post["desc"] = desc
    await axios.put(`/api/posts/${post._id}`, post)
    setUpdateMode(false);
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <div className="movieDetail">
          <img
            className="singlePostImg"
            src={post.movieImg}
            alt=""
          />
          <div className="movieDetailText">
            <div className="titleInline"><div className="detailColor"> Movie Title</div> : {post.movieTitle}</div>
            <br></br>
            <br></br>
            <div className="detailColor"> Movie Summary : </div>  {post.movieSummary}
            <br></br>
            <br></br>
            <div className="titleInline"><div className="detailColor"> Genre </div> :  {post.Genre}</div>
            <br></br>
            <br></br>
            <div className="titleInline"><div className="detailColor"> Year </div> :  {post.Year}</div>
            <br></br>
            <br></br>
            <div className="titleInline"><div className="detailColor"> Director </div> :  {post.Director}</div>
            <br></br>
            <br></br>
            <div className="titleInline"><div className="detailColor"> Runtime </div> :  {post.Runtime}</div>
            <br></br>
            <br></br>
            <div className="titleInline"><div className="detailColor"> MetaScore </div> :  {post.metaScore}</div>
            <br></br>
            <br></br>
            <div className="titleInline">
              <div class="imdb-icon icon"></div> {post.imdbRating}
            </div>
          </div>
        </div>
        <div className="moviePost">
          <h1 className="singlePostTitle">
            {post.title}
            <div className="singlePostEdit">
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}
              >
              </i>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span>
              Author:
              <b className="singlePostAuthor">
                <Link to={`/?user=${post.username}`} className="link">
                  <b> {post.username}</b>
                </Link>
              </b>
            </span>
            <span>{new Date(post.createdAt).toDateString()}</span>
          </div>
          <p className="singlePostDesc">{post.desc}</p>
        </div>
      </div>
      </div>
    
  );
}