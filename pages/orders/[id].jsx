import Image from 'next/image'
import styles from '../../styles/Order.module.css'
import axios from 'axios'

const Order = ({ order }) => {
  const status = order.status
  const statusClass = (index) => {
    if (index - status < 1) {
      return styles.done
    }
    if (index - status === 1) {
      return styles.inProgress
    }
    if (index - status > 1) {
      return styles.undone
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{order._id}</span>
                </td>
                <td>
                  <span className={styles.name}>{order.customer}</span>
                </td>
                <td>
                  <span className={styles.address}>{order.address}</span>
                </td>
                <td>
                  <span className={styles.total}>£{order.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image
              src='/img/paid.png'
              alt=''
              width='30'
              height='30'
              style={{ objectFit: 'contain' }}
            />
            <span>Payment</span>
            <div className={styles.checkedIcon}>
              <Image
                src='/img/checked.png'
                alt=''
                width='20'
                height='20'
                style={{ objectFit: 'contain' }}
                className={styles.checkedIcon}
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <Image
              src='/img/bake.png'
              alt=''
              width='30'
              height='30'
              style={{ objectFit: 'contain' }}
            />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <Image
                src='/img/checked.png'
                alt=''
                width='20'
                height='20'
                style={{ objectFit: 'contain' }}
                className={styles.checkedIcon}
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <Image
              src='/img/bike.png'
              alt=''
              width='30'
              height='30'
              style={{ objectFit: 'contain' }}
            />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <Image
                src='/img/checked.png'
                alt=''
                width='20'
                height='20'
                style={{ objectFit: 'contain' }}
                className={styles.checkedIcon}
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <Image
              src='/img/delivered.png'
              alt=''
              width='30'
              height='30'
              style={{ objectFit: 'contain' }}
            />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <Image
                src='/img/checked.png'
                alt=''
                width='20'
                height='20'
                style={{ objectFit: 'contain' }}
                className={styles.checkedIcon}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Cart Total</h2>
          <div className={styles.totalText}>
            <strong className={styles.totalTextTitle}>Subtotal:</strong>£
            {order.total}
          </div>
          <div className={styles.totalText}>
            <strong className={styles.totalTextTitle}>Discount:</strong>£0
          </div>
          <div className={styles.totalText}>
            <strong className={styles.totalTextTitle}>Total:</strong>£
            {order.total}
          </div>
          <button
            disabled
            className={styles.button}
          >
            PAID
          </button>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async ({ params }) => {
  const response = await axios.get(
    `https://gleaming-cajeta-f087b9.netlify.app/api/orders/${params.id}`
  )
  return {
    props: {
      order: response.data,
    },
  }
}

export default Order
