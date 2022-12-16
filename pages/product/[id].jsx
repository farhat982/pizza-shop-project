import Image from 'next/image'
import { useState } from 'react'
import styles from '../../styles/Product.module.css'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../redux/cartSlice'

const Product = ({ pizza }) => {
  const [price, setPrice] = useState(pizza.prices[0])
  const [size, setSize] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [extras, setExtras] = useState([])

  const dispatch = useDispatch()

  const changePrice = (number) => {
    setPrice(price + number)
  }

  const handleSize = (sizeIndex) => {
    const difference = pizza.prices[sizeIndex] - pizza.prices[size]
    setSize(sizeIndex)
    changePrice(difference)
  }

  const handleChange = (e, option) => {
    const checked = e.target.checked
    if (checked) {
      changePrice(option.price)
      setExtras((prev) => [...prev, option])
    } else {
      changePrice(-option.price)
      setExtras(extras.filter((extra) => extra._id !== option._id))
    }
  }

  const handleClick = () => {
    dispatch(addProduct({ ...pizza, price, quantity, extras }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={pizza.img}
            alt=''
            style={{ objectFit: 'contain' }}
            priority
            fill
            sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>£{price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div
            className={styles.size}
            onClick={() => handleSize(0)}
          >
            <Image
              src='/img/size.png'
              alt=''
              fill
              sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
              priority
            />
            <span className={styles.number}>Small</span>
          </div>
          <div
            className={styles.size}
            onClick={() => handleSize(1)}
          >
            <Image
              src='/img/size.png'
              alt=''
              fill
              sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
              priority
            />
            <span className={styles.number}>Medium</span>
          </div>
          <div
            className={styles.size}
            onClick={() => handleSize(2)}
          >
            <Image
              src='/img/size.png'
              alt=''
              fill
              sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
              priority
            />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {pizza.extraOptions.map((option) => (
            <div
              className={styles.option}
              key={option._id}
            >
              <input
                type='checkbox'
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => handleChange(e, option)}
              />
              <label htmlFor='double'>{option.text}</label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            type='number'
            defaultValue={1}
            className={styles.quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button
            className={styles.button}
            onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
export const getServerSideProps = async ({ params }) => {
  const response = await axios.get(
    `https://gleaming-cajeta-f087b9.netlify.app/api/products/${params.id}`
  )
  return {
    props: {
      pizza: response.data,
    },
  }
}

export default Product
