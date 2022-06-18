import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { deletePost, patchPost } from 'apis/posts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const Post = ({ post, id }) => {
  const [editing, setEditing] = useState(false)
  const [title, setTitle] = useState(post.title)
  const [contents, setContents] = useState(post.contents)

  const toggleEditing = () => setEditing((prev) => !prev)

  const onChange = (e) => {
    const {
      target: { name, value },
    } = e
    if (name === 'title') {
      setTitle(value)
    } else if (name === 'contents') {
      setContents(value)
    }
  }

  const handleDeletePost = async () => {
    try {
      const res = await deletePost(id)
      alert(res.data.message)
      window.location.reload()
    } catch (error) {
      console.error(error)
    }
  }

  const handlePatchPost = async (e) => {
    e.preventDefault()

    try {
      await patchPost(id, title, contents)
      window.location.reload()
      toggleEditing(false)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {editing ? (
        <>
          <form onSubmit={handlePatchPost}>
            <label for="title">제목</label>
            <input
              id="title"
              type="text"
              name="title"
              value={title}
              onChange={onChange}
              placeholder="제목을 입력해주세요."
              autoFocus
              required
            />
            <label for="contents">내용</label>
            <textarea
              id="contents"
              name="contents"
              value={contents}
              onChange={onChange}
              placeholder="내용을 입력해주세요."
              required
            />
            <button>수정</button>
          </form>
          <button onClick={toggleEditing}>취소</button>
        </>
      ) : (
        <div className="post-card">
          <h3>{post.title}</h3>
          <p>{post.contents}</p>

          <p className="post-email">
            {post.user && <span>작성자: {post.user.email}</span>}
          </p>
          <span onClick={handleDeletePost}>
            <FontAwesomeIcon icon={faTrash} />
          </span>
          <span onClick={toggleEditing}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </span>
        </div>
      )}
    </>
  )
}

export default Post
