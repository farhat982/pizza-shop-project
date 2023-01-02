import dbConnect from '../../../utils/mongo'
import Product from '../../../models/ProductModel'

export default async function handler(req, res) {
  const { method, cookies } = req

  const token = cookies.token

  dbConnect()

  if (method === 'GET') {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json(error)
    
    }
  }
  if (method === 'POST') {
    if (!token || token !== 'SWDw4Cv||663Zp3|zxtp%ok6Ejj') {
      return res.status(401).json('Not authenticated')
    }
    try {
      const product = await Product.create(req.body)
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json(error)
      
    }
  }
}
