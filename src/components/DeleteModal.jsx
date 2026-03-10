import styles from './DeleteModal.module.css'

export default function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Delete item</h2>
        </div>
        <div className={styles.body}>
          <p className={styles.message}>
            Are you sure you want to delete this item?
          </p>
          <div className={styles.footer}>
            <button className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button className={styles.deleteBtn} onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
