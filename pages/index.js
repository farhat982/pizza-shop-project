import Head from 'next/head'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import { useState } from 'react'
import AddButton from '../components/AddButton'
import Add from '../components/Add'

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

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx?.req.cookies || ''
  let admin = false

  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }
  const response = await axios.get('http:localhost:3000/api/products')
  return {
    props: {
      pizzaList: response.data,
      admin,
    },
  }
}
