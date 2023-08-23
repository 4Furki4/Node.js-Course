import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const secretMiddleware = (req, res, next) => {
    req.shhh_secret = "doggy"
    next()
}


app.get('/', secretMiddleware, (req, res) => {
    console.log("Hello World")
    res.status(200).json({ message: req.shhh_secret })
})
app.use('/api', protect, router)
app.post('/user', createNewUser)
app.post('/signin', signin)
export default app;