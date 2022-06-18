import instance from 'utils/interceptors'

// 포스트 등록
export const createPost = (title, contents) => {
  return instance.post('/posts/upload', {
    title,
    contents,
  })
}

// 포스트 목록
export const fetchPostList = () => {
  return instance.get('/posts')
}

// 포스트 정보 조회
export const fetchPost = (id) => {
  return instance.get(`/posts/${id}`)
}

// 포스트 삭제
export const removePost = (id) => {
  return instance.delete(`/posts/${id}`)
}
