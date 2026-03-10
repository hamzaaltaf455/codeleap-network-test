import styles from './SignupModal.module.css'

export default function SignupModal({ username, onChange, onEnter }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.headerTitle}>Welcome to CodeLeap network!</h2>
        </div>
        <div className={styles.body}>
          <p className={styles.label}>Please enter your username</p>
          <input
            className={styles.input}
            type="text"
            placeholder="John doe"
            value={username}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && username.trim() && onEnter()}
          />
          <div className={styles.footer}>
            <button
              className={styles.enterBtn}
              disabled={!username.trim()}
              onClick={onEnter}
            >
              ENTER
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
