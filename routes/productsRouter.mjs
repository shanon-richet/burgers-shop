import express from 'express'
import {getProduct, getProducts} from '../controllers/produits.js'

const productsRouter = express.Router()

productsRouter.get('/', getProducts)
productsRouter.get('/:id', getProduct)

export default productsRouter
