import { useState } from 'react'
import { createPost } from 'apis/posts'

const Post = ({ post }) => {
  return (
    <>
      <div className="post-card">
        <h3>{post.title}</h3>
        <p>{post.contents}</p>

        <p className="post-email">
          {post.user && <span>작성자: {post.user.email}</span>}
        </p>
      </div>
    </>
  )
}

export default Post
