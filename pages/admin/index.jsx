import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import axios from 'axios'
import { useState } from 'react'

const Index = ({ orders, products }) => {
  const [pizzaList, setPizzaList] = useState(products)
  const [orderList, setOrderList] = useState(orders)
  const status = ['preparing', 'on the way', 'delivered']

  const handleDelete = async (id) => {
    console.log(id)
    try {
      const response = await axios.delete(
        'https://gleaming-cajeta-f087b9.netlify.app/api/products/' + id
      )
      setPizzaList(
        response.data,
        ...pizzaList.filter((pizza) => pizza._id !== id)
      )
    } catch (error) {
      console.log(error)
    }
  }
  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0]
    const currentStatus = item.status
    try {
      const response = await axios.put(
        'https://gleaming-cajeta-f087b9.netlify.app/api/orders/' + id,
        {
          status: currentStatus + 1,
        }
      )
      setOrderList([
        response.data,
        ...orderList.filter((order) => order._id !== id),
      ])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>Id</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </tbody>
          {products.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.img}
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover' }}
                    alt=''
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>£{product.prices[0]}</td>
                <td>
                  <button className={styles.button}>Edit</button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Id</th>
              <th>customer</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </tbody>
          {orderList.map((order) => (
            <tbody key={order._id}>
              <tr className={styles.trTitle}>
                <td>{order._id.slice(0, 5)}...</td>
                <td>{order.customer}</td>
                <td>£{order.total}</td>
                <td>
                  {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
                </td>
                <td>{status[order.status]}</td>
                <td>
                  <button onClick={() => handleStatus(order._id)}>
                    Next Stage
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || ''

  if (myCookie.token !== 'SWDw4Cv||663Zp3|zxtp%ok6Ejj') {
    return {
      redirect: {
        destination: '/admin/login',
        premanent: false,
      },
    }
  }
  const productRes = await axios.get('https://gleaming-cajeta-f087b9.netlify.app/api/products')
  const orderRes = await axios.get('https://gleaming-cajeta-f087b9.netlify.app/api/orders')

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  }
}

export default Index
