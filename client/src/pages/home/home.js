import React from 'react'
import Posts from '../../posts/posts'
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function Home() {
  console.log(Cookies.get('username'))
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts/");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  return (
    <div className='home'>
        <Posts posts={posts}/>
    </div>
  )
}
