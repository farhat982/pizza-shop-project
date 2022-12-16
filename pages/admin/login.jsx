import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../../styles/Login.module.css'
import axios from 'axios'

const Login = () => {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    try {
      await axios.post('https://gleaming-cajeta-f087b9.netlify.app/api/login', {
        username,
        password,
      })
      router.push('/admin')
    } catch (error) {
      setError(true)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Admin Dashboard</h1>
        <input
          type='text'
          placeholder='Username'
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={handleClick}
        >
          Login
        </button>
        {error && (
          <span className={styles.error}>Invalid username or password!</span>
        )}
      </div>
    </div>
  )
}

export default Login
