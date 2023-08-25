import app from "./server"
import * as dotenv from "dotenv"
import config from "./config"
// these are the global error handlers for the errors that are thrown in the app that are not caught
process.on('uncaughtException', (err) => {
    console.log(err)
    process.exit(1)
})
process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

dotenv.config()
app.listen(config.port, () => {
    console.log("Server is running on port", config.port)
})