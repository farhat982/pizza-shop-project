import styles from '../styles/Footer.module.css'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image
          src='/img/bg.png'
          alt=''
          style={{ objectFit: 'cover' }}
          priority
          fill
          sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw'
        />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            OH YES, WE DID. THE LAMA PIZZA, WELL BAKED SLICE OF PIZZA.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUT RESTAURANTS</h1>
          <p className={styles.text}>
            90 High street, <br />
            London, <br /> SW17 0JG <br /> 012 345 678
          </p>
          <p className={styles.text}>
            90 High street, <br />
            London, <br /> SW17 0JG <br /> 012 345 678
          </p>
          <p className={styles.text}>
            90 High street, <br />
            London, <br /> SW17 0JG <br /> 012 345 678
          </p>
          <p className={styles.text}>
            90 High street, <br />
            London, <br /> SW17 0JG <br /> 012 345 678
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>OPENING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY <br />
            0900 - 2200 <br />
            <br />
            SATURDAY - SUNDAY <br />
            1200 - 2400
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
