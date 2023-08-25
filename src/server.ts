import express from 'express'
import router from './router'
import morgan from 'morgan'
import { protect } from './modules/auth'
import { createNewUser, signin } from './handlers/user'
const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// app.get('/', (req, res, next) => {
//     setTimeout(() => {
//         next(new Error('oops'))
//     }, 1)
// })

app.get("/", (req, res) => {
    res.json({ message: "Hello World" })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signin)
app.use((err, req, res, next) => {
    console.log(err.message)
    switch (err.type) {
        case 'auth':
            res.status(401).json({ message: "unauthorized" })
            break;
        case 'validation':
            res.status(400).json({ message: err.message })
            break;
        default:
            res.status(500).json({ message: "something went wrong" })
            break;
    }
})
export default app;