import Image from 'next/image'
import styles from '../styles/Cart.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import axios from 'axios'
import { useRouter } from 'next/router'
import { reset } from '../redux/cartSlice'
import CashOrder from '../components/cashOrder'

const Cart = () => {
  const cart = useSelector((state) => state.cart)
  const [open, setOpen] = useState(false)
  const [cash, setCash] = useState(false)
  const amount = cart.total
  const currency = 'GBP'
  const style = { layout: 'vertical' }
  const dispatch = useDispatch()
  const router = useRouter()

  const createOrder = async (data) => {
    try {
      const response = await axios.post(
        'https://gleaming-cajeta-f087b9.netlify.app/api/orders',
        data
      )
      if (response.status === 201) {
        dispatch(reset())
        router.push(`/orders/${response.data._id}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer()

    useEffect(() => {
      dispatch({
        type: 'resetOptions',
        value: {
          ...options,
          currency: currency,
        },
      })
    }, [currency, showSpinner])

    return (
      <>
        {showSpinner && isPending && <div className='spinner' />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                // Your code here after create the order
                return orderId
              })
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping
              createOrder({
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: cart.total,
                method: 1,
              })
            })
          }}
        />
      </>
    )
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
            {cart.products.map((product) => (
              <tr
                className={styles.tr}
                key={product._id}
              >
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={product.img}
                      alt=''
                      style={{ objectFit: 'contain' }}
                      width='100'
                      height='100'
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>??{product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    {product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>Cart Total</h2>
          <div className={styles.totalText}>
            <strong className={styles.totalTextTitle}>Subtotal:</strong>??
            {cart.total}
          </div>
          <div className={styles.totalText}>
            <strong className={styles.totalTextTitle}>Discount:</strong>??0
          </div>
          <div className={styles.totalText}>
            <strong className={styles.totalTextTitle}>Total:</strong>??
            {cart.total}
          </div>
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  'client-id':
                    'AdbO12e6IQr_k1RpLD3dudZKDdiiuYJASInaJDiniR2Xl-b6g69zwugnHuzqoqH4NtO1wn0WZ7r3Sj5R',
                  components: 'buttons',
                  currency: 'GBP',
                  'disable-funding': 'credit,card,p24',
                }}
              >
                <ButtonWrapper
                  currency={currency}
                  showSpinner={false}
                  style={{ zIndex: '-1' }}
                />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button
              onClick={() => setOpen(true)}
              className={styles.button}
            >
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
      {cash && (
        <CashOrder
          total={cart.total}
          createOrder={createOrder}
        />
      )}
    </div>
  )
}

export default Cart
