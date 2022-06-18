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
      const {
        data: { message },
      } = await deleteToken()
      alert(message)
      removeTokenCookie()
    } catch (error) {
      console.error(error)
    } finally {
      navigate('/login')
    }
  }

  useEffect(() => {
    getPostList()
  }, [])

  return (
    <>
      <PostFactory />

      {posts && posts.map((post) => <Post post={post} />)}

      <p className="description" onClick={handleLogout}>
        로그아웃
      </p>
    </>
  )
}

export default Home
