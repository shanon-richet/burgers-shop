import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import path from 'path'
import { dirname } from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import productsRouter from './routes/productsRouter.mjs'
import basketRouter from './routes/basketRouter.mjs'
import paymentRouter from './routes/paymentRouter.mjs'
import {v4 as uuidv4} from 'uuid'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
var port = process.env.port || 5000
const app = express()

app.set('trust proxy', 1)
dotenv.config()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // maxAge: null,
        // expires: null,
        httpOnly: true,
        secure: false
    },
    data: [],
    rolling: true
}))
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use('/api/products', productsRouter)
app.use('/', basketRouter)
app.use('/', paymentRouter)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(process.env.PORT || port, () => {
    console.log(`server is running on http://localhost:${port}`)
})
