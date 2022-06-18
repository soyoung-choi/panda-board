import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deletePost } from 'apis/posts'

const Post = ({ post, id }) => {
  const handleDeletePost = async () => {
    try {
      const res = await deletePost(id)
      alert(res.data.message)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="post-card">
        <h3>{post.title}</h3>
        <p>{post.contents}</p>

        <p className="post-email">
          {post.user && <span>작성자: {post.user.email}</span>}
        </p>
        <button onClick={handleDeletePost}>삭제</button>
      </div>
    </>
  )
}

export default Post
