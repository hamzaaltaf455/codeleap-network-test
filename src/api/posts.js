const BASE_URL = 'https://dev.codeleap.co.uk/careers/'

export async function fetchPosts() {
  const res = await fetch(`${BASE_URL}?format=json`)
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export async function createPost({ username, title, content }) {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, title, content }),
  })
  if (!res.ok) throw new Error('Failed to create post')
  return res.json()
}

export async function updatePost(id, { title, content }) {
  const res = await fetch(`${BASE_URL}${id}/`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  })
  if (!res.ok) throw new Error('Failed to update post')
  return res.json()
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}${id}/`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete post')
}
