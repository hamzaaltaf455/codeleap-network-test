import { useState, useEffect, useCallback } from 'react'
import SignupModal from './components/SignupModal'
import PostCard from './components/PostCard'
import EditModal from './components/EditModal'
import DeleteModal from './components/DeleteModal'
import { fetchPosts, createPost, updatePost, deletePost } from './api/posts'
import styles from './App.module.css'

export default function App() {
  const [username, setUsername] = useState(() => localStorage.getItem('codeleap_username') || '')
  const [showSignup, setShowSignup] = useState(!localStorage.getItem('codeleap_username'))
  const [inputUsername, setInputUsername] = useState('')

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [newTitle, setNewTitle] = useState('')
  const [newContent, setNewContent] = useState('')
  const [creating, setCreating] = useState(false)

  const [editPost, setEditPost] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchPosts()
      setPosts(data.results || [])
    } catch {
      setError('Failed to load posts. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!showSignup) {
      loadPosts()
    }
  }, [showSignup, loadPosts])

  function handleEnter() {
    const trimmed = inputUsername.trim()
    if (!trimmed) return
    localStorage.setItem('codeleap_username', trimmed)
    setUsername(trimmed)
    setShowSignup(false)
  }

  async function handleCreate() {
    if (!newTitle.trim() || !newContent.trim()) return
    try {
      setCreating(true)
      const post = await createPost({ username, title: newTitle.trim(), content: newContent.trim() })
      setPosts((prev) => [post, ...prev])
      setNewTitle('')
      setNewContent('')
    } catch {
      alert('Failed to create post. Please try again.')
    } finally {
      setCreating(false)
    }
  }

  async function handleSaveEdit(id, { title, content }) {
    try {
      const updated = await updatePost(id, { title, content })
      setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)))
      setEditPost(null)
    } catch {
      alert('Failed to update post. Please try again.')
    }
  }

  async function handleConfirmDelete() {
    if (!deleteTarget) return
    try {
      await deletePost(deleteTarget.id)
      setPosts((prev) => prev.filter((p) => p.id !== deleteTarget.id))
      setDeleteTarget(null)
    } catch {
      alert('Failed to delete post. Please try again.')
    }
  }

  const canCreate = newTitle.trim() && newContent.trim() && !creating

  return (
    <div className={styles.app}>
      {showSignup && (
        <SignupModal
          username={inputUsername}
          onChange={setInputUsername}
          onEnter={handleEnter}
        />
      )}

      {editPost && (
        <EditModal
          post={editPost}
          onClose={() => setEditPost(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deleteTarget && (
        <DeleteModal
          onClose={() => setDeleteTarget(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <header className={styles.header}>
        <div className={styles.headerInner}>
          <h1 className={styles.headerTitle}>CodeLeap Network</h1>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.feed}>
          {/* Create post form */}
          <div className={styles.createCard}>
            <h2 className={styles.createTitle}>What&apos;s on your mind?</h2>
            <div className={styles.formFields}>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Title</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Hello world"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel}>Content</label>
                <textarea
                  className={styles.textarea}
                  placeholder="Content here"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={5}
                />
              </div>
              <div className={styles.createFooter}>
                <button
                  className={styles.createBtn}
                  disabled={!canCreate}
                  onClick={handleCreate}
                >
                  {creating ? 'Creating...' : 'CREATE'}
                </button>
              </div>
            </div>
          </div>

          {/* Posts feed */}
          {loading && (
            <div className={styles.statusMessage}>Loading posts...</div>
          )}
          {error && (
            <div className={styles.errorMessage}>
              {error}
              <button className={styles.retryBtn} onClick={loadPosts}>Retry</button>
            </div>
          )}
          {!loading && !error && posts.length === 0 && (
            <div className={styles.statusMessage}>No posts yet. Be the first to post!</div>
          )}
          {!loading && !error && posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={username}
              onEdit={setEditPost}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
