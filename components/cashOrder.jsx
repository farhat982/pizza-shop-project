import styles from '../styles/CashOrder.module.css'
import { useState } from 'react'

const cashOrder = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')

  const handleClick = () => {
    createOrder({ customer, address, total, method: 0 })
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>£12 after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Full Name: </label>
          <input
            placeholder='John Doe'
            type='text'
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone No: </label>
          <input
            placeholder='0044(0)123242444'
            type='text'
            className={styles.input}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address: </label>
          <textarea
            placeholder='107 Meadow Road, CV6 4GT'
            type='text'
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button
          className={styles.button}
          onClick={handleClick}
        >
          ORDER
        </button>
      </div>
    </div>
  )
}

export default cashOrder
