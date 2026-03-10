import { formatDistanceToNow } from '../utils/dateUtils'
import styles from './PostCard.module.css'

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6" />
    <path d="M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
)

export default function PostCard({ post, currentUser, onEdit, onDelete }) {
  const isOwner = post.username === currentUser

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{post.title}</h3>
        {isOwner && (
          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={() => onDelete(post)}
              aria-label="Delete post"
            >
              <TrashIcon />
            </button>
            <button
              className={styles.iconBtn}
              onClick={() => onEdit(post)}
              aria-label="Edit post"
            >
              <EditIcon />
            </button>
          </div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.username}>@{post.username}</span>
          <span className={styles.time}>{formatDistanceToNow(post.created_datetime)}</span>
        </div>
        <p className={styles.content}>{post.content}</p>
      </div>
    </div>
  )
}
