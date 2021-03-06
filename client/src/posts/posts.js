import React from 'react'
import Post from '../post/post'
import "./posts.css"

export default function posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((p) => (
        <Post post={p} />
      ))}
    </div>
  )
}
