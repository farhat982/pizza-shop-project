import styles from '../styles/Featured.module.css'
import Image from 'next/image'
import { useState } from 'react'

const Featured = () => {
  const [index, setIndex] = useState(0)
  const images = [
    '/img/featured.png',
    '/img/featured2.png',
    '/img/featured3.png',
  ]
  const handleArrow = (direction) => {
    if (direction === 'l') {
      setIndex(index !== 0 ? index - 1 : 2)
    }
    if (direction === 'r') {
      setIndex(index !== 2 ? index + 1 : 0)
    }
  }
  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow('l')}
      >
        <Image
          src='/img/arrowl.png'
          alt=''
          style={{ objectFit: 'contain' }}
          width='100'
          height='100'
        />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {images.map((img, i) => (
          <div
            className={styles.imgContainer}
            key={i}
          >
            <img
              src={img}
              width='100%'
              alt=''
            />
          </div>
        ))}
      </div>
      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow('r')}
      >
        <Image
          src='/img/arrowr.png'
          alt=''
          style={{ objectFit: 'contain' }}
          fill
          sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
        />
      </div>
    </div>
  )
}

export default Featured
