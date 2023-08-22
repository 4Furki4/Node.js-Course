import express from 'express'
import router from './router'
import morgan from 'morgan'
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
app.use('/api', router)

export default app;