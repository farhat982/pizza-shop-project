import dbConnect from '../../../utils/mongo'
import Product from '../../../models/ProductModel'

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    cookies,
  } = req
  const token = cookies.token
  dbConnect()

  if (method === 'GET') {
    try {
      const product = await Product.findById(id)
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  if (method === 'PUT') {
    if (!token || token !== 'SWDw4Cv||663Zp3|zxtp%ok6Ejj') {
      return res.status(401).json('Not authenticated')
    }
    try {
      const id = params._id
      await Product.findOne(req.body)
      res.status(200).json(products)
    } catch (error) {
      res.status(500).json(error)
    }
  }
  if (method === 'DELETE') {
    if (!token || token !== 'SWDw4Cv||663Zp3|zxtp%ok6Ejj') {
      return res.status(401).json('Not authenticated')
    }
    try {
      await Product.findByIdAndDelete(id)
      res.status(200).json('The product has been deleted!')
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
