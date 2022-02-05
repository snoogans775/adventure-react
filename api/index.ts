// Initialize app
import { router } from './src/app'
import express from 'express'
import 'dotenv/config'
const app = express()

app.listen(process.env.PORT, function () {
   console.log("Example app listening at port:", process.env.PORT)
})

app.use(router)