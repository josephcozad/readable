const API = "http://localhost:3001";
  
const headers = {
  'Accept': 'application/json',
  'Authorization': 'readable-jc'
}

export const getCategories = () => (
  fetch(`${API}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)
);

export const getAllPosts = () => (
  fetch(`${API}/posts`, { headers })
    .then(res => res.json())
);

export const getPostsByCategory = (category) => (
  fetch(`${API}/${category}/posts`, { headers })
    .then(res => res.json())
);

export const getPostById = (postId) => (
  fetch(`${API}/posts/${postId}`, { headers })
    .then(res => res.json())
);

export const addPost = (post) => (
  fetch(`${API}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(post)
  }).then(res => res.json())
)

// .then(data => console.log(data))

export const updatePost = (post) => (
  fetch(`${API}/posts/${post.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      title: post.title,
      body: post.body
     })
  }).then(res => res.json())
)

// .then(data => console.log(data))

export const deletePost = (postId) => (
  fetch(`${API}/posts/${postId}`, {
    method: 'DELETE',
    headers: headers
  })
)

export const upVotePost = (postId) => {(
  fetch(`${API}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  })
)}

export const downVotePost = (postId) => {(
  fetch(`${API}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' }) 
  })
)}



export const getCommentsByPostId = (postId) => (
  fetch(`${API}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
);

export const upVoteComment = (commentId) => {(
  fetch(`${API}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'upVote' })
  })
)}

export const downVoteComment = (commentId) => {(
  fetch(`${API}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: 'downVote' }) 
  })
)}

export const addComment = (comment) => (
  fetch(`${API}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(comment)
  }).then(res => res.json())
)

export const updateComment = (comment) => (
  fetch(`${API}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      timestamp: comment.timestamp,
      body: comment.body
     })
  }).then(res => res.json())
)

export const deleteComment = (commentId) => (
  fetch(`${API}/comments/${commentId}`, {
    method: 'DELETE',
    headers: headers
  })
)

// .then(res => console.log(res))

export const getPhotoLocation = (photoId) => (
  fetch(`https://picsum.photos/100?image=${photoId}`)
    .then((res) => {
      let photoNotFound = false;
      if(res.status === 404) {
        photoNotFound = true;
      }
      return(photoNotFound);
    })
);