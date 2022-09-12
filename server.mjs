import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import path from 'path'
import { dirname } from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import productRouter from './routes/productRouter.mjs'
import loginRouter from './routes/loginRouter.mjs'
import usersRouter from './routes/usersRouter.mjs'
import { createRequire } from "module"
import signupRouter from './routes/signupRouter.mjs'
import deleteUserRouter from './routes/deleteUserRouter.mjs'
import editProfilRouter from './routes/editProfilRouter.mjs'
const require = createRequire(import.meta.url)
const express = require('express')
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
var port = 3000

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

app.use(productRouter)
app.use(usersRouter)
app.use(deleteUserRouter)
app.use(editProfilRouter)
app.use(loginRouter)
app.use(signupRouter)

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/logout', async function (req, res) {
    req.session.destroy()
    res.redirect('/')
})

app.listen(process.env.PORT || port, () => {
    console.log(`server is running on port ${port}`)
})