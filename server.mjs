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

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
var port = 5000

const app = express()
app.set('trust proxy', 1)
dotenv.config()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

app.use('/api/products', productsRouter)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(process.env.PORT || port, () => {
    console.log(`server is running on port ${port}`)
})