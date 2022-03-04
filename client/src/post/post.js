import React from 'react'
import { Link } from "react-router-dom";
import "./post.css"

export default function post({post}) {
  console.log(post)
  return (
    <div className="post">
      <img
        className="postImg"
        src={post.movieImg}
        alt=""
      />
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  )
}
