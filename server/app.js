import express from 'express'
import {PORT , MONGO_URL} from './config.js'
import cors from 'cors'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes.js'

const app = express()

app.use(express.json())

app.use(cors({
    origin: '*',
    credentials: true
}))


app.use('/users',userRoutes)

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("App connected to database.")
        app.listen(PORT, () => {
            console.log(`server is listening on http://localhost:${PORT}/`)
        })
    })
    .catch((error) => {
        console.log(error)
    })