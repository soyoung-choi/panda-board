import { useState } from 'react'
import { createPost } from 'apis/posts'

const PostFactory = () => {
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')

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

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      await createPost(title, contents)
      window.location.reload()
    } catch (error) {
      console.error(error)
    } finally {
      setTitle('')
      setContents('')
    }
  }

  return (
    <>
      <form onSubmit={onSubmit} className="login-form">
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
        <button>등록</button>
      </form>
    </>
  )
}

export default PostFactory
