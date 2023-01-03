import Head from 'next/head'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'
import AddButton from '../components/AddButton'
import Add from '../components/Add'

export const  getServerSideProps = async (ctx) => {
  const myCookie = ctx?.req.cookies || ''
  let admin = false

  if (myCookie.token === 'SWDw4Cv||663Zp3|zxtp%ok6Ejj') {
    admin = true
  }
  const response = await axios.get('https://gleaming-cajeta-f087b9.netlify.app/api/products')
  return {
    props: {
      pizzaList: response.data,
      admin,
    },
  }
}

export default function Home({ pizzaList, admin }) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Shop Project</title>
        <meta
          name='description'
          content='Pizza Shop an e-commerce project with paypal payment system'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}


