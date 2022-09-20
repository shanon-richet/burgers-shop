import express from 'express'
import {addToBasket, deleteFromBasket, getBasket} from '../controllers/basket.js'

const basketRouter = express.Router()

basketRouter.get('/basket', getBasket)
basketRouter.post('/add', addToBasket)
basketRouter.post('/delete', deleteFromBasket)

export default basketRouter
