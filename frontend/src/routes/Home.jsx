import { useEffect, useState } from 'react'
import { deleteToken } from 'apis/auth'
import { useNavigate } from 'react-router-dom'
import { removeTokenCookie } from 'utils/cookies'
import Post from 'components/Post'
import { fetchPostList } from 'apis/posts'
import PostFactory from 'components/PostFactory'

const Home = () => {
  const [posts, setPosts] = useState([])
  const navigate = useNavigate()

  const getPostList = async () => {
    try {
      const {
        data: { posts },
      } = await fetchPostList()
      setPosts(posts)
    } catch (error) {
      console.error(error)
    }
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    try {
      await deleteToken()
      removeTokenCookie()
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getPostList()
  }, [])

  return (
    <>
      <PostFactory />

      {posts &&
        posts.map((post) => <Post post={post} key={post.id} id={post.id} />)}

      <p className="description" onClick={handleLogout}>
        ๋ก๊ทธ์์
      </p>
    </>
  )
}

export default Home
