import { useState } from 'react'
import styles from './EditModal.module.css'

export default function EditModal({ post, onClose, onSave }) {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const canSave = title.trim() && content.trim()

  function handleSave() {
    if (!canSave) return
    onSave(post.id, { title: title.trim(), content: content.trim() })
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Edit item</h2>
        </div>
        <div className={styles.body}>
          <div className={styles.field}>
            <label className={styles.label}>Title</label>
            <input
              className={styles.input}
              type="text"
              placeholder="Hello world"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Content</label>
            <textarea
              className={styles.textarea}
              placeholder="Content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
            />
          </div>
          <div className={styles.footer}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button
              className={styles.saveBtn}
              disabled={!canSave}
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
